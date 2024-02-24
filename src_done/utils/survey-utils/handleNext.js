import { logSessionEvent } from "../localStorage";
import { fetchConfigVariable } from "../handleConfigVars";

const handleNextButton = ({ history, casesCount, caseId, demoId }) => {
  const REACT_APP_demonstration = fetchConfigVariable("REACT_APP_demonstration");

  if (history.location.pathname === "/survey/background") {
    logSessionEvent("Next", "Background");

    if (REACT_APP_demonstration.length === 0) {
      history.push(`/survey/case1`);
    } else {
      history.push(`/survey/demonstration1`);
    }
  } else if (history.location.pathname.startsWith("/survey/demonstration")) {
    logSessionEvent("Next", `Demonstration${demoId}`);

    if (demoId < REACT_APP_demonstration.length) {
      const newDemoId = demoId + 1;
      history.push(`/survey/demonstration${newDemoId}`);
    } else {
      history.push(`/survey/case1`);
    }
  } else if (history.location.pathname.startsWith("/survey/case")) {
    logSessionEvent("Next", `Case${caseId}`);

    if (caseId < casesCount) {
      const newCaseId = caseId + 1;
      history.push(`/survey/case${newCaseId}`);
    } else {
      history.push(`/survey/summary-and-feedback`);
    }
  } else {
    return;
  }
};

export { handleNextButton };
