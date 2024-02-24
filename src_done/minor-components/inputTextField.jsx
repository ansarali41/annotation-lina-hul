import React from "react";
import Asterisk from "./asterisk";
import Icon from "./icon";

// this component is used in "registration"
const InputTextField = ({
  id,
  label,
  onChange,
  optional,
  showTooltip,
  tooltipMessage,
  type = "text",
}) => {
  return (
    <div className={"input-wrapper"}>
      <label htmlFor={id} className="radio-question">
        {showTooltip && (
          <Icon tooltipMessage={tooltipMessage} className="fa fa-info-circle form-tooltip ml-1" />
        )}{" "}
        {label} {optional && <span className="input-text-field-optional-text">(optional)</span>}{" "}
        {!optional && <Asterisk />}
      </label>
      <input type={type} id={id} onChange={onChange} />
    </div>
  );
};

export default InputTextField;
