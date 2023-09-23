import UserAvatar from "./UserAvatar";
import { User } from "@/types/types";

const Users = ({ users }: { users: User[] }) => {
  return users.length > 0 ? (
    <div className=" gap-5 bg-white my-8 p-5 rounded-lg shadow-lg">
      <h2 className="font-bold mb-5">Also in this room:</h2>
      <ul className="flex flex-row flex-wrap gap-4">
        {users.map((user, index) => (
          <li key={index}>
            <UserAvatar user={user} />
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div>There is no one else in this room</div>
  );
};

export default Users;
