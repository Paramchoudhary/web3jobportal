import { motion } from "framer-motion";

interface IShinyButton {
  text: string;
}

const ShinyButton = ({ text = "Empty" }: IShinyButton) => {
  return (
    <motion.button
      initial={{ "--x": "100%", scale: 1 }}
      animate={{ "--x": "-100%" }}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 1,
        type: "spring",
        stiffness: 20,
        damping: 15,
        mass: 2,
        scale: {
          type: "spring",
          stiffness: 10,
          damping: 5,
          mass: 0.1,
          duration: 0.3,
        },
      }}
      className="px-6 py-2 rounded-full relative radial-gradient bg-primary"
    >
      <span className="text-text tracking-wide font-light h-full w-full block relative linear-mask">
        {text}
      </span>
      <span className="block absolute inset-0 rounded-full p-px linear-overlay" />
    </motion.button>
  );
};

export default ShinyButton;
