"use client";

import { IconType } from "react-icons";
import clsx from "clsx";
import Link from "next/link";

interface Props {
  href: string;
  icon: IconType;
  active?: boolean;
  onClick?: () => void;
}

const MobileItem = (props: Props) => {
  const { href, icon: Icon, active, onClick } = props;
  const handleClick = () => {
    if (onClick) return onClick();
  };
  return (
    <Link
      onClick={handleClick}
      href={href}
      className={clsx(
        `group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold w-full justify-center py-4 text-gray-500 hover:text-black hover:bg-gray-100`,
        active && "bg-gray-100 text-black"
      )}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
};

export default MobileItem;
