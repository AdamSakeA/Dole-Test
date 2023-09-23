import getDateString from "@/utils/getDateString";
import { Message } from "@/types/types";
import UserAvatar from "./UserAvatar";

const ChatMessage = ({ message }: { message: Message }) => {
  return (
    <div className="flex py-2">
      {!message.ownedByCurrentUser && (
        <div>
          <UserAvatar user={message.user}></UserAvatar>
        </div>
      )}
      <div>
        <div>
          <p className="text-gray-400">
            {!message.ownedByCurrentUser && message.user.name + " @ "}
            {getDateString(message.sentAt)}
          </p>
        </div>
        <div className="w-fit bg-red-400 px-4 py-2 rounded-lg">
          <p>{message.body}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
