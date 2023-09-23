/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef, FormEvent } from "react";
import { useRouter } from "next/router";
import useChat from "@/hooks/useChat";
import ChatMessage from "@/components/ChatMessage";
import useTyping from "@/hooks/useTyping";
import NewMessageForm from "@/components/NewMessageForm";
import TypingMessage from "@/components/TypingMessage";
import Users from "@/components/Users";
import UserAvatar from "@/components/UserAvatar";
import Layout from "@/components/Layout";

export default function ChatRoom() {
  const router = useRouter();
  const { roomid } = router.query;
  const { messages, user, users, typingUsers, sendMessage, startTypingMessage, stopTypingMessage } =
    useChat(roomid as string);
  const [newMessage, setNewMessage] = useState("");
  const [timeDiff, setTimeDiff] = useState(0);
  const scrollTarget = useRef(null);
  const { isTyping, startTyping, stopTyping, cancelTyping } = useTyping();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/currenttime");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setTimeDiff(Date.now() - data.current);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleNewMessageChange = (event: FormEvent<HTMLInputElement>) => {
    setNewMessage(event.currentTarget.value.replace(/<\/?[^>]*>/g, ""));
  };

  const handleSendMessage = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    cancelTyping();
    sendMessage(newMessage);
    setNewMessage("");
  };

  useEffect(() => {
    if (isTyping) startTypingMessage();
    else stopTypingMessage();
  }, [isTyping]);

  useEffect(() => {
    if (scrollTarget.current) {
      (scrollTarget.current as any).scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length + typingUsers.length]);

  return (
    <Layout title={"Dole Real Time Chat"}>
      <div className="py-[50px]">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div>
            <h1 className="font-bold text-2xl mb-5">Room: {roomid}</h1>
            {user && <UserAvatar user={user}></UserAvatar>}
          </div>
          <Users users={users}></Users>
        </div>
        <div>
          <ol>
            {messages.map((message, i) => {
              message.sentAt += timeDiff;
              return (
                <li key={i}>
                  <ChatMessage message={message}></ChatMessage>
                </li>
              );
            })}
            {typingUsers.map((user, i) => (
              <li key={messages.length + i}>
                <TypingMessage user={user}></TypingMessage>
              </li>
            ))}
          </ol>
          <div ref={scrollTarget}></div>
        </div>
        <NewMessageForm
          newMessage={newMessage}
          handleNewMessageChange={handleNewMessageChange}
          handleStartTyping={startTyping}
          handleStopTyping={stopTyping}
          handleSendMessage={handleSendMessage}
        ></NewMessageForm>
      </div>
    </Layout>
  );
}
