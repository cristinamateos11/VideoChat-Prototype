/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

const socket = io("http://localhost:4000");

function Messages() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message, "username", userName);
    const newMessage = {
      body: message,
      from: "Yo",
    };
    setMessages([newMessage, ...messages]);
    setMessage("");
  };

  useEffect(() => {
    const receiveMessage = (message) => {
      setMessages([message, ...messages]);
    };
    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, [messages]);



  return (
    <>
      <div className="messagesComponent">
        <form onSubmit={handleSubmit}>
          <label>Nombre de usuario</label>
          <input
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
          <input
            type="text"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button>Send Message</button>
        </form>
        <div className="messages">
          {messages.map((messages, index) => (
            <div key={index}>
              <p>
                {messages.from}: {messages.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Messages;
