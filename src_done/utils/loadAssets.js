import getConfig from "./handleStorageConfig";
import {
  fetchCases as fetchCasesFirebase,
  getAssetDownloadUrl as getAssetFirebase,
  fetchJsonAttributeValue as fetchJsonFirebase,
  getFirebaseApp,
  anonymousAuthentication,
} from "../utils/firebase";
import {
  fetchCases as fetchCasesLocal,
  getAsset as getAssetLocal,
  fetchJsonAttributeValue as fetchJsonLocal,
} from "../utils/loadLocalAssets";

// fetch cases at the start of the app
const fetchCases = async (configExists, path, cases, shuffle) => {
  const config = getConfig();
  let validCases;

  if (config.assetsStorageType === "local") {
    validCases = await fetchCasesLocal(configExists, path, cases, shuffle);
  } else if (config.assetsStorageType === "firebase") {
    getFirebaseApp();
    await anonymousAuthentication();
    validCases = await fetchCasesFirebase(configExists, path, cases, shuffle);
  }

  return validCases;
};

const getAsset = async (path) => {
  const config = getConfig();

  let url;

  if (config.assetsStorageType === "local") {
    url = getAssetLocal(path);
  } else if (config.assetsStorageType === "firebase") {
    url = await getAssetFirebase(path);
  }

  return url;
};

const fetchJsonAttributeValue = async (path, attribute) => {
  const config = getConfig();

  let value;

  if (config.assetsStorageType === "local") {
    value = await fetchJsonLocal(path, attribute);
  } else if (config.assetsStorageType === "firebase") {
    value = await fetchJsonFirebase(path, attribute);
  }

  return value;
};

export { fetchCases, getAsset, fetchJsonAttributeValue };
