import React from "react";
import { HiOutlinePaperClip, HiOutlinePlay } from "react-icons/hi"; // Importing icons

type InitialInputAreaProps = {
  promptValue: string;
  handleInitialChat: () => void;
  setPromptValue: React.Dispatch<React.SetStateAction<string>>;
  handleChat: (messages?: { role: string; content: string }[]) => void;
  ageGroup: string;
  setAgeGroup: React.Dispatch<React.SetStateAction<string>>;
};

const InitialInputArea: React.FC<InitialInputAreaProps> = ({
  promptValue,
  handleInitialChat,
  setPromptValue,
  handleChat,
  ageGroup,
  setAgeGroup,
}) => {
  return (
    <div className="flex items-center justify-between space-x-2 bg-white/10 backdrop-blur-lg border border-white/0 rounded-3xl p-1 shadow-lg w-full max-w-[800px]"> {/* Increased border radius to rounded-3xl */}
      <label htmlFor="file-upload" className="cursor-pointer">
        <HiOutlinePaperClip className="text-gray-100 hover:text-blue-500 transition duration-300" size={20} />
        <input
          type="file"
          id="file-upload"
          className="hidden"
        />
      </label>

      <input
        type="text"
        value={promptValue}
        onChange={(e) => setPromptValue(e.target.value)}
        placeholder="Enter your topic..."
        className="flex-grow rounded-lg  border-gray-300 bg-transparent p-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        id="grade"
        name="grade"
        className="h-full w-[200px] rounded-lg border border-0 bg-transparent px-2 py-1 text-black-100 shadow-md transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        value={ageGroup}
        onChange={(e) => setAgeGroup(e.target.value)}
      >
        <option value="" disabled>Select Age Group</option>
        <option value="elementary">Elementary School</option>
        <option value="middle">Middle School</option>
        <option value="high">High School</option>
        <option value="college">College</option>
        <option value="undergrad">Undergrad</option>
        <option value="graduate">Graduate</option>
      </select>

      <button
        onClick={handleInitialChat}
        className="flex items-center rounded-full bg-blue-600 py-2 px-4 text-white transition-all hover:bg-blue-700"
      >
        <HiOutlinePlay size={20} /> {/* Icon for the button */}
      </button>
    </div>
  );
};

export default InitialInputArea;
