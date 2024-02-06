import { conditionalPushToBucket } from "../utils/handleResponse";

const handleRadioChange = (e, id, index, config) => {
  let FeedbackFormAnswers = JSON.parse(localStorage.getItem("FeedbackFormAnswers")) || {};

  // mc questions maybe have a comment section. When the user change choices, we need to preverse the comment.
  let answer = FeedbackFormAnswers[config.id] || {};
  answer = {
    ...answer,
    questionType: config.questionType,
    label: config.label,
    optionIndex: index,
    optionText: e.currentTarget.innerText,
  };
  FeedbackFormAnswers[id] = answer;

  localStorage.setItem("FeedbackFormAnswers", JSON.stringify(FeedbackFormAnswers));
  conditionalPushToBucket();
};
export { handleRadioChange };
