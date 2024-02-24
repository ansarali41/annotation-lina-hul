import React, { useState, createContext } from "react";
import { fetchConfigVariable } from "../utils/handleConfigVars";

export const AppContext = createContext();
export const AppProvider = (props) => {
  const REACT_APP_general = fetchConfigVariable("REACT_APP_general");
  const getCasesCount = () => {
    let casesArray = JSON.parse(localStorage.getItem("CaseOrder"));
    return casesArray ? casesArray.length : 0;
  };

  const [disableNextButton, setDisableNextButton] = useState(false);
  const [casesCount, setCasesCount] = useState(0);

  const rootDirectory = fetchConfigVariable("REACT_APP_FIREBASE_ROOT_DIRECTORY");

  const value = {
    disableNextButton,
    setDisableNextButton,
    rootDirectory,
    casesCount,
    REACT_APP_general,
    setCasesCount,
    getCasesCount,
  };
  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};
