import { fetchConfigVariable } from "./handleConfigVars";
import { getConfig } from "../utils/handleStorageConfig";
import { getStorageReference } from "../utils/firebase";

/**
 * prepare the response to be pushed to the bucket; only items in the outputJson array will be contained in the response
 * @returns {string} the response as a json string
 */
const prepareResponse = () => {
  const storeToBucket = {};

  // these items are mandatory and will always be pushed to the bucket
  const mandatoryItems = [
    "ParticipantInfo",
    "CaseOrder",
    "SessionInfo",
    "CaseStudyAnswers",
    "FeedbackFormAnswers",
  ];

  // the optional items are decided by the outputJson config variable
  // if outputJson is an array containing valid items, those items will also be pushed to the bucket
  const outputJson = fetchConfigVariable("REACT_APP_general").outputJson;
  const defaultItems = ["SoftwareInfo", "SessionEvents"];
  let optionalItems;
  if (Array.isArray(outputJson) && outputJson.length > 0) {
    // add the items which are valid possible values of outputJson
    optionalItems = outputJson.filter((item) => defaultItems.includes(item));
  } else {
    // not push any optional items if outputJson is not an array or is an empty array
    optionalItems = [];
  }

  let itemsToPush = mandatoryItems.concat(optionalItems);

  // if assetsStorageType is "local", we also push ValidCaseFiles to the bucket because it is needed in order to load the assets
  const storageConfig = getConfig();
  if (storageConfig.assetsStorageType === "local") {
    itemsToPush.push("ValidCaseFiles");
  }

  itemsToPush.map((prop) => {
    storeToBucket[prop] = JSON.parse(localStorage.getItem(prop));
    return null;
  });
  const jsonString = JSON.stringify(storeToBucket);
  return jsonString;
};

/**
 * push data to the firebase bucket
 * @param {string} jsonString the content of the file
 * @param {string} fileName the name of the file
 */
const pushToBucket = async (jsonString, fileName) => {
  const blob = new Blob([jsonString], { type: "application/json" });

  const storageRef = getStorageReference();
  const rootDirectory = fetchConfigVariable("REACT_APP_FIREBASE_ROOT_DIRECTORY");
  const fileRef = storageRef.child(`${rootDirectory}/responses/${fileName}`);

  try {
    await fileRef.put(blob);
  } catch (error) {
    console.log(error);
  }
};

/**
 * generate a blob from a json string and download it
 * @param {string} jsonString the content of the file
 * @param {string} fileName the name of the file
 */
const downloadResponse = (jsonString, fileName) => {
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = fileName;
  link.href = url;
  link.click();
};

/**
 * push data to the bucket if the config variable is set so; otherwise, do nothing
 */
const conditionalPushToBucket = () => {
  const storageConfig = getConfig();
  if (storageConfig.responsesStorageType === "firebase") {
    const jsonString = prepareResponse();
    const participantId = JSON.parse(localStorage.getItem("ParticipantInfo")).ParticipantId;
    const fileName = `${participantId}.json`;

    pushToBucket(jsonString, fileName);
  }
};

/**
 * handle the final response according to the config variable.
 * if the config variable is set to "download", download the response. if the config variable is set to "firebase", push the response to the bucket.
 * only items in the outputJson array will be contained in the response
 */
const handleFinalResponse = () => {
  const storageConfig = getConfig();

  const jsonString = prepareResponse();
  const participantId = JSON.parse(localStorage.getItem("ParticipantInfo")).ParticipantId;
  const fileName = `${participantId}.json`;

  if (storageConfig.responsesStorageType === "download") {
    downloadResponse(jsonString, fileName);
  } else if (storageConfig.responsesStorageType === "firebase") {
    pushToBucket(jsonString, fileName);
  }
};

/**
 * fetch saved response at the start of the app
 * @param {string} participantId the participant id
 * @returns {object|null} the response object or null if there is no saved response
 */
const fetchResponse = async (participantId) => {
  const storageConfig = getConfig();

  // for a valid saved response, all these items should be present in the respective storage
  let neededItems = ["ParticipantInfo", "CaseOrder", "SessionInfo"];

  // if assetsStorageType is "local", ValidCaseFiles is also needed in the respective response storage
  if (storageConfig.assetsStorageType === "local") {
    neededItems.push("ValidCaseFiles");
  }

  if (storageConfig.responsesStorageType === "firebase") {
    const storageRef = getStorageReference();

    // for firebase, the file with the name of the participant id should exist in the bucket
    const rootDirectory = fetchConfigVariable("REACT_APP_FIREBASE_ROOT_DIRECTORY");
    const fileRef = storageRef.child(`${rootDirectory}/responses/${participantId}.json`);
    const url = await fileRef.getDownloadURL().catch((err) => {
      console.log(err);
    });
    if (url) {
      const responseJson = await fetch(url).then((res) => res.json());
      // check if the file from firebase contains all the needed items
      let validResponse = true;
      neededItems.map((item) => {
        if (!responseJson[item]) {
          validResponse = false;
        }
        return null;
      });

      if (validResponse) {
        return responseJson;
      } else {
        return null;
      }
    }
    return null;
  } else if (storageConfig.responsesStorageType === "download") {
    // the participantId should be the same as the one in localStorage
    // check if localStorage has participantInfo first
    if (!localStorage.getItem("ParticipantInfo")) {
      return null;
    }
    const savedId = JSON.parse(localStorage.getItem("ParticipantInfo")).ParticipantId;
    if (savedId !== participantId) {
      return null;
    }

    // check if the needed items are all present in localStorage
    const savedResponse = {};
    let validResponse = true;
    neededItems.map((item) => {
      const itemValue = localStorage.getItem(item);
      if (itemValue) {
        savedResponse[item] = JSON.parse(itemValue);
      } else {
        validResponse = false;
      }
      return null;
    });

    if (validResponse) {
      return savedResponse;
    } else {
      return null;
    }
  }
};

export { conditionalPushToBucket, handleFinalResponse, fetchResponse };
