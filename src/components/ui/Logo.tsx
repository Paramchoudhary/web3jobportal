"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="cursor">
      <motion.div
        className="px-2 py-2 flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="font-bold text-xl text-primary"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.span
            initial={{ color: "#F101E7" }}
            animate={{ color: ["#F101E7", "#00FFFF", "#F101E7"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            the
          </motion.span>
          Web3Jobs
        </motion.h1>
      </motion.div>
    </Link>
  );
};

export default Logo;
