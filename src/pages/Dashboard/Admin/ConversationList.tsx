/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from "../../../redux/features/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { useGetAllConversationQuery } from "../../../redux/features/message/message";

interface ConversationListProps {
  onSelectUser: (userId: string) => void;
  selectedUserId: string;
}

const ConversationList = ({ onSelectUser, selectedUserId }: ConversationListProps) => {
  const { data: conversationsData, isLoading } = useGetAllConversationQuery("");
  const currentUser = useAppSelector(selectCurrentUser);

  if (isLoading) return <div className="flex items-center justify-center h-screen">Loading conversations...</div>;

  return (
    <div className="w-80 h-full border-r p-4 overflow-y-auto bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Conversations</h2>

      {[...(conversationsData?.data || [])]
        .filter((conv: any) => conv.user && conv.user._id !== currentUser?.id) // ✅ currentUser বাদ
        .sort((a: any, b: any) => new Date(b?.lastMessage?.createdAt).getTime() - new Date(a?.lastMessage?.createdAt).getTime())
        .map((conv: any) => {
          const otherUser = conv.user;
          if (!otherUser) return null;

          return (
            <div
              key={otherUser._id}
              onClick={() => onSelectUser(otherUser._id)}
              className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer mb-3 transition-all duration-300 ${
                selectedUserId === otherUser._id ? "bg-blue-100" : "hover:bg-gray-100"
              }`}
            >
              <img
                src={otherUser.profileImage || "/default-avatar.png"}
                alt="User"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-gray-800 truncate">{otherUser.name}</p>
                  {conv?.lastMessage?.createdAt && (
                    <span className="text-xs text-gray-400">
                      {new Date(conv.lastMessage.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  )}
                </div>
                <p className="text-gray-500 text-sm truncate">
                  {conv?.lastMessage?.content || "No messages yet"}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ConversationList;
