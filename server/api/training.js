// ****** set up ******
const fs = require('fs');
const scipy = require('scipy');
const {encode, decode} = require('gpt-3-encoder');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  organization: 'org-Ctm9a6WpVYabY1qbocCED6NW',
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


// ------------ Splitting files into sections -------------

const trainingFilesPath = "./Course Website TXT/";
/**
 * Return a list of all file content sections  in a given training files folder path.
 * 
 * Each section is a list, where:
 *  - the first element is a list of parent subtitles, starting with "<filename> - <section heading>"
 *  - the second element is the text of the section.
 * 
 * @param {string} path        Directory path for where the training files are
 * @return {string[]}          Return a list of all sections
 */
function readFilesInDirectory(path) {
  const allSections = [];
  const files = fs.readdirSync(path);

  files.forEach((filename) => {
    const fileContent = fs.readFileSync(`${path}/${filename}`, 'utf8');
    const sections = splitFileToSections(filename.slice(0, -4), fileContent);
    allSections.push(...sections);
  });

  return allSections;
}

/**
 * Given file name and filecontent, return a list of file sections.
 * 
 * Each section is a list, where:
 *  - the first element is a list of parent subtitles, starting with "<filename> - <section heading>"
 *  - the second element is the text of the section.
 *
 * @param {string} filename        Name of a file.
 * @param {string} fileContent     Contents of a file.
 * @return {string[]}              Return a list of file sections.
 */
function splitFileToSections(filename, fileContent) {
    // section title format in fileContent = "[filename] - [section heading]"
    const sectionTitlePrefix = filename + ' - ';
    const sections = fileContent.split(sectionTitlePrefix);
    // resulting list holding each section in the format of (title, text)
    const resultSections = [];
  
    sections.forEach((section) => {
        const splitIndex = section.indexOf('\n')
        const sectionHeading = section.substring(0, splitIndex);
        const sectionText = section.substring(splitIndex+1);
        const sectionTitle = sectionTitlePrefix + sectionHeading;
        resultSections.push([sectionTitle, sectionText]);
    });
  
    console.log(`Found ${resultSections.length} sections in ${filename}.txt`);
    return resultSections;
}

let sectionsList = readFilesInDirectory(trainingFilesPath);
console.log(`Found a total of ${sectionsList.length} sections in ${trainingFilesPath}.`);


// ------------ Splitting large file sections to fit max token limit -------------

/**
 * Return the number of tokens in a string. (openAI api charges based on tokens)
 *
 * @param {string} text        A string of text to get token count for.
 * @return {number}          Returns the number of tokens the text is going to use
 */
function numTokens(text){
    return encode(text).length;
}

// Split a string in two, on a delimiter, trying to balance tokens on each side.
function halvedByDelimiter(string, delimiter = "\n") {
    const chunks = string.split(delimiter);

    if (chunks.length === 1) {
        return [string, ""]; // no delimiter found
    } else if (chunks.length === 2) {
        return chunks; // no need to search for halfway point
    } else {
        const totalTokens = numTokens(string);
        const halfway = Math.floor(totalTokens / 2);
        let bestDiff = halfway;
        let i = 0;
    
        for (i = 0; i < chunks.length; i++) {
            const left = chunks.slice(0, i + 1).join(delimiter);
            const leftTokens = numTokens(left);
            const diff = Math.abs(halfway - leftTokens);
    
            if (diff >= bestDiff) {
                break;
            } else {
                bestDiff = diff;
            }
        }
  
        const left = chunks.slice(0, i).join(delimiter);
        const right = chunks.slice(i).join(delimiter);
        return [left, right];
    }
}

// Truncate a string to a maximum number of tokens.
function truncatedString(string, maxTokens, printWarning = true) {
    const encodedString = encode(string);
    const truncatedString = decode(encodedString.slice(0, maxTokens));
  
    if (printWarning && encodedString.length > maxTokens) {
      console.log(`Warning: Truncated string from ${encodedString.length} tokens to ${maxTokens} tokens.`);
    }
  
    return truncatedString;
}
  
