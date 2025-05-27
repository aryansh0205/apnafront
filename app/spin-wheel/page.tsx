// "use client";
// import { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import { FiRotateCw, FiX, FiGift } from "react-icons/fi";

// const SpinWheelPage = () => {
//   const [spinning, setSpinning] = useState(false);
//   const [result, setResult] = useState<number | null>(null);
//   const [showResult, setShowResult] = useState(false);
//   const [spinsLeft, setSpinsLeft] = useState(1); // Daily spins
//   const wheelRef = useRef<HTMLDivElement>(null);

//   // Wheel segments with colors and prizes
//   const segments = [
//     { prize: "10% OFF", color: "#FF5252", coupon: "SPIN10" },
//     { prize: "Free Drink", color: "#FFD166", coupon: "FREEBIE1" },
//     { prize: "20% OFF", color: "#06D6A0", coupon: "SPIN20" },
//     { prize: "Better Luck", color: "#118AB2", coupon: "" },
//     { prize: "Free Dessert", color: "#073B4C", coupon: "SWEETFREE" },
//     { prize: "5% OFF", color: "#EF476F", coupon: "SPIN5" },
//     { prize: "Free Appetizer", color: "#FFC43D", coupon: "STARTER" },
//     { prize: "15% OFF", color: "#1B9AAA", coupon: "SPIN15" },
//   ];

//   const spinWheel = () => {
//     if (spinning || spinsLeft <= 0) return;

//     setSpinning(true);
//     setResult(null);
//     setShowResult(false);

//     // Random spin with weighted probabilities (better prizes are less likely)
//     const weightedOutcomes = [0, 1, 2, 3, 3, 4, 5, 5, 6, 6, 7, 7]; // More entries = more likely
//     const winningSegment =
//       weightedOutcomes[Math.floor(Math.random() * weightedOutcomes.length)];

//     // Calculate rotation (5 full rotations + segment offset)
//     const degrees = 1800 + winningSegment * 45 + Math.floor(Math.random() * 30);

//     if (wheelRef.current) {
//       wheelRef.current.style.transition =
//         "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)";
//       wheelRef.current.style.transform = `rotate(${degrees}deg)`;
//     }

//     setTimeout(() => {
//       setSpinning(false);
//       setResult(winningSegment);
//       setSpinsLeft(spinsLeft - 1);

//       // Show result after slight delay
//       setTimeout(() => setShowResult(true), 500);
//     }, 4000);
//   };

//   const resetWheel = () => {
//     if (wheelRef.current) {
//       wheelRef.current.style.transition = "none";
//       wheelRef.current.style.transform = "rotate(0deg)";
//     }
//     setShowResult(false);
//     setResult(null);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12 px-4">
//       <div className="max-w-md mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-light text-gray-800 mb-2">
//             Daily Spin & Win
//           </h1>
//           <p className="text-gray-600">
//             Try your luck to unlock exclusive offers!
//           </p>
//           <div className="mt-4 flex items-center justify-center gap-2">
//             <FiGift className="text-red-400" />
//             <span className="text-sm font-medium text-red-600">
//               Spins left today: {spinsLeft}
//             </span>
//           </div>
//         </div>

//         {/* Wheel Container */}
//         <div className="relative mx-auto mb-12 w-64 h-64 md:w-80 md:h-80">
//           {/* Wheel */}
//           <div
//             ref={wheelRef}
//             className="w-full h-full rounded-full relative overflow-hidden border-8 border-white shadow-xl"
//             style={{ transform: "rotate(0deg)" }}
//           >
//             {segments.map((segment, index) => (
//               <div
//                 key={index}
//                 className="absolute w-full h-full"
//                 style={{
//                   transform: `rotate(${index * 45}deg)`,
//                   clipPath: "polygon(50% 50%, 50% 0, 100% 0)",
//                 }}
//               >
//                 <div
//                   className="h-full w-full flex items-end justify-center pb-8"
//                   style={{
//                     backgroundColor: segment.color,
//                     transform: "rotate(22.5deg)",
//                   }}
//                 >
//                   <span className="text-white text-xs font-medium transform -rotate-22.5">
//                     {segment.prize}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Wheel Center & Pointer */}
//           <div className="absolute top-1/2 left-1/2 w-12 h-12 -mt-6 -ml-6 rounded-full bg-white border-4 border-red-400 z-10 flex items-center justify-center shadow-lg">
//             <div className="w-3 h-3 rounded-full bg-red-400"></div>
//           </div>
//           <div className="absolute top-0 left-1/2 -ml-4 w-8 h-8 bg-red-500 transform rotate-45 z-20"></div>
//         </div>

