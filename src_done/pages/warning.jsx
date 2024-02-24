import React from "react";
import "../assets/css/warning.css";

const Warning = ({ REACT_APP_warning }) => {
  return (
    <div className="warning-welcome">
      <div className="warning-header">
        <h2>{REACT_APP_warning && REACT_APP_warning["title"]}</h2>
      </div>
      <span className="warning-message">
        {REACT_APP_warning && REACT_APP_warning["warningMessage"]}
      </span>
    </div>
  );
};

export default Warning;
