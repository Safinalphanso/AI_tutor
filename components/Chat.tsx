import ReactMarkdown from "react-markdown";
import FinalInputArea from "./FinalInputArea";
import { useEffect, useRef, useState } from "react";
import simpleLogo from "../public/simple-logo.png";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { HiPlus } from 'react-icons/hi';
import { useNotes } from '@/contexts/NotesContext';

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
  const { addNote } = useNotes();

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
            className="mt-2 h-[calc(100vh-15rem)] overflow-y-auto custom-scrollbar rounded-lg bg-black p-4 shadow-inner"
          >
            {messages.length > 2 ? (
              <div className="prose-sm max-w-full lg:prose lg:max-w-full space-y-6">
                {messages.slice(2).map((message, index) =>
                  message.role === "assistant" ? (
                    <div key={index} className="flex items-start space-x-6 mb-6">
                      <div className="flex-shrink-0 w-10 h-10 p-1">
                        <Image
                          src={simpleLogo}
                          alt="AI"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      </div>
                      <div className="flex-grow bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg relative group">
                        <ReactMarkdown className="text-white prose prose-invert max-w-none">
                          {message.content}
                        </ReactMarkdown>
                        {message.role === "assistant" && (
                          <button
                            onClick={() => addNote(message.content)}
                            className="absolute top-2 right-2 p-2 text-gray-400 hover:text-purple-500 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <HiPlus className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div key={index} className="flex items-start space-x-11 mb-6 flex-row-reverse pr-4">
                      <div className="flex-shrink-0 w-10 h-10 ml-2">
                        <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center p-2">
                          <FaUser className="text-white w-5 h-5" />
                        </div>
                      </div>
                      <div className="bg-purple-600 rounded-2xl p-4 shadow-lg text-white max-w-[80%]">
                        {message.content}
                      </div>
                    </div>
                  ),
                )}
                <div ref={messagesEndRef} />
              </div>
            ) : (
              <div className="flex w-full flex-col gap-4 py-5">
                {Array.from(Array(10).keys()).map((i) => (
                  <div
                    key={i}
                    className={`${
                      i < 5 && "hidden sm:block"
                    } h-10 animate-pulse rounded-md bg-gray-700 w-full`}
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
