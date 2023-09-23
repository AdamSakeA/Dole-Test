import { useState, FormEvent } from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";

export default function Home() {
  const [roomName, setRoomName] = useState("");
  const router = useRouter();

  const handleRoomNameChange = (event: FormEvent<HTMLInputElement>) => {
    setRoomName(event.currentTarget.value.replace(/<\/?[^>]*>/g, ""));
  };

  const handleNavigate = (roomId: string) => {
    router.push(`/${roomId}`);
  };

  return (
    <Layout title={"Dole Test - Chat Real Time"}>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mt-[100px] py-[50px] px-[10px] shadow-lg rounded-3xl">
        <div className="flex flex-col justify-center items-center w-full p-[40px] lg:w-1/2 text-center lg:text-left">
          <h1 className="font-bold text-2xl md:3xl mb-5">Dole Test Real Time Chat</h1>
          <div className="flex flex-col gap-4 items-center justify-center md:flex-row">
            <input
              type="text"
              placeholder="Room Name"
              value={roomName}
              onChange={handleRoomNameChange}
              className="border-b-2 outline-none bg-transparent focus:border-b-red-500 transition-all duration-300 mr-5 placeholder:text-gray-300"
            />
            <button
              onClick={() => handleNavigate(roomName)}
              className="bg-red-500 text-white font-bold rounded-3xl px-10 py-2 w-full hover:bg-white hover:border-2 hover:border-red-500 hover:text-red-500 transition-all duration-300"
            >
              Join
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-center w-full lg:w-1/2 lg:text-left ">
          <h1 className="font-semibold text-sm md:text-xl">
            <label className="text-red-500 font-bold">Teknikal test</label> yang diadakan oleh{" "}
            <label className="text-red-500 font-bold">Dole</label>
          </h1>
          <p className="text-xs md:text-md font-thin text-gray-400 ">
            Framework yang digunakan adalah{" "}
            <strong className=" font-semibold">
              Next JS Pages Structure, Socket IO, Tailwind CSS, TypeScript
            </strong>
          </p>
        </div>
      </div>
    </Layout>
  );
}
