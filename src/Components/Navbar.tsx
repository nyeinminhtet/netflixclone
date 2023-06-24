import React, { useCallback, useEffect, useState } from "react";
import NavbarItem from "./NavbarItem";
import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";
import useCurrentUser from "@/hooks/useCurrentUser";

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const { data: user } = useCurrentUser();
  console.log("user", user);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  return (
    <nav className="fixed z-40 w-full">
      <div
        className={`
                px-4
                md:px-16
                py-6
                flex
                items-center
                transition
                 duration-500
                 ${showBackground ? "bg-zinc-900 bg-opacity-40" : ""}
          `}
      >
        <img src="/images/logo.png" alt="logo" className="h-4 lg:h-7" />
        <div className="flex-row ml-5 gap-7 hidden lg:flex">
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Flims" />
          <NavbarItem label="News & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by Languages" />
        </div>
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-3 md:ml:5 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown
            className={`text-white transition duration-500 ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-3 md:gap-7 items-center">
          <div className=" text-gray-200 hover:text-gray-400 cursor-pointer">
            <BsSearch />
          </div>
          <div className=" text-gray-200 hover:text-gray-400 cursor-pointer">
            <BsBell />
          </div>
        </div>
        <div
          onClick={toggleAccountMenu}
          className="flex flex-row items-center ml-3 md:ml-4 gap-1 md:gap-2 cursor-pointer relative"
        >
          <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
            <img
              src={
                user && user?.image.length > 0
                  ? user?.image
                  : "/images/default-red.png"
              }
              alt=""
            />
          </div>
          <BsChevronDown
            className={`text-white transition duration-500 ${
              showAccountMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <AccountMenu visible={showAccountMenu} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
