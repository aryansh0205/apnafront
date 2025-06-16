// "use client";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import jkImage from "../Asset/jk.jpg";
// import phool from "../Asset/phool.jpg";
// import church from "../Asset/church.jpg";
// import blueworld from "../Asset/blueworld.jpg";
// import ganga from "../Asset/ganga.jpg";
// import wildfire from "../Asset/zoo.jpg";

// const responsive = (classes: Record<string, string>) => {
//   return Object.entries(classes)
//     .map(([breakpoint, className]) =>
//       breakpoint === "base" ? className : `${breakpoint}:${className}`
//     )
//     .join(" ");
// };

// const kanpurPlaces = [
//   // First Column (1-2)
//   {
//     id: 1,
//     name: "JK Temple",
//     type: "Spiritual Site",
//     rating: 4.7,
//     image: jkImage,
//     size: responsive({ base: "h-[250px]", md: "h-[250px]" }),
//     width: responsive({ base: "w-full", md: "w-[270px]" }),
//     gradient: "bg-gradient-to-b from-transparent to-black/80",
//     ratingBg: "bg-white",
//     ratingColor: "text-gray-800",
//   },
//   {
//     id: 2,
//     name: "Allen Forest Zoo",
//     type: wildfire,
//     rating: 4.5,
//     image: "../Asset/zoo.jpg",
//     size: responsive({ base: "h-[250px]", md: "h-[250px]" }),
//     width: responsive({ base: "w-full", md: "w-[270px]" }),
//     gradient: "bg-gradient-to-b from-transparent to-black/80",
//     ratingBg: "bg-white",
//     ratingColor: "text-gray-800",
//   },

//   // Second Column (3)
//   {
//     id: 3,
//     name: "Phool Bagh",
//     type: "Public Garden",
//     rating: 4.3,
//     image: phool,
//     size: responsive({ base: "h-[250px]", md: "h-[500px]" }),
//     width: responsive({ base: "w-full", md: "w-[370px]" }),
//     gradient: "bg-gradient-to-b from-transparent to-black/80",
//     ratingBg: "bg-white",
//     ratingColor: "text-gray-800",
//   },

//   // Third Column (4-6)
//   {
//     id: 4,
//     name: "Kanpur Memorial Church",
//     type: "Historical Landmark",
//     rating: 4.6,
//     image: church,
//     size: responsive({ base: "h-[250px]", md: "h-[250px]" }),
//     width: responsive({ base: "w-full", md: "w-[470px]" }),
//     gradient: "bg-gradient-to-b from-transparent to-black/80",
//     ratingBg: "bg-white",
//     ratingColor: "text-gray-800",
//   },
//   {
//     id: 5,
//     name: "Blue World Theme Park",
//     type: "Amusement Park",
//     rating: 4.2,
//     image: blueworld,
//     size: responsive({ base: "h-[260px]", md: "h-[250px]" }),
//     width: responsive({ base: "w-full", md: "w-[170px]" }),
//     gradient: "bg-gradient-to-b from-transparent to-black/80",
//     ratingBg: "bg-white",
//     ratingColor: "text-gray-800",
//   },
//   {
//     id: 6,
//     name: "Ganga Barrage",
//     type: "Riverfront",
//     rating: 4.4,
//     image: ganga,
//     size: responsive({ base: "h-[260px]", md: "h-[250px]" }),
//     width: responsive({ base: "w-full", md: "w-[270px]" }),
//     gradient: "bg-gradient-to-b from-transparent to-black/80",
//     ratingBg: "bg-white",
//     ratingColor: "text-gray-800",
//   },
// ];

// export default function KanpurPlaces() {
//   return (
//     <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
//       {/* Heading Section */}
//       <div className="text-center mb-8 sm:mb-12 lg:mb-16">
//         <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
//           Top Places in Kanpur
//         </h2>
//         <p className="text-gray-600 mx-auto max-w-md text-sm sm:text-base">
//           Discover Kanpur&rsquo;s most iconic locations
//         </p>
//       </div>

