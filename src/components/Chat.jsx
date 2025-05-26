import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { formattingTime } from "../utils/dateUtils";

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
        firstName: user.firstName,
        lastName: user.lastName,
        fromUserId,
        targetUserId,
        text: newMessage,
      });
      setNewMessage("");
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });
      const chaMessages = res?.data?.messages?.map((message) => {
        const { senderId } = message;
        return {
          id: senderId._id,
          firstName: senderId.firstName,
          lastName: senderId.lastName,
          text: message.text,
          photoURL: senderId.photoURL,
          formattedTime: formattingTime(message.createdAt),
        };
      });
      setMessages(chaMessages);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchMessages();
  }, []);
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

    socket.on("messageReceived", ({ firstName, lastName, id, text }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          firstName,
          lastName,
          id,
          text,
          formattedTime: formattingTime(new Date()),
        },
      ]);
    });

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("connect_error", (err) => {
      console.error("Connection error:", err.message);
    });

    return () => {
      socket.emit("custom_disconnect",{userId:fromUserId});
    };
  }, [fromUserId, targetUserId]);
  return (
    <div className="h-[85%] flex items-center justify-center px-2 sm:px-4 mt-20">
      <div className="w-full h-[70vh] mx-auto p-4 sm:p-5 border bg-gray-800 flex flex-col rounded-lg">
        <h1 className="p-4 border-b bg-gray-800 text-white text-lg sm:text-xl font-semibold">
          Chat
        </h1>

        <div className="flex-1 overflow-y-auto text-white space-y-4 py-2">
          {/* {display messages} */}
          {messages &&
            messages.map((message, index) => {
              return (
                <div
                  key={index}
                  className={`chat ${
                    message.id.toString() === fromUserId.toString()
                      ? "chat-end"
                      : "chat-start"
                  }`}
                >
                  <div className="chat-image avatar">
                    <div className="w-8 sm:w-10 rounded-full">
                      <img
                        alt="User avatar"
                        src={
                          message.id.toString() === fromUserId.toString()
                            ? user.photoURL
                            : message.photoURL
                        }
                      />
                    </div>
                  </div>
                  <div className="chat-header text-sm sm:text-base">
                    {`${message.firstName} ${message.lastName}`}
                    <time className="text-xs opacity-50 ml-2">
                      {message.formattedTime}
                    </time>
                  </div>
                  <div className="chat-bubble text-sm sm:text-base">
                    {message.text}
                  </div>
                </div>
              );
            })}
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-stretch gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
            className="flex-1 p-2 rounded bg-black text-white border border-gray-700"
            placeholder="Type a message..."
          />
          <button
            className={`btn w-full sm:w-auto ${
              newMessage.trim() !== "" ? "btn-secondary" : "btn-disabled"
            }`}
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
