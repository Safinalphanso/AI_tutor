import ReactMarkdown from "react-markdown";
import FinalInputArea from "./FinalInputArea";
import { useEffect, useRef, useState } from "react";
import simpleLogo from "../public/simple-logo.png";
import Image from "next/image";

export default function Chat({
  messages,
  disabled,
  promptValue,
  setPromptValue,
  setMessages,
  handleChat,
  topic,
}: {
  messages: { role: string; content: string }[];
  disabled: boolean;
  promptValue: string;
  setPromptValue: React.Dispatch<React.SetStateAction<string>>;
  setMessages: React.Dispatch<
    React.SetStateAction<{ role: string; content: string }[]>
  >;
  handleChat: () => void;
  topic: string;
}) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollableContainerRef = useRef<HTMLDivElement>(null);
  const [didScrollToBottom, setDidScrollToBottom] = useState(true);

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    if (didScrollToBottom) {
      scrollToBottom();
    }
  }, [didScrollToBottom, messages]);

  useEffect(() => {
    const el = scrollableContainerRef.current;
    if (!el) {
      return;
    }

    function handleScroll() {
      if (scrollableContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollableContainerRef.current;
        setDidScrollToBottom(scrollTop + clientHeight >= scrollHeight);
      }
    }

    el.addEventListener("scroll", handleScroll);

    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col h-full w-full max-w-7xl mx-auto"> {/* Increased the width */}
      {/* Main chat container with the messages */}
      <div className="flex grow flex-col gap-4 overflow-hidden bg-black rounded-lg shadow-lg p-4 w-full">
        <div className="flex flex-col gap-2">
          <p className="uppercase text-purple-400 text-lg font-semibold">
            <b>Topic: </b>
            {topic}
          </p>
          <div
            ref={scrollableContainerRef}
            className="mt-2 h-96 overflow-y-scroll rounded-lg bg-black p-4 shadow-inner w-full"
          >
            {messages.length > 2 ? (
              <div className="prose-sm max-w-full lg:prose lg:max-w-full">
                {messages.slice(2).map((message, index) =>
                  message.role === "assistant" ? (
                    <div className="relative w-full mb-4" key={index}>
                      <Image
                        src={simpleLogo}
                        alt=""
                        className="absolute left-0 top-0 !my-0 h-8"
                      />
                      <ReactMarkdown className="w-full pl-10 text-white">
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p
                      key={index}
                      className="ml-auto w-fit rounded-xl bg-blue-500 p-4 font-medium text-white shadow-md"
                    >
                      {message.content}
                    </p>
                  ),
                )}
                <div ref={messagesEndRef} />
              </div>
            ) : (
              <div className="flex w-full flex-col gap-4 py-5">
                {Array.from(Array(10).keys()).map((i) => (
                  <div
                    key={i}
                    className={`${i < 5 && "hidden sm:block"} h-10 animate-pulse rounded-md bg-gray-700 w-full`}
                    style={{ animationDelay: `${i * 0.05}s` }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Input field container placed below the main container */}
      <div className="mt-4 w-full"> {/* Full width for input field */}
        <FinalInputArea
          disabled={disabled}
          promptValue={promptValue}
          setPromptValue={setPromptValue}
          handleChat={handleChat}
          messages={messages}
          setMessages={setMessages}
        />
      </div>
    </div>
  );
}
