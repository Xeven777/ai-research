import React from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed left-1/2 top-2 z-50 flex w-full max-w-6xl -translate-x-1/2 items-center justify-between rounded-full bg-background/40 py-2 shadow-lg shadow-primary/5 backdrop-blur-md">
      <div className="flex items-center justify-center gap-2 px-2 text-2xl font-semibold">
        <div className="size-10 rounded-full bg-gradient-to-bl from-primary to-muted"></div>
        ResearchX
      </div>
      <div className="flex items-center justify-center gap-2 px-2">
        <ThemeToggle />
        <a
          //   href="http://github.com/xeven777"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="rounded-full">Get Started</Button>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
