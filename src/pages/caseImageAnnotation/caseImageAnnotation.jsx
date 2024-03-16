import React, { useEffect, useContext, useState } from "react";
import { toastInfo } from "../../utils/toast";
import { AppContext } from "../../context/appContext";
import { listFiles } from "../../utils/firebase";
import { getCaseJsonFile } from "../../utils/urlHandler";
import CaseImageColumnMiddle from "../../major-components/caseImageColumnMiddle";
import CaseImageColumnleft from "../../major-components/caseImageColumnLeft";
import CaseImageColumnRight from "../../major-components/caseImageColumnRight";
import Modal from "@mui/material/Modal";
import Popup from "../../minor-components/popup";
import "../../assets/css/caseImage.css";
import "../../assets/css/common.css";
import getConfig from "../../utils/handleStorageConfig";
import { fetchJsonAttributeValue } from "../../utils/loadAssets";
import CaseImageAnnotationColumnLeft from "../../major-components/caseImageAnnotationColumnLeft";
import FeedbackForm from "../../major-components/feedbackForm";

const CaseImageAnnotation = ({
  caseId,
  totalCases,
  REACT_APP_caseImageAnnotation,
  REACT_APP_summaryAndFeedback,
}) => {
  const [caseDescription, setCaseDescription] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [openedChoiceA, setOpenedChoiceA] = useState(false);
  const [openedChoiceB, setOpenedChoiceB] = useState(false);
  const [openChoiceA, setOpenChoiceA] = useState(false);
  const [openChoiceB, setOpenChoiceB] = useState(false);
  const [casePageType] = useState("ranking");
  const [galleryImages, setGalleryImages] = useState([]);
  const { rootDirectory, disableNextButton, setDisableNextButton, REACT_APP_general } =
    useContext(AppContext);
  const empty = `/gallery/empty-white.png`;
  const [first, setFirst] = useState(empty);
  const [second, setSecond] = useState(empty);
  const pagesOrder = JSON.parse(localStorage.getItem("CaseOrder"));
  let choiceAHighRes = "";
  let choiceBHighRes = "";
  let choiceAThumbnail = "";
  let choiceBThumbnail = "";
  let originalThumbnail = "";
  let originalHighRes = "";

  const storageConfig = getConfig();
  if (storageConfig.assetsStorageType === "local") {
    const validCaseFiles = JSON.parse(localStorage.getItem("ValidCaseFiles"));
    if (validCaseFiles && validCaseFiles[caseId - 1]) {
      const caseFiles = validCaseFiles[caseId - 1];
      choiceAHighRes = caseFiles[2];
      choiceBHighRes = caseFiles[3];
      choiceAThumbnail = caseFiles[2];
      choiceBThumbnail = caseFiles[3];
      originalThumbnail = caseFiles[1];
      originalHighRes = caseFiles[1];
    }
  } else if (storageConfig.assetsStorageType === "firebase") {
    // the following file extensions will actually be overwritten in firebase.js
    choiceAHighRes = `/gallery/cases/${pagesOrder[caseId - 1]}/${pagesOrder[caseId - 1]}-a.png`;
    choiceBHighRes = `/gallery/cases/${pagesOrder[caseId - 1]}/${pagesOrder[caseId - 1]}-b.png`;
    choiceAThumbnail = `/gallery/cases/${pagesOrder[caseId - 1]}/${pagesOrder[caseId - 1]}-a.png`;
    choiceBThumbnail = `/gallery/cases/${pagesOrder[caseId - 1]}/${pagesOrder[caseId - 1]}-b.png`;
    originalThumbnail = `/gallery/cases/${pagesOrder[caseId - 1]}/${pagesOrder[caseId - 1]}.png`;
    originalHighRes = `/gallery/cases/${pagesOrder[caseId - 1]}/${pagesOrder[caseId - 1]}.png`;
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

    (async () => {
      const caseUuid = pagesOrder[caseId - 1];

      let jsonPath = "";
      if (storageConfig.assetsStorageType === "local") {
        const validCaseFiles = JSON.parse(localStorage.getItem("ValidCaseFiles"));
        if (validCaseFiles && validCaseFiles[caseId - 1]) {
          const caseFiles = validCaseFiles[caseId - 1];
          jsonPath = caseFiles[0];
        }
      } else if (storageConfig.assetsStorageType === "firebase") {
        jsonPath = getCaseJsonFile(rootDirectory, caseUuid);

        let gallery = await listFiles(
          `/gallery/cases/${pagesOrder[caseId - 1]}/`,
          REACT_APP_caseImageAnnotation["caseImageColumnMiddle"].popupB["gallerySubstring"]
        );
        setGalleryImages(gallery);
      }
      setCaseDescription(await fetchJsonAttributeValue(jsonPath, "description"));
    })();
    return () => {
      setSubscribed(false);
    };
  }, [
    caseId,
    disableNextButton,
    setDisableNextButton,
    REACT_APP_caseImageAnnotation,
    choiceAThumbnail,
    choiceBThumbnail,
    empty,
    pagesOrder,
    rootDirectory,
    openedChoiceA,
    openedChoiceB,
    setOpenedChoiceA,
    setOpenedChoiceB,
    setSubscribed,
    storageConfig.assetsStorageType,
  ]);

  const selectAsFirst = (choice) => {
    const caseImageViewDetailsMandatory = REACT_APP_general["caseImageViewDetailsMandatory"];

    if (
      caseImageViewDetailsMandatory === true &&
      first === empty &&
      (openedChoiceA === false || openedChoiceB === false)
    ) {
      //Show warning only when we don't have a ranking AND  at least one of the flags is still set to false.
      toastInfo("Please see both explanations.", "top-center", "select-error");
    } else if (
      caseImageViewDetailsMandatory === false ||
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
    <div className="case-image-section-wrapper">
      <CaseImageAnnotationColumnLeft
        title={`${REACT_APP_caseImageAnnotation["caseImageColumnLeft"].label} ${caseId}/${totalCases}`}
        text={caseDescription}
        sectionImageUrl={originalHighRes}
        className="case-image-annotation-column"
        textClassName="case-image-background-text"
        sectionImageClassName="case-image-image-wrapper"
        sectionButtonClassName="btn control"
      />
      <FeedbackForm
        title={REACT_APP_summaryAndFeedback["feedbackForm"].title}
        text={REACT_APP_summaryAndFeedback["feedbackForm"].text}
        feedbackFormQuestions={REACT_APP_summaryAndFeedback["feedbackForm"].feedbackFormQuestions}
      />
      {/* <CaseImageColumnMiddle
        title={REACT_APP_caseImageAnnotation["caseImageColumnMiddle"].title}
        text={REACT_APP_caseImageAnnotation["caseImageColumnMiddle"].text}
        className="case-image-column"
        textClassName="case-image-background-text"
        leftSectionClassName="case-image-alternative-section"
        leftSectionImageUrl={choiceAThumbnail}
        leftSectionImageClassName="case-image-column-middle-image"
        leftSectionTitle={REACT_APP_caseImageAnnotation["caseImageColumnMiddle"].leftSectionTitle}
        leftSectionButtonClassName="btn control"
        leftSectionButtonlabel={
          REACT_APP_caseImageAnnotation["caseImageColumnMiddle"].leftSectionButtonlabel
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
          REACT_APP_caseImageAnnotation["caseImageColumnMiddle"].leftSectionTextWithIconsLabel
        }
        leftSectionTextWithIconsHasRightIcon={true}
        leftSectionTextWithIconsRightIconClassName="fa fa-check viewed"
        leftSectionShowTextWithIcons={openedChoiceA === true}
        leftSectionTextWithIconsClassName="case-image-text-with-icons"
        rightSectionClassName="case-image-alternative-section"
        rightSectionButtonClassName="btn control"
        rightSectionButtonlabel={
          REACT_APP_caseImageAnnotation["caseImageColumnMiddle"].rightSectionButtonlabel
        }
        rightSectionImageUrl={choiceBThumbnail}
        rightSectionImageClassName="case-image-column-middle-image"
        rightSectionTitle={REACT_APP_caseImageAnnotation["caseImageColumnMiddle"].rightSectionTitle}
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
          REACT_APP_caseImageAnnotation["caseImageColumnMiddle"].rightSectionTextWithIconsLabel
        }
        rightSectionTextWithIconsHasRightIcon={true}
        rightSectionTextWithIconsRightIconClassName="fa fa-check viewed"
        rightSectionShowTextWithIcons={openedChoiceB === true}
        rightSectionTextWithIconsClassName="case-image-text-with-icons"
      />
      <Modal className="case-image-modal" open={openChoiceA} onClose={() => setOpenChoiceA(false)}>
        <Popup
          onCloseIconClick={() => setOpenChoiceA(false)}
          mainTitle={REACT_APP_caseImageAnnotation["caseImageColumnMiddle"].popupA["mainTitle"]}
          leftImageHighResUrl={originalHighRes}
          leftImageThumbnailUrl={originalThumbnail}
          leftImageTitle={
            REACT_APP_caseImageAnnotation["caseImageColumnMiddle"].popupA["leftImageTitle"]
          }
          rightImageHighResUrl={choiceAHighRes}
          rightImageThumbnailUrl={choiceAThumbnail}
          rightImageTitle={
            REACT_APP_caseImageAnnotation["caseImageColumnMiddle"].popupA["rightImageTitle"]
          }
          descriptionTitle={
            REACT_APP_caseImageAnnotation["caseImageColumnMiddle"].popupA["descriptionTitle"]
          }
          descriptionText={
            REACT_APP_caseImageAnnotation["caseImageColumnMiddle"].popupA["descriptionText"]
          }
          popupType="withoutGallery"
        />
      </Modal>
      <Modal className="case-image-modal" open={openChoiceB} onClose={() => setOpenChoiceB(false)}>
        <Popup
          onCloseIconClick={() => setOpenChoiceB(false)}
          mainTitle={REACT_APP_caseImageAnnotation["caseImageColumnMiddle"].popupB["mainTitle"]}
          leftImageHighResUrl={originalHighRes}
          leftImageThumbnailUrl={originalThumbnail}
          leftImageTitle={
            REACT_APP_caseImageAnnotation["caseImageColumnMiddle"].popupB["leftImageTitle"]
          }
          rightImageHighResUrl={choiceBHighRes}
          rightImageThumbnailUrl={choiceBThumbnail}
          rightImageTitle={
            REACT_APP_caseImageAnnotation["caseImageColumnMiddle"].popupB["rightImageTitle"]
          }
          descriptionTitle={
            REACT_APP_caseImageAnnotation["caseImageColumnMiddle"].popupB["descriptionTitle"]
          }
          descriptionText={
            REACT_APP_caseImageAnnotation["caseImageColumnMiddle"].popupB["descriptionText"]
          }
          popupType="withGallery"
          galleryImages={galleryImages}
        />
      </Modal> */}
      {/* {casePageType === "ranking" && (
        <CaseImageColumnRight
          className="case-image-column"
          title={
            REACT_APP_caseImageAnnotation &&
            REACT_APP_caseImageAnnotation["caseImageColumnRight"].title
          }
          text={
            REACT_APP_caseImageAnnotation &&
            REACT_APP_caseImageAnnotation["caseImageColumnRight"].text
          }
          textClassName="case-image-background-text"
          topSectionClassName="case-image-generic-image-section"
          topSectionImageUrl={first}
          topSectionImageClassName="case-image-column-right-image"
          topSectionImageHasRank={true}
          topSectionImageRank={1}
          bottomSectionClassName="case-image-generic-image-section"
          bottomSectionImageUrl={second}
          bottomSectionImageClassName="case-image-column-right-image"
          bottomSectionImageHasRank={true}
          bottomSectionImageRank={2}
        />
      )} */}
    </div>
  );
};

export default CaseImageAnnotation;
