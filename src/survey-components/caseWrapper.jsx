import CaseImage from "../pages/caseImage";
import CaseVideo from "../pages/caseVideo";
import CaseHybrid from "../pages/caseHybrid";
import CaseAudio from "../pages/caseAudio";
import CaseText from "../pages/caseText/caseText";
import { useContext } from "react";
import { AppContext } from "../context/appContext";
import { fetchConfigVariablesBatch } from "../utils/handleConfigVars";
import { useParams } from "react-router-dom";
import { logSessionInfo } from "../utils/localStorage";
import { conditionalPushToBucket } from "../utils/handleResponse";
import CaseImageAnnotation from "../pages/caseImageAnnotation/caseImageAnnotation";

const CaseWrapper = () => {
  const { casesCount } = useContext(AppContext);
  const caseId = useParams().caseId;

  const {
    REACT_APP_caseImage,
    REACT_APP_caseVideo,
    REACT_APP_caseAudio,
    REACT_APP_caseHybrid,
    REACT_APP_caseText,
    REACT_APP_caseImageAnnotation,
    REACT_APP_summaryAndFeedback,
  } = fetchConfigVariablesBatch([
    "REACT_APP_caseImage",
    "REACT_APP_caseVideo",
    "REACT_APP_caseAudio",
    "REACT_APP_caseHybrid",
    "REACT_APP_caseText",
    "REACT_APP_caseImageAnnotation",
    "REACT_APP_summaryAndFeedback",
  ]);

  const prefix = JSON.parse(localStorage.getItem("CaseOrder"))
    [caseId - 1].split("-")[0]
    .toLowerCase();

  logSessionInfo(false, `case${caseId}`, caseId);
  conditionalPushToBucket();

  return prefix === "text" ? (
    <CaseText totalCases={casesCount} caseId={caseId} REACT_APP_caseText={REACT_APP_caseText} />
  ) : prefix === "audio" ? (
    <CaseAudio totalCases={casesCount} caseId={caseId} REACT_APP_caseAudio={REACT_APP_caseAudio} />
  ) : prefix === "hybrid" ? (
    <CaseHybrid
      totalCases={casesCount}
      caseId={caseId}
      REACT_APP_caseHybrid={REACT_APP_caseHybrid}
    />
  ) : prefix === "video" ? (
    <CaseVideo totalCases={casesCount} caseId={caseId} REACT_APP_caseVideo={REACT_APP_caseVideo} />
  ) : prefix === "imageannotation" ? (
    <CaseImageAnnotation
      totalCases={casesCount}
      caseId={caseId}
      REACT_APP_caseImageAnnotation={REACT_APP_caseImageAnnotation}
      REACT_APP_summaryAndFeedback={REACT_APP_summaryAndFeedback}
    />
  ) : (
    <CaseImage totalCases={casesCount} caseId={caseId} REACT_APP_caseImage={REACT_APP_caseImage} />
  );
};

export default CaseWrapper;
