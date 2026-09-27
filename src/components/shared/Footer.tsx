import React from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#0F1115] px-4 py-6 text-neutral-content sm:px-6 md:px-10">
      
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">

        {/* Left - Logo & Name */}

        <div className="flex items-center gap-2 sm:gap-3">

          <Image
            src={logo}
            alt="FITLOG Logo"
            width={40}
            height={40}
            className="h-8 w-8 sm:h-10 sm:w-10"
          />

          <h2 className="text-xl font-bold sm:text-2xl">
            FITLOG
          </h2>

        </div>

        {/* Right - Copyright */}

        <div className="max-w-full sm:max-w-none">

          <p className="text-xs leading-relaxed text-gray-400 sm:text-sm sm:text-right">
            © 2026 FitLog — Workout Library. Train hard, log honest.
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;