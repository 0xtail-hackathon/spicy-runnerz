"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { href: "/", src: "/icons/menu-1.svg", alt: "Home" },
  { href: "/create", src: "/icons/menu-2.svg", alt: "Create" },
  { href: "/sign-in", src: "/icons/menu-3.svg", alt: "Shop" },
  { href: "/run", src: "/icons/menu-4.svg", alt: "Profile" },
];

const Footer = () => {
  const pathname = usePathname(); // Get the current path

  return (
    <>
      <footer className="fixed bottom-0 w-full h-footer flex items-center justify-between px-10 py-4 mt-auto bg-white shadow-inner">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={index}
              className={`group w-12 h-12 flex items-center justify-center rounded-xl ${
                isActive
                  ? "bg-primary-300"
                  : "bg-transparent hover:bg-primary-1000"
              }`}
              href={item.href}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={20}
                height={20}
                className={`group-hover:filter ${
                  isActive
                    ? "fill-primary-1000"
                    : "group-hover:fill-primary-1000"
                }`}
              />
            </Link>
          );
        })}
      </footer>
      <div className="w-full h-footer"></div>
    </>
  );
};

export default Footer;
