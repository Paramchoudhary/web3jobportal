import { motion } from "framer-motion";

interface IShinyButton {
  text?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const ShinyButton = ({ text = "Empty", children, onClick }: IShinyButton) => {
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
      onClick={onClick}
      className="px-6 py-2 w-full rounded-full relative radial-gradient bg-primary"
    >
      <span className="text-text flex justify-center items-center tracking-wide font-light h-full w-full relative linear-mask">
        {children || text}
      </span>
      <span className="block absolute inset-0 rounded-full p-px linear-overlay" />
    </motion.button>
  );
};

export default ShinyButton;
