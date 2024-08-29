"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const ComingSoon = () => {
  return (
    <main className="bg-transparent min-h-screen flex items-center justify-center">
      <motion.div
        className="max-w-screen-xl mx-auto px-4 md:px-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h3
          className="text-white text-4xl font-semibold sm:text-5xl mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Coming Soon
        </motion.h3>
        <motion.p
          className="text-secondary mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Sorry, the page you are looking for is under construction.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Link href="/" passHref>
            <motion.a
              className="text-accent duration-150 hover:text-primary font-medium inline-flex items-center gap-x-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Go back
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.a>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default ComingSoon;
