import React, { useEffect } from "react";
import "../assets/css/end.css";

const End = ({
  history,
  endMessage = "Thank you for participating in our survey!",
  title,
  REACT_APP_end,
}) => {
  useEffect(() => {
    setTimeout(() => {
      localStorage.clear();
      history.replace("/");
    }, REACT_APP_end && REACT_APP_end["redirectTimeout"]);
  });
  return (
    <div className="end-welcome">
      <div className="end-header">
        <h2>{REACT_APP_end && REACT_APP_end["title"]}</h2>
      </div>
      <span className="end-message">{REACT_APP_end && REACT_APP_end["endMessage"]}</span>
    </div>
  );
};

export default End;
