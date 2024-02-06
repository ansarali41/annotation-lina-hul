import React from "react";
import GenericButton from "./genericButton";
import RankedText from "./rankedText";

const GenericTextSection = ({
  className,
  text,
  textClassName,
  scrollClassName,
  textUrl,
  title,
  buttonClassName,
  buttonLabel,
  buttonOnClick,
  hasButton,
  textLabel,
}) => {
  return (
    <div className={className}>
      <h5>{title}</h5>
      {text && <p className={textClassName}>{text}</p>}{" "}
      <RankedText
        url={textUrl}
        className={textClassName}
        label={textLabel}
        scrollClassName={scrollClassName}
      />
      {hasButton && (
        <div className="generic-text-section-button">
          {" "}
          <GenericButton className={buttonClassName} label={buttonLabel} onClick={buttonOnClick} />
        </div>
      )}
    </div>
  );
};

export default GenericTextSection;
