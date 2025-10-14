// "use client";
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import axios from "axios";
// import { FiMapPin, FiPhone, FiClock, FiShoppingBag } from "react-icons/fi";

// // Custom hook for timer functionality
// const useOfferTimer = (offers: Offer[] | null) => {
//   const [times, setTimes] = useState<{ [key: number]: number }>({});

//   useEffect(() => {
//     if (!offers) return;

//     // Initialize timers for each offer based on end date
//     const initialTimes: { [key: number]: number } = {};
//     offers.forEach((offer) => {
//       if (offer._id && offer.offerEndDate) {
//         const endTime = new Date(offer.offerEndDate).getTime();
//         const currentTime = new Date().getTime();
//         const timeRemaining = Math.max(0, endTime - currentTime);
//         initialTimes[offer._id] = Math.floor(timeRemaining / 1000); // Convert to seconds
//       }
//     });

//     setTimes(initialTimes);

//     // Setup interval to update all timers
//     const interval = setInterval(() => {
//       setTimes((prevTimes) => {
//         const newTimes = { ...prevTimes };
//         let allTimersFinished = true;

//         for (const id in newTimes) {
//           if (newTimes[id] > 0) {
//             newTimes[id] -= 1;
//             allTimersFinished = false;
//           }
//         }

//         // If all timers are finished, clear interval
//         if (allTimersFinished) {
//           clearInterval(interval);
//         }

//         return newTimes;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [offers]);

//   return times;
// };

// // Format time function
// const formatTime = (seconds: number): string => {
//   if (seconds <= 0) return "Expired";

//   const days = Math.floor(seconds / (24 * 60 * 60));
//   const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
//   const minutes = Math.floor((seconds % (60 * 60)) / 60);
//   const remainingSeconds = seconds % 60;

//   if (days > 0) {
//     return ${days}d ${hours}h;
//   } else if (hours > 0) {
//     return ${hours}h ${minutes}m;
//   } else {
//     return ${minutes}m ${remainingSeconds}s;
//   }
// };

// // Offer type definition
// type Offer = {
//   _id: number;
//   title?: string;
//   store?: string;
//   location?: string;
//   contact?: string;
//   description?: string;
//   image?: File;
//   offerImage?: string;
//   offerName?: string;
//   offerType?: string;
//   offerPrice?: string;
//   storeName?: string;
//   offerEndDate?: string; // Added for timer functionality
//   offerStartDate?: string;
//   offerDescription?: string;
//   businessCategory?: string; // Added to fix the error
//   isOnline?: boolean; // Added to fix the error
//   website?: string; // Added to fix the error
//   address?: string; // Added to fix the error
// };

// export default function OffersSection() {
//   const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
//   const [data, setData] = useState<Offer[] | null>(null);

//   // Use the custom timer hook
//   const times = useOfferTimer(data);
//   const selectedCity = localStorage.getItem("selectedCity");
//   // Fetch offers
//   const getOffer = async () => {
//     try {
//       const city = localStorage.getItem("selectedCity");

//       const res = await axios.get<Offer[]>(
//         http://localhost:5002/api/getOffer?city=${city}

//         // {
//         //   headers: {
//         //     "Cache-Control": "no-cache, no-store, must-revalidate",
//         //     Pragma: "no-cache",
//         //     Expires: "0",
//         //   },
//         // }
//       );
//       console.log(res.data, "offers");
//       setData(res?.data);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   useEffect(() => {
//     getOffer();
//   }, []);
//   // Safely return null if data is not valid or empty
//   if (!Array.isArray(data) || data.length === 0) return null;

