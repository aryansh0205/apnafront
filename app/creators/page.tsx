"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiInstagram,
  FiYoutube,
  FiTwitter,
  FiUser,
  FiX,
  FiGlobe,
} from "react-icons/fi";
import { FaLinkedinIn, FaSearch, FaStar, FaTiktok } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { API } from "../utils/helpers";
import { RiFacebookCircleLine } from "react-icons/ri";
import Image from "next/image";

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
  bio?: string;
  website?: string;
}

export default function CreatorsListPage() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [filtered, setFiltered] = useState<Creator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [city, setCity] = useState<string | null>(null);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCity = localStorage.getItem("selectedCity");
      setCity(storedCity);
    }
  }, []);

  const fetchCreators = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API}/getUser`, {
        params: {
          type: "creator",
          city: city,
        },
      });

      const validatedCreators = res.data.map((creator: Creator, index: number) => {
        let imageUrl = creator.creatorImage || "/default-creator.jpg";
        if (imageUrl.startsWith("//")) {
          imageUrl = `https:${imageUrl}`;
        }

        return {
          ...creator,
          id: creator.id || `creator-${index}-${Date.now()}`,
          userName: creator.userName || creator.creatorName || `creator-${index}`,
          fullName: creator.fullName || creator.creatorName || "",
          creatorImage: imageUrl,
          email: creator.email || creator.creatorEmail || "",
          phone: creator.phone || creator.creatorPhone || "",
          creatorCategory: creator.creatorCategory || creator.category || "General",
          rating: creator.rating || Math.floor(Math.random() * 2) + 3 + Math.random(),
          collaborations: creator.collaborations || Math.floor(Math.random() * 50) + 5,
          bio: creator.bio || "No bio available yet. This creator hasn't shared their story.",
          website: creator.website || null,
        };
      });

      setCreators(validatedCreators);
      setFiltered(validatedCreators);
    } catch (error) {
      console.error("Error fetching creators:", error);
      setError("Failed to load creators. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city) fetchCreators();
  }, [city]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFiltered(creators);
      return;
    }

    const lowerSearch = searchTerm.toLowerCase();
    const filteredList = creators.filter((creator) => {
      const searchFields = [
        creator.userName,
        creator.fullName,
        creator.email,
        creator.creatorCategory,
        creator.creatorName,
        creator.bio,
      ].map(field => field?.toLowerCase() || "");
      return searchFields.some(field => field.includes(lowerSearch));
    });

    setFiltered(filteredList);
  }, [searchTerm, creators]);

  const getImageProps = (imageUrl: string) => {
    return imageUrl.startsWith("/") 
      ? { src: imageUrl, loader: undefined }
      : { src: imageUrl, loader: undefined, unoptimized: true };
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`text-sm ${
              i < Math.floor(rating)
                ? "text-yellow-400"
                : i === Math.floor(rating) && rating % 1 >= 0.5
                ? "text-yellow-400 opacity-70"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-1 text-xs text-gray-500">({rating.toFixed(1)})</span>
      </div>
    );
  };

  const renderContactInfo = (creator: Creator) => {
    if (!creator.email && !creator.phone) {
      return (
        <div className="text-sm text-gray-500 italic">
          Contact information private
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {creator.email && (
          <div className="flex items-center text-sm text-gray-700">
            <FiMail className="mr-2 text-gray-500 flex-shrink-0" />
            <a href={`mailto:${creator.email}`} className="hover:text-red-600">
              {creator.email}
            </a>
          </div>
        )}
        {creator.phone ? (
          <div className="flex items-center text-sm text-gray-700">
            <FiPhone className="mr-2 text-gray-500 flex-shrink-0" />
            <a href={`tel:${creator.phone}`} className="hover:text-red-600">
              {creator.phone}
            </a>
          </div>
        ) : (
          creator.email && (
            <div className="text-sm text-gray-500 italic">
              Phone number private
            </div>
          )
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
          <div className="text-center py-10">
            <h3 className="text-lg font-medium text-red-600">{error}</h3>
            <button
              onClick={fetchCreators}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 md:pt-25 pt-10 ">
        <div className="relative max-w-7xl mx-auto px-4 text-center ">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 "
          >
            Meet the <span className="text-red-600">Creators</span> Shaping Your City
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-[18px] sm:text-xl max-w-2xl mx-auto text-gray-600"
          >
            Discover and collaborate with talented local creators in your area
          </motion.p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 mt-10">
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder="Search by name, category, or bio..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FiUser className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-700">
              {searchTerm ? "No creators match your search" : "No creators found in your city"}
            </h3>
            <p className="text-gray-500 mt-2">
              {searchTerm ? "Try different search terms" : "Check back later or try a different location"}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((creator) => {
              const imageProps = getImageProps(creator.creatorImage);
              return (
                <motion.div
                  key={creator.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer"
                  onClick={() => setSelectedCreator(creator)}
                >
                  <div className="relative h-56 w-full group">
                    <Image
                      {...imageProps}
                      alt={creator.userName || "Creator profile"}
                      fill
                      className="object-cover group-hover:opacity-90 transition-opacity"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/default-creator.jpg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="font-bold text-white text-lg">
                        {creator.fullName || creator.userName}
                      </h3>
                      <p className="text-sm text-white/90">
                        {creator.creatorCategory}
                      </p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      {renderStars(creator.rating)}
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                        {creator.collaborations}+ collabs
                      </span>
                    </div>
                    <div className="mt-2">
                      {renderContactInfo(creator)}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedCreator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCreator(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-56  w-full">
                <Image
                  src={selectedCreator.creatorImage}
                  alt={selectedCreator.userName || "Creator profile"}
                  fill
                  className="object-cover"
                  unoptimized={true}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/default-creator.jpg";
                  }}
                />
                <button
                  onClick={() => setSelectedCreator(null)}
                  className="absolute top-3 right-3 bg-white/80 text-gray-800 p-1 rounded-full hover:bg-white"
                >
                  <FiX size={24} />
                </button>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-2xl font-bold text-white">
                    {selectedCreator.fullName || selectedCreator.userName}
                  </h2>
                  <p className="text-white/90">
                    {selectedCreator.creatorCategory}
                  </p>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-semibold mb-2">About</h3>
                    <p className="text-gray-700 whitespace-pre-line">
                      {selectedCreator.bio}
                    </p>

                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-2">Social Media</h3>
                      <div className="flex space-x-4 text-gray-600">
                        {selectedCreator.insta && (
                          <a
                            href={selectedCreator.insta}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-red-600 transition-colors"
                          >
                            <FiInstagram size={20} />
                          </a>
                        )}
                        {selectedCreator.yt && (
                          <a
                            href={selectedCreator.yt}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-red-600 transition-colors"
                          >
                            <FiYoutube size={20} />
                          </a>
                        )}
                        {selectedCreator.twitter && (
                          <a
                            href={selectedCreator.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-red-600 transition-colors"
                          >
                            <FiTwitter size={20} />
                          </a>
                        )}
                        {selectedCreator.fb && (
                          <a
                            href={selectedCreator.fb}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-red-600 transition-colors"
                          >
                            <RiFacebookCircleLine size={20} />
                          </a>
                        )}
                        {selectedCreator.tiktok && (
                          <a
                            href={selectedCreator.tiktok}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-red-600 transition-colors"
                          >
                            <FaTiktok size={18} />
                          </a>
                        )}
                        {selectedCreator.linkedin && (
                          <a
                            href={selectedCreator.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-red-600 transition-colors"
                          >
                            <FaLinkedinIn size={18} />
                          </a>
                        )}
                        {selectedCreator.website && (
                          <a
                            href={selectedCreator.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-red-600 transition-colors"
                          >
                            <FiGlobe size={20} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Details</h3>
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Rating</h4>
                          <div className="mt-1">
                            {renderStars(selectedCreator.rating)}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Collaborations</h4>
                          <p className="text-gray-700">
                            {selectedCreator.collaborations}+ successful projects
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Contact</h3>
                      {renderContactInfo(selectedCreator)}
                    </div>

                    <button className="w-full py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      Request Collaboration
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}