/**
 * return the selected degree options
 * @param {string} option the option that is changed (selected or unselected), e.g. "PhD"
 * @param {boolean} state true if the option is selected, false if the option is unselected
 * @param {array} degree the array holding the old state of the degree options
 * @returns {array} the updated degree array
 */
const updateDegree = (option, state, degree) => {
  let result;

  let newArray = Array.from(degree);
  if (state) {
    if (newArray.indexOf(option) < 0) {
      result = [...newArray, option];
    }
  } else {
    result = newArray.filter((item) => item !== option);
  }

  return result;
};

export { updateDegree };
