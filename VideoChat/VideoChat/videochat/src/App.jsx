/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "./App.css";
import VideoChat from "./Components/VideoChat/VideoChat";



function App() {

  const [count, setCount] = useState(0);


  return (
    <>
      <VideoChat />
    </>
  );
}

export default App;
