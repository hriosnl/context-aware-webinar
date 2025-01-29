"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
declare const JitsiMeetJS: any;

export default function Meeting() {
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [remoteTracks, setRemoteTracks] = useState<any[]>([]);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const connectionRef = useRef<any>(null);
  const conferenceRef = useRef<any>(null);
  const localTracksRef = useRef<any[]>([]);

  // Jitsi initialization
  useEffect(() => {
    const initializeJitsi = async () => {
      await JitsiMeetJS.init();

      // Create local tracks
      const tracks = await JitsiMeetJS.createLocalTracks({
        devices: ["audio", "video"],
        resolution: 720,
      });

      localTracksRef.current = tracks;
      tracks.forEach(
        (track: {
          getType: () => string;
          attach: (arg0: HTMLVideoElement) => void;
        }) => {
          if (track.getType() === "video" && localVideoRef.current) {
            track.attach(localVideoRef.current);
          }
        }
      );

      // Setup connection
      const connection = new JitsiMeetJS.JitsiConnection(null, "YOUR_JWT", {
        hosts: {
          domain: "8x8.vc",
          muc: `conference.vpaas-magic-cookie-9ea6a2e7343f4270a46a31f8b731a112.8x8.vc`,
          focus: "focus.8x8.vc",
        },
        serviceUrl: `wss://8x8.vc/vpaas-magic-cookie-9ea6a2e7343f4270a46a31f8b731a112/xmpp-websocket?room=test-room`,
      });

      connectionRef.current = connection;

      connection.addEventListener(
        JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
        async () => {
          const conference = connection.initJitsiConference("test-room", {});
          conferenceRef.current = conference;

          // Add conference event listeners
          conference.on(
            JitsiMeetJS.events.conference.TRACK_ADDED,
            (track: { isLocal: () => any }) => {
              if (!track.isLocal()) {
                setRemoteTracks((prev) => [...prev, track]);
              }
            }
          );

          conference.on(
            JitsiMeetJS.events.conference.TRACK_REMOVED,
            (track: { getId: () => any }) => {
              setRemoteTracks((prev) =>
                prev.filter((t) => t.getId() !== track.getId())
              );
            }
          );

          // Join conference and add local tracks
          await conference.join();
          localTracksRef.current.forEach((track) => conference.addTrack(track));
        }
      );

      connection.connect();
    };

    const script = document.createElement("script");
    script.src = "https://8x8.vc/libs/lib-jitsi-meet.min.js";
    script.async = true;
    script.onload = initializeJitsi;
    document.body.appendChild(script);

    return () => {
      connectionRef.current?.disconnect();
      localTracksRef.current.forEach((track) => track.dispose());
      document.body.removeChild(script);
    };
  }, []);

  const toggleAudio = () => {
    const audioTrack = localTracksRef.current.find(
      (t) => t.getType() === "audio"
    );
    audioTrack.mute(!isAudioMuted);
    setIsAudioMuted(!isAudioMuted);
  };

  const toggleVideo = () => {
    const videoTrack = localTracksRef.current.find(
      (t) => t.getType() === "video"
    );
    videoTrack.mute(!isVideoOff);
    setIsVideoOff(!isVideoOff);
  };

  const endCall = () => {
    connectionRef.current?.disconnect();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Video Grid */}
      <div className="container mx-auto p-4">
        {/* Local Video */}
        <div className="relative mb-4 rounded-lg overflow-hidden">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            className="w-full h-96 object-cover bg-gray-800"
          />
          <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded">
            You ({isAudioMuted ? "Muted" : "Unmuted"})
          </div>
        </div>

        {/* Remote Videos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {remoteTracks.map((track) => (
            <RemoteVideo key={track.getId()} track={track} />
          ))}
        </div>

        {/* Control Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-black/80 py-4">
          <div className="flex justify-center gap-4">
            <ControlButton
              onClick={toggleAudio}
              active={isAudioMuted}
              icon={isAudioMuted ? "🎤⛔" : "🎤"}
              label={isAudioMuted ? "Unmute" : "Mute"}
            />

            <ControlButton
              onClick={toggleVideo}
              active={isVideoOff}
              icon={isVideoOff ? "📷⛔" : "📷"}
              label={isVideoOff ? "Start Video" : "Stop Video"}
            />

            <ControlButton
              onClick={endCall}
              icon="📞❌"
              label="End Call"
              danger
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function RemoteVideo({ track }: { track: any }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      track.attach(videoRef.current);
    }
    return () => track.dispose();
  }, [track]);

  return (
    <div className="relative rounded-lg overflow-hidden bg-gray-800 aspect-video">
      <video ref={videoRef} autoPlay className="w-full h-full object-cover" />
    </div>
  );
}

function ControlButton({ onClick, icon, label, active, danger }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center px-6 py-2 rounded-lg transition-all ${
        danger
          ? "bg-red-600 hover:bg-red-700"
          : active
          ? "bg-white/20"
          : "bg-white/10 hover:bg-white/20"
      }`}
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-sm">{label}</span>
    </button>
  );
}