function splitStringsFromSections(section, maxTokens = 1000, maxRecursion = 5) {
    const [title, text] = section;
    const sectionString = "\n\n".join(section);
    const numTokensInString = numTokens(sectionString);

    //if length is fine, return string
    if (numTokensInString <= maxTokens) {
      return [sectionString];
    // if recursion hasn't found a split after X iterations, just truncate
    } else if (maxRecursion === 0) {
      return [truncatedString(sectionString, maxTokens)];
    // otherwise, split in half and recurse
    } else {
        for (const delimiter of ["\n\n", "\n", ". "]) {
            const [left, right] = halvedByDelimiter(text, delimiter);
    
            if (left === "" || right === "") {
                // if either half is empty, retry with a more fine-grained delimiter
                continue;
            } else {
                // recurse on each half
                const results = [];
        
                for (const half of [left, right]) {
                    const halfSubsection = [title, half];
                    const halfStrings = splitStringsFromSections(halfSubsection, maxTokens, maxRecursion - 1);
                    results.push(...halfStrings);
                }
    
                return results;
            }
        }
      // otherwise no split was found, so just truncate (should be very rare)
      return [truncatedString(sectionString, maxTokens)];
    }
}
  
// split sections into chunks
const MAX_TOKENS = 1600;
const courseStrings = [];

for (const section of sectionsList) {
    courseStrings.push(...splitStringsFromSections(section, MAX_TOKENS));
}

console.log(`${sectionsList.length} sections split into ${courseStrings.length} strings.`);

// calculate embedding
const EMBEDDING_MODEL = "text-embedding-ada-002"; // OpenAI's best embeddings as of Apr 2023
const BATCH_SIZE = 1000; // you can submit up to 2048 embedding inputs per request
const GPT_MODEL = "gpt-3.5-turbo"; // you can submit up to 2048 embedding inputs per request

async function createEmbeddings(courseStrings) {
    const embeddings = [];
    for (let batchStart = 0; batchStart < courseStrings.length; batchStart += BATCH_SIZE) {
        const batchEnd = batchStart + BATCH_SIZE;
        const batch = courseStrings.slice(batchStart, batchEnd);
        console.log(`Batch ${batchStart} to ${batchEnd - 1}`);
        const response = await openai.createEmbedding({ model: EMBEDDING_MODEL, input: batch });
    
        for (let i = 0; i < response.data.length; i++) {
            const be = response.data[i];
            assert(i === be.index); // double check embeddings are in the same order as input
        }
    
        const batchEmbeddings = response.data.map((e) => e.embedding);
        embeddings.push(...batchEmbeddings);
    }
    
    const df = new pd.DataFrame({ text: courseStrings, embedding: embeddings });
    
    const SAVE_PATH = "data/cspc455withEmbeddings_0606.csv";
    
    df.to_csv(SAVE_PATH, { index: false });
}


// search
//Returns a list of strings and relatednesses, sorted from most related to least.
function stringsRankedByRelatedness(query, df, relatednessFn = (x, y) => 1 - scipy.spatial.distance.cosine(x, y), topN = 100) {
    const queryEmbeddingResponse = openai.Embedding.create({ model: EMBEDDING_MODEL, input: query });
    const queryEmbedding = queryEmbeddingResponse.data[0].embedding;
    const stringsAndRelatednesses = df.iterrows().map((row) => {
      const embedding = row.embedding;
      const relatedness = relatednessFn(queryEmbedding, embedding);
      return [row.text, relatedness];
    });
    stringsAndRelatednesses.sort((a, b) => b[1] - a[1]);
    const [strings, relatednesses] = zip(...stringsAndRelatednesses);
    return [strings.slice(0, topN), relatednesses.slice(0, topN)];
}

// Return a message for GPT, with relevant source texts pulled from a dataframe.
function queryMessage(query, df, model, tokenBudget) {
    const [strings, relatednesses] = stringsRankedByRelatedness(query, df);
    const introduction = 'Use the below information on the University of British Columbia CPSC455 - Applied Industry Practices course to answer the subsequent question. If the answer cannot be found in the articles, write "I could not find an answer."';
    const question = `\n\nQuestion: ${query}`;
    let message = introduction;
    for (const string of strings) {
      const nextArticle = `\n\nCPSC455 Course Information:\n"""\n${string}\n"""`;
      if (numTokens(message + nextArticle + question, model) > tokenBudget) {
        break;
      } else {
        message += nextArticle;
      }
    }
    return message + question;
}
  
function ask(query, df = df, model = GPT_MODEL, tokenBudget = 4096 - 500, printMessage = false) {
    const message = queryMessage(query, df, model, tokenBudget);
    if (printMessage) {
      console.log(message);
    }
    const messages = [
      { role: "system", content: "You answer questions about the University of British Columbia CPSC455 - Applied Industry Practices course'." },
      { role: "user", content: message },
    ];
    const response = openai.ChatCompletion.create({ model: model, messages: messages, temperature: 0 });
    const responseMessage = response.choices[0].message.content;
    return responseMessage;
}
  
ask('How are students evaluated in CPSC455?');
  