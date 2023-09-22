/* eslint-disable no-unused-vars */
import React, { useRef, useEffect } from "react";
import Messages from "../Messages/Messages";

function VideoChat() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const startBroadcasting = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopBroadcasting = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      streamRef.current = null;

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const copyVideoFrame = () => {
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    };

    const intervalId = setInterval(copyVideoFrame, 40);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <div className="videoChatComponent">
        <h2>VideoChat</h2>
        <br />
        <button onClick={startBroadcasting}>Start Broadcasting</button>
        <button onClick={stopBroadcasting}>Stop Broadcasting</button>

        <div className="videoContainer">
          <video ref={videoRef} autoPlay></video>
        </div>
        <div className="camerasContainer">
          <div className="videoContainer">
            <canvas ref={canvasRef}></canvas>
          </div>
          
        </div>
        <Messages />
      </div>
    </>
  );
}

export default VideoChat;
