"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function CreatorsSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  interface Creator {
    id: number;
    creatorImage: string;
    creatorName: string;
    imageUrl?: string;

    size?: number;
    link?: string;
  }

  const controls = useAnimation();

  const [creatorData, setCreatorData] = useState<Creator[]>([]);

  const getCreater = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/getCreatorsAdmin`
      );

      if (res.status === 200 && Array.isArray(res?.data?.processedCreators)) {
        setCreatorData(res?.data?.processedCreators);
        console.log(res?.data?.processedCreators, "creators");
      } else {
        console.warn("Unexpected data format", res?.data?.processedCreators);
        setCreatorData([]); // fallback to empty array
      }
    } catch (e) {
      console.error("Fetch error:", e);
      setCreatorData([]); // fallback to empty array
    }
  };
  const creator = [
    {
      id: 1,
      name: creatorData[0]?.creatorName,
      image: creatorData[0]?.imageUrl,
      size: 100,
      height: 100,
      width: 100,
      position: { desktop: { top: "25px", left: "12%" } }, // Adjust these values
    },
    {
      id: 2,
      name: creatorData[1]?.creatorName,
      image: creatorData[1]?.imageUrl,
      size: 150,
      height: 150,
      width: 150,
      position: { desktop: { top: "130px", left: "22%" } },
    },
    {
      id: 3,
      name: creatorData[2]?.creatorName,
      image: creatorData[2]?.imageUrl,
      size: 115,
      height: 115,
      width: 115,
      position: { desktop: { top: "15px", left: "33%" } },
    },
    {
      id: 4,
      name: creatorData[3]?.creatorName,
      image: creatorData[3]?.imageUrl,
      size: 135,
      height: 135,
      width: 135,
      position: { desktop: { top: "80px", left: "43%" } },
    },
    {
      id: 5,
      name: creatorData[4]?.creatorName,
      image: creatorData[4]?.imageUrl,
      size: 145,
      height: 145,
      width: 145,
      position: { desktop: { top: "20px", left: "55%" } },
    },
    {
      id: 6,
      name: creatorData[5]?.creatorName,
      image: creatorData[5]?.imageUrl,
      size: 130,
      height: 130,
      width: 130,
      position: { desktop: { top: "145px", left: "65%" } },
    },
    {
      id: 7,
      name: creatorData[6]?.creatorName,
      image: creatorData[6]?.imageUrl,
      size: 120,
      height: 120,
      width: 120,
      position: { desktop: { top: "25px", left: "75%" } },
    },
  ];

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
  useEffect(() => {
    // getcreator();
    getCreater();
  }, []);

  return (
    <>
      {creatorData?.length > 0 && (
        <section className="container mx-auto  my-6 relative pp:space-y-12 space-y-6">
          <h2 className="text-3xl font-bold  mb-16 text-center">
            Top Creators in Kanpur
          </h2>
          <div className="w-full">
            {/* Desktop Layout */}
            <div className="hidden xl:block relative h-[300px]">
              {/* Custom curved connecting line */}

              <svg
                className="absolute w-full  flex justify-center items-center -top-0 h-full"
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

              <div className="relative  h-full">
                {creator.map((creator, id) => (
                  <motion.div
                    key={id}
                    className="absolute flex flex-col items-center group"
                    style={{
                      ...creator?.position?.desktop,
                      width: `${creator?.width}px`,
                      height: `${creator?.height}px`,
                    }}
                    onHoverStart={() => setHoveredId(creator?.id)}
                    onHoverEnd={() => setHoveredId(null)}
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
                        {hoveredId === creator?.id && (
                          <motion.button
                            className="absolute left-1/2 bottom-4 -translate-x-1/2
                  px-4 py-2  text-white
                  rounded-full text-sm z-10
                  transition-colors"
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
                animate={{
                  x: ["0%", "-50%"],
                }}
                transition={{
                  duration: 15,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                style={{
                  width: `${creator.length * 2 * 110}px`, // 110 = 90px image + 20px spacing
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
                      {creator?.image}
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
