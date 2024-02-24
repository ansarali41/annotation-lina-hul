import { useCallback, useEffect, useState } from "react";
import "../assets/css/background.css";
import GenericBackgroundSection from "../minor-components/genericBackgroundSection";
import { fetchConfigVariable } from "../utils/handleConfigVars";
import { useHistory } from "react-router-dom";
import { logSessionInfo } from "../utils/localStorage";
import { conditionalPushToBucket } from "../utils/handleResponse";

const Background = () => {
  const REACT_APP_background = fetchConfigVariable("REACT_APP_background");
  const history = useHistory();

  const [finishStatus, setfinishStatus] = useState(false);

  logSessionInfo(false, "background");
  conditionalPushToBucket();

  const onBackButtonEvent = useCallback(
    (e) => {
      e.preventDefault();
      if (!finishStatus) {
        if (window.confirm("Are you sure you want to go back?")) {
          setfinishStatus(true);
          history.push("/");
        } else {
          window.history.pushState(null, null, window.location.pathname);
          setfinishStatus(false);
        }
      }
    },
    [finishStatus, history]
  );
  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", onBackButtonEvent);
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };
  }, [onBackButtonEvent]);

  return (
    <div className="background">
      {REACT_APP_background.map((e, index) => (
        <GenericBackgroundSection
          key={index}
          sectionContent={e.sectionContent}
          sectionText={e.sectionText}
          sectionTitle={e.sectionTitle}
          sectionTextClassName={e.sectionTextClassName}
          sectionTitleClassName={e.sectionTitleClassName}
        />
      ))}
    </div>
  );
};

export default Background;
