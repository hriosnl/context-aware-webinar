"use client";

import { useState, useEffect, useRef } from "react";

export default function Meeting() {
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const jitsiContainerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const jitsiApiRef = useRef<any>(null);

  useEffect(() => {
    const loadJitsiScript = () => {
      const script = document.createElement("script");
      script.src =
        "https://8x8.vc/vpaas-magic-cookie-9ea6a2e7343f4270a46a31f8b731a112/external_api.js";
      script.async = true;
      script.onload = initializeJitsi;
      document.body.appendChild(script);
    };

    const initializeJitsi = () => {
      if (!jitsiContainerRef.current) return;

      const options = {
        roomName: "simple-meeting-room",
        parentNode: jitsiContainerRef.current,
        configOverwrite: {
          startWithAudioMuted: false,
          startWithVideoMuted: false,
        },
        jwt: "eyJraWQiOiJ2cGFhcy1tYWdpYy1jb29raWUtOWVhNmEyZTczNDNmNDI3MGE0NmEzMWY4YjczMWExMTIvYzJkYzgyLVNBTVBMRV9BUFAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJqaXRzaSIsImlzcyI6ImNoYXQiLCJpYXQiOjE3MzgwMzI2NTIsImV4cCI6MTczODAzOTg1MiwibmJmIjoxNzM4MDMyNjQ3LCJzdWIiOiJ2cGFhcy1tYWdpYy1jb29raWUtOWVhNmEyZTczNDNmNDI3MGE0NmEzMWY4YjczMWExMTIiLCJjb250ZXh0Ijp7ImZlYXR1cmVzIjp7ImxpdmVzdHJlYW1pbmciOnRydWUsIm91dGJvdW5kLWNhbGwiOnRydWUsInNpcC1vdXRib3VuZC1jYWxsIjpmYWxzZSwidHJhbnNjcmlwdGlvbiI6dHJ1ZSwicmVjb3JkaW5nIjp0cnVlfSwidXNlciI6eyJoaWRkZW4tZnJvbS1yZWNvcmRlciI6ZmFsc2UsIm1vZGVyYXRvciI6dHJ1ZSwibmFtZSI6ImhyaW9zbmwiLCJpZCI6Imdvb2dsZS1vYXV0aDJ8MTA5MzUyNTQ4MjI1OTAyNjc5ODU2IiwiYXZhdGFyIjoiIiwiZW1haWwiOiJocmlvc25sQGdtYWlsLmNvbSJ9fSwicm9vbSI6IioifQ.dcpC4DG6jiiTN-Kyd2iZkET6VthMC1V63yAIfnjqqJ1186oOsdLJnOLAoVj_yTdeVqEhErAPNPnnlfRBXj2FpHfBYgYJFdleAurIHzxyEyxbYbIGeJgYWBt-iONu8gsYIRsPhNDZ-jUo9x2VXUZso7q6_uf7cjRf5vbWN7L-_HaHee7YZZ8kikOtFTNpXjafYQIAt5AiWnB0GzCh79NdV5leCU5Nr3yjupZ6_aW3oLZfE8wSKEqCcOoehPEKACphK56w9Fkim6Y_kyBE37Xh52oy8pyTEOQcpbE8J7X9XPoEnkTHHO_vmMmLFqvMlWtlCDQXkFidytCLWEDp0un0JQ",
        interfaceConfigOverwrite: {
          FILM_STRIP_MAX_HEIGHT: 0,
          TILE_VIEW_MAX_COLUMNS: 1,
        },
      };

      jitsiApiRef.current = new window.JitsiMeetExternalAPI("8x8.vc", options);
    };

    if (!window.JitsiMeetExternalAPI) {
      loadJitsiScript();
    } else {
      initializeJitsi();
    }

    return () => {
      jitsiApiRef.current?.dispose();
    };
  }, []);

  const toggleAudio = () => {
    jitsiApiRef.current?.executeCommand("toggleAudio");
    setIsAudioMuted(!isAudioMuted);
  };

  const toggleVideo = () => {
    jitsiApiRef.current?.executeCommand("toggleVideo");
    setIsVideoOff(!isVideoOff);
  };

  const endCall = () => {
    jitsiApiRef.current?.executeCommand("hangup");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content Area */}
      <div className="container mx-auto p-4">
        {/* Host Video Area */}
        <div
          ref={jitsiContainerRef}
          className="w-full h-96 bg-gray-200 rounded-lg mb-4"
        ></div>

        {/* Audience Grid */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-8">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="aspect-video bg-blue-200 rounded-lg p-4 flex items-center justify-center"
            >
              <span className="text-gray-600">Participant {i + 1}</span>
            </div>
          ))}
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={toggleAudio}
            className={`px-6 py-3 rounded-full ${
              isAudioMuted ? "bg-red-500" : "bg-white"
            } shadow-lg hover:shadow-xl transition`}
          >
            {isAudioMuted ? "Unmute" : "Mute"}
          </button>

          <button
            onClick={toggleVideo}
            className={`px-6 py-3 rounded-full ${
              isVideoOff ? "bg-red-500" : "bg-white"
            } shadow-lg hover:shadow-xl transition`}
          >
            {isVideoOff ? "Start Video" : "Stop Video"}
          </button>

          <button
            onClick={endCall}
            className="px-6 py-3 rounded-full bg-red-600 text-white shadow-lg hover:shadow-xl hover:bg-red-700 transition"
          >
            End Call
          </button>
        </div>
      </div>
    </div>
  );
}