//       {/* Main Layout Container */}
//       <div className="flex flex-col md:flex-row gap-3 ">
//         {/* Left Column (1-2) */}
//         <div className="flex flex-col space-y-3 md:w-[270px] ">
//           {kanpurPlaces.slice(0, 2).map((place, i) => (
//             <motion.div
//               key={i}
//               className={`relative rounded-xl overflow-hidden ${place.size} ${place.width} ${place.gradient}`}
//               whileHover={{ scale: 1.03 }}
//               transition={{ duration: 0.3 }}
//             >
//               <img
//                 src={place.image}
//                 alt={place.name}
//                 className="object-cover"
//                 sizes="(max-width: 768px) 100vw, 50vw"
//               />
//               <div className={`absolute inset-0 ${place.gradient}`} />
//               <div
//                 className={`absolute top-3 left-3 w-10 h-6 ${place.ratingBg} rounded-lg flex items-center justify-center z-10`}
//               >
//                 <span className={`${place.ratingColor} text-sm font-medium`}>
//                   {place.rating}
//                 </span>
//               </div>
//               <div className="absolute bottom-4 left-4 right-4 text-white z-10">
//                 <h3 className="text-lg sm:text-xl font-semibold">
//                   {place.name}
//                 </h3>
//                 <p className="text-xs sm:text-sm opacity-90">{place.type}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Middle Column (3) */}
//         <motion.div
//           className={`relative rounded-xl md:h-[520px] overflow-hidden ${kanpurPlaces[2].size} ${kanpurPlaces[2].width} ${kanpurPlaces[2].gradient}`}
//           whileHover={{ scale: 1.03 }}
//           transition={{ duration: 0.3 }}
//         >
//           <Image
//             src={kanpurPlaces[2].image}
//             alt={kanpurPlaces[2].name}
//             fill
//             className="object-cover"
//             sizes="(max-width: 768px) 100vw, 50vw"
//           />
//           <div className={`absolute inset-0 ${kanpurPlaces[2].gradient}`} />
//           <div
//             className={`absolute top-3 left-3 w-10 h-6 ${kanpurPlaces[2].ratingBg} rounded-lg flex items-center justify-center z-10`}
//           >
//             <span
//               className={`${kanpurPlaces[2].ratingColor} text-sm font-medium`}
//             >
//               {kanpurPlaces[2].rating}
//             </span>
//           </div>
//           <div className="absolute bottom-4 left-4 right-4 text-white z-10">
//             <h3 className="text-lg sm:text-xl font-semibold">
//               {kanpurPlaces[2].name}
//             </h3>
//             <p className="text-xs sm:text-sm opacity-90">
//               {kanpurPlaces[2].type}
//             </p>
//           </div>
//         </motion.div>

//         {/* Right Column (4-6) */}
//         <div className="flex flex-col space-y-3 md:w-[470px]">
//           {/* Box 4 */}
//           <motion.div
//             className={`relative rounded-xl overflow-hidden ${kanpurPlaces[3].size} ${kanpurPlaces[3].width} ${kanpurPlaces[3].gradient}`}
//             whileHover={{ scale: 1.03 }}
//             transition={{ duration: 0.3 }}
//           >
//             <Image
//               src={kanpurPlaces[3].image}
//               alt={kanpurPlaces[3].name}
//               fill
//               className="object-cover"
//               sizes="(max-width: 768px) 100vw, 50vw"
//             />
//             <div className={`absolute inset-0 ${kanpurPlaces[3].gradient}`} />
//             <div
//               className={`absolute top-3 left-3 w-10 h-6 ${kanpurPlaces[3].ratingBg} rounded-lg flex items-center justify-center z-10`}
//             >
//               <span
//                 className={`${kanpurPlaces[3].ratingColor} text-sm font-medium`}
//               >
//                 {kanpurPlaces[3].rating}
//               </span>
//             </div>
//             <div className="absolute bottom-4 left-4 right-4 text-white z-10">
//               <h3 className="text-lg sm:text-xl font-semibold">
//                 {kanpurPlaces[3].name}
//               </h3>
//               <p className="text-xs sm:text-sm opacity-90">
//                 {kanpurPlaces[3].type}
//               </p>
//             </div>
//           </motion.div>

//           {/* Boxes 5-6 Container */}
//           <div className="flex gap-3">
//             {kanpurPlaces.slice(4, 6).map((place) => (
//               <motion.div
//                 key={place.id}
//                 className={`relative rounded-xl overflow-hidden ${place.size} ${place.width} ${place.gradient}`}
//                 whileHover={{ scale: 1.03 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <Image
//                   src={place.image}
//                   alt={place.name}
//                   fill
//                   className="object-cover"
//                   sizes="(max-width: 768px) 100vw, 50vw"
//                 />
//                 <div className={`absolute inset-0 ${place.gradient}`} />
//                 <div
//                   className={`absolute top-3 left-3 w-10 h-6 ${place.ratingBg} rounded-lg flex items-center justify-center z-10`}
//                 >
//                   <span className={`${place.ratingColor} text-sm font-medium`}>
//                     {place.rating}
//                   </span>
//                 </div>
//                 <div className="absolute bottom-4 left-4 right-4 text-white z-10">
//                   <h3 className="text-lg sm:text-xl font-semibold">
//                     {place.name}
//                   </h3>
//                   <p className="text-xs sm:text-sm opacity-90">{place.type}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { motion } from "framer-motion";

