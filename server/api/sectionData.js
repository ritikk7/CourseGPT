// ****** set up ******
const fs = require('fs');

// ------------ Splitting files into sections -------------
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

// const trainingFilesPath = "./trainingFiles";
// let sectionsList = readFilesInDirectory(trainingFilesPath);
// console.log(`Found a total of ${sectionsList.length} sections in ${trainingFilesPath}.`);

module.exports = {
    readFilesInDirectory
}