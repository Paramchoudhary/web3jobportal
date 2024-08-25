import React from "react";
import { motion } from "framer-motion";
import { FlipWords } from "@/components/ui/flip-word";

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
              <motion.h3
                className="text-accent font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                funnnnn
              </motion.h3>
              <motion.p
                className="text-primary whitespace-nowrap text-3xl font-semibold sm:text-4xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Unlock Your Future in <FlipWords words={words} /> <br />
              </motion.p>
              <motion.p
                className="text-secondary"
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
              <motion.a
                href="javascript:void(0)"
                className="inline-block py-2 px-4 text-black font-medium bg-accent duration-150 hover:bg-primary hover:text-white active:bg-secondary rounded-lg shadow-md hover:shadow-none"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Post Job
              </motion.a>
            </motion.div>
          </motion.div>
        </section>
      </section>
    </div>
  );
};

export default GlobeVideo;
