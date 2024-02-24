import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appContext";
import _ from "lodash";
import RankedImage from "../minor-components/rankedImage";
import getConfig from "../utils/handleStorageConfig";

const Summary = ({
  highlightAnswers,
  highlightClassName = "option",
  title,
  text,
  label,
  videoPlaceholderIconPath,
  audioPlaceholderIconPath,
  textPlaceholderIconPath,
}) => {
  const { casesCount } = useContext(AppContext);
  const pagesOrder = JSON.parse(localStorage.getItem("CaseOrder"));
  const [getAnswers, setAnswers] = useState({});

  useEffect(() => {
    const caseStudyAnswers = JSON.parse(localStorage.getItem("CaseStudyAnswers"));
    setAnswers(caseStudyAnswers);
  }, []);

  const imageClassName = (caseNumber, option) => {
    if (getAnswers !== null && getAnswers[caseNumber] !== undefined && highlightAnswers === true) {
      const answer = getAnswers[caseNumber];
      // highlight the option selected by the user
      if (answer[0] === option) {
        return "summary-scaled-image highlight-image";
      }
    }
    return "summary-scaled-image";
  };

  const storageConfig = getConfig();
  let caseImage = "";
  let caseImageA = "";
  let caseImageB = "";

  return (
    <div className="summary-wrapper">
      <h3>{title}</h3>
      <div className="summary-and-feedback-text-content">{text}</div>
      <div className="summary-cases-wrapper">
        <p className="summary-case-header">{label}</p>
        <p className="summary-case-header">A</p>
        <p className="summary-case-header">B</p>
      </div>

      {_.range(1, casesCount + 1)
        .map((item) => parseInt(item, 10))
        .map((item) => {
          const casePrefix = pagesOrder[item - 1].split("-")[0].toLowerCase();

          if (storageConfig.assetsStorageType === "local") {
            const validCaseFiles = JSON.parse(localStorage.getItem("ValidCaseFiles"));
            if (validCaseFiles && validCaseFiles[item - 1]) {
              const caseFiles = validCaseFiles[item - 1];
              if (casePrefix === "image") {
                caseImage = caseFiles[1];
                caseImageA = caseFiles[2];
                caseImageB = caseFiles[3];
              } else if (casePrefix === "hybrid") {
                caseImageA = caseFiles[1];
                caseImageB = caseFiles[2];
              }
            }
          } else if (storageConfig.assetsStorageType === "firebase") {
            caseImage = `/gallery/cases/${pagesOrder[item - 1]}/${pagesOrder[item - 1]}.png`;
            caseImageA = `/gallery/cases/${pagesOrder[item - 1]}/${pagesOrder[item - 1]}-a.png`;
            caseImageB = `/gallery/cases/${pagesOrder[item - 1]}/${pagesOrder[item - 1]}-b.png`;
          }

          return (
            <div key={item} className={"summary-case-answer case-" + casePrefix}>
              <div className={highlightClassName}>
                <span className="summary-case-label">{item}</span>
              </div>
              <div className={highlightClassName}>
                <RankedImage
                  path={
                    casePrefix === "video"
                      ? videoPlaceholderIconPath
                      : casePrefix === "text"
                      ? textPlaceholderIconPath
                      : casePrefix === "audio"
                      ? audioPlaceholderIconPath
                      : casePrefix === "hybrid"
                      ? videoPlaceholderIconPath
                      : caseImage
                  }
                  alternativeText={`case`}
                  wrapperClassName="summary-ranked-image-wrapper-summary"
                  className="summary-scaled-image"
                />
              </div>
              <div className={highlightClassName}>
                <RankedImage
                  path={
                    casePrefix === "video"
                      ? videoPlaceholderIconPath
                      : casePrefix === "text"
                      ? textPlaceholderIconPath
                      : casePrefix === "audio"
                      ? audioPlaceholderIconPath
                      : casePrefix === "hybrid"
                      ? caseImageA
                      : caseImageA
                  }
                  alternativeText={`A`}
                  wrapperClassName="summary-ranked-image-wrapper-summary"
                  className={imageClassName(item, "A")}
                />
              </div>
              <div className={highlightClassName}>
                <RankedImage
                  path={
                    casePrefix === "video"
                      ? videoPlaceholderIconPath
                      : casePrefix === "text"
                      ? textPlaceholderIconPath
                      : casePrefix === "audio"
                      ? audioPlaceholderIconPath
                      : casePrefix === "hybrid"
                      ? caseImageB
                      : caseImageB
                  }
                  alternativeText={`B`}
                  wrapperClassName="summary-ranked-image-wrapper-summary"
                  className={imageClassName(item, "B")}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Summary;
