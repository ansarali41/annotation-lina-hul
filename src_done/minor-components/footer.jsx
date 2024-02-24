import FooterFixedContent from "./footerFixedContent";
import GenericButton from "./genericButton";
import { useContext } from "react";
import { AppContext } from "../context/appContext";

const Footer = ({
  disableLeftButton,
  disableRightButton,
  leftButtonClassName,
  leftButtonLabel,
  onLeftButtonClick,
  onRightButtonClick,
  rightButtonClassName,
  rightButtonLabel,
}) => {
  // read the general config from the context; if it's not there, use empty strings
  const { REACT_APP_general } = useContext(AppContext);
  const { footer } = REACT_APP_general || {};
  const { label, icon1ClassName, icon2ClassName, icon1Url, icon2Url } = footer || "";

  return (
    <footer>
      <div className="controls">
        <GenericButton
          className={leftButtonClassName}
          disabled={disableLeftButton}
          label={leftButtonLabel}
          onClick={onLeftButtonClick}
        />
        <FooterFixedContent
          label={label}
          icon1ClassName={icon1ClassName}
          icon2ClassName={icon2ClassName}
          icon1Url={icon1Url}
          icon2Url={icon2Url}
        />
        <GenericButton
          className={rightButtonClassName}
          disabled={disableRightButton}
          label={rightButtonLabel}
          onClick={onRightButtonClick}
        />
      </div>
    </footer>
  );
};

export default Footer;
