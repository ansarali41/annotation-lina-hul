import React from "react";
import GenericImageSection from "../minor-components/genericImageSection";
import TextHighlight from "./textHighlight";

const CaseTextColumnRight = ({
  className,
  title,
  text,
  textClassName,
  topSectionImageHasRank,
  topSectionImageRank,
  topSectionImageClassName,
  topSectionClassName,
  bottomSectionClassName,
  bottomSectionImageHasRank,
  bottomSectionImageRank,
  bottomSectionImageClassName,
  topSectionTextRankClassName,
  bottomSectionTextRankClassName,
  topSectionImageHasTextRank,
  topSectionImageRankText,
  bottomSectionImageHasTextRank,
  bottomSectionImageRankText,
}) => {
  return (
    <div className={className}>
      <TextHighlight
        classNam={className}
        title={title}
        text={text}
        textClassName={textClassName}
        isConvertNewLine={false}
      />
      <div className="text-ranking-wrapper">
        <GenericImageSection
          imageClassName={topSectionImageClassName}
          className={topSectionClassName}
          imageHasRank={topSectionImageHasRank}
          imageRank={topSectionImageRank}
          imageHasTextRank={topSectionImageHasTextRank}
          imageRankText={topSectionImageRankText}
          textRankClassName={topSectionTextRankClassName}
        />
        <GenericImageSection
          imageClassName={bottomSectionImageClassName}
          className={bottomSectionClassName}
          imageHasRank={bottomSectionImageHasRank}
          imageRank={bottomSectionImageRank}
          imageHasTextRank={bottomSectionImageHasTextRank}
          imageRankText={bottomSectionImageRankText}
          textRankClassName={bottomSectionTextRankClassName}
        />
      </div>
    </div>
  );
};

export default CaseTextColumnRight;
