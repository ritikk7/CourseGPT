# imports
import os # for retrieving env variables
import openai  # for calling the OpenAI API
import pandas as pd  # for storing text and embeddings data
import tiktoken  # for counting tokens
from scipy import spatial  # for calculating vector similarities for search

# models
EMBEDDING_MODEL = "text-embedding-ada-002"
GPT_MODEL = "gpt-3.5-turbo"

# set up openAI API Key
openai.api_key = os.getenv("OPENAI_API_KEY")

trainingFilesPath = "./Course Website TXT/"

def read_files_in_directory(path):
    """Return a list of all file content sections in a given training files folder path."""
    all_sections = []
    for filename in os.listdir(path):
        with open(os.path.join(path, filename), 'r') as f: # open in readonly mode
          # append lines
            fileContent = f.read()
            sections = split_file_to_sections(filename[0:-4], fileContent)
            all_sections.extend(sections)
    return all_sections

def split_file_to_sections(filename, fileContent):
    """Return a list of file sections in a filename and fileContent string.
    
        Each section is a tuple, where:
        - the first element is a list of parent subtitles, starting with "<filename> - <section heading>"
        - the second element is the text of the section 
    """
    # section title format in fileContent = "[filename] - [section heading]"
    section_title_prefix = filename + " - "
    sections = fileContent.split(section_title_prefix)
    resultSections= [] # resulting list holding each section in the format of (title, text)
    for section in sections:
        section_heading, _, section_text = section.partition('\n')
        section_title = section_title_prefix + section_heading
        resultSections.append((section_title, section))
    
    print(f"Found {len(resultSections)} sections in {filename}.txt")
    return resultSections

sectionsList = read_files_in_directory(trainingFilesPath)
print(f"Found a total of {len(sectionsList)} sections in {trainingFilesPath}.")

GPT_MODEL = "gpt-3.5-turbo"  # only matters insofar as it selects which tokenizer to use

## Below, we are defining a couple helper functions for splitting sections into smaller sections under the token limit

def num_tokens(text: str, model: str = GPT_MODEL) -> int:
    """Return the number of tokens in a string."""
    encoding = tiktoken.encoding_for_model(model)
    return len(encoding.encode(text))

# needs to insert new delimiter into documents to preserve sections
def halved_by_delimiter(string: str, delimiter: str = "\n") -> list[str, str]:
    """Split a string in two, on a delimiter, trying to balance tokens on each side."""
    chunks = string.split(delimiter)
    if len(chunks) == 1:
        return [string, ""]  # no delimiter found
    elif len(chunks) == 2:
        return chunks  # no need to search for halfway point
    else:
        total_tokens = num_tokens(string)
        halfway = total_tokens // 2
        best_diff = halfway
        for i, chunk in enumerate(chunks):
            left = delimiter.join(chunks[: i + 1])
            left_tokens = num_tokens(left)
            diff = abs(halfway - left_tokens)
            if diff >= best_diff:
                break
            else:
                best_diff = diff
        left = delimiter.join(chunks[:i])
        right = delimiter.join(chunks[i:])
        return [left, right]
    
def truncated_string(
    string: str,
    model: str,
    max_tokens: int,
    print_warning: bool = True,
) -> str:
    """Truncate a string to a maximum number of tokens."""
    encoding = tiktoken.encoding_for_model(model)
    encoded_string = encoding.encode(string)
    truncated_string = encoding.decode(encoded_string[:max_tokens])
    if print_warning and len(encoded_string) > max_tokens:
        print(f"Warning: Truncated string from {len(encoded_string)} tokens to {max_tokens} tokens.")
    return truncated_string

def split_strings_from_sections(
    subsection: tuple[str, str],
    max_tokens: int = 1000,
    model: str = GPT_MODEL,
    max_recursion: int = 5,
) -> list[str]:
    """
    Split a section into a list of subsections, each with no more than max_tokens.
    Each section is a tuple of parent title (str) and text (str).
    """
    string = "\n\n".join(subsection)
    num_tokens_in_string = num_tokens(string)
    # if length is fine, return string
    if num_tokens_in_string <= max_tokens:
        return [string]
    # if recursion hasn't found a split after X iterations, just truncate
    elif max_recursion == 0:
        return [truncated_string(string, model=model, max_tokens=max_tokens)]
    # otherwise, split in half and recurse
    else:
        titles, text = subsection
        for delimiter in ["\n\n", "\n", ". "]:
            left, right = halved_by_delimiter(text, delimiter=delimiter)
            if left == "" or right == "":
                # if either half is empty, retry with a more fine-grained delimiter
                continue
            else:
                # recurse on each half
                results = []
                for half in [left, right]:
                    half_subsection = (titles, half)
                    half_strings = split_strings_from_sections(
                        half_subsection,
                        max_tokens=max_tokens,
                        model=model,
                        max_recursion=max_recursion - 1,
                    )
                    results.extend(half_strings)
                return results
    # otherwise no split was found, so just truncate (should be very rare)
    return [truncated_string(string, model=model, max_tokens=max_tokens)]

