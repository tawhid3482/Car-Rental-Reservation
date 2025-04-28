/* eslint-disable @typescript-eslint/no-explicit-any */

import { useGetAllUserQuery } from "../../../redux/features/auth/authApi";
import {
  selectCurrentUser,
  TUser,
} from "../../../redux/features/auth/authSlice";
import { useAppSelector } from "../../../redux/features/hooks";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  useGetAllConversationQuery,
  useSendMessageMutation,
} from "../../../redux/features/message/message";

const AdminMessage = () => {
  const userInfo = useAppSelector(selectCurrentUser);
  const { data: conversationData } = useGetAllConversationQuery("");
  const conversation = conversationData?.data || [];
  // console.log(conversation);

  const [sendMessage] = useSendMessageMutation();

  const { data } = useGetAllUserQuery("");
  const allUsers = data?.data || [];
  const users = allUsers.filter((user: TUser) => user?.role === "user");
  // console.log(users);

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  // console.log(selectedUserId);

  const selectedConversation = conversation.filter(
    (item: any) =>
      item.lastMessage.sender._id === selectedUserId ||
      item.lastMessage.receiver._id === selectedUserId
  );

  // console.log(selectedConversation);

  const handleSend = async () => {
    const info = {
      sender: userInfo?.id,
      receiver: selectedUserId,
      content: message,
      isSeen: false,
    };
    console.log(info);
    try {
      await sendMessage(info);

      toast.success("Message sent!");
      setMessage("");
    } catch (error) {
      toast.error("Failed to send message.");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen ">
      {/* Left Sidebar */}
      <div className="w-full md:w-1/3 bg-gray-200 overflow-y-auto p-4 min-h-[50vh] md:min-h-full">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center md:text-left">
          Chat with your customers
        </h2>
        <hr className="my-4 md:my-5" />

        {users?.map((user: TUser) => {
          const userConversation = conversation.find(
            (conv: any) => conv?.user?._id === user._id
          );
          return (
            <div
              key={user._id}
              onClick={() => setSelectedUserId(user._id)}
              className={`flex items-center p-2 md:p-3 mb-2 md:mb-3 rounded-lg cursor-pointer ${
                selectedUserId === user._id ? "bg-gray-300" : ""
              }`}
            >
              <img
                src={
                  user.image ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtnvAOajH9gS4C30cRF7rD_voaTAKly2Ntaw&s"
                }
                alt={user.name}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover mr-3 md:mr-4"
              />
              <div className="flex-1">
                <div className="flex flex-col">
                  <h3 className="font-semibold text-sm md:text-lg">
                    {user.name}
                  </h3>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span className="truncate w-24 sm:w-28 md:w-32">
                      {userConversation?.lastMessage?.content ||
                        "No message yet"}
                    </span>
                    <span className="text-[10px]">
                      {userConversation?.lastMessage?.createdAt
                        ? new Date(
                            userConversation.lastMessage.createdAt
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Vertical Divider */}
      <div className="hidden md:block w-px bg-gray-400 border"></div>

      {/* Right Conversation Panel */}
      <div className="w-full md:w-2/3 bg-white p-4 md:p-6 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-3 md:space-y-4">
          {selectedConversation?.length > 0 ? (
            [...selectedConversation]
              .sort(
                (a, b) =>
                  new Date(a.lastMessage.createdAt).getTime() -
                  new Date(b.lastMessage.createdAt).getTime()
              )
              .map((conv, index) => {
                const isAdmin = conv.lastMessage.sender._id === userInfo?.id;
                const message = conv.lastMessage.content;
                const image = conv.lastMessage.sender.image;
                const senderName = conv.lastMessage.sender.name;
                const createdAt = conv.lastMessage.createdAt;

                return (
                  <div
                    key={index}
                    className={`flex ${
                      isAdmin ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`p-3 md:p-4 rounded-2xl md:rounded-3xl max-w-[85%] md:max-w-xl flex flex-col ${
                        isAdmin
                          ? "bg-green-400 text-white"
                          : "bg-gray-200 text-black"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 md:gap-3">
                          <img
                            src={
                              image ||
                              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmwla6vUQK67X5KHksARyVrL4Evo509hBcCA&s"
                            }
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full"
                            alt=""
                          />
                          <h4 className="font-semibold text-sm md:text-base">
                            {senderName}
                          </h4>
                        </div>
                        <span className="text-[10px] md:text-xs ml-6 md:ml-10">
                          {new Date(createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="text-xs md:text-sm mt-1 ml-12">{message}</p>
                    </div>
                  </div>
                );
              })
          ) : (
            <div className="text-center text-gray-400 mt-6 md:mt-10">
              Select a user to start conversation
            </div>
          )}
        </div>

        {/* Message Input Box */}
        {selectedUserId && (
          <div className="mt-3 md:mt-4 flex items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type Your message..."
              className="flex-1 p-3 md:p-4 rounded-lg bg-gray-200 focus:outline-none mr-2 md:mr-4"
            />
            <button
              onClick={handleSend}
              className="cursor-pointer bg-green-400 hover:bg-green-500 text-white font-bold py-2 md:py-3 px-4 md:px-6 rounded-lg"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessage;
