import React from "react";
import { motion } from "framer-motion";

const GlobeVideo = () => {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 top-24 z-0">
        <motion.video
          className="w-full h-full object-cover"
          playsInline
          loop
          muted
          autoPlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <source src="/cards-video.webm" type="video/webm" />
        </motion.video>
      </div>
      <div className="absolute top-[-6rem] z-10 h-full flex flex-col items-center justify-center text-white px-4 sm:px-8 md:px-12 lg:px-16">
        <motion.h1
          className="text-4xl text-center sm:text-5xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          The #1 Job Board <br /> for finding your next web3 job
        </motion.h1>
        <motion.p
          className="text-xl text-center sm:text-2xl md:text-3xl mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Web3jobportal is where web3 meets work and the best place to discover
          and connect with degens and jobs worldwide.
        </motion.p>
      </div>
    </div>
  );
};

export default GlobeVideo;
