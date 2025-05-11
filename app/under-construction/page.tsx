"use client";
import { motion } from "framer-motion";
import { FiTool } from "react-icons/fi"; // Removed FiHardHat
import { useRouter } from "next/navigation"; // Import useRouter
import { FaHardHat, FaTools } from "react-icons/fa";

export default function UnderConstruction() {
  const router = useRouter(); // Initialize the router

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
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

  // const floatingAnim = {
  //   y: [-5, 5],
  //   transition: {
  //     y: {
  //       duration: 2,
  //       repeat: Infinity,
  //       repeatType: "reverse",
  //       ease: "easeInOut",
  //     },
  //   },
  // };

  // Function to handle the redirect
  const handleRedirect = () => {
    router.push("/"); // Redirect to the home page
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
          <motion.div
            animate={{
              y: [-5, 5],
              transition: {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
          >
            <FaTools className="text-5xl text-red-500 mx-auto" />
          </motion.div>

          <motion.div
            animate={{
              y: [-8, 8],
              transition: {
                duration: 2.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
          >
            <FaHardHat className="text-5xl text-orange-500 mx-auto" />
          </motion.div>

          <motion.div
            animate={{
              y: [-5, 5],
              transition: {
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.5,
              },
            }}
          >
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
          We&apos;re working hard to bring you something amazing! Please check back soon.
        </motion.p>

        {/* Redirect Button */}
        <motion.div variants={itemVariants}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRedirect} // Trigger redirect on button click
            className="px-8 py-3 bg-red-500 text-white rounded-full font-medium shadow-lg hover:bg-red-600 transition-colors"
          >
            Go to Home Page
          </motion.button>
        </motion.div>

        {/* Floating Construction Elements */}
        <motion.div
          className="absolute bottom-10 left-10 text-[100px] opacity-20"
          animate={{
            rotate: [0, 360],
            transition: {
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          🚧
        </motion.div>
        <motion.div
          className="absolute top-20 right-10 text-[100px] opacity-20"
          animate={{
            rotate: [360, 0],
            transition: {
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          🔨
        </motion.div>
      </motion.div>
    </div>
  );
}
