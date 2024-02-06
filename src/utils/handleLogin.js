import { logSessionEvent, pushToLocalStorage } from "../utils/localStorage";
import { conditionalPushToBucket, fetchResponse } from "../utils/handleResponse";
import getConfig, { conditionalInitializeFirebase } from "../utils/handleStorageConfig";
import { toastError } from "../utils/toast";

const handleLogin = async (participantId, history, setRouteIsAllowed) => {
  if (participantId === "") {
    toastError("Please enter a valid participant ID", "top-center", "error");
    return;
  }

  conditionalInitializeFirebase();

  const response = await fetchResponse(participantId);
  if (!response) {
    toastError(`The participant ID you entered is invalid.`, "top-center", "error");
    return;
  } else if (response.SessionInfo.SessionComplete) {
    toastError(`The participant ID you entered has completed the survey.`, "top-center", "error");
  } else {
    setRouteIsAllowed(true);

    // if fetching from firebase, update local storage with the response from firebase
    if (getConfig().responsesStorageType === "firebase") {
      pushToLocalStorage(new Array(response));
    }

    logSessionEvent("Start survey", "Login page");
    conditionalPushToBucket();

    // go to the last page the participant was on
    const LastVisitedPage = response.SessionInfo.LastVisitedPage;
    history.push(`/survey/${LastVisitedPage}`);
  }
};

export { handleLogin };
