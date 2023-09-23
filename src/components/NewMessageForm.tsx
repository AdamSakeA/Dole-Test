import { FormEvent } from "react";

interface PropsType {
  newMessage: string;
  handleNewMessageChange: (event: FormEvent<HTMLInputElement>) => void;
  handleStartTyping: () => void;
  handleStopTyping: () => void;
  handleSendMessage: (event: any) => void;
}

const NewMessageForm = ({
  newMessage,
  handleNewMessageChange,
  handleStartTyping,
  handleStopTyping,
  handleSendMessage,
}: PropsType) => {
  return (
    <form onSubmit={handleSendMessage} className="flex gap-3 mt-[20px]">
      <input
        type="text"
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Aa"
        onKeyPress={handleStartTyping}
        onKeyUp={handleStopTyping}
        className="w-full border-b-2 outline-none bg-transparent focus:border-b-red-500 transition-all duration-300 mr-5 placeholder:text-gray-300"
      />
      <button
        type="submit"
        className=" bg-red-500 text-white font-bold rounded-3xl px-10 py-2 hover:bg-white hover:border-2 hover:border-red-500 hover:text-red-500 transition-all duration-300"
      >
        Send
      </button>
    </form>
  );
};

export default NewMessageForm;