# split sections into chunks
MAX_TOKENS = 1600
course_strings = []
for section in sectionsList:
    course_strings.extend(split_strings_from_sections(section, max_tokens=MAX_TOKENS))

print(f"{len(sectionsList)} sections split into {len(course_strings)} strings.")

# calculate embedding
EMBEDDING_MODEL = "text-embedding-ada-002"  # OpenAI's best embeddings as of Apr 2023
BATCH_SIZE = 1000  # you can submit up to 2048 embedding inputs per request

embeddings = []
for batch_start in range(0, len(course_strings), BATCH_SIZE):
    batch_end = batch_start + BATCH_SIZE
    batch = course_strings[batch_start:batch_end]
    print(f"Batch {batch_start} to {batch_end-1}")
    response = openai.Embedding.create(model=EMBEDDING_MODEL, input=batch)
    for i, be in enumerate(response["data"]):
        assert i == be["index"]  # double check embeddings are in same order as input
    batch_embeddings = [e["embedding"] for e in response["data"]]
    embeddings.extend(batch_embeddings)

df = pd.DataFrame({"text": course_strings, "embedding": embeddings})

# save document chunks and embeddings

SAVE_PATH = "data/cspc455withEmbeddings_0606.csv"

df.to_csv(SAVE_PATH, index=False)

# search function
def strings_ranked_by_relatedness(
    query: str,
    df: pd.DataFrame,
    relatedness_fn=lambda x, y: 1 - spatial.distance.cosine(x, y),
    top_n: int = 100
) -> tuple[list[str], list[float]]:
    """Returns a list of strings and relatednesses, sorted from most related to least."""
    query_embedding_response = openai.Embedding.create(
        model=EMBEDDING_MODEL,
        input=query,
    )
    query_embedding = query_embedding_response["data"][0]["embedding"]
    strings_and_relatednesses = [
        (row["text"], relatedness_fn(query_embedding, row["embedding"]))
        for i, row in df.iterrows()
    ]
    strings_and_relatednesses.sort(key=lambda x: x[1], reverse=True)
    strings, relatednesses = zip(*strings_and_relatednesses)
    return strings[:top_n], relatednesses[:top_n]

# examples
strings, relatednesses = strings_ranked_by_relatedness("course evaluation", df, top_n=5)
for string, relatedness in zip(strings, relatednesses):
    print(f"{relatedness=:.3f}")
    display(string)


def query_message(
    query: str,
    df: pd.DataFrame,
    model: str,
    token_budget: int
) -> str:
    """Return a message for GPT, with relevant source texts pulled from a dataframe."""
    strings, relatednesses = strings_ranked_by_relatedness(query, df)
    introduction = 'Use the below information on the University of British Columbia CPSC455 - Applied Industry Practices course to answer the subsequent question. If the answer cannot be found in the articles, write "I could not find an answer."'
    question = f"\n\nQuestion: {query}"
    message = introduction
    for string in strings:
        next_article = f'\n\nCPSC455 Course Information:\n"""\n{string}\n"""'
        if (
            num_tokens(message + next_article + question, model=model)
            > token_budget
        ):
            break
        else:
            message += next_article
    return message + question


def ask(
    query: str,
    df: pd.DataFrame = df,
    model: str = GPT_MODEL,
    token_budget: int = 4096 - 500,
    print_message: bool = False,
) -> str:
    """Answers a query using GPT and a dataframe of relevant texts and embeddings."""
    message = query_message(query, df, model=model, token_budget=token_budget)
    if print_message:
        print(message)
    messages = [
        {"role": "system", "content": "You answer questions about the University of British Columbia CPSC455 - Applied Industry Practices course'."},
        {"role": "user", "content": message},
    ]
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=0
    )
    response_message = response["choices"][0]["message"]["content"]
    return response_message

ask('How are students evaluated in CPSC455?')