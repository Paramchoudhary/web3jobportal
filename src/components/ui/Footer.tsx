"use client";
import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Footer = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const controls = useAnimation();

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const marqueeVariants = {
    animate: {
      x: [0, -100],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    },
  };

  return (
    <>
      <motion.footer
        className="bg-gradient-to-b to-secondary from-transparent py-12 pb-0 px-10 font-sans tracking-wide"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        ref={ref}
      >
        <div className="lg:max-w-[50%] mx-auto text-center">
          <motion.h3
            className="text-3xl font-bold text-white"
            variants={itemVariants}
          >
            Newsletter
          </motion.h3>
          <motion.p
            className="text-sm mt-6 text-gray-400"
            variants={itemVariants}
          >
            Subscribe to our newsletter and stay up to date with the latest
            news, updates, and exclusive offers. Get valuable insights. Join our
            community today!
          </motion.p>

          <motion.div
            className="bg-gray-800 flex px-2 py-1.5 rounded-full text-left mt-10"
            variants={itemVariants}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full outline-none bg-transparent text-sm pl-4 text-gray-400"
            />
            <button
              type="button"
              className="bg-accent hover:bg-accent/80 text-white text-sm rounded-full px-5 py-2.5 ml-4 transition-all"
            >
              Submit
            </button>
          </motion.div>
        </div>

        <motion.hr className="border-gray-700 my-12" variants={itemVariants} />

        <motion.div
          className="grid max-sm:grid-cols-1 max-lg:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={itemVariants}
        >
          <div>
            <motion.h4
              className="text-lg font-bold mb-6 text-white"
              variants={itemVariants}
            >
              About Us
            </motion.h4>
            <motion.p
              className="text-gray-400 mb-2 text-sm"
              variants={itemVariants}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              gravida, mi eu pulvinar cursus, sem elit interdum mauris.
            </motion.p>
          </div>

          <div>
            <motion.h4
              className="text-lg font-bold mb-6 text-white"
              variants={itemVariants}
            >
              Services
            </motion.h4>
            <motion.ul className="space-y-4" variants={itemVariants}>
              <li>
                <a
                  href="javascript:void(0)"
                  className="text-gray-400 hover:text-white text-[15px]"
                >
                  Web Development
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="text-gray-400 hover:text-white text-[15px]"
                >
                  Mobile App Development
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="text-gray-400 hover:text-white text-[15px]"
                >
                  UI/UX Design
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="text-gray-400 hover:text-white text-[15px]"
                >
                  Digital Marketing
                </a>
              </li>
            </motion.ul>
          </div>

          <div>
            <motion.h4
              className="text-lg font-bold mb-6 text-white"
              variants={itemVariants}
            >
              Resources
            </motion.h4>
            <motion.ul className="space-y-4" variants={itemVariants}>
              <li>
                <a
                  href="javascript:void(0)"
                  className="text-gray-400 hover:text-white text-[15px]"
                >
                  Webinars
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="text-gray-400 hover:text-white text-[15px]"
                >
                  Ebooks
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="text-gray-400 hover:text-white text-[15px]"
                >
                  Templates
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="text-gray-400 hover:text-white text-[15px]"
                >
                  Tutorials
                </a>
              </li>
            </motion.ul>
          </div>

          <div>
            <motion.h4
              className="text-lg font-bold mb-6 text-white"
              variants={itemVariants}
            >
              About Us
            </motion.h4>
            <motion.ul className="space-y-4" variants={itemVariants}>
              <li>
                <a
                  href="javascript:void(0)"
                  className="text-gray-400 hover:text-white text-[15px]"
                >
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="text-gray-400 hover:text-white text-[15px]"
                >
                  Mission and Values
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="text-gray-400 hover:text-white text-[15px]"
                >
                  Team
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="text-gray-400 hover:text-white text-[15px]"
                >
                  Testimonials
                </a>
              </li>
            </motion.ul>
          </div>
        </motion.div>

        <div className="py-4 px-4 text-center mt-10">
          <motion.p className="text-white text-base" variants={itemVariants}>
            © Web3JobPortal. All rights reserved.
          </motion.p>
        </div>
      </motion.footer>
    </>
  );
};

export default Footer;
