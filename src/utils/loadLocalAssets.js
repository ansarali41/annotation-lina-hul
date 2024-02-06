import { fetchConfigVariable } from "./handleConfigVars";
import * as f from "./loadLocalAssets";
import _ from "lodash";

/**
 * return the names of valid cases, and save the file names of the valid cases in localStorage
 * @returns {Promise<Array.<string>>} - an array of valid cases
 * @affects {localStorage} - sets the "validCaseFiles" item in localStorage
 */
const fetchCases = async () => {
  // read from config
  const config = fetchConfigVariable("REACT_APP_general");
  const cases = config?.caseOrder?.cases || [];
  const shuffle = config?.caseOrder?.shuffle || "";

  let validCases = [];
  for (let i = 0; i < cases.length; i++) {
    const caseFiles = await validateCase(cases[i]);
    if (caseFiles) {
      validCases.push({ name: cases[i], files: caseFiles });
    }
  }

  // the names of the valid cases
  let validCaseNames = [];
  // the file names of the valid cases
  let validCaseFiles = [];

  // shuffle the cases according to the config

  if (shuffle === "categorized") {
    let casesByType = {
      image: [],
      hybrid: [],
      video: [],
      audio: [],
      text: [],
    };

    validCases.forEach((validCase) => {
      const caseName = validCase.name;
      const caseType = caseName.split("-")[0].toLowerCase();
      casesByType[caseType].push(validCase);
    });

    Object.keys(casesByType).forEach((caseType) => {
      casesByType[caseType] = _.shuffle(casesByType[caseType]);
    });

    validCaseNames = [
      ...casesByType.image.map((validCase) => validCase.name),
      ...casesByType.hybrid.map((validCase) => validCase.name),
      ...casesByType.video.map((validCase) => validCase.name),
      ...casesByType.audio.map((validCase) => validCase.name),
      ...casesByType.text.map((validCase) => validCase.name),
    ];

    validCaseFiles = [
      ...casesByType.image.map((validCase) => validCase.files),
      ...casesByType.hybrid.map((validCase) => validCase.files),
      ...casesByType.video.map((validCase) => validCase.files),
      ...casesByType.audio.map((validCase) => validCase.files),
      ...casesByType.text.map((validCase) => validCase.files),
    ];
  } else if (shuffle === "full") {
    validCases = _.shuffle(validCases);
    validCaseNames = validCases.map((validCase) => validCase.name);
    validCaseFiles = validCases.map((validCase) => validCase.files);
  } else {
    validCaseNames = validCases.map((validCase) => validCase.name);
    validCaseFiles = validCases.map((validCase) => validCase.files);
  }

  localStorage.setItem("ValidCaseFiles", JSON.stringify(validCaseFiles));

  return validCaseNames;
};

/**
 * check if a case is valid (i.e. all necessary assets exist) and return the file names that exist
 * @param {string} caseName - the name of the case
 * @returns {Promise<Array.<string>|false>} - an array of file names that exist, or false if the case is not valid (i.e. some assets are missing)
 */
