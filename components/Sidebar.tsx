// components/Sidebar.tsx
"use client"; // Make this component a Client Component

import { FaHome, FaPencilAlt, FaCog } from "react-icons/fa"; // Icons for Home, New Page, Settings
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import Link from "next/link"; // Import Link from Next.js
import { useState } from 'react'; // Add this import
import Settings from './Settings'; // Add this import (you'll need to create this component)
import { useTheme } from "next-themes"; // Add this import
import { IconType } from 'react-icons';
import Notes from './Notes';

interface SidebarProps {
  setMessages: React.Dispatch<React.SetStateAction<{ role: string; content: string }[]>>;
  setSources: React.Dispatch<React.SetStateAction<{ name: string; url: string }[]>>;
  setShowResult: React.Dispatch<React.SetStateAction<boolean>>;
  setTopic: React.Dispatch<React.SetStateAction<string>>;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setIsLoadingSources: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({
  setMessages,
  setSources,
  setShowResult,
  setTopic,
  setInputValue,
  setIsLoadingSources,
  setLoading,
}: SidebarProps) {
  const router = useRouter(); // Initialize the router
  const [showSettings, setShowSettings] = useState(false); // Add state for settings visibility
  const { theme } = useTheme(); // Add this line
  const [showNotes, setShowNotes] = useState(false);

  const handleHomeClick = () => {
    // Refresh the page by navigating to the home page
    router.push("/");
    window.location.reload(); // Reload the page immediately  
  };

  const handleNewPageClick = () => {
    // Toggle notes panel instead of navigation
    setShowNotes(!showNotes);
  };

  const handleSettingsClick = () => {
    // Toggle settings visibility instead of navigation
    setShowSettings(!showSettings);
  };

  const icons: JSX.Element[] = [
    <FaHome key="home" onClick={handleHomeClick} className="w-7 h-7" />,
    <FaPencilAlt key="new" onClick={handleNewPageClick} className="w-7 h-7" />,
    <FaCog key="settings" onClick={handleSettingsClick} className="w-7 h-7" />
  ];

  return (
    <>
      <div className="fixed left-0 top-0 h-full w-24 bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-lg border-r border-white/10">
        <div className="flex h-full flex-col items-center justify-center gap-12">
          {icons.map((icon: JSX.Element, index: number) => (
            <div 
              key={index} 
              className="group relative cursor-pointer"
            >
              {/* Hover glow effect */}
              <div className="absolute -inset-2 rounded-xl bg-purple-500/0 blur-lg transition-all duration-300 group-hover:bg-purple-500/20" />
              
              {/* Underglow line */}
              <div className="absolute -bottom-3 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-purple-500 blur-sm transition-all duration-300 group-hover:w-full" />
              
              {/* Icon container */}
              <div className="relative p-3 text-gray-400 transition-all duration-300 group-hover:text-white group-hover:scale-110">
                {icon}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
      {showNotes && <Notes onClose={() => setShowNotes(false)} />}
    </>
  );
}
