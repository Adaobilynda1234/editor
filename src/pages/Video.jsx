// src/components/VideoEditor.js
import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Scissors,
  Volume2,
  Image,
  Type,
  Sun,
  Download,
  Plus,
  Trash2,
} from "lucide-react";

export default function Video() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const timelineRef = useRef(null);

  // State management
  const [videoFile, setVideoFile] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  // Timeline tracks
  const [tracks, setTracks] = useState([
    { id: "video", type: "video", clips: [] },
    { id: "audio", type: "audio", clips: [] },
    { id: "text", type: "text", clips: [] },
  ]);

  // Effects and filters
  const [selectedEffect, setSelectedEffect] = useState(null);
  const [effects, setEffects] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0,
  });

  // Transitions
  const [transitions, setTransitions] = useState([]);
  const [selectedTransition, setSelectedTransition] = useState(null);

  // Text overlays
  const [textOverlays, setTextOverlays] = useState([]);

  // Trim points
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);

  // Selected clip
  const [selectedClip, setSelectedClip] = useState(null);

  useEffect(() => {
    if (videoRef.current && canvasRef.current) {
      setupCanvas();
    }
  }, [videoFile, effects]);

  const setupCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (videoRef.current) {
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      // Apply effects to canvas
      if (playing) {
        ctx.filter = `
          brightness(${effects.brightness}%) 
          contrast(${effects.contrast}%) 
          saturate(${effects.saturation}%) 
          blur(${effects.blur}px)
        `;
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      }
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoFile(url);

      // Create new video clip
      const newClip = {
        id: Date.now(),
        type: "video",
        start: 0,
        end: 0,
        source: url,
        effects: { ...effects },
      };

      // Add to video track
      setTracks(
        tracks.map((track) =>
          track.id === "video"
            ? { ...track, clips: [...track.clips, newClip] }
            : track
        )
      );
    }
  };

  const handleTimelineClick = (e) => {
    const timeline = timelineRef.current;
    const rect = timeline.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;

    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const addTextOverlay = () => {
    const newText = {
      id: Date.now(),
      text: "New Text",
      position: { x: 50, y: 50 },
      style: {
        fontSize: "24px",
        color: "#ffffff",
        fontFamily: "Arial",
      },
      startTime: currentTime,
      duration: 5,
    };
    setTextOverlays([...textOverlays, newText]);
  };

  const addTransition = (type) => {
    const newTransition = {
      id: Date.now(),
      type,
      duration: 1,
      startTime: currentTime,
    };
    setTransitions([...transitions, newTransition]);
  };

  const updateEffect = (effectName, value) => {
    setEffects((prev) => ({
      ...prev,
      [effectName]: value,
    }));
  };

  const exportVideo = async () => {
    try {
      const canvas = canvasRef.current;
      const stream = canvas.captureStream();
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm",
      });

      const chunks = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "edited-video.webm";
        a.click();
      };

      // Record canvas content
      mediaRecorder.start();
      videoRef.current.currentTime = trimStart;
      videoRef.current.play();

      setTimeout(() => {
        mediaRecorder.stop();
        videoRef.current.pause();
      }, (trimEnd - trimStart) * 1000);
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-12 gap-4">
        {/* Preview Section */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-lg shadow-lg p-4">
          <div className="relative aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              className="absolute inset-0"
              onTimeUpdate={() => setCurrentTime(videoRef.current.currentTime)}
              onLoadedMetadata={() => {
                setDuration(videoRef.current.duration);
                setTrimEnd(videoRef.current.duration);
              }}
            >
              <source src={videoFile} type="video/mp4" />
            </video>
            <canvas ref={canvasRef} className="absolute inset-0" />
            {/* Text Overlays */}
            {textOverlays.map((overlay) => (
              <div
                key={overlay.id}
                style={{
                  position: "absolute",
                  left: `${overlay.position.x}%`,
                  top: `${overlay.position.y}%`,
                  ...overlay.style,
                }}
              >
                {overlay.text}
              </div>
            ))}
          </div>

          {/* Video Controls */}
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => {
                  videoRef.current.currentTime = Math.max(0, currentTime - 5);
                }}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <SkipBack className="w-6 h-6" />
              </button>
              <button
                onClick={() => {
                  if (playing) {
                    videoRef.current.pause();
                  } else {
                    videoRef.current.play();
                  }
                  setPlaying(!playing);
                }}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                {playing ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </button>
              <button
                onClick={() => {
                  videoRef.current.currentTime = Math.min(
                    duration,
                    currentTime + 5
                  );
                }}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <SkipForward className="w-6 h-6" />
              </button>
            </div>

            {/* Timeline */}
            <div
              ref={timelineRef}
              className="relative h-20 bg-gray-200 rounded-lg cursor-pointer"
              onClick={handleTimelineClick}
            >
              {tracks.map((track) => (
                <div
                  key={track.id}
                  className="absolute h-6 w-full"
                  style={{
                    top: tracks.indexOf(track) * 24 + "px",
                  }}
                >
                  {track.clips.map((clip) => (
                    <div
                      key={clip.id}
                      className="absolute h-full bg-blue-500 rounded"
                      style={{
                        left: `${(clip.start / duration) * 100}%`,
                        width: `${((clip.end - clip.start) / duration) * 100}%`,
                      }}
                      onClick={() => setSelectedClip(clip)}
                    />
                  ))}
                </div>
              ))}
              {/* Playhead */}
              <div
                className="absolute top-0 w-0.5 h-full bg-red-500"
                style={{
                  left: `${(currentTime / duration) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Tools Panel */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          {/* Upload */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="font-semibold mb-2">Media</h3>
            <input
              type="file"
              accept="video/*"
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Effects */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="font-semibold mb-2">Effects</h3>
            <div className="space-y-2">
              {Object.entries(effects).map(([effect, value]) => (
                <div key={effect}>
                  <label className="block text-sm font-medium text-gray-700">
                    {effect.charAt(0).toUpperCase() + effect.slice(1)}
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={effect === "blur" ? 10 : 200}
                    value={value}
                    onChange={(e) => updateEffect(effect, e.target.value)}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Text Tool */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="font-semibold mb-2">Text</h3>
            <button
              onClick={addTextOverlay}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add Text
            </button>
          </div>

          {/* Transitions */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="font-semibold mb-2">Transitions</h3>
            <div className="grid grid-cols-2 gap-2">
              {["fade", "wipe", "dissolve", "slide"].map((transition) => (
                <button
                  key={transition}
                  onClick={() => addTransition(transition)}
                  className="bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200"
                >
                  {transition}
                </button>
              ))}
            </div>
          </div>

          {/* Export */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <button
              onClick={exportVideo}
              className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Export Video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
