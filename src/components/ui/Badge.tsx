"use client";
import React from "react";
import { motion } from "framer-motion";

interface IBadge {
  text: string;
}

const Badge = ({ text = "Find the best jobs 🚀" }: IBadge) => {
  return (
    <>
      <div className="radial-gradient inline-block rounded-full px-4 py-1">
        <motion.span
          className="text-accent text-[16px] flex justify-center items-center font-normal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {text}
        </motion.span>
      </div>
    </>
  );
};

export default Badge;
