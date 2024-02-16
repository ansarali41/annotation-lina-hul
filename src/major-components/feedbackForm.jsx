import React from "react";
import InputTextArea from "../minor-components/inputTextArea";
import InputLikert from "../minor-components/inputLikert";
import InputMultipleChoice from "../minor-components/inputMultipleChoice";
import { handleTextFieldChange } from "../utils/handleTextFieldChange";

const FeedbackForm = ({ feedbackFormQuestions, title, text }) => {
  const components = {
    text: InputTextArea,
    likert: InputLikert,
    mc: InputMultipleChoice,
  };

  return (
    <div className="feedback-form-wrapper">
      <h3>{title}</h3>
      <div className="summary-and-feedback-text-content">{text} </div>
      <form className="feedback-form">
        {feedbackFormQuestions.map((e, index = 0) => {
          return e.questionType === "text"
            ? React.createElement(components[e["questionType"]], {
                key: index,
                onChange: (event) => handleTextFieldChange(event, e),
                ...e,
              })
            : React.createElement(components[e["questionType"]], {
                key: index,
                config: e,
                ...e,
              });
        })}
      </form>
    </div>
  );
};
export default FeedbackForm;
