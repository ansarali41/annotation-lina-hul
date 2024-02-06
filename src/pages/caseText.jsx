import React, { useEffect, useState, useContext } from "react";
import CaseTextColumnLeft from "../major-components/caseTextColumnLeft";
import CaseTextColumnRight from "../major-components/caseTextColumnRight";
import { AppContext } from "../context/appContext";
import "../assets/css/caseText.css";
import getConfig from "../utils/handleStorageConfig";

const CaseText = ({ REACT_APP_caseText, caseId, totalCases }) => {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const pagesOrder = JSON.parse(localStorage.getItem("CaseOrder"));
  const { disableNextButton, setDisableNextButton } = useContext(AppContext);
  const storageConfig = getConfig();
  let choiceA = "";
  let choiceB = "";
  if (storageConfig.assetsStorageType === "local") {
    const validCaseFiles = JSON.parse(localStorage.getItem("ValidCaseFiles"));
    if (validCaseFiles && validCaseFiles[caseId - 1]) {
      const caseFiles = validCaseFiles[caseId - 1];
      choiceA = caseFiles[0];
      choiceB = caseFiles[1];
    }
  } else if (storageConfig.assetsStorageType === "firebase") {
    // the following file extensions will actually be overwritten in firebase.js
    choiceA = `/gallery/cases/${pagesOrder[caseId - 1]}/${pagesOrder[caseId - 1]}-a.txt`;
    choiceB = `/gallery/cases/${pagesOrder[caseId - 1]}/${pagesOrder[caseId - 1]}-b.txt`;
  }

  useEffect(() => {
    const CaseStudyAnswers = JSON.parse(localStorage.getItem("CaseStudyAnswers"));
    if (CaseStudyAnswers && CaseStudyAnswers[caseId]) {
      setDisableNextButton(false);

      if (CaseStudyAnswers[caseId] && CaseStudyAnswers[caseId][0] === "A") {
        setFirst("A");
        setSecond("B");
      } else if (CaseStudyAnswers[caseId] && CaseStudyAnswers[caseId][0] === "B") {
        setFirst("B");
        setSecond("A");
      }
    } else {
      setFirst("");
      setSecond("");
      setDisableNextButton(true);
    }
  }, [caseId, disableNextButton, setDisableNextButton]);
  const selectAsFirst = (choice) => {
    const CaseStudyAnswers = JSON.parse(localStorage.getItem("CaseStudyAnswers"));
    const newAnswers = { ...CaseStudyAnswers };

    if (choice === "Text A") {
      newAnswers[caseId] = ["A", "B"];
      setFirst("A");
      setSecond("B");
    } else {
      newAnswers[caseId] = ["B", "A"];
      setFirst("B");
      setSecond("A");
    }
    localStorage.setItem("CaseStudyAnswers", JSON.stringify(newAnswers));
    setDisableNextButton(false);
  };
  return (
    <div className="text-sections-wrapper">
      <CaseTextColumnLeft
        title={`${REACT_APP_caseText["caseTextColumnLeft"].label} ${caseId}/${totalCases}`}
        className="text-survey-box-left"
        textClassName="text-background-content"
        scrollClassName="scroll-text"
        sectionTextAUrl={choiceA}
        sectionTextBUrl={choiceB}
        sectionTextClassName="text"
        rightSectionTextLabel={REACT_APP_caseText["caseTextColumnLeft"].rightSectionTextLabel}
        leftSectionTextLabel={REACT_APP_caseText["caseTextColumnLeft"].leftSectionTextLabel}
        rightSectionButtonOnClick={() => {
          selectAsFirst("Text B");
        }}
        leftSectionButtonOnClick={() => {
          selectAsFirst("Text A");
        }}
        sectionButtonlabel={REACT_APP_caseText["caseTextColumnLeft"].sectionButtonlabel}
        sectionButtonClassName="btn control"
        sectionHasButton={true}
        sectionClassName={"section-class"}
      />
      <CaseTextColumnRight
        className="text-survey-box-right"
        title={REACT_APP_caseText["caseTextColumnRight"].title}
        text={REACT_APP_caseText["caseTextColumnRight"].text}
        textClassName="text-background-content"
        topSectionImageHasRank={true}
        topSectionImageRank={1}
        topSectionImageClassName="text-scaled-image-fit-height"
        topSectionClassName="text-generic-image-section"
        bottomSectionClassName="text-generic-image-section"
        bottomSectionImageHasRank={true}
        bottomSectionImageRank={2}
        bottomSectionImageClassName="text-scaled-image-fit-height"
        topSectionTextRankClassName="text-text-rank-section"
        bottomSectionTextRankClassName="text-text-rank-section"
        topSectionImageHasTextRank={true}
        topSectionImageRankText={first}
        bottomSectionImageHasTextRank={true}
        bottomSectionImageRankText={second}
      />
    </div>
  );
};

export default CaseText;
