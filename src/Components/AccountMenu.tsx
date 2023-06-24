import { signOut } from "next-auth/react";
import React from "react";
import useCurrentUser from "@/hooks/useCurrentUser";

interface AccountMenuProps {
  visible?: boolean;
}
const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { data: user } = useCurrentUser();

  if (!visible) return null;
  return (
    <div className="bg-black w-40 md:w-56 absolute top-14 right-0 py-3 md:py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-3">
        <div className="px-1 md:px-3 group/item flex flex-row gap-1 md:gap-3 items-center w-full">
          <img
            className="w-8 rounded-md"
            src={
              user && user?.image.length > 0
                ? user?.image
                : "/images/default-red.png"
            }
            alt=""
          />
          <p className="text-white text-sm group-hover/item:underline">
            {user?.name}
          </p>
        </div>
      </div>
      <hr className="bg-gray-600 border-0 h-px my-4" />
      <div
        onClick={() => signOut()}
        className="px-3 text-center text-red-700 text-sm hover:underline"
      >
        Sign out <span className=" text-white"> of Netflix</span>
      </div>
    </div>
  );
};

export default AccountMenu;
