// components/Sidebar.tsx
import { FaHome, FaPlus, FaCog } from "react-icons/fa"; // Icons for Home, New Page, Settings

export default function Sidebar() {
  return (
    <div className="h-[600px] w-14 fixed top-5 left-5 z-20 flex flex-col justify-between p-4 bg-white/20 backdrop-blur-lg transition-all duration-300 rounded-full hover:bg-white/30 hover:scale-105"> {/* Added hover effects */}
      <div className="flex flex-col items-center gap-6 mt-6">
        {/* Home Icon */}
        <FaHome className="text-white text-2xl hover:scale-110 transition-all duration-300 cursor-pointer" />
        {/* New Page Icon */}
        <FaPlus className="text-white text-2xl hover:scale-110 transition-all duration-300 cursor-pointer" />
      </div>
      {/* Settings Icon at the Bottom */}
      <div className="mb-4">
        <FaCog className="text-white text-2xl hover:scale-110 transition-all duration-300 cursor-pointer" />
      </div>
    </div>
  );
}
