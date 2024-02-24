import React from "react";
import Asterisk from "./asterisk";
import { FormGroup, Label, Input } from "reactstrap";
import Icon from "./icon";
import InputTextArea from "./inputTextArea";
import { handleRadioChange } from "../utils/handleRadioChange";
import { handleTextFieldChange } from "../utils/handleTextFieldChange";

const InputMultipleChoice = ({
  config,
  label,
  id,
  choices,
  optional = false,
  showTooltip = false,
  tooltipMessage,
  labelClassName = "radio-question",
  wrapperClassName = "feedback-text-input",
  hasCommentBox = false,
  commentBoxClassName = "feedback-text-input",
  commentBoxLabel = "Comment to the multiple choice question.",
  commentBoxOptional = true,
}) => {
  /**
   * get the saved answer from local storage, so as to repopulate the answer
   * @param   {string} id The id of the question
   * @param   {number} index The index of the option. The first option is 0
   * @returns {string|null} 'checked' if this option is checked, null if not
   */
  const getSavedAnswer = (id, index) => {
    let checked = null;
    const FeedbackFormAnswers = JSON.parse(localStorage.getItem("FeedbackFormAnswers"));
    if (FeedbackFormAnswers) {
      const answer = FeedbackFormAnswers[id];
      if (answer && index === answer.optionIndex) {
        checked = "checked";
      }
    }
    return checked;
  };

  return (
    <div className={wrapperClassName}>
      <p className={labelClassName}>
        {showTooltip && (
          <Icon tooltipMessage={tooltipMessage} className="fa fa-info-circle form-tooltip ml-1" />
        )}{" "}
        {label}{" "}
        {optional && <span className="input-multiple-choice-optional-text">(optional)</span>}{" "}
        {!optional && <Asterisk />}
      </p>
      {choices.map((element, index) => {
        const checked = getSavedAnswer(id, index);

        return (
          <FormGroup key={index} check onChange={(e) => handleRadioChange(e, id, index, config)}>
            <Input
              id={`${id}-radio-option${index}`}
              type="radio"
              name={`${id}-radio`}
              defaultChecked={checked}
            />
            <Label check for={`${id}-radio-option${index}`}>
              {element}{" "}
            </Label>
          </FormGroup>
        );
      })}
      {hasCommentBox === true && (
        <InputTextArea
          id={`${id}-comment`}
          label={commentBoxLabel}
          onChange={(e) => handleTextFieldChange(e, config)}
          optional={commentBoxOptional}
          showTooltip={false}
          className={commentBoxClassName}
        />
      )}
    </div>
  );
};

export default InputMultipleChoice;
