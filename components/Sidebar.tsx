// components/Sidebar.tsx
"use client"; // Make this component a Client Component

import { FaHome, FaPlus, FaCog } from "react-icons/fa"; // Icons for Home, New Page, Settings
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import Link from "next/link"; // Import Link from Next.js

export default function Sidebar() {
  const router = useRouter(); // Initialize the router

  const handleHomeClick = () => {
    // Refresh the page by navigating to the home page
    router.push("/");
    window.location.reload(); // Reload the page immediately  
  };

  return (
    <div className="h-[300px] w-14 fixed top-1/2 left-5 z-20 flex flex-col justify-around items-center bg-white/20 backdrop-blur-lg transition-all duration-300 rounded-full hover:bg-white/30 hover:scale-105 transform -translate-y-1/2 p-2">
      {/* Home Icon with click handler */}
      <div onClick={handleHomeClick} className="cursor-pointer">
        <FaHome className="text-white text-2xl hover:scale-110 transition-all duration-300" />
      </div>

      {/* New Page Icon with Link */}
      <Link href="/new" passHref>
        <FaPlus className="text-white text-2xl hover:scale-110 transition-all duration-300 cursor-pointer" />
      </Link>

      {/* Settings Icon with Link */}
      <Link href="/settings" passHref>
        <FaCog className="text-white text-2xl hover:scale-110 transition-all duration-300 cursor-pointer" />
      </Link>
    </div>
  );
}
