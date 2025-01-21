import { setSelectedUser } from "@/redux/authSlice";
import { MessageCircleCode } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Messages from "./Messages";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { getSelf } from "@/redux/slice/auth.slice";
import { useGetSuggestedUsersQuery } from "@/redux/slice/userApi.slice";

const ChatPage = () => {
  const [textMessage, setTextMessage] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(getSelf);
  const selectedUser = user;
  const { data: suggestedUsers } = useGetSuggestedUsersQuery();
  const onlineUsers = [];

  useEffect(() => {
    return () => {
      dispatch(setSelectedUser(null));
    };
  }, []);

  return (
    <div className="flex ml-[16%] h-screen">
      <section className="w-full my-8 md:w-1/4">
        <h1 className="px-3 mb-4 text-xl font-bold">{user?.username}</h1>
        <hr className="mb-4 border-gray-300" />
        <div className="overflow-y-auto h-[80vh]">
          {suggestedUsers?.length > 0 &&
            suggestedUsers.map((suggestedUser) => {
              const isOnline = onlineUsers.includes(suggestedUser?._id);
              return (
                <div
                  key={suggestedUser?._id}
                  onClick={() => dispatch(setSelectedUser(suggestedUser))}
                  className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50"
                >
                  <Avatar className="w-14 h-14">
                    <AvatarImage src={suggestedUser?.profilePicture} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {suggestedUser?.username}
                    </span>
                    <span
                      className={`text-xs font-bold ${
                        isOnline ? "text-green-600" : "text-red-600"
                      } `}
                    >
                      {isOnline ? "online" : "offline"}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
      {selectedUser ? (
        <section className="flex flex-col flex-1 h-full border-l border-l-gray-300">
          <div className="sticky top-0 z-10 flex items-center gap-3 px-3 py-2 bg-white border-b border-gray-300">
            <Avatar>
              <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span>{selectedUser?.username}</span>
            </div>
          </div>
          <Messages selectedUser={selectedUser} />
          <div className="flex items-center p-4 border-t border-t-gray-300">
            <Input
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
              type="text"
              className="flex-1 mr-2 focus-visible:ring-transparent"
              placeholder="Messages..."
            />
            <Button >
              Send
            </Button>
          </div>
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center mx-auto">
          <MessageCircleCode className="w-32 h-32 my-4" />
          <h1 className="font-medium">Your messages</h1>
          <span>Send a message to start a chat.</span>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
