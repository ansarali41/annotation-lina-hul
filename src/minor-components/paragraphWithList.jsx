import React, { useEffect, useState } from "react";
import "./ParagraphWithList.css";

const ParagraphWithList = ({
  className,
  listClassName,
  listOptions,
  listItemClassName,
  textBefore,
  textAfter,
  textClassName,
}) => {
  const [TextBefore, setTextBefore] = useState("");
  const [TextAfter, setTextAfter] = useState("");

  useEffect(() => {
    setTextBefore(textBefore);
    setTextAfter(textAfter);
  }, [textBefore, textAfter]);

  return (
    <div className={className}>
      <p className={textClassName} dangerouslySetInnerHTML={{ __html: TextBefore + TextAfter }}></p>
      <ul className={listClassName}>
        {listOptions &&
          listOptions.map((item, index) => (
            <li className={listItemClassName} key={index} onClick={() => handleHighlight(item)}>
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ParagraphWithList;
