import { get } from "stack-trace";
import { generateTimeStamp } from "./timestamp";
const logger = {
  log: (message, level = "info", metadata = "") => {
    const timestamp = generateTimeStamp();
    const coloredLevel = getColorizedLevel(level);
    const codeLocation = getCodeLocation();
    const logEntry = `${timestamp} [${coloredLevel}]: ${message} ${metadata}  ${codeLocation}`;
    console.log(logEntry);
  },
  error: (message = "", metadata = "") => {
    logger.log(message, "error", metadata);
  },
  warn: (message = "", metadata = "") => {
    logger.log(message, "warn", metadata);
  },
  debug: (message = "", metadata = "") => {
    logger.log(message, "debug", metadata);
  },
  info: (message = "", metadata = "") => {
    logger.log(message, "info", metadata);
  },
};
const getColorizedLevel = (level) => {
  const colors = {
    info: "\x1b[34mINFO\x1b[0m",
    error: "\x1b[31mERROR\x1b[0m",
    warn: "\x1b[33mWARN\x1b[0m",
    debug: "\x1b[35mDEBUG\x1b[0m",
  };

  return colors[level] || level.toUpperCase();
};
const getCodeLocation = () => {
  const trace = get();
  const callerFrame = trace[3];
  const fileName = callerFrame.getFileName() || "";
  const lineNumber = callerFrame.getLineNumber() || "";
  const functionName = callerFrame.getFunctionName() || "";
  return `${fileName}:${lineNumber} - ${functionName}`;
};
export default logger;
