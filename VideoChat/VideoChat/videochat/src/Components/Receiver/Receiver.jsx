/* eslint-disable no-unused-vars */
import React, { useRef, useEffect } from "react";

function Receiver() {
  const videoRef = useRef(null);

  return (
    <>
      <div className="ReceiverComponent">
        <video ref={videoRef} autoPlay></video>
      </div>
    </>
  );
}

export default Receiver;
