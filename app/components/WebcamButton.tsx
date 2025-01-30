"use client";

import React, { useRef, useEffect } from "react";

const WebcamButton = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const enableVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (err: unknown) {
        console.error(
          "Error accessing webcam:",
          err instanceof Error ? err.message : String(err)
        );
      }
    };

    enableVideo();

    return () => {
      // Cleanup function
      if (videoRef.current?.srcObject instanceof MediaStream) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
        // eslint-disable-next-line react-hooks/exhaustive-deps
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  return (
    <div className="h-dvh w-dvw flex justify-center items-center">
      <div className="relative p-4 rounded-3xl flex justify-center items-center gap-3">
        <div className="bg-gray-300 h-64 w-64 absolute rounded-3xl shadow-neutral-500 shadow-xl"></div>
        <button
          className="group cursor-pointer active:translate-y-[0.1rem] active:scale-[99%] transition duration-300 z-20 flex justify-center items-center relative h-12 w-36 rounded-full overflow-hidden"
          aria-label="Webcam preview"
        >
          <video
            ref={videoRef}
            className="absolute h-full w-full object-cover rounded-full"
            muted
            playsInline
            aria-hidden="true"
          />
          {/* Button layers */}
          <div className="h-full w-full rounded-full bg-gradient-to-b from-transparent via-black/30 to-transparent blur-[5px]"></div>
          <div className="z-50 h-4 w-[8.3rem] flex justify-center items-center rounded-full absolute top-[0.8px] overflow-hidden">
            <div className="absolute h-12 w-[8.7rem] rounded-full -bottom-[2rem] bg-gradient-to-b from-gray-200 to-transparent to-60%"></div>
          </div>
          {/* Rest of the button layers */}
          {/* <div className="h-full w-full rounded-full bg-linear-to-b from-transparent bg-black to-transparent blur-[5px]"></div> */}
          <div className="z-50 h-4 w-[8.3rem] flex justify-center items-center rounded-full absolute top-[0.8px] overflow-hidden">
            <div className="absolute h-12 w-[8.7rem] rounded-full -bottom-[2rem] bg-linear-to-b from-gray-200 to-60% to-transparent"></div>
          </div>
          {/* ... All other button layers from original code ... */}

          <h1 className="absolute z-50 text-white font-mono text-sm">
            Start Webinar
          </h1>
        </button>
        {/* Shadows */}
        <div className="absolute top-1/2 z-10 bg-gray-500 rounded-full h-12 w-36 blur-md"></div>
        <div className="absolute top-1/2 z-10 bg-gray-200 border-2 border-cyan-200 rounded-full h-11 w-28 blur-md"></div>
      </div>
    </div>
  );
};

export default WebcamButton;
