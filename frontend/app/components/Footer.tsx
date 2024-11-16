import React from "react";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  { href: "/", src: "/icons/menu-1.svg", alt: "Home" },
  { href: "/create", src: "/icons/menu-2.svg", alt: "Create" },
  { href: "/sign-in", src: "/icons/menu-3.svg", alt: "Shop" },
  { href: "/run", src: "/icons/menu-4.svg", alt: "Profile" },
];

const Footer = () => {
  return (
    <>
      <footer className="fixed bottom-0 w-full h-footer flex items-center justify-between px-10 py-4 mt-auto bg-white shadow-inner">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            className="group w-12 h-12 flex items-center justify-center bg-transparent rounded-xl hover:bg-primary-300 active:bg-primary-300"
            href={item.href}
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={20}
              height={20}
              className="group-hover:filter group-hover:fill-primary-1000 group-active: fill-primary-1000"
            />
          </Link>
        ))}
      </footer>
      <div className="w-full h-footer"></div>
    </>
  );
};

export default Footer;
