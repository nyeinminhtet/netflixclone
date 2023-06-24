import React from "react";

interface Prosp {
  visible: boolean;
}

const MobileMenu: React.FC<Prosp> = ({ visible }) => {
  if (!visible) return null;

  return (
    <div className="bg-black w-56 absolute flex flex-col left-0 py-5 border-2 border-gray-800 top-8">
      <div className="flex flex-col gap-4">
        <div className="text-white text-center px-3 hover:underline">Home</div>
        <div className="text-white text-center px-3 hover:underline">
          Series
        </div>
        <div className="text-white text-center px-3 hover:underline">Flims</div>
        <div className="text-white text-center px-3 hover:underline">
          New & Popular
        </div>
        <div className="text-white text-center px-3 hover:underline">
          My List
        </div>
        <div className="text-white text-center px-3 hover:underline">
          Browse by Languages
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
