"use client";
import { cn } from "@/lib/utils";
import { PropsWithChildren, useEffect, useState } from "react";

type Props = PropsWithChildren;

const DesktopNavbar = (props: Props) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const isScrolledDown = scrollPosition > 10;
  return (
    <nav
      className={cn("hidden fixed w-full z-30 text-white top-0 md:block", {
        "bg-white text-gray-700 shadow-md": isScrolledDown,
      })}
    >
      <div className="flex items-center px-4 py-4 container">
        {props.children}
      </div>
      <hr className="border-b border-gray-100 opacity-25" />
    </nav>
  );
};

export default DesktopNavbar;
