import React from "react";
import GenericVideoSection from "../minor-components/genericVideoSection";
const CaseHybridColumnLeft = ({
  className,
  title,
  text,
  textClassName,
  sectionVideoUrl,
  sectionClassName,
  sectionText,
  sectionTextClassName,
  sectionImageUrl,
  sectionImageAlternativeText,
  sectionImageClassName,
  sectionButtonClassName,
  sectionButtonDisabled,
  sectionButtonHasIcon,
  sectionButtonIconClassName,
  sectionButtonId,
  sectionButtonlabel,
  sectionButtonOnClick,
  sectionHasButton,
  sectionImageRank,
  sectionImageHasRank,
}) => {
  return (
    <div className={className}>
      <h4>{title}</h4>
      <p className={textClassName}>{text}</p>
      <div className={"case-hybrid-video-section-centered"}>
        <GenericVideoSection
          className={"case-hybrid-video-section-centered"}
          videoClassName={"case-hybrid-video"}
          hasButton={false}
          videoUrl={sectionVideoUrl}
          videoWidth="400px"
          videoHeight="225px"
        />
      </div>
    </div>
  );
};

export default CaseHybridColumnLeft;
