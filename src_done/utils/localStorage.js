import { generateTimeStamp } from "./timestamp";

const pushToLocalStorage = (content) => {
  content.forEach((item) => {
    for (const [key, value] of Object.entries(item)) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  });
};

const logSessionEvent = (ButtonType, Location) => {
  let SessionEvents = JSON.parse(localStorage.getItem("SessionEvents"));

  const Timestamp = generateTimeStamp();
  const tail = {
    Location,
    ButtonType,
    Timestamp,
  };
  SessionEvents = SessionEvents !== null ? [...SessionEvents, tail] : new Array(tail);
  localStorage.setItem("SessionEvents", JSON.stringify(SessionEvents));
};

/**
 * save session info to local storage
 * @param {boolean} SessionComplete
 * @param {string} LastVisitedPage
 * @param {number} MaxCaseNumber optional
 */
const logSessionInfo = (SessionComplete, LastVisitedPage, MaxCaseNumber) => {
  let SessionInfo = JSON.parse(localStorage.getItem("SessionInfo")) || {};

  SessionInfo.SessionComplete = SessionComplete;
  SessionInfo.LastVisitedPage = LastVisitedPage;

  // only update if the new value is greater than the old value
  const oldMaxCaseNumber = parseInt(SessionInfo.MaxCaseNumber, 10) || 0;
  if (MaxCaseNumber && MaxCaseNumber > oldMaxCaseNumber) {
    SessionInfo.MaxCaseNumber = MaxCaseNumber;
  }

  localStorage.setItem("SessionInfo", JSON.stringify(SessionInfo));
};

export { pushToLocalStorage, logSessionEvent, logSessionInfo };
