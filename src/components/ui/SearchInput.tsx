"use client";
import React from "react";
import { motion } from "framer-motion";

const SearchInput = () => {
  return (
    <>
      <form className="relative flex w-full max-w-md items-center gap-2 rounded-full border border-white/20 bg-gradient-to-br from-white/20 to-white/5 py-1.5 pl-6 pr-1.5">
        <input
          type="email"
          placeholder="Find jobs,internships, and more..."
          className="w-full bg-transparent text-sm text-white placeholder-white/80 focus:outline-0"
        />
        <button
          type="submit"
          className="group flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-br from-gray-50 to-gray-400 px-4 py-3 text-sm font-medium text-gray-900 transition-transform active:scale-[0.985]"
        >
          <span>Search</span>
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="-mr-4 opacity-0 transition-all group-hover:-mr-0 group-hover:opacity-100 group-active:-rotate-45"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
        <div className="pointer-events-none absolute inset-0 z-10 rounded-full">
          <motion.div
            className="mask-with-browser-support absolute -inset-[1px] rounded-full border border-transparent bg-origin-border"
            style={{
              backgroundImage:
                "conic-gradient(from var(--angle), rgba(167, 139, 250, 0) 75%, rgb(167, 139, 250) 100%)",
            }}
            animate={{
              "--angle": ["0turn", "1turn"],
            }}
            transition={{
              duration: 3,
              ease: "linear",
              repeat: Infinity,
            }}
          />
        </div>
      </form>
    </>
  );
};

export default SearchInput;
