"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiInstagram,
  FiYoutube,
  FiTwitter,
} from "react-icons/fi";
import { FaLinkedinIn, FaSearch } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { API } from "../utils/helpers";
import { RiFacebookCircleLine } from "react-icons/ri";

interface Creator {
  id: string;
  creatorName: string;
  creatorImage: string;
  category: string;
  rating: number;
  collaborations: number;
  phone: string;
  creatorPhone: string;
  email: string;
  creatorCategory: string;
  creatorEmail: string;
  yt: string | null;
  fb: string | null;
  insta: string | null;
  tiktok: string | null;
  twitter: string | null;
  linkedin: string | null;
  userName?: string;
  fullName?: string;
}

export default function CreatorsListPage() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [filtered, setFiltered] = useState<Creator[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [city, setCity] = useState<string | null>(null);

  useEffect(() => {
    const storedCity = localStorage.getItem("selectedCity");
    setCity(storedCity);
  }, []);

  const fetchCeartors = async () => {
    // setLoading(true);
    try {
      // const city = localStorage.getItem("selectedCity");
      // console.log(city, "city");
      const res = await axios.get(`${API}/getUser`, {
        params: {
          type: "creator",
          city: city,
        },
      });

      setCreators(res.data || []);

      setFiltered(res.data || []);
    } catch (error) {
      console.error("Error fetching creators:", error);
    }
    // setLoading(false);
  };

  useEffect(() => {
    fetchCeartors();
  }, []);
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFiltered(creators);
      return;
    }

    const lowerSearch = searchTerm.toLowerCase();

    const filteredList = creators.filter((c) => {
      const fullName = c.fullName?.toLowerCase() || "";
      const userName = c.userName?.toLowerCase() || "";
      const email = c.email?.toLowerCase() || "";

      return (
        userName.startsWith(lowerSearch) ||
        email.startsWith(lowerSearch) ||
        fullName.startsWith(lowerSearch)
      );
    });

    setFiltered(filteredList);
  }, [searchTerm, creators]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 md:pt-25 pt-10 bg-">
        <div className="relative max-w-7xl mx-auto px-4 text-center ">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 "
          >
            Meet the <span className="text-red-600">Creators</span> Shaping Your
            City
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-[18px] sm:text-xl max-w-2xl mx-auto text-gray-600 "
          >
            Discover local creators shaping your city&apos;s vibe.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10"
          ></motion.div>
        </div>

        {/* Search and Filter Tabs */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search creators..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          {/* <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                className={`px-4 py-2 rounded-full border text-sm whitespace-nowrap transition ${
                  activeTab === tab.value
                    ? "bg-red-600 text-white border-red-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div> */}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((item, index) => {
            return (
              <motion.div
                key={item?.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200"
              >
                <img
                  width={500}
                  height={600}
                  src={item?.creatorImage}
                  alt="dp"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {item?.userName}
                  </h3>
                  <p className="text-sm text-gray-500 mb-1">
                    {item?.creatorCategory}
                  </p>

                  <div className="text-sm text-gray-700 mb-2 truncate">
                    <FiMail className="inline mr-2 text-gray-500" />
                    {item?.email}
                  </div>
                  <div className="text-sm text-gray-700 truncate">
                    <FiPhone className="inline mr-2 text-gray-500" />
                    {item?.phone}
                  </div>

                  <div className="flex space-x-2 mt-3 text-gray-600">
                    {item?.insta && (
                      <a
                        href={`${item?.insta}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FiInstagram />
                      </a>
                    )}
                    {`${item?.yt}` && (
                      <a
                        href={`${item?.yt}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FiYoutube />
                      </a>
                    )}
                    {`${item?.twitter}` && (
                      <a
                        href={`${item?.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FiTwitter />
                      </a>
                    )}
                    {`${item?.fb}` && (
                      <a
                        href={`${item?.fb}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <RiFacebookCircleLine />
                      </a>
                    )}
                    {`${item?.linkedin}` && (
                      <a
                        href={`${item?.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaLinkedinIn />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Creator Grid */}
      </div>

      <Footer />
    </div>
  );
}
