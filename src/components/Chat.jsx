import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((state) => state.user);
  const fromUserId = user?._id;
  console.log(targetUserId);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };
  const sendMessage = () => {
    const socket = createSocketConnection();
    if (newMessage.trim() !== "") {
      socket.emit("sendMessage", {
        fromName: user.firstName,
        fromUserId,
        targetUserId,
        text: newMessage,
      });
      setNewMessage("");
    }
  };

  useEffect(() => {
    if (!fromUserId) {
      return;
    }
    const socket = createSocketConnection();
    socket.emit("joinChat", {
      fromName: user.firstName,
      fromUserId,
      targetUserId,
    });

    socket.on("messageReceived", ({ fromName, text }) => {
      setMessages((prevMessages) => [...prevMessages, { fromName, text }]);
    });

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("connect_error", (err) => {
      console.error("Connection error:", err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, [fromUserId, targetUserId]);
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="h-[70vh] p-5 border bg-gray-800 w-1/2 flex flex-col">
        <h1 className="p-5 border-b bg-gray-800 text-white">Chat</h1>
        <div className="flex-1 overflow-scroll text-white">
          {/* {display messages} */}
          {messages &&
            messages.map((message, index) => {
              return (
                <div key={index} className="chat chat-start">
                  <div className="chat-header">
                    {message.fromName}
                    <time className="text-xs opacity-50">2 hours ago</time>
                  </div>
                  <div className="chat-bubble">{message.text}</div>
                  <div className="chat-footer opacity-50">Seen</div>
                </div>
              );
            })}
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              handleKeyDown(e);
            }}
            className="flex-1 p-2 rounded bg-black"
          />
          <button
            className={`btn mx-2 ${
              newMessage.trim() !== "" ? " btn-secondary" : "btn-active"
            }`}
            onClick={() => sendMessage()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
