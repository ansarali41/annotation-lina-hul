import React from "react";
import Summary from "../major-components/summary";
import FeedbackForm from "../major-components/feedbackForm";
import { generateFeedbackFormValidationScheme } from "../utils/inputValidation";
import "../assets/css/summaryAndFeedback.css";
import { logSessionInfo } from "../utils/localStorage";
import { conditionalPushToBucket } from "../utils/handleResponse";

const SummaryAndFeedback = ({ REACT_APP_summaryAndFeedback }) => {
  logSessionInfo(false, "summary-and-feedback");
  conditionalPushToBucket();

  generateFeedbackFormValidationScheme(
    REACT_APP_summaryAndFeedback["feedbackForm"].feedbackFormQuestions
  );

  let feedbackForm = () => (
    <FeedbackForm
      title={REACT_APP_summaryAndFeedback["feedbackForm"].title}
      text={REACT_APP_summaryAndFeedback["feedbackForm"].text}
      feedbackFormQuestions={REACT_APP_summaryAndFeedback["feedbackForm"].feedbackFormQuestions}
    />
  );

  let summarySection = () => (
    <Summary
      highlightAnswers={REACT_APP_summaryAndFeedback["summary"].highlightAnswers}
      title={REACT_APP_summaryAndFeedback["summary"].title}
      text={REACT_APP_summaryAndFeedback["summary"].text}
      label={REACT_APP_summaryAndFeedback["summary"].label}
      highlightClassName={REACT_APP_summaryAndFeedback["summary"].highlightClassName}
      imagePlaceholderIconPath={REACT_APP_summaryAndFeedback["summary"].imagePlaceholderIconPath}
      videoPlaceholderIconPath={REACT_APP_summaryAndFeedback["summary"].videoPlaceholderIconPath}
      audioPlaceholderIconPath={REACT_APP_summaryAndFeedback["summary"].audioPlaceholderIconPath}
      textPlaceholderIconPath={REACT_APP_summaryAndFeedback["summary"].textPlaceholderIconPath}
    />
  );

  if (
    REACT_APP_summaryAndFeedback["summary"].display === true &&
    REACT_APP_summaryAndFeedback["feedbackForm"].display === true
  ) {
    return (
      <div className="summary-and-feedback-wrapper">
        {summarySection()}
        {feedbackForm()}
      </div>
    );
  } else if (
    REACT_APP_summaryAndFeedback["feedbackForm"].display === true &&
    REACT_APP_summaryAndFeedback["summary"].display === false
  ) {
    return feedbackForm();
  } else if (
    REACT_APP_summaryAndFeedback["feedbackForm"].display === false &&
    REACT_APP_summaryAndFeedback["summary"].display === true
  ) {
    return summarySection();
  } else return <h2>Click "End Survey" to submit your response</h2>;
};

export default SummaryAndFeedback;