//   function handleGetDirections(address: string): void {
//     const encodedAddress = encodeURIComponent(address);
//     const googleMapsUrl = https://www.google.com/maps/dir/?api=1&destination=${encodedAddress};
//     window.open(googleMapsUrl, "_blank");
//   }
//   return (
//     <section className="px-4 py-4">
//       <div className="max-w-full mx-auto">
//         {/* Trending Offers */}
//         <div className="mt-12 pb-10 px-4 sm:px-6 md:px-8">
//           {data.filter((d) => d.offerType === "trending").slice(0, 2)?.length >
//             0 && (
//             <h2 className="text-2xl sm:text-xl md:text-2xl font-extrabold mb-8 text-black text-center md:text-left">
//               🔥 Trending Offers
//             </h2>
//           )}

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             {data
//               .filter((d) => d.offerType === "trending")
//               .slice(0, 2)
//               .map((d) => (
//                 <div
//                   key={d._id}
//                   className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer"
//                   onClick={() => setSelectedOffer(d)}
//                 >
//                   {/* Image */}
//                   <div className="relative w-full h-48 md:h-60">
//                     <Image
//                       src={d.offerImage || "/placeholder.jpg"}
//                       alt={d.offerName || "Offer"}
//                       fill
//                       className="object-cover"
//                     />
//                   </div>

//                   {/* Content */}
//                   <div className="p-5 space-y-3">
//                     {/* Offer name and timer */}
//                     <div className="flex items-center justify-between">
//                       <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
//                         {d.offerName}
//                       </h3>
//                       <span className="text-xs sm:text-sm font-medium bg-red-100 text-red-600 px-3 py-1 rounded-full whitespace-nowrap">
//                         {formatTime(times[d._id] || 0)}
//                       </span>
//                     </div>

//                     {/* Description */}
//                     <p className="text-sm sm:text-base text-gray-600 line-clamp-2">
//                       {d.offerDescription}
//                     </p>

//                     {/* Footer: Store name + price */}
//                     <div className="flex items-center justify-between pt-2">
//                       <span className="text-sm text-gray-500 truncate">
//                         {d.storeName}
//                       </span>
//                       <span className="text-base sm:text-lg font-bold text-red-500">
//                         ₹ {d.offerPrice}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </div>

//         {data.filter((d) => d.offerType === "hot").slice(0, 2).length > 0 && (
//           <h2 className="text-3xl font-bold mb-6 text-red-600 pt-6">
//             Flash Deals ⚡
//           </h2>
//         )}

//         {/* Flash Deals Grid */}
//         <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:flex md:flex-row md:gap-4">
//           <div className="md:flex md:flex-col grid grid-cols-2 gap-3 md:w-[30%]">
//             {data
//               .filter((d) => d.offerType === "hot")
//               .slice(0, 2)
//               .map((d) => (
//                 <OfferCard
//                   key={d._id}
//                   offer={d}
//                   times={times}
//                   className="h-[200px] md:h-[260px]"
//                   setSelectedOffer={setSelectedOffer}
//                 />
//               ))}
//           </div>

//           {data.length >= 3 && (
//             <div className="col-span-2 md:w-[40%]">
//               <OfferCard
//                 offer={data[2]}
//                 times={times}
//                 className="h-[300px] md:h-[535px]"
//                 setSelectedOffer={setSelectedOffer}
//               />
//             </div>
//           )}

//           {data.length >= 4 && (
//             <div className="col-span-2 md:w-[30%] flex flex-col gap-3">
//               <OfferCard
//                 offer={data[3]}
//                 times={times}
//                 className="h-[260px]"
//                 setSelectedOffer={setSelectedOffer}
//               />
//               <div className="grid grid-cols-2 gap-3">
//                 {data.slice(4, 6).map((d) => (
//                   <OfferCard
//                     key={d._id}
//                     offer={d}
//                     times={times}
//                     className="h-[150px] md:h-[260px]"
//                     setSelectedOffer={setSelectedOffer}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Offer Modal */}
//         <AnimatePresence>
//           {selectedOffer && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
//               onClick={() => setSelectedOffer(null)}
//             >
//               <motion.div
//                 initial={{ scale: 0.95, y: 20 }}
//                 animate={{ scale: 1, y: 0 }}
//                 exit={{ scale: 0.95, y: 20 }}
//                 className="bg-white rounded-xl overflow-hidden shadow-xl max-w-md w-full max-h-[90vh] flex flex-col"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 {/* Offer Image with Timer */}
//                 <div className="relative h-56 w-full">
//                   <Image
//                     src={selectedOffer.offerImage || "/placeholder.jpg"}
//                     alt={selectedOffer.offerName || "Offer"}
//                     fill
//                     className="object-cover"
//                     sizes="100vw"
//                     priority
//                   />
//                   <div className="absolute top-3 right-3 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full">
//                     {formatTime(times[selectedOffer._id] || 0)}
//                   </div>
//                   <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/70 to-transparent" />
//                 </div>

//                 {/* Offer Content */}
//                 <div className="p-6 flex-grow overflow-y-auto">
//                   <div className="flex justify-between items-start mb-4">
//                     <h3 className="text-2xl font-bold text-gray-900">
//                       {selectedOffer.offerName}
//                     </h3>
//                     {selectedOffer.offerPrice && (
//                       <span className="text-xl font-bold text-red-600">
//                         ₹{selectedOffer.offerPrice}
//                       </span>
//                     )}
//                   </div>

//                   {/* Store Info */}
//                   <div className="flex items-center text-gray-600 mb-6">
//                     <FiShoppingBag className="mr-2 text-red-500" />
//                     <span className="font-medium">
//                       {selectedOffer.storeName}
//                     </span>
//                   </div>

//                   {/* Details Grid */}
//                   <div className="grid grid-cols-2 gap-4 mb-6">
//                     {selectedOffer.location && (
//                       <div className="flex items-start">
//                         <FiMapPin className="text-red-500 mt-1 mr-2 flex-shrink-0" />
//                         <div>
//                           <p className="text-sm text-gray-500">Location</p>
//                           <p className="font-medium">
//                             {selectedOffer.location}
//                           </p>
//                         </div>
//                       </div>
//                     )}

//                     {selectedOffer.contact && (
//                       <div className="flex items-start">
//                         <FiPhone className="text-red-500 mt-1 mr-2 flex-shrink-0" />
//                         <div>
//                           <p className="text-sm text-gray-500">Contact</p>
//                           <p className="font-medium">{selectedOffer.contact}</p>
//                         </div>
//                       </div>
//                     )}

//                     {selectedOffer.businessCategory && (
//                       <div className="flex items-start">
//                         <FiShoppingBag className="text-red-500 mt-1 mr-2 flex-shrink-0" />
//                         <div>
//                           <p className="text-sm text-gray-500">Category</p>
//                           <p className="font-medium">
//                             {selectedOffer.businessCategory}
//                           </p>
//                         </div>
//                       </div>
//                     )}

//                     <div className="flex items-start">
//                       <FiClock className="text-red-500 mt-1 mr-2 flex-shrink-0" />
//                       <div>
//                         <p className="text-sm text-gray-500">Valid Until</p>
//                         <p className="font-medium">
//                           {selectedOffer.offerEndDate
//                             ? new Date(
//                                 selectedOffer.offerEndDate
//                               ).toLocaleDateString()
//                             : "N/A"}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Description */}
//                   <div className="mb-6">
//                     <h4 className="text-lg font-semibold text-gray-900 mb-2">
//                       Offer Details
//                     </h4>
//                     <p className="text-gray-700">
//                       {selectedOffer.offerDescription ||
//                         selectedOffer.description ||
//                         "More details about this offer will be available soon."}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="border-t border-gray-100 p-4 flex gap-3">
//                   <button
//                     className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors"
//                     onClick={() => setSelectedOffer(null)}
//                   >
//                     Close
//                   </button>
//                   {selectedOffer.isOnline ? (
//                     <a
//                       href={selectedOffer.website || "#"}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors text-center"
//                     >
//                       Visit Website
//                     </a>
//                   ) : (
//                     <button
//                       onClick={() =>
//                         selectedOffer.address &&
//                         handleGetDirections(selectedOffer.address)
//                       }
//                       className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
//                     >
//                       Get Directions
//                     </button>
//                   )}
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </section>
//   );
// }

// // Reusable OfferCard component
// type OfferCardProps = {
//   offer: Offer;
//   times: { [key: number]: number };
//   className?: string;
//   setSelectedOffer: (offer: Offer) => void;
// };

// const OfferCard = ({
//   offer,
//   times,
//   className,
//   setSelectedOffer,
// }: OfferCardProps) => {
//   const timerValue = times[offer._id] || 0;

//   return (
//     <motion.div
//       className={relative group rounded-xl overflow-hidden ${className}}
//       whileHover={{ scale: 1.03 }}
//       transition={{ duration: 0.3 }}
//       onClick={() => setSelectedOffer(offer)}
//     >
//       <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs z-10 md:text-sm">
//         {formatTime(timerValue)}
//       </div>

//       <div className="relative h-full w-full">
//         <Image
//           src={offer?.offerImage || "/placeholder.jpg"}
//           alt={offer?.offerName || "Offer Image"}
//           fill
//           className="object-cover"
//           sizes="(max-width: 768px) 100vw, 50vw"
//         />
//         <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
//       </div>

//       <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white z-10">
//         <h3 className="text-sm font-bold md:text-lg">{offer?.offerName}</h3>
//         <div className="flex justify-between items-center mt-1">
//           <div className="md:flex w-full items-center justify-between">
//             <p className="text-xs md:text-sm">{offer?.storeName}</p>
//             <span className="text-xs bg-white/20 px-2 py-1 rounded-full md:text-sm">
//               {offer?.offerPrice}
//             </span>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// "use client";
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import axios from "axios";
// import { FiMapPin, FiPhone, FiClock, FiShoppingBag } from "react-icons/fi";

// // Custom hook for timer functionality
// const useOfferTimer = (offers: Offer[] | null) => {
//   const [times, setTimes] = useState<{ [key: number]: number }>({});

//   useEffect(() => {
//     if (!offers) return;

//     // Initialize timers for each offer based on end date
//     const initialTimes: { [key: number]: number } = {};
//     offers.forEach((offer) => {
//       if (offer._id && offer.offerEndDate) {
//         const endTime = new Date(offer.offerEndDate).getTime();
//         const currentTime = new Date().getTime();
//         const timeRemaining = Math.max(0, endTime - currentTime);
//         initialTimes[offer._id] = Math.floor(timeRemaining / 1000); // Convert to seconds
//       }
//     });

//     setTimes(initialTimes);

//     // Setup interval to update all timers
//     const interval = setInterval(() => {
//       setTimes((prevTimes) => {
//         const newTimes = { ...prevTimes };
//         let allTimersFinished = true;

//         for (const id in newTimes) {
//           if (newTimes[id] > 0) {
//             newTimes[id] -= 1;
//             allTimersFinished = false;
//           }
//         }

//         // If all timers are finished, clear interval
//         if (allTimersFinished) {
//           clearInterval(interval);
//         }

//         return newTimes;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [offers]);

//   return times;
// };

// // Format time function
// const formatTime = (seconds: number): string => {
//   if (seconds <= 0) return "Expired";

//   const days = Math.floor(seconds / (24 * 60 * 60));
//   const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
//   const minutes = Math.floor((seconds % (60 * 60)) / 60);
//   const remainingSeconds = seconds % 60;

//   if (days > 0) {
//     return ${days}d ${hours}h;
//   } else if (hours > 0) {
//     return ${hours}h ${minutes}m;
//   } else {
//     return ${minutes}m ${remainingSeconds}s;
//   }
// };

// // Offer type definition
// type Offer = {
//   _id: number;
//   title?: string;
//   store?: string;
//   location?: string;
//   contact?: string;
//   description?: string;
//   image?: File;
//   offerImage?: string;
//   offerName?: string;
//   offerType?: string;
//   offerPrice?: string;
//   storeName?: string;
//   offerEndDate?: string; // Added for timer functionality
//   offerStartDate?: string;
//   offerDescription?: string;
//   businessCategory?: string; // Added to fix the error
//   isOnline?: boolean; // Added to fix the error
//   website?: string; // Added to fix the error
//   address?: string; // Added to fix the error
// };

// export default function OffersSection() {
//   const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
//   const [data, setData] = useState<Offer[] | null>(null);

//   // Use the custom timer hook
//   const times = useOfferTimer(data);
//   const selectedCity = localStorage.getItem("selectedCity");
//   // Fetch offers
//   const getOffer = async () => {
//     try {
//       const city = localStorage.getItem("selectedCity");

//       const res = await axios.get<Offer[]>(
//         http://localhost:5002/api/getOffer?city=${city}

//         // {
//         //   headers: {
//         //     "Cache-Control": "no-cache, no-store, must-revalidate",
//         //     Pragma: "no-cache",
//         //     Expires: "0",
//         //   },
//         // }
//       );
//       console.log(res.data, "offers");
//       setData(res?.data);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   useEffect(() => {
//     getOffer();
//   }, []);
//   // Safely return null if data is not valid or empty
//   if (!Array.isArray(data) || data.length === 0) return null;

//   function handleGetDirections(address: string): void {
//     const encodedAddress = encodeURIComponent(address);
//     const googleMapsUrl = https://www.google.com/maps/dir/?api=1&destination=${encodedAddress};
//     window.open(googleMapsUrl, "_blank");
//   }
//   return (
//     <section className="px-4 py-4">
//       <div className="max-w-full mx-auto">
//         {/* Trending Offers */}
//         <div className="mt-12 pb-10 px-4 sm:px-6 md:px-8">
//           {data.filter((d) => d.offerType === "trending").slice(0, 2)?.length >
//             0 && (
//             <h2 className="text-2xl sm:text-xl md:text-2xl font-extrabold mb-8 text-black text-center md:text-left">
//               🔥 Trending Offers
//             </h2>
//           )}

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             {data
//               .filter((d) => d.offerType === "trending")
//               .slice(0, 2)
//               .map((d) => (
//                 <div
//                   key={d._id}
//                   className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer"
//                   onClick={() => setSelectedOffer(d)}
//                 >
//                   {/* Image */}
//                   <div className="relative w-full h-48 md:h-60">
//                     <Image
//                       src={d.offerImage || "/placeholder.jpg"}
//                       alt={d.offerName || "Offer"}
//                       fill
//                       className="object-cover"
//                     />
//                   </div>

//                   {/* Content */}
//                   <div className="p-5 space-y-3">
//                     {/* Offer name and timer */}
//                     <div className="flex items-center justify-between">
//                       <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
//                         {d.offerName}
//                       </h3>
//                       <span className="text-xs sm:text-sm font-medium bg-red-100 text-red-600 px-3 py-1 rounded-full whitespace-nowrap">
//                         {formatTime(times[d._id] || 0)}
//                       </span>
//                     </div>

//                     {/* Description */}
//                     <p className="text-sm sm:text-base text-gray-600 line-clamp-2">
//                       {d.offerDescription}
//                     </p>

//                     {/* Footer: Store name + price */}
//                     <div className="flex items-center justify-between pt-2">
//                       <span className="text-sm text-gray-500 truncate">
//                         {d.storeName}
//                       </span>
//                       <span className="text-base sm:text-lg font-bold text-red-500">
//                         ₹ {d.offerPrice}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </div>

//         {data.filter((d) => d.offerType === "hot").slice(0, 2).length > 0 && (
//           <h2 className="text-3xl font-bold mb-6 text-red-600 pt-6">
//             Flash Deals ⚡
//           </h2>
//         )}

//         {/* Flash Deals Grid */}
//         <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:flex md:flex-row md:gap-4">
//           <div className="md:flex md:flex-col grid grid-cols-2 gap-3 md:w-[30%]">
//             {data
//               .filter((d) => d.offerType === "hot")
//               .slice(0, 2)
//               .map((d) => (
//                 <OfferCard
//                   key={d._id}
//                   offer={d}
//                   times={times}
//                   className="h-[200px] md:h-[260px]"
//                   setSelectedOffer={setSelectedOffer}
//                 />
//               ))}
//           </div>

//           {data.length >= 3 && (
//             <div className="col-span-2 md:w-[40%]">
//               <OfferCard
//                 offer={data[2]}
//                 times={times}
//                 className="h-[300px] md:h-[535px]"
//                 setSelectedOffer={setSelectedOffer}
//               />
//             </div>
//           )}

//           {data.length >= 4 && (
//             <div className="col-span-2 md:w-[30%] flex flex-col gap-3">
//               <OfferCard
//                 offer={data[3]}
//                 times={times}
//                 className="h-[260px]"
//                 setSelectedOffer={setSelectedOffer}
//               />
//               <div className="grid grid-cols-2 gap-3">
//                 {data.slice(4, 6).map((d) => (
//                   <OfferCard
//                     key={d._id}
//                     offer={d}
//                     times={times}
//                     className="h-[150px] md:h-[260px]"
//                     setSelectedOffer={setSelectedOffer}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Offer Modal */}
//         <AnimatePresence>
//           {selectedOffer && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
//               onClick={() => setSelectedOffer(null)}
//             >
//               <motion.div
//                 initial={{ scale: 0.95, y: 20 }}
//                 animate={{ scale: 1, y: 0 }}
//                 exit={{ scale: 0.95, y: 20 }}
//                 className="bg-white rounded-xl overflow-hidden shadow-xl max-w-md w-full max-h-[90vh] flex flex-col"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 {/* Offer Image with Timer */}
//                 <div className="relative h-56 w-full">
//                   <Image
//                     src={selectedOffer.offerImage || "/placeholder.jpg"}
//                     alt={selectedOffer.offerName || "Offer"}
//                     fill
//                     className="object-cover"
//                     sizes="100vw"
//                     priority
//                   />
//                   <div className="absolute top-3 right-3 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full">
//                     {formatTime(times[selectedOffer._id] || 0)}
//                   </div>
//                   <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/70 to-transparent" />
//                 </div>

//                 {/* Offer Content */}
//                 <div className="p-6 flex-grow overflow-y-auto">
//                   <div className="flex justify-between items-start mb-4">
//                     <h3 className="text-2xl font-bold text-gray-900">
//                       {selectedOffer.offerName}
//                     </h3>
//                     {selectedOffer.offerPrice && (
//                       <span className="text-xl font-bold text-red-600">
//                         ₹{selectedOffer.offerPrice}
//                       </span>
//                     )}
//                   </div>

//                   {/* Store Info */}
//                   <div className="flex items-center text-gray-600 mb-6">
//                     <FiShoppingBag className="mr-2 text-red-500" />
//                     <span className="font-medium">
//                       {selectedOffer.storeName}
//                     </span>
//                   </div>

//                   {/* Details Grid */}
//                   <div className="grid grid-cols-2 gap-4 mb-6">
//                     {selectedOffer.location && (
//                       <div className="flex items-start">
//                         <FiMapPin className="text-red-500 mt-1 mr-2 flex-shrink-0" />
//                         <div>
//                           <p className="text-sm text-gray-500">Location</p>
//                           <p className="font-medium">
//                             {selectedOffer.location}
//                           </p>
//                         </div>
//                       </div>
//                     )}

//                     {selectedOffer.contact && (
//                       <div className="flex items-start">
//                         <FiPhone className="text-red-500 mt-1 mr-2 flex-shrink-0" />
//                         <div>
//                           <p className="text-sm text-gray-500">Contact</p>
//                           <p className="font-medium">{selectedOffer.contact}</p>
//                         </div>
//                       </div>
//                     )}

//                     {selectedOffer.businessCategory && (
//                       <div className="flex items-start">
//                         <FiShoppingBag className="text-red-500 mt-1 mr-2 flex-shrink-0" />
//                         <div>
//                           <p className="text-sm text-gray-500">Category</p>
//                           <p className="font-medium">
//                             {selectedOffer.businessCategory}
//                           </p>
//                         </div>
//                       </div>
//                     )}

//                     <div className="flex items-start">
//                       <FiClock className="text-red-500 mt-1 mr-2 flex-shrink-0" />
//                       <div>
//                         <p className="text-sm text-gray-500">Valid Until</p>
//                         <p className="font-medium">
//                           {selectedOffer.offerEndDate
//                             ? new Date(
//                                 selectedOffer.offerEndDate
//                               ).toLocaleDateString()
//                             : "N/A"}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Description */}
//                   <div className="mb-6">
//                     <h4 className="text-lg font-semibold text-gray-900 mb-2">
//                       Offer Details
//                     </h4>
//                     <p className="text-gray-700">
//                       {selectedOffer.offerDescription ||
//                         selectedOffer.description ||
//                         "More details about this offer will be available soon."}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="border-t border-gray-100 p-4 flex gap-3">
//                   <button
//                     className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors"
//                     onClick={() => setSelectedOffer(null)}
//                   >
//                     Close
//                   </button>
//                   {selectedOffer.isOnline ? (
//                     <a
//                       href={selectedOffer.website || "#"}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors text-center"
//                     >
//                       Visit Website
//                     </a>
//                   ) : (
//                     <button
//                       onClick={() =>
//                         selectedOffer.address &&
//                         handleGetDirections(selectedOffer.address)
//                       }
//                       className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
//                     >
//                       Get Directions
//                     </button>
//                   )}
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </section>
//   );
// }

// // Reusable OfferCard component
// type OfferCardProps = {
//   offer: Offer;
//   times: { [key: number]: number };
//   className?: string;
//   setSelectedOffer: (offer: Offer) => void;
// };

// const OfferCard = ({
//   offer,
//   times,
//   className,
//   setSelectedOffer,
// }: OfferCardProps) => {
//   const timerValue = times[offer._id] || 0;

//   return (
//     <motion.div
//       className={relative group rounded-xl overflow-hidden ${className}}
//       whileHover={{ scale: 1.03 }}
//       transition={{ duration: 0.3 }}
//       onClick={() => setSelectedOffer(offer)}
//     >
//       <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs z-10 md:text-sm">
//         {formatTime(timerValue)}
//       </div>

//       <div className="relative h-full w-full">
//         <Image
//           src={offer?.offerImage || "/placeholder.jpg"}
//           alt={offer?.offerName || "Offer Image"}
//           fill
//           className="object-cover"
//           sizes="(max-width: 768px) 100vw, 50vw"
//         />
//         <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
//       </div>

//       <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white z-10">
//         <h3 className="text-sm font-bold md:text-lg">{offer?.offerName}</h3>
//         <div className="flex justify-between items-center mt-1">
//           <div className="md:flex w-full items-center justify-between">
//             <p className="text-xs md:text-sm">{offer?.storeName}</p>
//             <span className="text-xs bg-white/20 px-2 py-1 rounded-full md:text-sm">
//               {offer?.offerPrice}
//             </span>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// RatingStars component with better accessibility
// const RatingStars = ({ rating }: { rating: number }) => {
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating % 1 >= 0.5;
//   const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

//   return (
//     <div
//       className="flex items-center"
//       aria-label={`Rating: ${rating.toFixed(1)} out of 5`}
//     >
//       {[...Array(fullStars)].map((_, i) => (
//         <FaStar
//           key={`full-${i}`}
//           className="text-yellow-400 text-sm"
//           aria-hidden="true"
//         />
//       ))}
//       {hasHalfStar && (
//         <FaStarHalfAlt className="text-yellow-400 text-sm" aria-hidden="true" />
//       )}
//       {[...Array(emptyStars)].map((_, i) => (
//         <FaRegStar
//           key={`empty-${i}`}
//           className="text-yellow-400 text-sm"
//           aria-hidden="true"
//         />
//       ))}
//       <span className="ml-1 text-gray-700 text-sm">{rating.toFixed(1)}</span>
//     </div>
//   );
// };

// const demoOffers: Offer[] = [
//   // Trending Offers (Banner Style)
//   {
//     id: 1,
//     title: "Summer Festival Special",
//     storeName: "Grand Plaza Mall",
//     category: "Shopping",
//     discount: "UPTO 50% OFF",
//     description:
//       "Massive discounts across all stores during our annual summer festival",
//     endDate: "2023-07-15",
//     rating: 4.7,
//     distance: "1.2 km",
//     image: "/offer1.png",
//     isOnline: false,
//     address: "123 Mall Road, City Center",
//     type: "trending",
//     highlight: "Limited Time Only",
//   },
//   {
//     id: 2,
//     title: "Food Truck Fiesta",
//     storeName: "City Food Park",
//     category: "Food & Dining",
//     discount: "20% OFF",
//     description:
//       "Experience global cuisines from 15+ food trucks with special discounts",
//     endDate: "2023-06-30",
//     rating: 4.8,
//     distance: "0.8 km",
//     image: "/offer2.png",
//     isOnline: false,
//     address: "Central Park, Riverside",
//     type: "trending",
//     highlight: "Weekend Special",
//   },
//   {
//     id: 3,
//     title: "Tech Expo 2023",
//     storeName: "TechWorld",
//     category: "Electronics",
//     discount: "30% OFF",
//     description: "Biggest tech sale of the year with exclusive launch offers",
//     endDate: "2023-07-10",
//     rating: 4.9,
//     distance: "2.5 km",
//     image: "/offer1.png",
//     isOnline: false,
//     address: "Convention Center, Tech Park",
//     type: "trending",
//     highlight: "Early Bird Deals",
//   },

//   // Flash Deals (Grid Style)
//   {
//     id: 4,
//     title: "Weekend Brunch Special",
//     storeName: "Cafe Mocha",
//     category: "Food & Dining",
//     discount: "₹200 OFF",
//     description:
//       "Enjoy our signature pancakes with maple syrup and fresh fruits",
//     endDate: "2023-06-30",
//     rating: 4.5,
//     distance: "0.5 km",
//     image: "/o1.jpeg",
//     isOnline: false,
//     address: "123 Main Street",
//     type: "flash",
//   },
//   {
//     id: 5,
//     title: "Online Shopping Discount",
//     storeName: "Urban Styles",
//     category: "Fashion",
//     discount: "15% OFF",
//     description: "Use code LOCAL15 for online purchases above ₹2000",
//     endDate: "2023-07-31",
//     rating: 4.2,
//     distance: "2.1 km",
//     image: "/o2.jpeg",
//     isOnline: true,
//     website: "https://urbanstyles.example.com",
//     type: "flash",
//   },
//   {
//     id: 6,
//     title: "Summer Fitness Package",
//     storeName: "FitLife Gym",
//     category: "Wellness",
//     discount: "₹1500 OFF",
//     description: "3-month membership with 5 free personal training sessions",
//     endDate: "2023-08-15",
//     rating: 4.8,
//     distance: "1.2 km",
//     image: "/o3.jpeg",
//     isOnline: false,
//     address: "456 Fitness Road",
//     type: "flash",
//   },
//   {
//     id: 7,
//     title: "Car Wash Combo",
//     storeName: "Sparkle Auto",
//     category: "Automotive",
//     discount: "40% OFF",
//     description: "Full exterior wash + interior cleaning + free polish",
//     endDate: "2023-07-07",
//     rating: 4.3,
//     distance: "3.0 km",
//     image: "/o4.jpeg",
//     isOnline: false,
//     address: "789 Auto Lane",
//     type: "flash",
//   },
//   {
//     id: 8,
//     title: "Online Course Bundle",
//     storeName: "SkillUp Academy",
//     category: "Education",
//     discount: "60% OFF",
//     description: "Get 3 professional courses for the price of 1",
//     endDate: "2023-07-20",
//     rating: 4.6,
//     distance: "4.5 km",
//     image: "/o5.jpeg",
//     isOnline: true,
//     website: "https://skillup.example.com",
//     type: "flash",
//   },
// ];

"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { FiClock, FiNavigation, FiGlobe, FiArrowRight } from "react-icons/fi";
// import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { MdStorefront } from "react-icons/md";
import axios from "axios";

type Offer = {
  id: number;
  title: string;
  storeName: string;
  category: string;
  discount: string;
  description: string;
  endDate: string;
  rating: number;
  distance: string;
  image: string;
  isOnline: boolean;
  website?: string;
  address?: string;
  type: "trending" | "flash";
  highlight?: string;
  offerName?: string;
  storeId?: {
    storeName?: string;
    userName?: string;
    location?: {
      city?: string;
    };
    phone?: string;
    gmaplink?: string;
  };
  offerCategory?: string;
  url?: string;
  offerDiscount?: string;
  offerEndDate?: string;
  offerDescription?: string;
};

export default function OffersSection() {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [trendingOffers, setTrendingOffers] = useState([]);
  const [flashDeals, setFlashDeals] = useState([]);
  // const trendingOffers = demoOffers.filter(
  //   (offer) => offer.type === "trending"
  // );
  const getOffers = async () => {
    const city = localStorage.getItem("selectedCity");

    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/getOffers`, {
        params: {
          type: "trending",
          city: city,
        },
      });
      console.log(res?.data, "trending");
      if (res.data.success) {
        setTrendingOffers(res.data.offers);
      }
      const resp = await axios.get(`${process.env.NEXT_PUBLIC_API}/getOffers`, {
        params: {
          type: "hot",
          city: city,
        },
      });
      console.log(resp.data, "resp.data hot");
      if (resp.data.success) {
        setFlashDeals(resp.data.offers);
      }
    } catch (e) {
      console.error("Fetch error:", e);
      // setOffers([]); // fallback to empty array
    }
  };

  useEffect(() => {
    getOffers();
  }, []);
  // const flashDeals = demoOffers.filter((offer) => offer.type === "flash");

  const handleGetDirections = (address: string) => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      address
    )}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <section className="px-4 py-8 select-none">
      <div className="max-w-7xl mx-auto">
        {/* Trending Offers (Banner Style) */}
        {trendingOffers.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl  font-bold mb-6 text-gray-900">
              🔥 Trending Near You
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 cursor-pointer">
              {trendingOffers.map((offer: Offer) => (
                <motion.div
                  key={offer.id}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer group"
                  onClick={() => setSelectedOffer(offer)}
                  aria-label={`View ${offer.offerName} offer`}
                >
                  <div className="relative h-48 md:h-52 w-full">
                    <img
                      src={offer.url}
                      alt={"apna city"}
                      className="object-cover transition-transform duration-300 group-hover:scale-105 h-full w-full"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

                    {/* {offer.offerDescription && (
                      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-2xl text-white text-xs px-3 py-1 rounded-full">
                        {offer.offerDescription}
                      </div>
                    )} */}

                    <div className="absolute top-4 right-4 bg-white text-green-600 font-semibold px-3 py-1 rounded-lg text-sm shadow-md">
                      {offer.offerDiscount}
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white flex items-center justify-between ">
                    <div>
                      <h3 className="font-bold text-lg md:text-xl mb-1 ">
                        {offer.offerName}
                      </h3>
                      {offer?.storeId?.storeName ? (
                        <p className="text-sm md:text-base line-clamp-1">
                          {offer?.storeId?.storeName}
                        </p>
                      ) : (
                        <p className="text-sm md:text-base line-clamp-1">
                          By {offer.storeId?.userName}
                        </p>
                      )}
                    </div>
                    <button className="flex items-center text-xs md:text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full hover:bg-white/30 transition">
                      View Details <FiArrowRight className="ml-1" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Flash Deals (Grid Style) */}
        {flashDeals.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-red-600">
              ⚡ Flash Deals - Don&apos;t Miss Out!
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {flashDeals.map((flashoffer: Offer, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl border-[#f1f1f1] overflow-hidden border  hover:shadow-lg transition-all duration-200 cursor-pointer group"
                  onClick={() => setSelectedOffer(flashoffer)}
                  aria-label={`View ${flashoffer.offerName} offer`}
                >
                  <div className="relative h-32 w-full">
                    <img
                      src={flashoffer.url}
                      alt="apna"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                    />
                    {flashoffer.offerDiscount && (
                      <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-medium px-2 py-1 rounded">
                        {flashoffer.offerDiscount}
                      </div>
                    )}
                    {/* {flashoffer.offerPrice && (
                      <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-medium px-2 py-1 rounded">
                        {flashoffer.offerPrice}
                      </div>
                    )} */}
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-base text-gray-900 line-clamp-2 ">
                        {flashoffer.offerName}
                      </h3>
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded whitespace-nowrap">
                        {flashoffer?.offerCategory}
                      </span>
                    </div>
                    {flashoffer?.storeId?.storeName ? (
                      <div className="flex gap-2 items-center text-gray-600 mb-2">
                        <MdStorefront className="flex-shrink-0" />
                        <p className="text-sm line-clamp-1">
                          {flashoffer?.storeId?.storeName}
                        </p>
                      </div>
                    ) : (
                      <div className="flex gap-2 items-center text-gray-600 mb-2">
                        <MdStorefront className="flex-shrink-0" />
                        <p className="text-sm line-clamp-1">
                          {" "}
                          By {flashoffer.storeId?.userName}
                        </p>
                      </div>
                    )}
                    {/* <p className="text-gray-700 text-sm line-clamp-2 mb-3">
                      {flashoffer.offerEndDate}
                    </p> */}

                    <div className="flex items-center text-xs text-gray-500">
                      <FiClock className="mr-1 flex-shrink-0" />
                      <span className="line-clamp-1">
                        Ends{" "}
                        {new Date(
                          flashoffer?.offerEndDate ?? ""
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Offer Detail Modal */}
        <AnimatePresence>
          {selectedOffer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedOffer(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-white rounded-xl overflow-hidden shadow-xl max-w-md w-full max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="offer-details-title"
              >
                <div className="relative h-56 w-full">
                  <img
                    src={selectedOffer.url}
                    alt={selectedOffer.offerName}
                    className="object-cover h-full w-full"
                    sizes="100vw"
                  />
                  <div className="absolute top-3 right-3 bg-green-700 text-white text-sm font-bold px-3 py-1 rounded">
                    {selectedOffer.offerDiscount}
                  </div>
                </div>

                <div className="p-6 flex-grow overflow-y-auto">
                  <h3
                    id="offer-details-title"
                    className="text-2xl font-bold text-gray-900 mb-2"
                  >
                    {selectedOffer.offerName}
                  </h3>

                  <div className="flex items-center justify-between mb-6  text-black">
                    {selectedOffer?.storeId?.storeName ? (
                      <div className="flex items-center mt-2">
                        <MdStorefront className="mr-2 " />
                        <span className="font-medium">
                          {selectedOffer?.storeId?.storeName}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center mt-2">
                        <MdStorefront className="mr-2 " />
                        <span className="font-medium">
                          By {selectedOffer?.storeId?.userName}
                        </span>
                      </div>
                    )}

                    {/* <RatingStars rating={selectedOffer.rating} /> */}
                    <span className="text-xs font-medium bg-black text-white px-2 py-1 rounded">
                      {selectedOffer?.storeId?.phone}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start">
                      <FiClock className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">Valid Until</p>
                        <p className="font-medium">
                          {new Date(
                            selectedOffer.offerEndDate ?? ""
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {selectedOffer.isOnline ? (
                      <div className="flex items-start">
                        <FiGlobe className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-500">Website</p>
                          <p className="font-medium">Online Offer</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start">
                        <FiNavigation className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-medium">In-Store Only</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Offer Details
                    </h4>
                    <p className="text-gray-700">
                      {selectedOffer.offerDescription}
                    </p>
                  </div>

                  {selectedOffer.address && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        Address
                      </h4>
                      <p className="text-gray-700">
                        {selectedOffer?.storeId?.location?.city}
                      </p>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-100 p-4 flex gap-3">
                  <button
                    className="flex-1 cursor-pointer  bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors"
                    onClick={() => setSelectedOffer(null)}
                    aria-label="Close offer details"
                  >
                    Close
                  </button>
                  {selectedOffer.isOnline ? (
                    <a
                      href={selectedOffer.website || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors text-center flex items-center justify-center"
                      aria-label="Visit website"
                    >
                      <FiGlobe className="mr-2" /> Visit Website
                    </a>
                  ) : (
                    <a
                      href={selectedOffer?.storeId?.gmaplink}
                      onClick={() =>
                        selectedOffer.address &&
                        handleGetDirections(selectedOffer.address)
                      }
                      className="flex-1 cursor-pointer bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                      aria-label="Get directions"
                    >
                      <FiNavigation className="mr-2" /> Get Directions
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
