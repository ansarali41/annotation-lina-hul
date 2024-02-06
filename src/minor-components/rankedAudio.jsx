import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { getAsset } from "../utils/loadAssets";

const RankedAudio = ({ url, width, height, className, label }) => {
  const [audioUrl, setAudioUrl] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  useEffect(() => {
    setSubscribed(true);
    (async () => {
      const audioUrl = await getAsset(url);
      setAudioUrl(audioUrl);
    })();
    return () => setSubscribed(false);
  }, [url, subscribed]);
  return (
    <div className={className}>
      <span className="audio-label">{label}</span>
      <ReactPlayer width={width} height={height} controls url={audioUrl} />
    </div>
  );
};

export default RankedAudio;