// ✅ Imported images
import jkImage from "../Asset/jk.jpg";
import phool from "../Asset/phool.jpg";
import church from "../Asset/church.jpg";
import blueworld from "../Asset/blueworld.jpg";
import ganga from "../Asset/ganga.jpg";
import zoo from "../Asset/zoo.jpg"; // renamed for clarity
import { useEffect, useState } from "react";
import axios from "axios";

interface Place {
  id: number;
  name?: string;
  type?: string;
  rating?: number;
  image?: string;
  size?: string;
  width?: string;
  gradient?: string;
  ratingBg?: string;
  ratingColor?: string;
  // API response fields
  placeImage?: string;
  placeName?: string;
  rate?: number;
  placesubtitle?: string;
}

const responsive = (classes: Record<string, string>) => {
  return Object.entries(classes)
    .map(([breakpoint, className]) =>
      breakpoint === "base" ? className : `${breakpoint}:${className}`
    )
    .join(" ");
};

const kanpurPlaces = [
  {
    id: 1,
    name: "JK Temple",
    type: "Spiritual Site",
    rating: 4.7,
    image: jkImage,
    size: responsive({ base: "h-[250px]", md: "h-[250px]" }),
    width: responsive({ base: "w-full", md: "w-[270px]" }),
    gradient: "bg-gradient-to-b from-transparent to-black/80",
    ratingBg: "bg-white",
    ratingColor: "text-gray-800",
  },
  {
    id: 2,
    name: "Allen Forest Zoo",
    type: "Wildlife Park",
    rating: 4.5,
    image: zoo,
    size: responsive({ base: "h-[250px]", md: "h-[250px]" }),
    width: responsive({ base: "w-full", md: "w-[270px]" }),
    gradient: "bg-gradient-to-b from-transparent to-black/80",
    ratingBg: "bg-white",
    ratingColor: "text-gray-800",
  },
  {
    id: 3,
    name: "Phool Bagh",
    type: "Public Garden",
    rating: 4.3,
    image: phool,
    size: responsive({ base: "h-[250px]", md: "h-[500px]" }),
    width: responsive({ base: "w-full", md: "w-[370px]" }),
    gradient: "bg-gradient-to-b from-transparent to-black/80",
    ratingBg: "bg-white",
    ratingColor: "text-gray-800",
  },
  {
    id: 4,
    name: "Kanpur Memorial Church",
    type: "Historical Landmark",
    rating: 4.6,
    image: church,
    size: responsive({ base: "h-[250px]", md: "h-[250px]" }),
    width: responsive({ base: "w-full", md: "w-[470px]" }),
    gradient: "bg-gradient-to-b from-transparent to-black/80",
    ratingBg: "bg-white",
    ratingColor: "text-gray-800",
  },
  {
    id: 5,
    name: "Blue World Theme Park",
    type: "Amusement Park",
    rating: 4.2,
    image: blueworld,
    size: responsive({ base: "h-[260px]", md: "h-[250px]" }),
    width: responsive({ base: "w-full", md: "w-[170px]" }),
    gradient: "bg-gradient-to-b from-transparent to-black/80",
    ratingBg: "bg-white",
    ratingColor: "text-gray-800",
  },
  {
    id: 6,
    name: "Ganga Barrage",
    type: "Riverfront",
    rating: 4.4,
    image: ganga,
    size: responsive({ base: "h-[260px]", md: "h-[250px]" }),
    width: responsive({ base: "w-full", md: "w-[270px]" }),
    gradient: "bg-gradient-to-b from-transparent to-black/80",
    ratingBg: "bg-white",
    ratingColor: "text-gray-800",
  },
];

