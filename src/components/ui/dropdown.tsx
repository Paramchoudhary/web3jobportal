"use client";

import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const DirectionContext = createContext<{
  direction: "rtl" | "ltr" | null;
  setAnimationDirection: (tab: number | null) => void;
} | null>(null);

const CurrentTabContext = createContext<{
  currentTab: number | null;
} | null>(null);

export const Dropdown: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentTab, setCurrentTab] = useState<null | number>(null);
  const [direction, setDirection] = useState<"rtl" | "ltr" | null>(null);

  const setAnimationDirection = (tab: number | null) => {
    if (typeof currentTab === "number" && typeof tab === "number") {
      setDirection(currentTab > tab ? "rtl" : "ltr");
    } else if (tab === null) {
      setDirection(null);
    }

    setCurrentTab(tab);
  };

  return (
    <DirectionContext.Provider value={{ direction, setAnimationDirection }}>
      <CurrentTabContext.Provider value={{ currentTab }}>
        <span
          onMouseLeave={() => setAnimationDirection(null)}
          className={
            "relative flex h-fit gap-2 backdrop-blur-lg p-1 rounded-full"
          }
        >
          {children}
        </span>
      </CurrentTabContext.Provider>
    </DirectionContext.Provider>
  );
};

export const TriggerWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { currentTab } = useContext(CurrentTabContext)!;
  const { setAnimationDirection } = useContext(DirectionContext)!;

  return (
    <>
      {React.Children.map(children, (e, i) => (
        <button
          onMouseEnter={() => setAnimationDirection(i + 1)}
          onClick={() => setAnimationDirection(i + 1)}
          className={`flex h-10 items-center gap-0.5 rounded-full px-4 py-2 text-sm font-medium text-neutral-950 transition-colors dark:text-white ${
            currentTab === i + 1
              ? "bg-neutral-100 dark:bg-neutral-800 [&>svg]:rotate-180"
              : ""
          }`}
        >
          {e}
        </button>
      ))}
    </>
  );
};

export const Trigger: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <>
      <span className={cn("", className)}>{children}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative top-[1px] ml-1 h-3 w-3 transition-transform duration-200 "
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </>
  );
};

export const Tabs: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const { currentTab } = useContext(CurrentTabContext)!;
  const { direction } = useContext(DirectionContext)!;
  return (
    <>
      <motion.div
        id="overlay-content"
        initial={{
          opacity: 0,
          scale: 0.98,
        }}
        animate={
          currentTab
            ? {
                opacity: 1,
                scale: 1,
              }
            : { opacity: 0, scale: 0.98 }
        }
        className="absolute left-0 top-[calc(100%_+_6px)] w-auto"
      >
        <div className="absolute -top-[6px] left-0 right-0 h-[6px]" />
        <div
          className={cn(
            "rounded-md border bg-[#101827ad] backdrop-blur-xl transition-all duration-300 border-neutral-800",
            className
          )}
        >
          {React.Children.map(children, (e, i) => (
            <div className="overflow-hidden">
              <AnimatePresence>
                {currentTab !== null && (
                  <motion.div exit={{ opacity: 0 }}>
                    {currentTab === i + 1 && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          x:
                            direction === "ltr"
                              ? 100
                              : direction === "rtl"
                              ? -100
                              : 0,
                        }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {e}
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export const Tab: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return <div className={cn("h-full w-[500px]", className)}>{children}</div>;
};
