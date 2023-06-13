const {encode, decode} = require('gpt-3-encoder');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  organization: 'org-Ctm9a6WpVYabY1qbocCED6NW',
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const {readFilesInDirectory } = require("./sectionData");
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

const MAX_TOKENS = 1600;
const courseStrings = [];
const trainingFilesPath = "./trainingFiles";

// split sections into chunks
async function splitSectionIntoChunks(path = trainingFilesPath, maxTokens = MAX_TOKENS) {

    let sectionsList = readFilesInDirectory(path);
    for (const section of sectionsList) {
        courseStrings.push(...splitStringsFromSections(section, maxTokens));
    }

    console.log(`${sectionsList.length} sections split into ${courseStrings.length} strings.`);
}


// calculate embedding
const EMBEDDING_MODEL = "text-embedding-ada-002"; // OpenAI's best embeddings as of Apr 2023
const BATCH_SIZE = 1000; // you can submit up to 2048 embedding inputs per request

async function createEmbeddings() {
    let courseStrings = splitSectionIntoChunks();
    const embeddings = [];
    for (let batchStart = 0; batchStart < courseStrings.length; batchStart += BATCH_SIZE) {
        const batchEnd = batchStart + BATCH_SIZE;
        const batch = courseStrings.slice(batchStart, batchEnd);
        console.log(`Batch ${batchStart} to ${batchEnd - 1}`);
        const response = await openai.createEmbedding({ model: EMBEDDING_MODEL, input: batch });
    
        // for (let i = 0; i < response.data.length; i++) {
        //     const be = response.data[i];
        //     assert(i === be.index); // double check embeddings are in the same order as input
        // }
    
        const batchEmbeddings = response.data.map((e) => e.embedding);
        embeddings.push(...batchEmbeddings);
    }
    
    return { text: courseStrings, embedding: embeddings };
}

// function saveEmbeddingsToCsv({ text: courseStrings, embedding: embeddings }){
//     const df = new pd.DataFrame({ text: courseStrings, embedding: embeddings });
    
//     const SAVE_PATH = "data/cspc455withEmbeddings_0606.csv";
    
//     df.to_csv(SAVE_PATH, { index: false });
// }


module.exports = { numTokens, createEmbeddings };