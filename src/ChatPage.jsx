import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDatabase, ref, push, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

const ChatPage = () => {
  const { id: recipientId } = useParams(); // ID of the other person in the chat
  const database = getDatabase();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  // Generate a unique chat ID based on both users
  const chatId =
    currentUser.uid < recipientId
      ? `${currentUser.uid}_${recipientId}`
      : `${recipientId}_${currentUser.uid}`;

  useEffect(() => {
    if (!currentUser) return;

    const messagesRef = ref(database, `messages/${chatId}`);
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMessages(Object.values(data));
      }
    });
  }, [chatId, database, currentUser]);

  const sendMessage = () => {
    if (!message.trim()) return;
    const messagesRef = ref(database, `messages/${chatId}`);
    
    push(messagesRef, {
      senderId: currentUser.uid,
      receiverId: recipientId,
      text: message,
      timestamp: Date.now(),
    });

    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Chat with Donor</h1>
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4">
        <div className="h-64 overflow-y-auto border-b p-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-md mb-2 ${
                msg.senderId === currentUser.uid ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            className="flex-1 p-2 border rounded-md"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="ml-2 px-4 py-2 bg-red-600 text-white rounded-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
