"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import { FunctionComponent } from "react";
import { FaUserCircle } from "react-icons/fa";

interface AvatarProps {
  user: User;
}

const Avatar: FunctionComponent<AvatarProps> = ({ user }) => {
  return (
    <div className=" relative w-fit">
      <div className=" relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
        {user?.image ? (
          <Image alt="Avatar" src={user.image} fill />
        ) : (
          <FaUserCircle className=" h-full w-full" />
        )}
      </div>
      <span className=" absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3" />
    </div>
  );
};

export default Avatar;
