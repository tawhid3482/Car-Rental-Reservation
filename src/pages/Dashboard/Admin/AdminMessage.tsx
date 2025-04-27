/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllConversationQuery, useSendMessageMutation } from "../../../redux/features/message/message";
import { useGetAllUserQuery } from "../../../redux/features/auth/authApi";
import { useState } from "react";
import { TUser } from "../../../redux/features/auth/authSlice";

const AdminMessage = () => {
  const { data: conversationData } = useGetAllConversationQuery("");
  const conversation = conversationData?.data || [];

  const { data: userData } = useGetAllUserQuery("");
  const allUsers = userData?.data || [];
  const users = allUsers.filter((u: any) => u.role === "user");

const [sendMessage]=useSendMessageMutation()


  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(undefined);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    console.log("Sending message:", newMessage);
    setNewMessage("");


  };

  const truncateMessage = (message: string, wordLimit: number = 20) => {
    const words = message.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : message;
  };

  const formatTime = (timestamp: string) => {
    const parsedDate = Date.parse(timestamp);
    if (isNaN(parsedDate)) return "";
    const date = new Date(parsedDate);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const selectedUser = users.find((u: TUser) => u._id === selectedUserId);
  const selectedConversation = conversation.filter((conv: any) => conv.user._id === selectedUserId);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-80 h-full border-r bg-white flex flex-col">
        <h2 className="text-xl font-bold p-4 border-b">Chats</h2>
        <div className="overflow-y-auto flex-1">
          {users.map((user: TUser) => {
            const userConversation = conversation.find((c: any) => c.user._id === user._id);
            return (
              <div
                key={user._id}
                onClick={() => setSelectedUserId(user._id)}
                className={`flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer transition ${
                  selectedUserId === user._id ? "bg-gray-200" : ""
                }`}
              >
                <img
                  src={user?.image || "https://via.placeholder.com/150"}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-400"
                />
                <div className="flex flex-col flex-1">
                  <p className="font-semibold">{user.name}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span className="truncate w-32">
                      {truncateMessage(userConversation?.lastMessage?.content || "")}
                    </span>
                    <span className="text-[10px]">
                      {formatTime(userConversation?.lastMessage?.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {/* Chat Window */}
      <main className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-white flex items-center gap-4">
              <img
                src={selectedUser.image || "https://via.placeholder.com/150"}
                alt={selectedUser.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-400"
              />
              <h3 className="text-lg font-bold">{selectedUser.name}</h3>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 bg-gradient-to-b from-gray-100 to-gray-200">
              {selectedConversation.map((message: any) => (
                <div key={message._id} className={`flex items-end gap-2 ${message.senderRole === "admin" ? "justify-end" : "justify-start"}`}>
                  {/* User Image */}
                  {message.senderRole !== "admin" && (
                    <img
                      src={selectedUser.image || "https://via.placeholder.com/150"}
                      alt="User"
                      className="w-8 h-8 border rounded-full object-cover"
                    />
                  )}
                  {/* Message Content */}
                  <div className={`max-w-[70%] p-3 rounded-2xl shadow ${message.senderRole === "admin" ? "bg-blue-600 text-white" : "bg-white text-gray-800"}`}>
                    {message.lastMessage?.content}
                  </div>
                  {/* Admin Image */}
                  {message.senderRole === "admin" && (
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                      alt="Admin"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white flex items-center gap-4 border-t">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
              />
              <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1 text-gray-400">
            Select a user to start chatting.
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminMessage;
