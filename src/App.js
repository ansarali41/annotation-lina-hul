import React, { useEffect, useState } from "react";
import "./App.css";
import "./assets/css/common.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Survey from "./pages/survey";
import Warning from "./pages/warning";
import { fetchConfigVariablesBatch } from "./utils/handleConfigVars";
const App = () => {
  const [innerWidth] = useState(window.innerWidth);
  const [configuration, setConfiguration] = useState({});
  useEffect(() => {
    setConfiguration(
      fetchConfigVariablesBatch([
        "REACT_APP_home",
        "REACT_APP_warning",
        "REACT_APP_background",
        "REACT_APP_demonstration",
        "REACT_APP_registration",
        "REACT_APP_summaryAndFeedback",
        "REACT_APP_end",
        "REACT_APP_survey",
        "REACT_APP_general",
      ])
    );
    function handleResize() {}
    window.addEventListener("resize", handleResize);
  }, []);
  return (
    <div
      className={`App theme-color-${
        configuration["REACT_APP_general"] &&
        configuration["REACT_APP_general"]["color"] &&
        configuration["REACT_APP_general"]["color"]["themeColor"]
      }
    button-color-${
      configuration["REACT_APP_general"] &&
      configuration["REACT_APP_general"]["color"] &&
      configuration["REACT_APP_general"]["color"]["buttonColor"]
    }`}
    >
      {innerWidth < 1200 ? (
        <Warning REACT_APP_warning={configuration["REACT_APP_warning"]} />
      ) : (
        <Switch>
          <Route
            path="/survey/home"
            render={(props) => (
              <Survey {...props} REACT_APP_home={configuration["REACT_APP_home"]} />
            )}
          />
          <Route
            path="/survey/registration"
            render={(props) => (
              <Survey {...props} REACT_APP_registration={configuration["REACT_APP_registration"]} />
            )}
          />
          <Route
            path="/survey/background"
            render={(props) => (
              <Survey
                {...props}
                REACT_APP_demonstration={configuration["REACT_APP_demonstration"]}
              />
            )}
          />
          <Route
            path="/survey/demonstration:demoId"
            render={(props) => (
              <Survey
                {...props}
                REACT_APP_demonstration={configuration["REACT_APP_demonstration"]}
              />
            )}
          />
          <Route
            path="/survey/case:caseId"
            render={(props) => (
              <Survey
                {...props}
                REACT_APP_demonstration={configuration["REACT_APP_demonstration"]}
              />
            )}
          />
          <Route
            path="/survey/summary-and-feedback"
            render={(props) => (
              <Survey
                {...props}
                REACT_APP_summaryAndFeedback={configuration["REACT_APP_summaryAndFeedback"]}
              />
            )}
          />
          <Route
            path="/survey/end"
            render={(props) => <Survey {...props} REACT_APP_end={configuration["REACT_APP_end"]} />}
          />
          <Redirect from="/" to="/survey/home" />
        </Switch>
      )}
    </div>
  );
};
/* DEBUG BLOCK: the below part is to replace the whole return statement for debugging purposes. Comment the return statement above and uncomment the return statement below to test app with nothing under App.js */
//   return (
//     <div className="App">
//       <h1>Hello world!</h1>
//     </div>
//   );
// };
export default App;
