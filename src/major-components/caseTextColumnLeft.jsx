import React from "react";
import GenericTextSection from "../minor-components/genericTextSection";
const CaseTextColumnLeft = ({
  className,
  title,
  text,
  textClassName,
  scrollClassName,
  sectionClassName,
  sectionText,
  sectionTextClassName,
  sectionTitle,
  sectionButtonClassName,
  sectionButtonlabel,
  sectionHasButton,
  sectionTextBUrl,
  sectionTextAUrl,
  rightSectionTextLabel,
  leftSectionTextLabel,
  rightSectionButtonOnClick,
  leftSectionButtonOnClick,
}) => {
  return (
    <div className={className}>
      <h4>{title}</h4>
      <p className={textClassName}>{text}</p>
      <div className="text-generic-section">
        <GenericTextSection
          className={sectionClassName}
          text={sectionText}
          textClassName={sectionTextClassName}
          scrollClassName={scrollClassName}
          title={sectionTitle}
          buttonClassName={sectionButtonClassName}
          buttonLabel={sectionButtonlabel}
          buttonOnClick={leftSectionButtonOnClick}
          hasButton={sectionHasButton}
          textUrl={sectionTextAUrl}
          textLabel={leftSectionTextLabel}
        />
        <GenericTextSection
          hasButton={sectionHasButton}
          className={sectionClassName}
          text={sectionText}
          textClassName={sectionTextClassName}
          scrollClassName={scrollClassName}
          title={sectionTitle}
          buttonClassName={sectionButtonClassName}
          buttonLabel={sectionButtonlabel}
          buttonOnClick={rightSectionButtonOnClick}
          textUrl={sectionTextBUrl}
          textLabel={rightSectionTextLabel}
        />
      </div>
    </div>
  );
};

export default CaseTextColumnLeft;
