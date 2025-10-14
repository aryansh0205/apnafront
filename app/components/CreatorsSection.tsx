"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { API } from "../utils/helpers";

export default function CreatorsSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  interface Creator {
    id: number;
    creatorImage: string;
    creatorName: string;
    imageUrl?: string;
    size?: number;
    link?: string;
    userName?: string;
  }

  const controls = useAnimation();
  const [creatorData, setCreatorData] = useState<Creator[]>([]);

  useEffect(() => {
    const getCreater = async () => {
      if (typeof window !== "undefined") {
        const city = localStorage.getItem("selectedCity");
        try {
          const res = await axios.get(`${API}/getUser`, {
            params: {
              type: "creator",
              city: city,
            },
          });
          setCreatorData(res.data || []);
        } catch (error) {
          console.error("Error fetching creators:", error);
        }
      }
    };
    getCreater();
  }, []);

  const defaultPositions = [
    { top: "25px", left: "12%" },
    { top: "130px", left: "22%" },
    { top: "15px", left: "33%" },
    { top: "80px", left: "43%" },
    { top: "20px", left: "55%" },
    { top: "145px", left: "65.5%" },
    { top: "25px", left: "76%" },
  ];

  const customPositions1200to1536 = [
    { top: "35px", left: "14%" },
    { top: "140px", left: "26%" },
    { top: "16px", left: "39.5%" },
    { top: "85px", left: "52%" },
    { top: "18px", left: "65.5%" },
    { top: "155px", left: "78%" },
    { top: "28px", left: "90.5%" },
  ];

  const creator = creatorData.slice(0, 7).map((data, index) => {
    const position =
      screenWidth >= 1200 && screenWidth < 1536
        ? customPositions1200to1536[index]
        : defaultPositions[index];

    const sizeMap = [100, 150, 115, 135, 145, 130, 120];
    const size = sizeMap[index];

    return {
      id: data?.id ?? index,
      name: data?.userName,
      image: data?.creatorImage,
      size,
      height: size,
      width: size,
      position: { desktop: position },
    };
  });

  useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  }, [controls]);

  return (
    <>
      {creatorData?.length > 0 && (
        <section className="container mx-auto my-6 relative pp:space-y-12 space-y-6">
          <h2 className="text-3xl font-bold mb-16 text-center">
            Top Creators in Kanpur
          </h2>

          {/* Desktop Layout */}
          <div className="w-full">
            <div className="hidden xl:block relative h-[300px]">
              <svg
                className="absolute w-full flex justify-center items-center -top-0 h-full"
                height="299"
                fill="none"
                viewBox="0 0  299"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.46875 96.4875C130.87 111.18 166.687 -12.3331 248.249 14.6001C273.828 19.882 320.944 52.7856 304.78 142.145C288.616 231.504 328.99 273.556 351.197 283.412C373.222 295.093 427.212 310.68 466.966 279.579C506.721 248.478 510.835 204.93 507.922 187.044L485.533 85.2003C486.261 56.728 502.571 0.221269 561.984 1.97341C621.398 3.72556 640.256 49.4271 642.258 72.0589V153.643C645.171 177.188 665.521 225.262 723.624 229.204C781.727 233.147 806.447 184.488 811.544 159.666L820.281 72.0589C860.669 -44.7246 1018.51 3.51666 1007.15 107.597C986.918 171.029 962.808 230.68 996.606 266.234C1036.64 308.346 1138.71 301.208 1146.64 217.766C1154.58 134.325 1106.55 81.5855 1158.36 33.8476C1194.06 0.953943 1250.95 0.725189 1282.88 43.131C1302.87 69.6752 1306.55 79.1498 1306.55 141.865C1306.55 187.729 1341.42 209.11 1354.64 215.565C1357.9 217.159 1361.42 218.014 1365.04 218.313C1380.53 219.592 1424.89 221.197 1440.47 199.629"
                  stroke="red"
                  strokeDasharray="9 9"
                  strokeWidth="2"
                />
              </svg>

              <div className="relative h-full">
                {creator.map((creator) => (
                  <motion.div
                    key={creator.id}
                    className="absolute flex flex-col items-center group"
                    style={{
                      ...creator?.position?.desktop,
                      width: `${creator?.width}px`,
                      height: `${creator?.height}px`,
                    }}
                    onMouseEnter={() => setHoveredId(creator.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div className="relative transition-transform duration-300 group-hover:scale-105">
                      <div className="relative overflow-hidden rounded-full">
                        <img
                          src={creator?.image}
                          alt="dp"
                          width={creator?.width}
                          height={creator?.height}
                          className="rounded-full object-cover border-4 border-white shadow-xl hover:shadow-2xl transition-all group-hover:blur-sm"
                        />
                        {hoveredId === creator.id && (
                          <motion.button
                            className="absolute left-1/2 bottom-4 -translate-x-1/2 px-4 py-2 text-white  rounded-full text-sm z-10"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            Know More →
                          </motion.button>
                        )}
                      </div>
                    </div>
                    <p className="text-center mt-6 font-medium text-gray-800 px-2 rounded-full">
                      {creator?.name}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          {creator.length > 0 && (
            <div className="xl:hidden overflow-hidden relative h-[140px]">
              <motion.div
                className="flex gap-6 absolute left-0"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  duration: 15,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                style={{
                  width: `${creator.length * 2 * 110}px`,
                }}
              >
                {[...creator, ...creator].map((creator, index) => (
                  <div
                    key={`${creator?.id}-${index}`}
                    className="relative flex flex-col items-center"
                    style={{ width: "90px", height: "90px" }}
                  >
                    <img
                      src={creator?.image}
                      alt="dp"
                      width={90}
                      height={90}
                      className="rounded-full object-cover w-full h-full border-2 border-white shadow-md"
                    />
                    <p className="text-center text-[13px] mt-2 font-medium">
                      {creator?.name}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          )}

          <div className="w-full pp:h-[80px] flex justify-center items-center">
            <Link href="/creators" passHref>
              <button className="text-[15px] rounded-full border-2 border-red-600 text-red-600 px-5 py-2 text-center transition duration-300 ease-in-out transform hover:bg-red-600 hover:text-white hover:scale-105">
                View All
              </button>
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
