import React, { useState } from "react";
import RankedImage from "./rankedImage";

const PopupWithGallery = React.forwardRef(
  (
    {
      mainTitle,
      leftImageHighResUrl,
      leftImageThumbnailUrl,
      leftImageTitle,
      rightImageHighResUrl,
      rightImageThumbnailUrl,
      rightImageTitle,
      descriptionTitle,
      descriptionText,
      onCloseIconClick,
      galleryImages,
    },
    ref
  ) => {
    const [preview, setPreview] = useState(leftImageHighResUrl);

    return (
      <div tabIndex={-1} ref={ref} className="modal-detail-container">
        <div className="modal-detail-header">
          <h4>{mainTitle}</h4>
          <i onClick={onCloseIconClick} className="fa fa-lg fa-close close"></i>
        </div>{" "}
        <div className="modal-detail-body">
          <div className="modal-detail-body-row">
            <RankedImage path={preview} className="case-image-popup-image-large" />

            <div className="modal-detail-text-content">
              <div className="original-vs-explanation">
                <div className="custom-wrapper">
                  <h5>{leftImageTitle}</h5>
                  <RankedImage
                    onClick={() => setPreview(leftImageHighResUrl)}
                    path={leftImageThumbnailUrl}
                    className="case-image-popup-image-small"
                  />
                </div>
                <div className="custom-wrapper">
                  <h5>{rightImageTitle}</h5>
                  <RankedImage
                    onClick={() => setPreview(rightImageHighResUrl)}
                    path={rightImageThumbnailUrl}
                    className="case-image-popup-image-small"
                  />
                </div>
              </div>
              <div className="case-image-popup-description">
                <h5>{descriptionTitle}</h5>
                <p>{descriptionText}</p>
              </div>
            </div>
          </div>
          <h5>Similar Images:</h5>
          <div className="gallery">
            {galleryImages &&
              galleryImages.map((e, index) => (
                <RankedImage
                  key={index}
                  onClick={() => setPreview(e.replace("thumbnails", "originals"))}
                  className="gallery-image"
                  index={index}
                  path={e}
                />
              ))}
          </div>
        </div>
      </div>
    );
  }
);

export default PopupWithGallery;
