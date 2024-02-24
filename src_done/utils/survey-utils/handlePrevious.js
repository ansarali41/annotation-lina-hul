import { logSessionEvent } from "../localStorage";
import { fetchConfigVariable } from "../handleConfigVars";

const handlePreviousButton = ({ history, casesCount, setOpenDialog, caseId, demoId }) => {
  const REACT_APP_demonstration = fetchConfigVariable("REACT_APP_demonstration");

  if (history.location.pathname === "/survey/summary-and-feedback") {
    logSessionEvent("Previous", `Summary and feedback`);
    history.push(`/survey/case${casesCount}`);
  } else if (history.location.pathname.startsWith("/survey/case")) {
    logSessionEvent("Previous", `Case${caseId}`);
    if (caseId > 1) {
      const newCaseId = caseId - 1;
      history.push(`/survey/case${newCaseId}`);
    } else {
      const newDemoId = REACT_APP_demonstration.length;
      history.push(`/survey/demonstration${newDemoId}`);
    }
  } else if (history.location.pathname.startsWith("/survey/demonstration")) {
    logSessionEvent("Previous", `Demonstration${demoId}`);
    if (demoId > 1) {
      const newDemoId = demoId - 1;
      history.push(`/survey/demonstration${newDemoId}`);
    } else {
      history.push(`/survey/background`);
    }
  } else if (history.location.pathname === "/survey/background") {
    setOpenDialog(true);
  } else {
    return;
  }
};

export { handlePreviousButton };