//         {/* Spin Button */}
//         <div className="text-center">
//           <motion.button
//             onClick={spinWheel}
//             disabled={spinning || spinsLeft <= 0}
//             whileHover={{ scale: spinsLeft > 0 && !spinning ? 1.05 : 1 }}
//             whileTap={{ scale: spinsLeft > 0 && !spinning ? 0.95 : 1 }}
//             className={`px-8 py-3 rounded-full text-white font-medium shadow-lg ${
//               spinsLeft > 0 && !spinning
//                 ? "bg-red-500 hover:bg-red-600"
//                 : "bg-gray-400 cursor-not-allowed"
//             } transition-colors relative overflow-hidden`}
//           >
//             {spinning ? (
//               <motion.span
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                 className="inline-block"
//               >
//                 <FiRotateCw className="text-xl" />
//               </motion.span>
//             ) : spinsLeft > 0 ? (
//               "Spin Now"
//             ) : (
//               "Come Back Tomorrow"
//             )}
//           </motion.button>
//         </div>

//         {/* Result Modal */}
//         <AnimatePresence>
//           {showResult && result !== null && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
//               onClick={() => setShowResult(false)}
//             >
//               <motion.div
//                 initial={{ scale: 0.9, y: 20 }}
//                 animate={{ scale: 1, y: 0 }}
//                 exit={{ scale: 0.9, y: 20 }}
//                 className="bg-white rounded-xl p-6 max-w-sm w-full text-center"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <button
//                   onClick={() => setShowResult(false)}
//                   className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//                 >
//                   <FiX />
//                 </button>

//                 {segments[result].coupon ? (
//                   <>
//                     <div
//                       className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl"
//                       style={{ backgroundColor: segments[result].color }}
//                     >
//                       🎉
//                     </div>
//                     <h3 className="text-2xl font-light text-gray-800 mb-2">
//                       Congratulations!
//                     </h3>
//                     <p className="text-gray-600 mb-4">
//                       You won: {segments[result].prize}
//                     </p>

//                     <div className="bg-gray-50 p-4 rounded-lg mb-6">
//                       <p className="text-sm text-gray-500 mb-1">
//                         Your coupon code:
//                       </p>
//                       <p className="text-xl font-mono font-medium text-red-500">
//                         {segments[result].coupon}
//                       </p>
//                     </div>

//                     <p className="text-sm text-gray-500 mb-4">
//                       Show this code at checkout to redeem your offer
//                     </p>

//                     <button
//                       onClick={() => {
//                         navigator.clipboard.writeText(
//                           segments[result].coupon || ""
//                         );
//                       }}
//                       className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200"
//                     >
//                       Copy Code
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl bg-gray-200">
//                       😊
//                     </div>
//                     <h3 className="text-2xl font-light text-gray-800 mb-2">
//                       Better Luck Next Time!
//                     </h3>
//                     <p className="text-gray-600 mb-6">
//                       You didn't win this time, but come back tomorrow for
//                       another spin!
//                     </p>
//                     <button
//                       onClick={() => setShowResult(false)}
//                       className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
//                     >
//                       Close
//                     </button>
//                   </>
//                 )}
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* How It Works */}
//         <div className="mt-16 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//           <h2 className="text-xl font-light text-gray-800 mb-4">
//             How it works
//           </h2>
//           <ul className="space-y-3 text-gray-600">
//             <li className="flex items-start">
//               <span className="bg-red-100 text-red-500 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
//                 1
//               </span>
//               <span>Each user gets 1 free spin every day</span>
//             </li>
//             <li className="flex items-start">
//               <span className="bg-red-100 text-red-500 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
//                 2
//               </span>
//               <span>Spin the wheel to win instant discounts and freebies</span>
//             </li>
//             <li className="flex items-start">
//               <span className="bg-red-100 text-red-500 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
//                 3
//               </span>
//               <span>Use your coupon code at checkout to redeem</span>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SpinWheelPage;


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


