import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../context/appContext";
import Modal from "@mui/material/Modal";
import CaseHybridColumnLeft from "../major-components/caseHybridColumnLeft";
import CaseHybridColumnMiddle from "../major-components/caseHybridColumnMiddle";
import CaseHybridColumnRight from "../major-components/caseHybridColumnRight";
import Popup from "../minor-components/popup";
import "../assets/css/caseHybrid.css";
import { toastInfo } from "../utils/toast";
import getConfig from "../utils/handleStorageConfig";

const CaseHybrid = ({ caseId, totalCases, REACT_APP_caseHybrid }) => {
  const [subscribed, setSubscribed] = useState(false);
  const [openedChoiceA, setOpenedChoiceA] = useState(false);
  const [openedChoiceB, setOpenedChoiceB] = useState(false);
  const [openChoiceA, setOpenChoiceA] = useState(false);
  const [openChoiceB, setOpenChoiceB] = useState(false);
  const [casePageType] = useState("ranking");

  const { disableNextButton, setDisableNextButton, REACT_APP_general } = useContext(AppContext);
  const empty = `/gallery/empty-white.png`;
  const [first, setFirst] = useState(empty);
  const [second, setSecond] = useState(empty);
  const pagesOrder = JSON.parse(localStorage.getItem("CaseOrder"));

  let videoUrl = "";
  let choiceAHighRes = "";
  let choiceBHighRes = "";
  let choiceAThumbnail = "";
  let choiceBThumbnail = "";

  const storageConfig = getConfig();
  if (storageConfig.assetsStorageType === "local") {
    const validCaseFiles = JSON.parse(localStorage.getItem("ValidCaseFiles"));
    if (validCaseFiles && validCaseFiles[caseId - 1]) {
      const caseFiles = validCaseFiles[caseId - 1];
      videoUrl = caseFiles[0];
      choiceAHighRes = caseFiles[1];
      choiceBHighRes = caseFiles[2];
      choiceAThumbnail = caseFiles[1];
      choiceBThumbnail = caseFiles[2];
    }
  } else if (storageConfig.assetsStorageType === "firebase") {
    // the following file extensions will actually be overwritten in firebase.js
    videoUrl = `/gallery/cases/${pagesOrder[caseId - 1]}/${pagesOrder[caseId - 1]}.mp4`;
    choiceAHighRes = `/gallery/cases/${pagesOrder[caseId - 1]}/${pagesOrder[caseId - 1]}-a.png`;
    choiceBHighRes = `/gallery/cases/${pagesOrder[caseId - 1]}/${pagesOrder[caseId - 1]}-b.png`;
    choiceAThumbnail = `/gallery/cases/${pagesOrder[caseId - 1]}/${pagesOrder[caseId - 1]}-a.png`;
    choiceBThumbnail = `/gallery/cases/${pagesOrder[caseId - 1]}/${pagesOrder[caseId - 1]}-b.png`;
  }

  useEffect(() => {
    setDisableNextButton(true);
    setSubscribed(true);

    const CaseStudyAnswers = JSON.parse(localStorage.getItem("CaseStudyAnswers"));
    if (CaseStudyAnswers && CaseStudyAnswers[caseId]) {
      setDisableNextButton(false);

      if (CaseStudyAnswers[caseId] && CaseStudyAnswers[caseId][0] === "A") {
        setFirst(choiceAThumbnail);
        setSecond(choiceBThumbnail);
      } else if (CaseStudyAnswers[caseId] && CaseStudyAnswers[caseId][0] === "B") {
        setFirst(choiceBThumbnail);
        setSecond(choiceAThumbnail);
      }
    } else {
      setFirst(empty);
      setSecond(empty);
      setDisableNextButton(true);
    }

    return () => {
      setSubscribed(false);
    };
  }, [
    caseId,
    disableNextButton,
    setDisableNextButton,
    choiceAThumbnail,
    choiceBThumbnail,
    empty,
    setSubscribed,
  ]);

  const selectAsFirst = (choice) => {
    const caseHybridViewDetailsMandatory = REACT_APP_general["caseHybridViewDetailsMandatory"];

    if (
      caseHybridViewDetailsMandatory === true &&
      first === empty &&
      (openedChoiceA === false || openedChoiceB === false)
    ) {
      //Show warning only when we don't have a ranking AND  at least one of the flags is still set to false.
      toastInfo("Please see both explanations.", "top-center", "select-error");
    } else if (
      caseHybridViewDetailsMandatory === false ||
      first !== empty ||
      (openedChoiceA === true && openedChoiceB === true)
    ) {
      const CaseStudyAnswers = JSON.parse(localStorage.getItem("CaseStudyAnswers"));
      const newAnswers = { ...CaseStudyAnswers };
      if (choice === "choiceA") {
        newAnswers[caseId] = ["A", "B"];
        setFirst(choiceAThumbnail);
        setSecond(choiceBThumbnail);
      } else {
        newAnswers[caseId] = ["B", "A"];
        setFirst(choiceBThumbnail);
        setSecond(choiceAThumbnail);
      }

      localStorage.setItem("CaseStudyAnswers", JSON.stringify(newAnswers));
      setDisableNextButton(false);
    }
  };
  return (
    <div className="case-hybrid-section-wrapper">
      <CaseHybridColumnLeft
        title={`${REACT_APP_caseHybrid["caseHybridColumnLeft"].label} ${caseId}/${totalCases}`}
        text="This is a sample video clip showing a goal event."
        className="case-hybrid-column"
        textClassName="case-hybrid-text-content-left"
        sectionVideoUrl={videoUrl}
        sectionImageClassName="case-hybrid-image-wrapper"
        sectionButtonClassName="btn control"
      />
      <CaseHybridColumnMiddle
        title={REACT_APP_caseHybrid["caseHybridColumnMiddle"].title}
        text={REACT_APP_caseHybrid["caseHybridColumnMiddle"].text}
        className="case-hybrid-column"
        textClassName="case-hybrid-text"
        leftSectionClassName="case-hybrid-alternative-section"
        leftSectionImageUrl={choiceAThumbnail}
        leftSectionImageClassName="case-hybrid-column-middle-image"
        leftSectionTitle={REACT_APP_caseHybrid["caseHybridColumnMiddle"].leftSectionTitle}
        leftSectionButtonClassName="btn control"
        leftSectionButtonlabel={
          REACT_APP_caseHybrid["caseHybridColumnMiddle"].leftSectionButtonlabel
        }
        leftSectionImageOnClick={() => {
          selectAsFirst("choiceA");
        }}
        leftSectionButtonOnClick={() => {
          setOpenChoiceA(true);
          setOpenedChoiceA(true);
        }}
        leftSectionHasButton={true}
        leftSectionTextWithIconsHasLeftIcon={false}
        leftSectionTextWithIconsLabel={
          REACT_APP_caseHybrid["caseHybridColumnMiddle"].leftSectionTextWithIconsLabel
        }
        leftSectionTextWithIconsHasRightIcon={true}
        leftSectionTextWithIconsRightIconClassName="fa fa-check viewed"
        leftSectionShowTextWithIcons={openedChoiceA === true}
        leftSectionTextWithIconsClassName="case-hybrid-text-with-icons"
        rightSectionClassName="case-hybrid-alternative-section"
        rightSectionButtonClassName="btn control"
        rightSectionButtonlabel={
          REACT_APP_caseHybrid["caseHybridColumnMiddle"].rightSectionButtonlabel
        }
        rightSectionImageUrl={choiceBThumbnail}
        rightSectionImageClassName="case-hybrid-column-middle-image"
        rightSectionTitle={REACT_APP_caseHybrid["caseHybridColumnMiddle"].rightSectionTitle}
        rightSectionButtonOnClick={() => {
          setOpenChoiceB(true);
          setOpenedChoiceB(true);
        }}
        rightSectionHasButton={true}
        rightSectionImageOnClick={() => {
          selectAsFirst("choiceB");
        }}
        rightSectionTextWithIconsHasLeftIcon={false}
        rightSectionTextWithIconsLabel={
          REACT_APP_caseHybrid["caseHybridColumnMiddle"].rightSectionTextWithIconsLabel
        }
        rightSectionTextWithIconsHasRightIcon={true}
        rightSectionTextWithIconsRightIconClassName="fa fa-check viewed"
        rightSectionShowTextWithIcons={openedChoiceB === true}
        rightSectionTextWithIconsClassName="case-hybrid-text-with-icons"
      />
      <Modal className="modal" open={openChoiceA} onClose={() => setOpenChoiceA(false)}>
        <Popup
          onCloseIconClick={() => setOpenChoiceA(false)}
          title={REACT_APP_caseHybrid["caseHybridColumnMiddle"].popupA["mainTitle"]}
          imageUrl={choiceAHighRes}
          popupType="basic"
        />
      </Modal>
      <Modal className="modal" open={openChoiceB} onClose={() => setOpenChoiceB(false)}>
        <Popup
          onCloseIconClick={() => setOpenChoiceB(false)}
          title={REACT_APP_caseHybrid["caseHybridColumnMiddle"].popupB["mainTitle"]}
          imageUrl={choiceBHighRes}
          popupType="basic"
        />
      </Modal>
      {casePageType === "ranking" && (
        <CaseHybridColumnRight
          className="case-hybrid-column"
          title={REACT_APP_caseHybrid && REACT_APP_caseHybrid["caseHybridColumnRight"].title}
          text={REACT_APP_caseHybrid && REACT_APP_caseHybrid["caseHybridColumnRight"].text}
          textClassName="case-hybrid-text"
          topSectionClassName="case-hybrid-generic-image-section"
          topSectionImageUrl={first}
          topSectionImageClassName="case-hybrid-column-right-image"
          topSectionImageHasRank={true}
          topSectionImageRank={1}
          bottomSectionClassName="case-hybrid-generic-image-section"
          bottomSectionImageUrl={second}
          bottomSectionImageClassName="case-hybrid-column-right-image"
          bottomSectionImageHasRank={true}
          bottomSectionImageRank={2}
        />
      )}
    </div>
  );
};

export default CaseHybrid;
