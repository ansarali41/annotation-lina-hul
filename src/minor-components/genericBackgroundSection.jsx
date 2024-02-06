import React from "react";
import "./ParagraphWithList.css";
import GenericBackgroundSubSection from "./genericBackgroundSubSection";

const GenericBackgroundSection = ({
  sectionTitle,
  sectionText,
  sectionClassName = "background-section",
  sectionTitleClassName = "background-section-title",
  sectionTextClassName = "background-text-content",
  sectionContent,
}) => {
  return (
    <div className={sectionClassName}>
      <span className={sectionTitleClassName} dangerouslySetInnerHTML={{ __html: sectionTitle }}>
        {}
      </span>
      <p className={sectionTextClassName} dangerouslySetInnerHTML={{ __html: sectionText }}>
        {}
      </p>
      {sectionContent.map((e, index) => (
        <GenericBackgroundSubSection
          key={index}
          title={e.title}
          text={e.text}
          className={e.className}
          imagePath={e.imagePath}
          imageClassName={e.imageClassName}
          imageAlternativeText={e.imageAlternativeText}
          descriptionClassName={e.descriptionClassName}
          titleClassName={e.titleClassName}
          textClassName={e.textClassName}
        />
      ))}
    </div>
  );
};

export default GenericBackgroundSection;
