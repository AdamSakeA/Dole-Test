import Image from "next/image";
import { User, UserData } from "@/types/types";

const UserAvatar = ({ user }: { user: User | UserData }) => {
  return (
    <div className="px-5 py-2 w-28 flex flex-col items-center justify-center rounded-lg">
      <Image
        src={user.picture}
        alt={user.name}
        title={user.name}
        width={50}
        height={50}
        className="rounded-full mb-2"
      />
      <label className="font-bold text-md text-center">{user.name}</label>
    </div>
  );
};

export default UserAvatar;
