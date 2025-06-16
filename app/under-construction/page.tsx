"use client";
import { motion, Variants, TargetAndTransition } from "framer-motion";
import { FiTool } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { FaHardHat, FaTools } from "react-icons/fa";
import type { JSX } from "react";

export default function UnderConstruction(): JSX.Element {
  const router = useRouter();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  // Function to handle the redirect
  const handleRedirect = (): void => {
    router.push("/");
  };

  // Animation configurations
  const toolsAnimation: TargetAndTransition = {
    y: [-5, 5],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  };

  const hardhatAnimation: TargetAndTransition = {
    y: [-8, 8],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  };

  const toolAnimation: TargetAndTransition = {
    y: [-5, 5],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
      delay: 0.5,
    },
  };

  const constructionSignAnimation: TargetAndTransition = {
    rotate: [0, 360],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    },
  };

  const hammerAnimation: TargetAndTransition = {
    rotate: [360, 0],
    transition: {
      duration: 25,
      repeat: Infinity,
      ease: "linear",
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 px-4 animate-gradientBackground">
      <motion.div
        className="max-w-2xl w-full text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Construction Icons */}
        <div className="flex justify-center gap-6 mb-8">
          <motion.div animate={toolsAnimation}>
            <FaTools className="text-5xl text-red-500 mx-auto" />
          </motion.div>

          <motion.div animate={hardhatAnimation}>
            <FaHardHat className="text-5xl text-orange-500 mx-auto" />
          </motion.div>

          <motion.div animate={toolAnimation}>
            <FiTool className="text-5xl text-amber-500 mx-auto" />
          </motion.div>
        </div>

        {/* Main Heading */}
        <motion.h1
          className="text-4xl sm:text-5xl font-bold text-red-600 mb-6"
          variants={itemVariants}
        >
          Under Construction
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-lg sm:text-xl text-gray-700 mb-8 max-w-lg mx-auto"
          variants={itemVariants}
        >
          We&apos;re working hard to bring you something amazing! Please check
          back soon.
        </motion.p>

        {/* Redirect Button */}
        <motion.div variants={itemVariants}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRedirect}
            className="px-8 py-3 bg-red-500 text-white rounded-full font-medium shadow-lg hover:bg-red-600 transition-colors"
            type="button"
          >
            Go to Home Page
          </motion.button>
        </motion.div>

        {/* Floating Construction Elements */}
        <motion.div
          className="absolute bottom-10 left-10 text-[100px] opacity-20"
          animate={constructionSignAnimation}
          aria-hidden="true"
        >
          🚧
        </motion.div>
        <motion.div
          className="absolute top-20 right-10 text-[100px] opacity-20"
          animate={hammerAnimation}
          aria-hidden="true"
        >
          🔨
        </motion.div>
      </motion.div>
    </div>
  );
}
