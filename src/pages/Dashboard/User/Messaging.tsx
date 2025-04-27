/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { useAppSelector } from "../../../redux/features/hooks";
import {
  useDeleteMessageMutation,
  useGetMessagesWithUserQuery,
  useMarkMessagesAsSeenMutation,
  useSendMessageMutation,
} from "../../../redux/features/message/message";
import { useGetAllUserQuery } from "../../../redux/features/auth/authApi";
import toast from "react-hot-toast";

const Messaging = () => {
  const user = useAppSelector(selectCurrentUser);
  const { data } = useGetAllUserQuery('');
  const allUsers = data?.data || [];
  const admins = allUsers.filter((admin: any) => admin.role === "admin");

  const [receiverId, setReceiverId] = useState<string>("");
  const { data: messages, isLoading, refetch } = useGetMessagesWithUserQuery(receiverId, {
    skip: !receiverId, // receiverId না থাকলে query skip করবে
  });

  const [sendMessage] = useSendMessageMutation();
  const [markMessagesAsSeen] = useMarkMessagesAsSeenMutation();
  const [deleteMessage] = useDeleteMessageMutation();

  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Mark messages as seen
  useEffect(() => {
    if (receiverId) {
      markMessagesAsSeen({ senderId: receiverId });
    }
  }, [receiverId, markMessagesAsSeen]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !receiverId) {
      toast.error("Please select an admin and type a message.");
      return;
    }

    try {
      const now = new Date().toISOString();

      await sendMessage({
        sender: user?.id,
        receiver: receiverId,
        content: newMessage,
        isSeen: false,
        createdAt: now,
        updatedAt: now,
      });

      setNewMessage("");
      toast.success('Your message was sent successfully!');
      refetch();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      await deleteMessage(messageId);
      refetch();
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-screen flex flex-col">
      {/* Chat Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold">Chat with Support</h2>
          <p className="text-green-500 text-sm">🟢 Online</p>
        </div>
      </div>

      {/* Select Admin */}
      <div className="mb-4 ">
        <label className="block mb-2 text-sm font-medium text-gray-700">Select Admin:</label>
        <select
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select an admin</option>
          {admins.map((admin: any) => (
            <option key={admin._id} value={admin._id}>
              {admin.name}
            </option>
          ))}
        </select>
      </div>

      {/* Messages */}
      <div className="flex-1   bg-white rounded-lg shadow-md p-4 overflow-y-auto space-y-4">
        {isLoading ? (
          <div className="text-center text-gray-400">Loading messages...</div>
        ) : messages?.data?.length > 0 ? (
          messages.data.map((msg: any) => (
            <div
              key={msg._id}
              className={`flex ${msg.sender === user?.id ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`relative max-w-xs  px-4 py-2 rounded-2xl ${
                  msg.sender === user?.id
                    ? "bg-[#A20023] text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <p>{msg.content}</p>
                {msg.sender === user?.id && (
                  <button
                    onClick={() => handleDeleteMessage(msg._id)}
                    className="absolute top-0 right-0 mt-1 mr-2 text-xs hover:text-red-500"
                  >
                    ✖
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400">No messages yet.</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Typing Indicator */}
      {isTyping && (
        <div className="text-gray-400 text-sm mt-2 animate-pulse">
          Typing...
        </div>
      )}

      {/* Send Message Area */}
      <div className="flex items-center gap-2 mt-4">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={handleTyping}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3DEEB7]"
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-[#A20023] text-white rounded-md hover:bg-[#3DEEB7]"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Messaging;
