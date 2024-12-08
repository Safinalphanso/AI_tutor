import React, { useCallback } from "react";
import { HiOutlinePaperClip, HiOutlinePlay } from "react-icons/hi";
import { motion } from "framer-motion"; // Add smooth animations

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
  // Handle keyboard submission
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleInitialChat();
    }
  }, [handleInitialChat]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between space-x-2 bg-white/10 backdrop-blur-lg border border-white/0 rounded-3xl p-1 shadow-lg w-full max-w-[800px] hover:bg-white/15 transition-all duration-300"
    >
      <label 
        htmlFor="file-upload" 
        className="cursor-pointer p-2 hover:bg-white/10 rounded-full transition duration-300"
        aria-label="Upload file"
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <HiOutlinePaperClip className="text-gray-100 hover:text-blue-500 transition duration-300" size={20} />
        </motion.div>
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept=".txt,.pdf,.doc,.docx"
          aria-label="Upload file"
        />
      </label>

      <motion.input
        type="text"
        value={promptValue}
        onChange={(e) => setPromptValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter your topic..."
        className="flex-grow rounded-lg border-gray-300 bg-transparent p-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        aria-label="Topic input"
      />

      <motion.select
        id="grade"
        name="grade"
        className="h-full w-[200px] rounded-lg border border-gray-300 bg-transparent px-2 py-1 text-white shadow-lg transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 cursor-pointer"
        value={ageGroup}
        onChange={(e) => setAgeGroup(e.target.value)}
        aria-label="Select age group"
        whileHover={{ scale: 1.02 }}
      >
        <option value="" disabled className="text-gray-900">Select Age Group</option>
        <option value="elementary" className="text-gray-900">Elementary School</option>
        <option value="middle" className="text-gray-900">Middle School</option>
        <option value="high" className="text-gray-900">High School</option>
        <option value="college" className="text-gray-900">College</option>
        <option value="undergrad" className="text-gray-900">Undergrad</option>
        <option value="graduate" className="text-gray-900">Graduate</option>
      </motion.select>

      <motion.button
        onClick={handleInitialChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center rounded-full bg-purple-600 py-2 px-4 text-white transition-all hover:bg-blue-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!promptValue.trim() || !ageGroup}
        aria-label="Start chat"
      >
        <HiOutlinePlay size={20} />
      </motion.button>
    </motion.div>
  );
};

export default InitialInputArea;
