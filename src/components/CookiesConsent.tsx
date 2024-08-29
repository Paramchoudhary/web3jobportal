"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const CookiesConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 right-0 z-50 w-full sm:max-w-xl p-6"
        >
          <div className="p-4 radial-gradient border border-neutral-700 rounded-xl shadow-lg">
            <div className="flex gap-x-5">
              <div className="hidden sm:block flex-shrink-0 w-20 h-20 relative">
                <Image
                  src="/cookie.png"
                  alt="Cookie"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="grow">
                <h2 className="text-lg font-semibold text-text">
                  We are using cookies to improve your experience!
                </h2>
                <p className="mt-2 text-sm text-neutral-300">
                  By clicking &quot;Allow all&quot;, you agree to use of all
                  cookies. Visit our{" "}
                  <a
                    className="inline-flex items-center gap-x-1.5 text-accent decoration-2 hover:underline font-medium"
                    href="#"
                  >
                    Cookies Policy
                  </a>{" "}
                  to learn more.
                </p>
                <div className="mt-5 inline-flex gap-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleDismiss}
                    className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-primary text-text hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all text-sm"
                  >
                    Allow all
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-neutral-600 font-medium bg-background text-text shadow-sm align-middle hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-accent transition-all text-sm"
                  >
                    Manage cookies
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookiesConsent;
