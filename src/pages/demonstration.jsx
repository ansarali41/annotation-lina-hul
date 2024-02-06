import React from "react";
import ParagraphWithList from "../minor-components/paragraphWithList";
import RankedImage from "../minor-components/rankedImage";
import RankedVideo from "../minor-components/rankedVideo";
import RankedAudio from "../minor-components/rankedAudio";
import "../assets/css/demonstration.css";
import { logSessionInfo } from "../utils/localStorage";
import { useParams } from "react-router-dom";
import { fetchConfigVariable } from "../utils/handleConfigVars";
import { conditionalPushToBucket } from "../utils/handleResponse";

const Demonstration = () => {
  const demoId = useParams().demoId;
  const REACT_APP_demonstration = fetchConfigVariable(`REACT_APP_demonstration`)[demoId - 1];

  logSessionInfo(false, `demonstration${demoId}`);
  conditionalPushToBucket();

  return (
    <div className="demonstration-wrapper">
      {(REACT_APP_demonstration["textBefore"] ||
        REACT_APP_demonstration["textAfter"] ||
        REACT_APP_demonstration["listOptions"]) && (
        <ParagraphWithList
          listClassName={REACT_APP_demonstration["listClassName"]}
          textClassName={REACT_APP_demonstration["textClassName"]}
          textBefore={REACT_APP_demonstration["textBefore"]}
          textAfter={REACT_APP_demonstration["textAfter"]}
          listOptions={REACT_APP_demonstration["listOptions"]}
        />
      )}

      {REACT_APP_demonstration["hasImage"] && (
        <RankedImage
          path={REACT_APP_demonstration["imagePath"]}
          className={REACT_APP_demonstration["imageClassName"]}
          wrapperClassName={REACT_APP_demonstration["wrapperClassName"]}
        />
      )}
      {REACT_APP_demonstration["hasVideo"] && (
        <RankedVideo
          url={REACT_APP_demonstration["videoPath"]}
          height={REACT_APP_demonstration["videoHeight"]}
          width={REACT_APP_demonstration["videoWidth"]}
        />
      )}
      {REACT_APP_demonstration["hasAudio"] && (
        <RankedAudio
          url={REACT_APP_demonstration["audioPath"]}
          height={REACT_APP_demonstration["audioHeight"]}
          width={REACT_APP_demonstration["audioWidth"]}
        />
      )}
    </div>
  );
};

export default Demonstration;
