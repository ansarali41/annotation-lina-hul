import React, { useEffect, useState } from "react";
import TextHighlight from "../../major-components/textHighlight";
import { getAsset } from "../../utils/loadAssets";

const RankedText = ({ url, className, label, scrollClassName }) => {
  const [textContent, setTextContent] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    setSubscribed(true);

    (async () => {
      const textUrl = await getAsset(url);
      const fetchText = async () => {
        try {
          const response = await fetch(textUrl);
          const text = await response.text();
          setTextContent(text);
        } catch (error) {
          console.error("Error fetching text:", error);
        }
      };

      fetchText();
    })();

    return () => setSubscribed(false);
  }, [url, subscribed]);

  return (
    <div>
      <TextHighlight
        classNam={className}
        title={label}
        text={textContent}
        textClassName={scrollClassName}
        isConvertNewLine={true}
      />
    </div>
  );
};

export default RankedText;
