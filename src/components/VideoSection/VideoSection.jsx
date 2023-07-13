import React, { useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import "./VideoSection.css";

const VideoSection = () => {
  const playerRef = useRef(null);

  useEffect(() => {
    if (playerRef.current && playerRef.current.wrapper) {
      playerRef.current.wrapper.focus();
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center py-10 px-6 bg-[#FFFAE9]">
      <h1 className="text-3xl md:text-6xl font-extrabold p-2">
        What We Give You
      </h1>
      <p className="text-[#666270] p-2 text-lg md:text-xl md:text-center md:max-w-xl">
        Building a next-generation collaborative platform to connect renters,
        homeowners, and agents.
      </p>
      <div className="video-container">
        <div className="aspect-w-16 aspect-h-9">
          <ReactPlayer
            ref={playerRef}
            url={"/videos/hs.mp4"}
            controls={true}
            playing={true}
            className="react-player"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
