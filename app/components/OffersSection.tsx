"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import axios from "axios";
import { FiMapPin, FiPhone, FiClock, FiShoppingBag } from "react-icons/fi";

// Custom hook for timer functionality
const useOfferTimer = (offers: Offer[] | null) => {
  const [times, setTimes] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    if (!offers) return;

    // Initialize timers for each offer based on end date
    const initialTimes: { [key: number]: number } = {};
    offers.forEach((offer) => {
      if (offer._id && offer.offerEndDate) {
        const endTime = new Date(offer.offerEndDate).getTime();
        const currentTime = new Date().getTime();
        const timeRemaining = Math.max(0, endTime - currentTime);
        initialTimes[offer._id] = Math.floor(timeRemaining / 1000); // Convert to seconds
      }
    });

    setTimes(initialTimes);

    // Setup interval to update all timers
    const interval = setInterval(() => {
      setTimes((prevTimes) => {
        const newTimes = { ...prevTimes };
        let allTimersFinished = true;

        for (const id in newTimes) {
          if (newTimes[id] > 0) {
            newTimes[id] -= 1;
            allTimersFinished = false;
          }
        }

        // If all timers are finished, clear interval
        if (allTimersFinished) {
          clearInterval(interval);
        }

        return newTimes;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [offers]);

  return times;
};

// Format time function
const formatTime = (seconds: number): string => {
  if (seconds <= 0) return "Expired";

  const days = Math.floor(seconds / (24 * 60 * 60));
  const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((seconds % (60 * 60)) / 60);
  const remainingSeconds = seconds % 60;

  if (days > 0) {
    return `${days}d ${hours}h`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m ${remainingSeconds}s`;
  }
};

// Offer type definition
type Offer = {
  _id: number;
  title?: string;
  store?: string;
  location?: string;
  contact?: string;
  description?: string;
  image?: File;
  offerImage?: string;
  offerName?: string;
  offerType?: string;
  offerPrice?: string;
  storeName?: string;
  offerEndDate?: string; // Added for timer functionality
  offerStartDate?: string;
  offerDescription?: string;
  businessCategory?: string; // Added to fix the error
  isOnline?: boolean; // Added to fix the error
  website?: string; // Added to fix the error
  address?: string; // Added to fix the error
  url: string;
};

export default function OffersSection() {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [data, setData] = useState<Offer[] | null>(null);

  // Use the custom timer hook
  const times = useOfferTimer(data);

  // Fetch offers
  const getOffers = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/getAllOffers`
      );
      if (res.status === 200 && Array.isArray(res?.data?.offers)) {
        setSelectedOffer(res.data.offers);
        setData(res.data.offers);
        console.log(res.data.offers, "offers");
      } else {
        console.warn("Unexpected data format", res?.data?.offers);
        // setOffers([]); // fallback to empty array
      }
    } catch (e) {
      console.error("Fetch error:", e);
      // setOffers([]); // fallback to empty array
    }
  };
  console.log(data);
  useEffect(() => {
    getOffers();
  }, []);
  // Safely return null if data is not valid or empty
  if (!Array.isArray(data) || data.length === 0) return null;

  function handleGetDirections(address: string): void {
    const encodedAddress = encodeURIComponent(address);
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
    window.open(googleMapsUrl, "_blank");
  }
  return (
    <section className="px-4 py-4">
      <div className="max-w-full mx-auto">
        {/* Trending Offers */}
        <div className="mt-12 pb-10 px-4 sm:px-6 md:px-8">
          {data.filter((d) => d.offerType === "trending").slice(0, 2)?.length >
            0 && (
            <h2 className="text-2xl sm:text-xl md:text-2xl font-extrabold mb-8 text-black text-center md:text-left">
              🔥 Trending Offers
            </h2>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {data
              .filter((d) => d.offerType === "trending")
              .slice(0, 2)
              .map((d) => (
                <div
                  key={d._id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedOffer(d)}
                >
                  {/* Image */}
                  <div className="relative w-full h-48 md:h-60">
                    <Image
                      src={d.url || "/placeholder.jpg"}
                      alt={d.offerName || "Offer"}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    {/* Offer name and timer */}
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                        {d.offerName}
                      </h3>
                      <span className="text-xs sm:text-sm font-medium bg-red-100 text-red-600 px-3 py-1 rounded-full whitespace-nowrap">
                        {formatTime(times[d._id] || 0)}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-gray-600 line-clamp-2">
                      {d.offerDescription}
                    </p>

                    {/* Footer: Store name + price */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm text-gray-500 truncate">
                        {d.storeName}
                      </span>
                      <span className="text-base sm:text-lg font-bold text-red-500">
                        ₹ {d.offerPrice}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {data.filter((d) => d.offerType === "hot").slice(0, 2).length > 0 && (
          <h2 className="text-3xl font-bold mb-6 text-red-600 pt-6">
            Flash Deals ⚡
          </h2>
        )}

        {/* Flash Deals Grid */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:flex md:flex-row md:gap-4">
          <div className="md:flex md:flex-col grid grid-cols-2 gap-3 md:w-[30%]">
            {data
              .filter((d) => d.offerType === "hot")
              .slice(0, 2)
              .map((d) => (
                <OfferCard
                  key={d._id}
                  offer={d}
                  times={times}
                  className="h-[200px] md:h-[260px]"
                  setSelectedOffer={setSelectedOffer}
                />
              ))}
          </div>

          {data.length >= 3 && (
            <div className="col-span-2 md:w-[40%]">
              <OfferCard
                offer={data[2]}
                times={times}
                className="h-[300px] md:h-[535px]"
                setSelectedOffer={setSelectedOffer}
              />
            </div>
          )}

          {data.length >= 4 && (
            <div className="col-span-2 md:w-[30%] flex flex-col gap-3">
              <OfferCard
                offer={data[3]}
                times={times}
                className="h-[260px]"
                setSelectedOffer={setSelectedOffer}
              />
              <div className="grid grid-cols-2 gap-3">
                {data.slice(4, 6).map((d) => (
                  <OfferCard
                    key={d._id}
                    offer={d}
                    times={times}
                    className="h-[150px] md:h-[260px]"
                    setSelectedOffer={setSelectedOffer}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Offer Modal poopup */}
        <AnimatePresence>
          {selectedOffer && selectedOffer.url && (
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
              >
                {/* Offer Image with Timer */}
                <div className="relative h-56 w-full">
                  <Image
                    src={selectedOffer.url}
                    alt={selectedOffer.offerName || "Offer"}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority
                  />
                  <div className="absolute top-3 right-3 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                    {formatTime(times[selectedOffer._id] || 0)}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/70 to-transparent" />
                </div>

                {/* Offer Content */}
                <div className="p-6 flex-grow overflow-y-auto">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {selectedOffer.offerName}
                    </h3>
                    {selectedOffer.offerPrice && (
                      <span className="text-xl font-bold text-red-600">
                        ₹{selectedOffer.offerPrice}
                      </span>
                    )}
                  </div>

                  {/* Store Info */}
                  <div className="flex items-center text-gray-600 mb-6">
                    <FiShoppingBag className="mr-2 text-red-500" />
                    <span className="font-medium">
                      {selectedOffer.storeName}
                    </span>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {selectedOffer.location && (
                      <div className="flex items-start">
                        <FiMapPin className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-medium">
                            {selectedOffer.location}
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedOffer.contact && (
                      <div className="flex items-start">
                        <FiPhone className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-500">Contact</p>
                          <p className="font-medium">{selectedOffer.contact}</p>
                        </div>
                      </div>
                    )}

                    {selectedOffer.businessCategory && (
                      <div className="flex items-start">
                        <FiShoppingBag className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-500">Category</p>
                          <p className="font-medium">
                            {selectedOffer.businessCategory}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start">
                      <FiClock className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">Valid Until</p>
                        <p className="font-medium">
                          {selectedOffer.offerEndDate
                            ? new Date(
                                selectedOffer.offerEndDate
                              ).toLocaleDateString()
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Offer Details
                    </h4>
                    <p className="text-gray-700">
                      {selectedOffer.offerDescription ||
                        selectedOffer.description ||
                        "More details about this offer will be available soon."}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="border-t border-gray-100 p-4 flex gap-3">
                  <button
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors"
                    onClick={() => setSelectedOffer(null)}
                  >
                    Close
                  </button>
                  {selectedOffer.isOnline ? (
                    <a
                      href={selectedOffer.website || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors text-center"
                    >
                      Visit Website
                    </a>
                  ) : (
                    <button
                      onClick={() =>
                        selectedOffer.address &&
                        handleGetDirections(selectedOffer.address)
                      }
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                      Get Directions
                    </button>
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

// Reusable OfferCard component
type OfferCardProps = {
  offer: Offer;
  times: { [key: number]: number };
  className?: string;
  setSelectedOffer: (offer: Offer) => void;
};

const OfferCard = ({
  offer,
  times,
  className,
  setSelectedOffer,
}: OfferCardProps) => {
  const timerValue = times[offer._id] || 0;

  return (
    <motion.div
      className={`relative group rounded-xl overflow-hidden ${className}`}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      onClick={() => setSelectedOffer(offer)}
    >
      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs z-10 md:text-sm">
        {formatTime(timerValue)}
      </div>

      <div className="relative h-full w-full">
        <Image
          src={offer?.url || "/placeholder.jpg"}
          alt={offer?.offerName || "Offer Image"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white z-10">
        <h3 className="text-sm font-bold md:text-lg">{offer?.offerName}</h3>
        <div className="flex justify-between items-center mt-1">
          <div className="md:flex w-full items-center justify-between">
            <p className="text-xs md:text-sm">{offer?.storeName}</p>
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full md:text-sm">
              {offer?.offerPrice}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
