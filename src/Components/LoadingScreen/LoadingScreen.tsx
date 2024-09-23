import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-black to-blue-900 flex items-center justify-center z-50">
      {/* Spinner */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 border-t-4 border-b-4 border-gray-300 rounded-full"
      />

      {/* Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-3/4 text-xl text-white mt-6 font-semibold"
      >
        Loading ...
      </motion.p>
    </div>
  );
};

export default LoadingScreen;
