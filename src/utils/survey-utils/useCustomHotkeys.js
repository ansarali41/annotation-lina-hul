import useHotkeys from "@reecelucas/react-use-hotkeys";
import { toastInfo } from "../toast";
import { useLocation } from "react-router-dom";
import { handleLogin } from "../handleLogin";

const useCustomHotkeys = ({
  disableNextButton,
  setDisableNextButton,
  handleNext,
  setName,
  setEmail,
  setCountry,
  setDegree,
  setFieldOfExpertise,
  setActiveYears,
  setComments,
  setTermsOfUse,
  setOpenEndDialog,
  participantId,
  history,
  setRouteIsAllowed,
  getParticipantId,
}) => {
  const location = useLocation();

  useHotkeys("Shift+f", () => {
    if (location.pathname === "/survey/registration") {
      setName("NA (Development)");
      setEmail("me@mulo.no");
      setCountry("NA (Development)");
      setDegree("NA (Development)");
      setFieldOfExpertise("NA (Development)");
      setActiveYears(999);
      setComments("Form filled out as part of development.");
      setTermsOfUse(true);
      toastInfo("Form filled out as part of development.", "top-center", "req-error");
    }
    if (location.pathname === "/survey/summary-and-feedback") {
      setOpenEndDialog(true);
      localStorage.setItem("FeedbackFormAnswers", JSON.stringify("NA (Development)"));
    }
  });

  useHotkeys("Enter", () => {
    if (disableNextButton === true) {
      return;
    } else {
      if (location.pathname === "/survey/home") {
        handleLogin(participantId, history, setRouteIsAllowed);
      } else if (location.pathname === "/survey/registration") {
        getParticipantId();
      } else {
        handleNext();
      }
    }
  });

  useHotkeys("Shift+Enter", () => {
    if (location.pathname.includes("/survey/case")) {
      setDisableNextButton(false);
      handleNext();
      setDisableNextButton(true);
    }
  });
};

export { useCustomHotkeys };
