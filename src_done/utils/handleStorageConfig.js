import { fetchConfigVariable } from "../utils/handleConfigVars";
import { getFirebaseApp, anonymousAuthentication } from "../utils/firebase";

/**
 * read from config. use the default values if the parameters are not defined or invalid
 * @returns {object} - the config object for storage
 * @property {string} assetsStorageType - the type of storage for assets (local or firebase)
 * @property {string} responsesStorageType - the type of storage for responses (download or firebase)
 */
const getConfig = () => {
  const defaults = {
    assetsStorageType: "local",
    responsesStorageType: "download",
  };

  const REACT_APP_general = fetchConfigVariable("REACT_APP_general");
  let config = defaults;

  if (REACT_APP_general && REACT_APP_general.storage) {
    // if assetsStorageType is "firebase", use it; otherwise, use the default
    if (REACT_APP_general.storage.assetsStorageType === "firebase") {
      config.assetsStorageType = "firebase";
    }
    // if responsesStorageType is "firebase", use it; otherwise, use the default
    if (REACT_APP_general.storage.responsesStorageType === "firebase") {
      config.responsesStorageType = "firebase";
    }
  }

  return config;
};

const conditionalInitializeFirebase = async () => {
  // if either assets or responses are stored in firebase, initialize firebase
  if (
    getConfig().assetsStorageType === "firebase" ||
    getConfig().responsesStorageType === "firebase"
  ) {
    getFirebaseApp();
    await anonymousAuthentication();
  }
};

export default getConfig;
export { getConfig, conditionalInitializeFirebase };
