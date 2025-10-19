"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiClock,
  FiMapPin,
  FiX,
  FiGlobe,
  FiNavigation,
  FiShoppingCart,
} from "react-icons/fi";
import {  FaStore } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { API } from "../utils/helpers";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Offer = {
  _id: string;
  offerName: string;
  businessName: string;
  category: string;
  discount: string;
  offerDescription: string;
  validity: string;
  rating: number;
  distance: string;
  offerImage: string;
  isOnline: boolean;
  website?: string;
  address?: string;
  storeId?: {
    storeName?: string;
    userName?: string;
  };
  offerCategory?: string;
  url?: string;
  offerDiscount?: string;
  offerEndDate?: string;
};

// const RatingStars = ({ rating }: { rating: number }) => {
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating % 1 >= 0.5;
//   const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

//   return (
//     <div className="flex items-center">
//       {[...Array(fullStars)].map((_, i) => (
//         <FaStar key={`full-${i}`} className="text-yellow-400 text-sm" />
//       ))}
//       {hasHalfStar && <FaStarHalfAlt className="text-yellow-400 text-sm" />}
//       {[...Array(emptyStars)].map((_, i) => (
//         <FaRegStar key={`empty-${i}`} className="text-yellow-400 text-sm" />
//       ))}
//       <span className="ml-1 text-gray-700 text-sm">{rating.toFixed(1)}</span>
//     </div>
//   );
// };

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [offerType, setOfferType] = useState<"all" | "online" | "offline">(
    "all"
  );
  const [pincode, setPincode] = useState("");
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loadingButtons, setLoadingButtons] = useState<{
    [key: string]: boolean;
  }>({});
  const [alreadyBooked, setAlreadyBooked] = useState<{
    [key: string]: boolean;
  }>({});
  const router = useRouter();

  const categories = [
    "All",
    "Food & Dining",
    "Retail",
    "Services",
    "Entertainment",
    "Wellness",
    "Education",
  ];

  useEffect(() => {
    // Client-side only code
    if (typeof window !== "undefined") {
      setUserId(localStorage.getItem("id"));
      checkBookedOffers();
    }
  }, []);

  const checkBookedOffers = useCallback(async () => {
    if (!userId) return;

    try {
      const response = await axios.get(`${API}/getBookedOffers`, {
        params: { userId },
      });
      const bookedOffers = response.data.bookedOffers || [];
      const bookedStatus: { [key: string]: boolean } = {};
      bookedOffers.forEach((offer: { offerId: string }) => {
        bookedStatus[offer.offerId] = true;
      });
      setAlreadyBooked(bookedStatus);
    } catch (err) {
      console.error("Failed to fetch booked offers:", err);
    }
  }, [userId]);

  const bookOffer = async (offerid: string) => {
    if (!userId) {
      toast.error("Please login to book offers");
      return;
    }

    if (alreadyBooked[offerid]) {
      toast(
        (t) => (
          <div className="flex flex-col items-center">
            <span>You&apos;ve already booked this offer!</span>
            <button
              onClick={() => {
                router.push("/bookings");
                toast.dismiss(t.id);
              }}
              className="mt-2 px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              View My Bookings
            </button>
          </div>
        ),
        { duration: 5000 }
      );
      return;
    }

    setLoadingButtons((prev) => ({ ...prev, [offerid]: true }));
    // const reward = Math.floor(Math.random() * 50) + 1;

    try {
      // const response = await axios.post(`${API}/bookOffer`, {
      //   userId: userId,
      //   offerId: offerid,
      //   quantity: 1,
      //   coinsRewarded: reward,
      // });
      toast.success("Offer Booked Successfully!");
      setAlreadyBooked((prev) => ({ ...prev, [offerid]: true }));

      // Redirect to bookings page after 2 seconds
      setTimeout(() => {
        router.push("/bookings");
      }, 2000);
    } catch (err) {
      console.error("Failed to book offer:", err);
      if (
        typeof err === "object"
        // err !== null &&
        // "" in err &&
        // (err).response?.data?.message === "Offer already booked"
      ) {
        setAlreadyBooked((prev) => ({ ...prev, [offerid]: true }));
        toast.error("You've already booked this offer!");
      } else {
        toast.error("Failed to book offer. Please try again.");
      }
    }
    setLoadingButtons((prev) => ({ ...prev, [offerid]: false }));
  };

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        const city =
          typeof window !== "undefined"
            ? localStorage.getItem("selectedCity")
            : null;
        const response = await axios.get(`${API}/getOfferstypes`, {
          params: {
            type: offerType,
            city: city,
          },
        });
        setOffers(response.data.offers || []);
      } catch (err) {
        console.log(err);
        setOffers([
          {
            _id: "1",
            offerName: "Weekend Brunch Special",
            businessName: "Cafe Mocha",
            category: "Food & Dining",
            discount: "20% OFF",
            offerDescription:
              "Enjoy our signature pancakes with maple syrup and fresh fruits",
            validity: "Valid until 30 June 2023",
            rating: 4.5,
            distance: "0.5 km",
            offerImage: "/offer1.png",
            isOnline: false,
            address: "123 Main Street, Kanpur",
          },
          {
            _id: "2",
            offerName: "Online Shopping Discount",
            businessName: "Urban Styles",
            category: "Retail",
            discount: "15% OFF",
            offerDescription: "Use code LOCAL15 for online purchases",
            validity: "Valid until 31 July 2023",
            rating: 4.2,
            distance: "2.1 km",
            offerImage: "/offer2.png",
            isOnline: true,
            website: "https://urbanstyles.example.com",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [offerType]);

  const filteredOffers = offers.filter((offer: Offer) => {
    const matchesSearch =
      offer?.offerName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      offer?.storeId?.storeName
        ?.toLowerCase()
        ?.includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || offer?.offerCategory === selectedCategory;
    const matchesType =
      offerType === "all" ||
      (offerType === "online" && offer.isOnline) ||
      (offerType === "offline" && !offer.isOnline);
    // Commenting out pincode filter as it's not fully implemented
    // const matchesPincode = !pincode || (offer.distance && offer.distance.includes(pincode));
    return (
      matchesSearch && matchesCategory && matchesType /* && matchesPincode */
    );
  });

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setOfferType("all");
    setPincode("");
  };

  const handleGetDirections = (address: string) => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address
    )}`;
    window.open(mapsUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Toaster position="top-center" />

      {/* Hero Section */}
      <div className="relative bg-[#f1f1f1] py-16 text-black">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4"
          >
            Discover Amazing <span className="text-red-600">Local Offers</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl max-w-2xl mx-auto mb-8"
          >
            Exclusive discounts from businesses in your area
          </motion.p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col gap-4">
            {/* Offer Type Tabs */}
            <div className="flex overflow-x-auto pb-2">
              <div className="flex space-x-1 rounded-lg bg-gray-100 p-1">
                <button
                  onClick={() => setOfferType("all")}
                  className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap ${
                    offerType === "all"
                      ? "bg-white shadow text-red-600"
                      : "text-gray-600 hover:text-gray-700"
                  }`}
                >
                  All Offers
                </button>
                <button
                  onClick={() => setOfferType("online")}
                  className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap flex items-center ${
                    offerType === "online"
                      ? "bg-white shadow text-red-600"
                      : "text-gray-600 hover:text-gray-700"
                  }`}
                >
                  <FiGlobe className="mr-2" /> Online
                </button>
                <button
                  onClick={() => setOfferType("offline")}
                  className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap flex items-center ${
                    offerType === "offline"
                      ? "bg-white shadow text-red-600"
                      : "text-gray-600 hover:text-gray-700"
                  }`}
                >
                  <FiMapPin className="mr-2" /> Nearby
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search offers..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <select
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMapPin className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Pincode filter (coming soon)"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-gray-100 cursor-not-allowed"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  maxLength={6}
                  disabled
                />
              </div>
            </div>

            {(searchTerm ||
              selectedCategory !== "All" ||
              offerType !== "all" ||
              pincode) && (
              <div className="flex justify-end">
                <button
                  onClick={resetFilters}
                  className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center"
                >
                  <FiX className="mr-1" /> Reset filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {filteredOffers.length > 0 ? (
              <>
                {filteredOffers.length} {offerType !== "all" ? offerType : ""}{" "}
                Offers
                {pincode && ` near ${pincode}`}
              </>
            ) : (
              "No offers found"
            )}
          </h2>
          {/* {filteredOffers.length > 0 && (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Showing {filteredOffers.length} of {offers.length}
              </span>
              <button
                onClick={() => router.push("/bookings")}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm hover:bg-gray-900 transition-colors"
              >
                View My Bookings
              </button>
            </div>
          )} */}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 h-full animate-pulse"
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredOffers.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FiShoppingCart className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No offers available
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || selectedCategory !== "All" || pincode
                ? "Try adjusting your search filters"
                : "Check back later for new offers"}
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOffers.map((offer: Offer) => (
              <motion.div
                key={offer._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200"
              >
                <div
                  onClick={() => setSelectedOffer(offer)}
                  className="relative h-52 w-full cursor-pointer"
                >
                  <Image
                    src={offer?.url || "/placeholder.jpg"}
                    alt={offer?.offerName || "Offer image"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized={true}
                  />
                  <div className="absolute top-3 right-3 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
                    {offer.offerDiscount || "Offer"}
                  </div>
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" /> */}
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-900 line-clamp-1">
                      {offer?.offerName}
                    </h3>
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                      {offer?.offerCategory || "General"}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600 mb-3">
                    <FaStore className="text-gray-500 mr-2" />
                    <p className="text-sm">
                      {offer?.storeId?.storeName ||
                        offer?.storeId?.userName ||
                        "Unknown Store"}
                    </p>
                  </div>

                  <p className="text-gray-700 text-sm line-clamp-2 mb-4">
                    {offer.offerDescription || "Details will be added soon."}
                  </p>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <FiClock className="mr-2 text-gray-400" />
                    <span>
                      {offer?.offerEndDate
                        ? new Date(offer.offerEndDate).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <button
                      disabled={
                        loadingButtons[offer._id] || alreadyBooked[offer._id]
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                        bookOffer(offer._id);
                      }}
                      className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center ${
                        loadingButtons[offer._id]
                          ? "bg-gray-300 cursor-not-allowed"
                          : alreadyBooked[offer._id]
                          ? "bg-green-600 text-white"
                          : "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800"
                      }`}
                    >
                      <FiShoppingCart className="mr-2" />
                      {loadingButtons[offer._id]
                        ? "Booking..."
                        : alreadyBooked[offer._id]
                        ? "Already Booked"
                        : "Book Now"}
                    </button>

                    {offer.isOnline ? (
                      <a
                        href={offer.website || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors text-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiGlobe className="inline mr-2" /> Visit Website
                      </a>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // offer?.address && handleGetDirections(offer?.address);
                            if (offer?.address) {
    handleGetDirections(offer.address);
  }
                        }}
                        className="w-full bg-gray-800 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors flex items-center justify-center"
                        disabled={!offer?.address}
                      >
                        <FiNavigation className="mr-2" /> Get Directions
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Offer Detail Modal */}
      <AnimatePresence>
        {selectedOffer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedOffer(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-56 w-full">
                <Image
                  src={selectedOffer?.url || "/placeholder.jpg"}
                  alt={selectedOffer?.offerName || "Offer image"}
                  fill
                  className="object-cover"
                  unoptimized={true}
                />
                <div className="absolute top-3 right-3 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
                  {selectedOffer?.offerDiscount || "Offer"}
                </div>
                <button
                  onClick={() => setSelectedOffer(null)}
                  className="absolute top-3 left-3 bg-white/80 text-gray-800 p-1 rounded-full hover:bg-white"
                >
                  <FiX size={20} />
                </button>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedOffer?.offerName}
                  </h2>
                  <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                    {selectedOffer?.offerCategory || "General"}
                  </span>
                </div>

                <div className="flex items-center text-gray-600 mb-6">
                  <FaStore className="text-gray-500 mr-2" />
                  <p className="text-sm">
                    {selectedOffer?.storeId?.storeName ||
                      selectedOffer?.storeId?.userName ||
                      "Unknown Store"}
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">
                      VALID UNTIL
                    </h3>
                    <p className="text-gray-700">
                      {selectedOffer?.offerEndDate
                        ? new Date(
                            selectedOffer.offerEndDate
                          ).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">
                      DESCRIPTION
                    </h3>
                    <p className="text-gray-700">
                      {selectedOffer?.offerDescription ||
                        "Details will be added soon."}
                    </p>
                  </div>

                  {selectedOffer?.isOnline && selectedOffer?.website && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 mb-1">
                        WEBSITE
                      </h3>
                      <p className="text-blue-600 break-all">
                        <a
                          href={selectedOffer?.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {selectedOffer?.website}
                        </a>
                      </p>
                    </div>
                  )}

                  {!selectedOffer?.isOnline && selectedOffer?.address && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 mb-1">
                        ADDRESS
                      </h3>
                      <p className="text-gray-700">{selectedOffer?.address}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col space-y-3">
                  <button
                    disabled={
                      loadingButtons[selectedOffer._id] ||
                      alreadyBooked[selectedOffer._id]
                    }
                    onClick={() => bookOffer(selectedOffer._id)}
                    className={`w-full py-3 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center ${
                      loadingButtons[selectedOffer._id]
                        ? "bg-gray-300 cursor-not-allowed"
                        : alreadyBooked[selectedOffer._id]
                        ? "bg-green-600 text-white"
                        : "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800"
                    }`}
                  >
                    <FiShoppingCart className="mr-2" />
                    {loadingButtons[selectedOffer._id]
                      ? "Booking..."
                      : alreadyBooked[selectedOffer._id]
                      ? "Already Booked"
                      : "Book This Offer"}
                  </button>

                  {selectedOffer?.isOnline ? (
                    <a
                      href={selectedOffer?.website || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors text-center"
                    >
                      <FiGlobe className="inline mr-2" /> Visit Website
                    </a>
                  ) : (
                    <button
                      onClick={() =>
                        selectedOffer?.address &&
                        handleGetDirections(selectedOffer?.address)
                      }
                      className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors flex items-center justify-center"
                      disabled={!selectedOffer?.address}
                    >
                      <FiNavigation className="mr-2" /> Get Directions
                    </button>
                  )}
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