const validateCase = async (caseName) => {
  const path = "/gallery/cases/";

  // supported file extensions
  const extensions = {
    image: ["jpg", "jpeg", "png", "gif"],
    audio: ["mp3", "wav", "ogg", "aac", "flac"],
    video: ["mp4", "webm", "mov"],
    text: ["txt"],
  };

  const type = caseName.split("-")[0].toLowerCase();
  const fileNameBase = `${path}${caseName}/${caseName}`;

  // the files that exist
  let files = [];

  if (type === "image") {
    const fileName1 = `${fileNameBase}.json`;
    const fileExists1 = await f.fileExists(fileName1, "json");
    if (!fileExists1) {
      return false;
    }

    const fileNameArrayArray = [
      extensions.image.map((ext) => `${fileNameBase}.${ext}`),
      extensions.image.map((ext) => `${fileNameBase}-a.${ext}`),
      extensions.image.map((ext) => `${fileNameBase}-b.${ext}`),
    ];

    const group = await getFileNameGroup(fileNameArrayArray, "image");
    if (!group) {
      return false;
    }

    files = [fileName1].concat(group);
  } else if (type === "text") {
    const fileNameArrayArray = [
      extensions.text.map((ext) => `${fileNameBase}-a.${ext}`),
      extensions.text.map((ext) => `${fileNameBase}-b.${ext}`),
    ];

    const group = await getFileNameGroup(fileNameArrayArray, "text");
    if (!group) {
      return false;
    }

    files = group;
  } else if (type === "audio") {
    const fileNameArrayArray = [
      extensions.audio.map((ext) => `${fileNameBase}-a.${ext}`),
      extensions.audio.map((ext) => `${fileNameBase}-b.${ext}`),
    ];
    const group = await getFileNameGroup(fileNameArrayArray, "audio");
    if (!group) {
      return false;
    }

    files = group;
  } else if (type === "video") {
    const fileNameArrayArray = [
      extensions.video.map((ext) => `${fileNameBase}-a.${ext}`),
      extensions.video.map((ext) => `${fileNameBase}-b.${ext}`),
    ];
    const group = await getFileNameGroup(fileNameArrayArray, "video");
    if (!group) {
      return false;
    }

    files = group;
  } else if (type === "hybrid") {
    const fileName1ArrayArray = [extensions.video.map((ext) => `${fileNameBase}.${ext}`)];
    const group1 = await getFileNameGroup(fileName1ArrayArray, "video");
    if (!group1) {
      return false;
    }

    const fileName2ArrayArray = [
      extensions.image.map((ext) => `${fileNameBase}-a.${ext}`),
      extensions.image.map((ext) => `${fileNameBase}-b.${ext}`),
    ];
    const group2 = await getFileNameGroup(fileName2ArrayArray, "image");
    if (!group2) {
      return false;
    }

    files = group1.concat(group2);
  } else {
    // if not a supported case type, return false
    return false;
  }

  return files;
};

/**
 * check if a file exists
 * @param {string} fullPath - the full path of the file
 * @param {string} fileType - the type of the file
 * @returns {Promise<boolean>} - true if the file exists, false otherwise
 */
const fileExists = async (fullPath, fileType) => {
  try {
    const response = await fetch(fullPath, { method: "HEAD" });

    // the React app will always return response.ok = true and the index.html, even if the file we request doesn't exist
    // so we have to check the content-type header to see if the file is the correct type
    const types = {
      json: "application/json",
      image: "image",
      audio: "audio",
      video: "video",
      text: "text/plain",
    };

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.startsWith(types[fileType])) {
      return true;
    }
  } catch (err) {
    // console.error(err);
  }

  return false;
};

/**
 * check if a group of files exist and return the file names that exist
 * @param {Array.<Array.<string>>} fileNameArrayArray - an array of arrays. the files in a file group have the same file type, but different file names. for each file name, we check if any of the supported file extensions exist
 * @param {string} fileType - the type of the files
 * @returns {Promise<Array.<string>|false>} - an array of file names that exist, or false if none exist for any of the file names
 */
const getFileNameGroup = async (fileNameArrayArray, fileType) => {
  let group = [];
  for (let i = 0; i < fileNameArrayArray.length; i++) {
    const fileNameArray = fileNameArrayArray[i];
    let fileNameExists = false;
    for (let j = 0; j < fileNameArray.length; j++) {
      const fileName = fileNameArray[j];
      // loop through the supported extensions. stop at the first one that exists
      const exists = await f.fileExists(fileName, fileType);
      if (exists) {
        fileNameExists = true;
        group.push(fileName);
        break;
      }
    }
    if (!fileNameExists) {
      return false;
    }
  }
  return group;
};

const getAsset = (path) => {
  // for local assets, returning the path is enough
  return path;
};

/**
 * fetch the value of a JSON attribute
 * @param {string} path - the path of the JSON file
 * @param {string} attribute - the attribute to fetch
 * @returns {Promise<string>} - the value of the attribute
 */
const fetchJsonAttributeValue = async (path, attribute) => {
  const response = await fetch(path);
  const json = await response.json();
  return json[attribute];
};

export {
  fetchCases,
  getAsset,
  fetchJsonAttributeValue,
  fileExists,
  getFileNameGroup,
  validateCase,
};