export default function KanpurPlaces() {
  const [placeData, setPlaceData] = useState<Place[]>([]);
  const [city, setCity] = useState<string>("");
  useEffect(() => {
    const getPlaces = async () => {
      if (typeof window !== "undefined") {
        const c = localStorage.getItem("selectedCity") || "";
        setCity(c);

        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API}/getPlaces`,
            {
              params: {
                city: c, // Use c directly instead of state to avoid async issue
              },
            }
          );

          if (res.data.success) {
            setPlaceData(res.data.places);
          }
        } catch (e) {
          console.error("Fetch error:", e);
        }
      }
    };

    getPlaces();
  }, []);

  return placeData?.length > 0 ? (
    <div className="container mx-auto px-4 py-8  sm:py-12 lg:py-16">
      {/* Heading Section */}
      <div className="text-center mb-8 sm:mb-12 lg:mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
          Top Places in {city}
        </h2>
        <p className="text-gray-600 mx-auto max-w-md text-sm sm:text-base">
          Discover {city}&rsquo;s most iconic locations
        </p>
      </div>

      {/* Main Layout Container */}
      <div className="flex flex-col md:flex-row gap-3 w-full  justify-center">
        {/* Left Column (1-2) */}
        <div className="flex flex-col space-y-3 md:w-[270px]">
          {placeData.slice(0, 2).map((item: Place) => (
            <motion.div
              key={item?.id}
              className={`relative rounded-xl overflow-hidden ${responsive({
                base: "h-[250px]",
                md: "h-[250px]",
              })} ${responsive({ base: "w-full", md: "w-[270px]" })}`}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={item.placeImage}
                alt={item.placeName}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-b from-transparent to-black/80`}
              />
              <div
                className={`absolute top-3 left-3 w-10 h-6 bg-white rounded-lg flex items-center justify-center z-10`}
              >
                <span className={`text-gray-800 text-sm font-medium`}>
                  {item.rate}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                <h3 className="text-lg sm:text-xl font-semibold">
                  {item.placeName}
                </h3>
                <p className="text-xs sm:text-sm opacity-90">
                  {item?.placesubtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Middle Column (3) */}
        {placeData?.[2] && (
          <motion.div
            className={`relative rounded-xl md:h-[520px] overflow-hidden ${kanpurPlaces[2].size} ${kanpurPlaces[2].width}`}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={placeData?.[2]?.placeImage}
              alt="apna city"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-b from-transparent to-black/80`}
            />
            <div
              className={`absolute top-3 left-3 w-10 h-6 bg-white rounded-lg flex items-center justify-center z-10`}
            >
              <span className={`text-gray-800 text-sm font-medium`}>
                {placeData?.[2]?.rate}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-white z-10">
              <h3 className="text-lg sm:text-xl font-semibold">
                {placeData?.[2]?.placeName}
              </h3>
              <p className="text-xs sm:text-sm opacity-90">
                {placeData?.[2]?.placesubtitle}
              </p>
            </div>
          </motion.div>
        )}

        {/* Right Column (4-6) */}
        <div className="flex flex-col space-y-3 md:w-[470px]">
          <motion.div
            className={`relative rounded-xl overflow-hidden ${responsive({
              base: "h-[250px]",
              md: "h-[250px]",
            })} ${responsive({ base: "w-full", md: "w-[470px]" })}`}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={placeData?.[3]?.placeImage}
              alt={placeData?.[3]?.placeName}
              className="object-cover "
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-b from-transparent to-black/80`}
            />
            <div
              className={`absolute top-3 left-3 w-10 h-6 bg-white rounded-lg flex items-center justify-center z-10`}
            >
              <span className={`text-gray-800 text-sm font-medium`}>
                {placeData?.[3]?.rate}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-white z-10">
              <h3 className="text-lg sm:text-xl font-semibold">
                {placeData?.[3]?.placeName}
              </h3>
              <p className="text-xs sm:text-sm opacity-90">
                {placeData?.[3]?.placesubtitle}
              </p>
            </div>
          </motion.div>

          {/* Boxes 5-6 */}
          <div className="flex gap-3">
            {placeData.slice(4, 6).map((item) => (
              <motion.div
                key={item.id}
                className={`relative rounded-xl overflow-hidden ${responsive({
                  base: "h-[260px]",
                  md: "h-[250px]",
                })} ${responsive({ base: "w-full", md: "w-[170px]" })}`}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={item.placeImage}
                  alt={item.placeName}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-b from-transparent to-black/80`}
                />
                <div
                  className={`absolute top-3 left-3 w-10 h-6 bg-white rounded-lg flex items-center justify-center z-10`}
                >
                  <span className={`text-gray-800 text-sm font-medium`}>
                    {item?.rate}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                  <h3 className="text-lg sm:text-xl font-semibold">
                    {item?.placeName}
                  </h3>
                  <p className="text-xs sm:text-sm opacity-90">
                    {" "}
                    {item?.placesubtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
