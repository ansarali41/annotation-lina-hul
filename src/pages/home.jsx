import GenericButton from "../minor-components/genericButton";
import "../assets/css/home.css";
import { fetchConfigVariablesBatch } from "../utils/handleConfigVars";
import { useHistory } from "react-router-dom";
import { handleLogin } from "../utils/handleLogin";

const Home = ({ setRouteIsAllowed, participantId, setParticipantId }) => {
  const { REACT_APP_general, REACT_APP_home } = fetchConfigVariablesBatch([
    "REACT_APP_general",
    "REACT_APP_home",
  ]);
  const history = useHistory();

  const handleRedirectToRegistration = () => {
    history.push("/survey/registration");
  };

  return (
    <div className="home-welcome">
      <div className="home-header">
        <h2>
          {(REACT_APP_home && REACT_APP_home["title"]) ||
            (REACT_APP_general && REACT_APP_general["appName"])}
        </h2>
        <div className="home-intro">{REACT_APP_home && REACT_APP_home["introText"]}</div>
      </div>
      <div className="home-registration-wrapper">
        <div className="home-login">
          <div className="home-participant-id-field">
            <input
              autoComplete="off"
              onChange={(e) => {
                setParticipantId(e.currentTarget.value);
              }}
              type="text"
              name="login"
              id="login"
              value={participantId}
              placeholder="Participant ID"
            />
          </div>
          <GenericButton
            onClick={() => {
              handleLogin(participantId, history, setRouteIsAllowed);
            }}
            hasIcon={true}
            className={"btn"}
            id="start-survey-button"
            iconClassName={"fa fa-play mr-2"}
            label="Start survey"
          />
        </div>
        <div className="home-signup">
          <p className="home-signup-message">{REACT_APP_home && REACT_APP_home["signupText"]}</p>
          <GenericButton
            onClick={handleRedirectToRegistration}
            hasIcon={true}
            className="btn"
            id="home-get-participant-id"
            iconClassName="fa fa-user-plus  mr-2"
            label="Get participant ID"
          />
          <span className="home-additional-text">
            {REACT_APP_home && REACT_APP_home["additionalText"]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
