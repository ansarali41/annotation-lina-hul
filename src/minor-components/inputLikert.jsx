import React from "react";
import Likert from "react-likert-scale";
import Icon from "./icon";
import Asterisk from "./asterisk";
import { generateLikertScheme } from "../utils/generateLikertScheme";
import { conditionalPushToBucket } from "../utils/handleResponse";

const InputLikert = ({
  label,
  id,
  likertWrapperClassName = "feedback-text-input",
  titleClassName = "radio-question",
  showTooltip = false,
  tooltipMessage,
  optional = false,
  likertQuestions,
}) => {
  // get the offset of the saved answer from local storage, so as to repopulate the answer
  const getSavedAnswerOffset = (index) => {
    const FeedbackFormAnswers = JSON.parse(localStorage.getItem("FeedbackFormAnswers"));
    if (!FeedbackFormAnswers) {
      return false;
    }
    const label = likertQuestions[index].label;
    const answer = FeedbackFormAnswers[label];
    if (!answer) {
      return false;
    }
    const value = answer.split("/")[0];
    // the value starts from 1 but an js array starts from 0
    const offset = value - 1;
    return offset;
  };

  return (
    <div id={id} className={likertWrapperClassName}>
      <p className={titleClassName}>
        {showTooltip && (
          <Icon tooltipMessage={tooltipMessage} className=" fa fa-info-circle form-tooltip ml-1" />
        )}{" "}
        {label}
        {optional && <span className="input-likert-optional-text"> (optional)</span>}{" "}
        {!optional && <Asterisk />}
      </p>
      {likertQuestions.map((e, index = 0) => {
        let likertOptions = { ...likertQuestions[index] };
        likertOptions.responses = generateLikertScheme(likertOptions.size);

        const savedAnswerOffset = getSavedAnswerOffset(index);
        // the returned value could be 0, so we need to check for !== false
        if (savedAnswerOffset !== false) {
          likertOptions.responses[savedAnswerOffset].checked = true;
        }

        likertOptions.onChange = (val) => {
          const FeedbackFormAnswers = JSON.parse(localStorage.getItem("FeedbackFormAnswers"));
          let answers = {};
          if (FeedbackFormAnswers) {
            answers = { ...FeedbackFormAnswers };
          }
          answers[
            `${likertQuestions[index].label}`
          ] = `${val.value}/${likertOptions.responses.length}`;
          localStorage.setItem("FeedbackFormAnswers", JSON.stringify(answers));
          conditionalPushToBucket();
        };
        return <Likert {...likertOptions} key={index} />;
      })}
    </div>
  );
};

export default InputLikert;
