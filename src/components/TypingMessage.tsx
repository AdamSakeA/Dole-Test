import Image from "next/image";
import { User } from "@/types/types";

const TypingMessage = ({ user }: { user: User }) => {
  return (
    <div className="bg-gray-100 w-fit flex gap-3 px-3 py-2 mb-2">
      <Image src={user.picture} alt={user.name} width={28} height={28} className="rounded-full" />
      <p className=" font-semibold text-gray-400 ">is typing...</p>
    </div>
  );
};

export default TypingMessage;
