import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ChatList = () => {
  const database = getDatabase();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    const chatsRef = ref(database, "messages");
    onValue(chatsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const userChats = Object.keys(data)
          .filter((chatId) => chatId.includes(currentUser.uid)) // Only show chats involving the user
          .map((chatId) => ({
            chatId,
            participant: chatId.replace(currentUser.uid, "").replace("_", ""), // Get the other person's ID
          }));

        setChats(userChats);
      }
    });
  }, [database, currentUser]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Your Chats</h1>
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4">
        {chats.length > 0 ? (
          chats.map((chat) => (
            <div
              key={chat.chatId}
              className="p-4 bg-gray-200 rounded-lg mb-2 cursor-pointer hover:bg-gray-300"
              onClick={() => navigate(`/chat/${chat.participant}`)}
            >
              Chat with User ID: {chat.participant}
            </div>
          ))
        ) : (
          <p>No active chats.</p>
        )}
      </div>
    </div>
  );
};

export default ChatList;
