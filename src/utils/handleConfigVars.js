import configuration from "../config.json";

/**
 * check if a string is a valid JSON string
 * @param {string} str the string to check
 * @returns {boolean} true if the string is a valid JSON string, false otherwise
 */
const isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }

  return true;
};

/**
 * fetch a config variable from the config file or from the environment variables. the environment variables have priority.
 * @param {string} param the name of the variable
 * @returns {string|object|Array } the value of the variable
 */
const fetchConfigVariable = (param) => {
  // read from environment variables
  const envVarRaw = process.env[param];
  const configVar = configuration[param];

  let result;

  // if the environment variable does not exist, use the variable from the config file
  if (envVarRaw === undefined) {
    result = configVar;
  } else {
    // if the environment variable exists and is not a valid JSON string, use the environment variable
    if (!isJsonString(envVarRaw)) {
      result = envVarRaw;
    } else {
      // if the environment variable exists and is a valid JSON string, parse it
      // and return the parsed object
      const envVarObj = JSON.parse(envVarRaw);
      result = envVarObj;
    }
  }

  return result;
};

/**
 * fetch a batch of config variables from the config file or from the environment variables. The environment variables have priority
 * @param {Array} parameters the names of the variables
 * @returns {object} an object with the same keys as the input array containing the values of the variables
 */
const fetchConfigVariablesBatch = (parameters) => {
  let result = {};
  parameters.map((parameter) => {
    result[parameter] = fetchConfigVariable(parameter);
    return null;
  });
  return result;
};

export { fetchConfigVariable, fetchConfigVariablesBatch };
