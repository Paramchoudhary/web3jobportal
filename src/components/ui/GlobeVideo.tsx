import React from "react";
import { motion } from "framer-motion";
import { FlipWords } from "@/components/ui/flip-word";
import Badge from "./Badge";
import ShinyButton from "./ShinyButton";

const GlobeVideo = () => {
  const words = ["Web3", "NFTs", "Blockchain", "Solidity", "DAOs"];
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 top-52 z-0">
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
      <section className="absolute top-[-8rem] z-10 h-full w-full flex flex-col items-center justify-center text-white px-4 sm:px-8 md:px-12 lg:px-16">
        <section className="h-screen w-screen flex items-center justify-center bg-trnasparent">
          <motion.div
            className="max-w-screen-xl mx-auto text-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="max-w-xl space-y-3 mx-auto">
              <Badge text="Find the best jobs 🚀" />
              <motion.p
                className="text-text whitespace-nowrap text-3xl font-semibold sm:text-4xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Unlock Your Future in <FlipWords words={words} /> <br />
              </motion.p>
              <motion.p
                className="text-primary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                From blockchain developers to NFT artists, find your place in
                the decentralized revolution.
              </motion.p>
            </div>
            <motion.div
              className="mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <ShinyButton text="Get Started" />
            </motion.div>
          </motion.div>
        </section>
      </section>
    </div>
  );
};

export default GlobeVideo;
