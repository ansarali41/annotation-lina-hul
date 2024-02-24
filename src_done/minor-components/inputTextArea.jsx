import Icon from "./icon";
import React from "react";
import Asterisk from "./asterisk";
import { conditionalPushToBucket } from "../utils/handleResponse";

// this component is used in both "registration" and "feedbackForm"!
const InputTextArea = ({
  id,
  label,
  onChange,
  optional,
  showTooltip,
  tooltipMessage,
  type = "text",
  className = "feedback-text-input",
  blur,
}) => {
  /**
   * get the saved answer from local storage, so as to repopulate the answer
   * @param   {string} id The id of the question. If it is comment to mc questions, the id is followed by '-comment'
   * @returns {string} text of the saved answer
   */
  const getSavedAnswer = (id) => {
    // if the id is comment to mc questions, the id is followed by '-comment'
    if (id.endsWith("-comment")) {
      id = id.slice(0, -8);
    }

    let text = "";
    const FeedbackFormAnswers = JSON.parse(localStorage.getItem("FeedbackFormAnswers"));
    if (FeedbackFormAnswers) {
      const answer = FeedbackFormAnswers[id];
      if (answer) {
        text = answer.text;
      }
    }
    return text;
  };

  const handleOnBlur = () => {
    if (blur === false) {
      return;
    } else {
      conditionalPushToBucket();
    }
  };

  return (
    <div className={className}>
      <label htmlFor={id} className="radio-question">
        {showTooltip && (
          <Icon tooltipMessage={tooltipMessage} className=" fa fa-info-circle form-tooltip ml-1" />
        )}{" "}
        {label} {optional && <span className="input-text-area-optional-text"> (optional)</span>}{" "}
        {!optional && <Asterisk />}
      </label>
      <textarea
        type={type}
        id={id}
        onChange={onChange}
        defaultValue={getSavedAnswer(id)}
        onBlur={handleOnBlur}
      />
    </div>
  );
};

export default InputTextArea;
