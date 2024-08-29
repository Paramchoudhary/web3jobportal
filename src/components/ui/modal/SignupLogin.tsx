import React, { useState } from "react";
import { motion } from "framer-motion";
import ShinyButton from "../ShinyButton";
import Link from "next/link";

const SignupLogin = ({ close }: { close: () => void }) => {
  const [activeTab, setActiveTab] = useState("login");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto radial-gradient bg-primary backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden"
    >
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {activeTab === "login" ? "Log In" : "Sign Up"}
          </h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={close}
            className="text-neutral-400 hover:text-white transition-colors"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 18L18 6M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        </div>

        <div className="flex space-x-4 mb-8">
          {["login", "signup"].map((tab) => (
            <motion.button
              key={tab}
              className={`text-lg font-semibold pb-2 px-2 cursor-pointer transition-colors ${
                activeTab === tab
                  ? "text-primary border-b-2 border-primary"
                  : "text-neutral-400 hover:text-white"
              }`}
              onClick={() => handleTabClick(tab)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab === "login" ? "Log In" : "Sign Up"}
            </motion.button>
          ))}
        </div>

        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="input-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="input-base"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="input-base"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex items-center">
            <input type="checkbox" id="remember" className="checkbox-base" />
            <label htmlFor="remember" className="checkbox-label">
              Remember me
            </label>
          </div>

          <motion.button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-full font-semibold hover:bg-primary/80 transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {activeTab === "login" ? "Log In" : "Sign Up"}
          </motion.button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 rounded-sm bg-neutral-800 text-neutral-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <ShinyButton>
              <svg
                className="h-5 w-5 mr-2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign in with Google
            </ShinyButton>
          </div>
        </div>
      </div>
      <div className="px-8 py-4 radial-gradient  border-t border-neutral-700">
        <p className="text-xs text-neutral-400 text-center">
          By signing up, you agree to our{" "}
          <Link
            href="/terms-of-service"
            className="font-medium text-primary hover:text-primary/80"
          >
            Terms
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy-policy"
            className="font-medium text-primary hover:text-primary/80"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </motion.div>
  );
};

export default SignupLogin;
