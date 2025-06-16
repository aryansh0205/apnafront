"use client";
import { motion, AnimatePresence } from "framer-motion";
import { FiClock, FiMapPin, FiX, FiGlobe, FiNavigation } from "react-icons/fi";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { MdStorefront } from "react-icons/md";
import { API } from "../utils/helpers";
// import loadingAnimation from "../Asset/loading.json";

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

const RatingStars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} className="text-yellow-400 text-sm" />
      ))}
      {hasHalfStar && <FaStarHalfAlt className="text-yellow-400 text-sm" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} className="text-yellow-400 text-sm" />
      ))}
      <span className="ml-1 text-gray-700 text-sm">{rating.toFixed(1)}</span>
    </div>
  );
};

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [offerType, setOfferType] = useState<"all" | "online" | "offline">(
    "all"
  );

  const [pincode, setPincode] = useState("");
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

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
    const city = localStorage.getItem("selectedCity");
    const fetchOffers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API}/getOfferstypes`, {
          params: {
            type: offerType,
            city: city,
          },
        });

        setOffers(response.data.offers || []);
      } catch (err) {
        console.log(err);
        // setError("Failed to load offers. Please try again later.");
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
    const matchesPincode = !pincode || offer.distance.includes(pincode);
    return matchesSearch && matchesCategory && matchesType && matchesPincode;
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

      {/* Header Section */}
      <div className="relative md:py-20 py-10 overflow-hidden select-none">
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900"
          >
            Local <span className="text-red-600">Deals & Offers</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-[18px] sm:text-xl max-w-2xl mx-auto text-gray-600"
          >
            Discover exclusive discounts from businesses near you
          </motion.p>
          {/* Optional CTA Button (commented out) */}
          {/* <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-6"
    >
      <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition transform hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-red-200">
        See All Offers
      </button>
    </motion.div> */}
        </div>
      </div>

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 select-none">
        <div className="flex flex-col gap-4 mb-6">
          {/* Offer Type Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setOfferType("all")}
              className={`px-4 py-2 font-medium text-sm ${
                offerType === "all"
                  ? "border-b-2 border-red-500 text-red-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              All Offers
            </button>
            <button
              onClick={() => setOfferType("online")}
              className={`px-4 py-2 font-medium text-sm flex items-center ${
                offerType === "online"
                  ? "border-b-2 border-red-500 text-red-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FiGlobe className="mr-2" /> Online Offers
            </button>
            <button
              onClick={() => setOfferType("offline")}
              className={`px-4 py-2 font-medium text-sm flex items-center ${
                offerType === "offline"
                  ? "border-b-2 border-red-500 text-red-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FiMapPin className="mr-2" /> Nearby Offline
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search offers..."
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                >
                  <FiX size={18} />
                </button>
              )}
            </div>

            <select
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
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
              <input
                type="text"
                placeholder="Enter pincode"
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                maxLength={6}
              />
              {pincode && (
                <button
                  onClick={() => setPincode("")}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                >
                  <FiX size={18} />
                </button>
              )}
            </div>
          </div>

          {(searchTerm ||
            selectedCategory !== "All" ||
            offerType !== "all" ||
            pincode) && (
            <div className="flex justify-end">
              <button
                onClick={resetFilters}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-600">
          {filteredOffers.length > 0
            ? `Showing ${filteredOffers.length} ${
                offerType !== "all" ? offerType : ""
              } offers`
            : "No offers match your criteria"}
          {pincode && ` near ${pincode}`}
        </div>
      </div>

      {/* Offers Grid */}
      <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto cursor-pointer select-none">
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
        ) : filteredOffers?.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filteredOffers.length === 0
                ? "No offers available today"
                : "No offers match your filters"}
            </h3>
            <p className="text-gray-500 mb-4">
              {filteredOffers?.length === 0
                ? "Check back later for new offers from local businesses."
                : "Try adjusting your search criteria or reset filters."}
            </p>
            {filteredOffers?.length > 0 && (
              <button
                onClick={resetFilters}
                className="text-red-600 hover:text-red-800 font-medium px-4 py-2 rounded-lg border border-red-200 hover:bg-red-50"
              >
                Reset all filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOffers?.map((offer) => (
              <motion.div
                key={offer._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200"
              >
                <div className="relative h-60 w-full">
                  <img
                    src={offer?.url || "/placeholder.jpg"}
                    alt={offer?.offerName}
                    // fill
                    className="object-cover h-[200px]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                    {offer.offerDiscount}% Off
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg text-gray-900">
                      {offer?.offerName}
                    </h3>
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                      {offer?.offerCategory}
                    </span>
                    {/* Offer location */}
                    {/* <div className="flex items-center text-sm text-gray-500">
                      <FiMapPin className="mr-1" />
                      <span>{offer.distance}</span>
                    </div> */}
                  </div>
                  {offer?.storeId?.storeName ? (
                    <div className="flex gap-2 items-center text-gray-600 mb-3 ">
                      <MdStorefront />

                      <p className="text-sm ">{offer?.storeId?.storeName}</p>
                    </div>
                  ) : (
                    <div className="flex gap-2 items-center text-gray-600 mb-3 ">
                      <MdStorefront />

                      <p className="text-sm ">By {offer?.storeId?.userName}</p>
                    </div>
                  )}

                  {/* <div className="flex items-center justify-between mb-4">
                    <RatingStars rating={offer.rating} />
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                      {offer.category}
                    </span>
                  </div> */}

                  <p className="text-gray-700 text-sm line-clamp-2 mb-4">
                    {offer.offerDescription || "Details will be added soon."}
                  </p>

                  {/* <div className="flex items-center text-sm text-gray-500 mb-4">
                    <FiClock className="mr-2" />
                    <span>{offer.validity}</span>
                  </div> */}
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    {loading ? (
                      <div className="w-4 h-4 mr-2">
                        {/* <Lottie
                          // animationData={loadingAnimation}
                          loop
                          autoplay
                        /> */}
                      </div>
                    ) : (
                      <FiClock className="mr-2" />
                    )}

                    <span>
                      {" "}
                      {offer?.offerEndDate
                        ? new Date(offer.offerEndDate).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>

                  {offer.isOnline ? (
                    <a
                      href={offer.website || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors text-center"
                    >
                      <FiGlobe className="inline mr-2" /> Visit Website
                    </a>
                  ) : (
                    <button
                      onClick={() =>
                        offer?.address && handleGetDirections(offer?.address)
                      }
                      className="w-full bg-red-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center justify-center cursor-pointer"
                      disabled={!offer?.address}
                    >
                      <FiNavigation className="mr-2" /> Get Directions
                    </button>
                  )}
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
                <img
                  src={selectedOffer.offerImage || "/placeholder.jpg"}
                  alt={selectedOffer.offerName}
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute top-3 right-3 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded">
                  {selectedOffer.discount}
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedOffer.offerName}
                </h2>
                <p className="text-gray-600 mb-4">
                  {selectedOffer.businessName}
                </p>

                <div className="flex items-center justify-between mb-6">
                  <RatingStars rating={selectedOffer.rating} />
                  <div className="flex items-center text-sm text-gray-500">
                    <FiMapPin className="mr-1" />
                    <span>{selectedOffer.distance}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <strong className="text-gray-900">Category:</strong>
                    <p className="mt-1 text-gray-700">
                      {selectedOffer.category}
                    </p>
                  </div>

                  <div>
                    <strong className="text-gray-900">Valid Until:</strong>
                    <p className="mt-1 text-gray-700">
                      {selectedOffer.validity}
                    </p>
                  </div>

                  <div>
                    <strong className="text-gray-900">Description:</strong>
                    <p className="mt-1 text-gray-700">
                      {selectedOffer.offerDescription ||
                        "Details will be added soon."}
                    </p>
                  </div>

                  {selectedOffer.isOnline && selectedOffer.website && (
                    <div>
                      <strong className="text-gray-900">Website:</strong>
                      <p className="mt-1 text-blue-600 break-all">
                        <a
                          href={selectedOffer.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {selectedOffer.website}
                        </a>
                      </p>
                    </div>
                  )}

                  {!selectedOffer.isOnline && selectedOffer.address && (
                    <div>
                      <strong className="text-gray-900">Address:</strong>
                      <p className="mt-1 text-gray-700">
                        {selectedOffer.address}
                      </p>
                    </div>
                  )}
                </div>

                {selectedOffer.isOnline ? (
                  <a
                    href={selectedOffer.website || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors text-center mb-3"
                  >
                    <FiGlobe className="inline mr-2" /> Visit Website
                  </a>
                ) : (
                  <button
                    onClick={() =>
                      selectedOffer.address &&
                      handleGetDirections(selectedOffer.address)
                    }
                    className="w-full bg-red-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center justify-center mb-3"
                    disabled={!selectedOffer.address}
                  >
                    <FiNavigation className="mr-2" /> Get Directions
                  </button>
                )}

                <button
                  className="w-full bg-gray-200 text-gray-800 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                  onClick={() => setSelectedOffer(null)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
