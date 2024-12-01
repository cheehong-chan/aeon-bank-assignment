"use client";

import { MenuIcon, SearchIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = [
    { title: "Showcase", link: "showcase" },
    { title: "Docs", link: "docs" },
    { title: "Blog", link: "blog" },
    { title: "Analytics", link: "analytics" },
    { title: "Commerce", link: "commerce" },
    { title: "Templates", link: "templates" },
    { title: "Enterprise", link: "enterprise" },
  ];

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const router = useRouter();

  return (
    <nav className="fixed top-0 w-full bg-gray-800 text-white">
      <div className="p-5 flex items-center justify-between h-16">
        <div className="flex items-center gap-x-5">
          <Link className="text-xl font-bold" href="/">
            AEON
          </Link>
          <div className="hidden md:flex">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                href={item.link}
                className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="hidden md:flex w-1/4 gap-x-2">
          <input
            type="text"
            placeholder="Search documentation..."
            className="text-sm text-black rounded-md p-2 w-3/4"
          />
          <button
            className="bg-gray-700 hover:bg-gray-500 px-3 py-2 rounded-md text-sm"
            onClick={() => router.push("/auth")}
          >
            Login
          </button>
        </div>
        <div className="flex md:hidden">
          <button
            className="bg-gray-700 hover:bg-gray-500 px-3 py-2 rounded-md text-sm"
            onClick={() => router.push("/auth")}
          >
            Login
          </button>
          <button className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
            <span className="text-2xl">
              <SearchIcon />
            </span>
          </button>
          <button
            onClick={toggleNavbar}
            className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
          >
            {isOpen ? (
              <span className="text-2xl">
                <XIcon />
              </span>
            ) : (
              <span className="text-2xl">
                <MenuIcon />
              </span>
            )}
          </button>
        </div>
      </div>
      <div
        className={`md:hidden transition-transform duration-300 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="space-y-2 px-4 pb-4">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.link}
              className="block hover:bg-gray-700 px-3 py-2 rounded-md"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
