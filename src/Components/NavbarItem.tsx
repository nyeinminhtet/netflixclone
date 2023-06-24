import React from "react";

interface Props {
  label: string;
}

const NavbarItem: React.FC<Props> = ({ label }) => {
  return (
    <div className="text-white cursor-pointer hover:text-gray-400">{label}</div>
  );
};

export default NavbarItem;
