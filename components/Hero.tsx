import Image from "next/image";
import { FC } from "react";
import InitialInputArea from "./InitialInputArea";
import { suggestions } from "@/utils/utils";

type THeroProps = {
  promptValue: string;
  setPromptValue: React.Dispatch<React.SetStateAction<string>>;
  handleChat: (messages?: { role: string; content: string }[]) => void;
  ageGroup: string;
  setAgeGroup: React.Dispatch<React.SetStateAction<string>>;
  handleInitialChat: () => void;
};

const Hero: FC<THeroProps> = ({
  promptValue,
  setPromptValue,
  handleChat,
  ageGroup,
  setAgeGroup,
  handleInitialChat,
}) => {
  const handleClickSuggestion = (value: string) => {
    setPromptValue(value);
  };

  return (
    <div className="flex-grow p-6">
      <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center justify-center">
        <a
          className="mb-4 inline-flex h-7 shrink-0 items-center gap-[9px] rounded-full border  bg-white/40 backdrop-blur-md px-5 py-4 shadow-lg"
          href="https://www.together.ai/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            unoptimized
            src="/togethercomputer.png"
            alt="hero"
            width={20}
            height={20}
          />
          <span className="text-center text-sm font-medium italic">
            Powered by <b>Together AI</b>
          </span>
        </a>

        <h2 className="mt-2 bg-custom-gradient bg-clip-text text-center text-4xl font-medium tracking-tight text-gray-100 sm:text-6xl">
          Your Personal{" "}
          <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text font-bold text-transparent">
            Tutor
          </span>
        </h2>

        <p className="mt-4 text-balance text-center text-sm sm:text-base text-gray-300">
          Enter a topic you want to learn about along with the education level
          you want to be taught at and generate a personalized tutor tailored to
          you!
        </p>

        <div className="mt-4 w-full pb-6">
          <InitialInputArea
            promptValue={promptValue}
            handleInitialChat={handleInitialChat}
            setPromptValue={setPromptValue}
            handleChat={handleChat}
            ageGroup={ageGroup}
            setAgeGroup={setAgeGroup}
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 pb-[30px] lg:flex-nowrap lg:justify-normal">
          {suggestions.map((item) => (
            <div
              className="flex h-[35px] cursor-pointer items-center justify-center gap-[5px] rounded-full border border-solid border-[#C1C1C1] bg-gray-800 hover:bg-gray-700 transition duration-200 px-4 py-2"
              onClick={() => handleClickSuggestion(item?.name)}
              key={item.id}
            >
              <Image
                src={item.icon}
                alt={item.name}
                width={18}
                height={16}
                className="w-[18px]"
              />
              <span className="text-sm font-light leading-[normal] text-gray-100">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        <p className="text-center text-sm font-light leading-[normal] text-gray-300">
          Fully open source!{" "}
          <span className="text-sm font-medium underline">
            <a
              href="https://github.com/Nutlope/llamatutor"
              target="_blank"
              rel="noopener noreferrer"
            >
              Star it on GitHub.
            </a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Hero;
