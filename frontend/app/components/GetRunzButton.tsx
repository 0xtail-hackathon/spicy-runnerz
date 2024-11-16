import Link from "next/link";
import React from "react";

interface GetRunzButtonProps {
  top: string; // Allow custom top position
  link: string;
}

const GetRunzButton: React.FC<GetRunzButtonProps> = ({
  top = "32",
  link = "/",
}) => {
  return (
    <Link
      href={link}
      passHref
      className={`fixed top-${top} bg-gray-800 text-white py-4 px-6 rounded-full shadow-md z-10 flex items-center justify-between w-10/12 max-w-lg`}
    >
      Get your RUNZ 🎉
      <span className="ml-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
};

export default GetRunzButton;
