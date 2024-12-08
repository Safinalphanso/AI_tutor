import { FC, KeyboardEvent } from "react";
import { HiPaperAirplane } from "react-icons/hi";

type TInputAreaProps = {
  promptValue: string;
  setPromptValue: React.Dispatch<React.SetStateAction<string>>;
  disabled?: boolean;
  messages: { role: string; content: string }[];
  setMessages: React.Dispatch<
    React.SetStateAction<{ role: string; content: string }[]>
  >;
  handleChat: (messages?: { role: string; content: string }[]) => void;
};

const FinalInputArea: FC<TInputAreaProps> = ({
  promptValue,
  setPromptValue,
  disabled,
  messages,
  setMessages,
  handleChat,
}) => {
  function onSubmit() {
    let latestMessages = [...messages, { role: "user", content: promptValue }];
    setPromptValue("");
    setMessages(latestMessages);
    handleChat(latestMessages);
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        return;
      } else {
        e.preventDefault();
        onSubmit();
      }
    }
  };

  return (
    <form
      className="mx-auto flex w-full items-center justify-between p-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="input-area flex w-full items-center gap-4 px-6">
        <input
          type="text"
          className="input-field flex-1"
          value={promptValue}
          onChange={(e) => setPromptValue(e.target.value)}
          placeholder="Type your message..."
          disabled={disabled}
        />
        <button 
          type="submit"
          className="primary-button !p-2 rounded-full aspect-square flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={disabled || !promptValue.trim()}
        >
          <HiPaperAirplane className="h-5 w-5 rotate-90" />
        </button>
      </div>
    </form>
  );
};

export default FinalInputArea;
