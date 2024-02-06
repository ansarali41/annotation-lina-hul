import { toastError } from "../toast";
import { isValidEmail as validateEmail } from "../inputValidation";
import { conditionalInitializeFirebase } from "../handleStorageConfig";
import { conditionalPushToBucket } from "../handleResponse";
import { fetchCases } from "../loadAssets";
import { v4 as uuidv4 } from "uuid";
import { fetchConfigVariable } from "../handleConfigVars";
import { generateTimeStamp } from "../timestamp";
import { getOs, browserName, browserVersion } from "../clientMetadata";
import { logSessionInfo } from "../localStorage";

/**
 * handles the "Get participant ID" button click event.
 * @param {Object} e - event object
 * @param {Object} formInfo - object containing the form data
 * @param {Object} history - history object
 * @param {string} Version - version of the app
 * @param {function} setRouteIsAllowed - function to set the routeIsAllowed state variable
 */
const handleGetParticipantId = async (e, formInfo, history, Version, setRouteIsAllowed) => {
  e && e.preventDefault();

  /* HANDLING INPUT ERRORS */
  const {
    name,
    country,
    degree,
    degreeOther,
    fieldOfExpertise,
    termsOfUse,
    notifications,
    email,
    comments,
    activeYears,
  } = formInfo;

  // for degree, if "Other" is not selected, one of the other options must be selected; if "Other" is selected, the text field must also be filled out
  const degreeIsValid =
    (!degree.includes("Other") && degree.length > 0) ||
    (degree.includes("Other") && degreeOther !== "");

  if (name && country && degreeIsValid && fieldOfExpertise.length > 0 && termsOfUse) {
    if (
      (notifications && !email) ||
      (notifications && !validateEmail(email)) ||
      (email && !validateEmail(email))
    ) {
      toastError("Please provide your email address.", "top-center", "email-error");
    } else {
      conditionalInitializeFirebase();

      /* FETCH CASE IDS FROM STORAGE */
      setRouteIsAllowed(true);
      localStorage.clear();
      let CaseOrder;

      const REACT_APP_general = fetchConfigVariable("REACT_APP_general");
      const rootDirectory = fetchConfigVariable("REACT_APP_FIREBASE_ROOT_DIRECTORY");

      if (REACT_APP_general?.caseOrder?.cases?.length !== 0) {
        CaseOrder = await fetchCases(
          true,
          null,
          REACT_APP_general["caseOrder"]["cases"],
          REACT_APP_general["caseOrder"]["shuffle"]
        );
      } else {
        CaseOrder = await fetchCases(false, `${rootDirectory}/gallery/cases/`, null, null);
      }
      const uuid = uuidv4();

      // the final degree info is the selected degree(s) (excluding "Other") + the text field if "Other" is selected
      let degreeInfo;
      if (degree.includes("Other")) {
        degreeInfo = [...degree.filter((item) => item !== "Other"), degreeOther];
      } else {
        degreeInfo = degree;
      }

      const ParticipantInfo = {
        ParticipantId: uuid,
        Name: name,
        EmailAddress: email,
        Country: country,
        Comments: comments,
        Degree: degreeInfo,
        FieldOfExpertise: fieldOfExpertise,
        ActiveYears: parseInt(activeYears, 10),
        Tickbox1: termsOfUse,
        Tickbox2: notifications,
      };
      const SoftwareInfo = {
        SoftwareInfoTag: REACT_APP_general["softwareInfoTag"],
        Version: Version,
        OperatingSystem: getOs(),
        Browser: `${browserName} ${browserVersion}`,
        ScreenResolution: `${window.innerWidth} x ${window.innerHeight}`,
      };
      const SessionEvents = [
        {
          Location: "Registration",
          ButtonType: "Get participant ID",
          Timestamp: generateTimeStamp(),
        },
      ];

      localStorage.setItem("ParticipantInfo", JSON.stringify(ParticipantInfo));
      setRouteIsAllowed(true);

      localStorage.setItem("SessionEvents", JSON.stringify(SessionEvents));
      logSessionInfo("false", "registration");
      localStorage.setItem("SoftwareInfo", JSON.stringify(SoftwareInfo));
      localStorage.setItem("CaseOrder", JSON.stringify(CaseOrder));

      conditionalPushToBucket();
      history.replace("/survey/background");
    }
  } else {
    toastError("Please verify mandatory fields.", "top-center", "req-error");
  }
};

export { handleGetParticipantId };
