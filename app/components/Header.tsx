"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Logo from "../Asset/logo.png";
import {
  FiUser,
  FiSearch,
  FiChevronDown,
  FiMapPin,
  FiTag,
  FiUsers,
  FiInfo,
  FiHome,
  FiX,
  FiPhone,
} from "react-icons/fi";
import axios from "axios";
import { API } from "../utils/helpers";

interface User {
  name: string;
  // ... other user properties
}

const LoginPopup = ({
  isOpen,
  onClose,
  isMobile,
}: {
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
}) => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [data, setData] = useState(null);
  const [guestUser, setGuestUser] = useState<string | null>(null);

  useEffect(() => {
    setGuestUser(localStorage.getItem("guestUser"));
  }, []);

  const guestCreation = async () => {
    if (typeof window === "undefined") return; // Prevent server-side execution

    try {
      const existingUser = localStorage.getItem("guestUser");

      if (existingUser) {
        console.log("Guest user already exists:", existingUser);
        setGuestUser(existingUser);
        return;
      }

      // Step 1: Get IP address
      const ipRes = await axios.get("https://api.ipify.org?format=json");
      const ipAddress = ipRes.data.ip;

      // Step 2: Send to your backend
      const res = await axios.post(
        `http://localhost:5002/api/createGuestUser`,
        { IPAddress: ipAddress }
      );

      const newUser = res.data?.data?.userName;

      if (newUser) {
        localStorage.setItem("guestUser", newUser);
        setGuestUser(newUser);
      }
    } catch (error) {
      console.error("Guest creation error:", error);
    }
  };

  useEffect(() => {
    guestCreation();
  }, []);
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          <motion.div
            initial={isMobile ? { y: "100%" } : { scale: 0.9, opacity: 0 }}
            animate={isMobile ? { y: 0 } : { scale: 1, opacity: 1 }}
            exit={isMobile ? { y: "100%" } : { scale: 0.9, opacity: 0 }}
            className={`fixed ${
              isMobile
                ? "bottom-0 left-0 right-0 rounded-2xl"
                : "inset-0 m-auto max-w-md w-full h-fit rounded-2xl"
            } bg-white shadow-xl z-50 overflow-hidden`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Welcome to Apna City</h2>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            {!guestUser ? (
              <div className="p-4">
                <button
                  onClick={() => {
                    guestCreation();
                    onClose();
                  }}
                  className="w-full py-3 px-4 bg-gray-100 rounded-lg text-gray-700  hover:bg-gray-200 transition-colors mb-4"
                >
                  Continue as Guest
                </button>

                <div className="text-center py-4 text-gray-500 text-sm">
                  Other login options coming soon
                </div>
              </div>
            ) : (
              <div className="p-4">
                <div className="w-full py-3 px-4 bg-gray-100 rounded-lg text-gray-700 flex items-center justify-center hover:bg-gray-200 transition-colors mb-4">
                  Hi, {guestUser}
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [showCityPopup, setShowCityPopup] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [guestUser, setGuestUser] = useState<string | null>(null);
  interface City {
    name: string;
    data: {
      city: string;
      // add other properties if needed
    };
    // add other properties if needed
  }
  const [cities, setCities] = useState<City[]>([]);
  // const cities = [
  //   { name: "Kanpur", available: true },
  //   { name: "Delhi", available: true },
  //   { name: "Mumbai", available: false },
  //   { name: "Bangalore", available: false },
  //   { name: "Hyderabad", available: false },
  //   { name: "Chennai", available: false },
  //   { name: "Kolkata", available: false },
  //   { name: "Pune", available: false },
  // ];
  const getLocation = async () => {
    try {
      const res = await axios.get(`${API}/getLocations`);

      setCities(res?.data?.locations);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);
  const navItems = [
    { name: "Home", href: "/", icon: <FiHome size={18} /> },
    { name: "Offers", href: "/offers", icon: <FiTag size={18} /> },
    { name: "Creators", href: "/creators", icon: <FiUsers size={18} /> },
    { name: "Contact Us", href: "/ContactUs", icon: <FiPhone size={18} /> },
    { name: "About Us", href: "/AboutUs", icon: <FiInfo size={18} /> },
  ];

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    // Get guestUser from localStorage
    const storedGuestUser = localStorage.getItem("guestUser");
    if (storedGuestUser) {
      setGuestUser(storedGuestUser);
    }

    // Get selected city from localStorage
    const savedCity = localStorage.getItem("selectedCity");
    if (savedCity) {
      setSelectedCity(savedCity);
      setUser(null);
    } else {
      setShowCityPopup(true);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const detectLocation = () => {
    setIsDetectingLocation(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setIsDetectingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          const city = data.address?.city || data.address?.town;

          if (city) {
            const foundCity = cities.find(
              (c) => c.name.toLowerCase() === city.toLowerCase()
            );
            if (foundCity) {
              selectCity(foundCity.name);
            } else {
              setLocationError(
                `We&apos;ll soon come to ${city}! Currently only available in Kanpur.`
              );
            }
          } else {
            setLocationError("Could not determine your city");
          }
        } catch (e) {
          console.log(e);
          setLocationError("Error fetching location data");
        } finally {
          setIsDetectingLocation(false);
        }
      },
      () => {
        setLocationError("Unable to retrieve your location");
        setIsDetectingLocation(false);
      }
    );
  };

  const selectCity = (city: string) => {
    const selected = cities.find((c) => c.data.city === city);
    if (selected) {
      setSelectedCity(city);
      localStorage.setItem("selectedCity", city);
      setShowCityPopup(false);
    }
  };

  const toggleCityPopup = () => {
    setShowCityPopup(!showCityPopup);
    setLocationError(null);
  };
  const handleCityChange = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("selectedCity");
      setSelectedCity(null);
      setShowCityPopup(true);
    }
  };

  const isKanpurSelected = selectedCity === "Kanpur";

  return (
    <>
      <header
        className={`fixed w-full top-0 z-40 bg-white shadow-sm transition-all duration-300 ${
          isScrolled ? "shadow-md" : "shadow-sm"
        }`}
      >
        <div className="border-b border-gray-100">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <Image src={Logo} alt="Logo" width={32} height={32} />
                <span className="text-lg font-semibold text-red-600">
                  Apna City
                </span>
              </Link>

              <div className="hidden md:flex items-center space-x-4">
                {/* <div className="relative w-[400px]">
                  <input
                    type="text"
                    placeholder="Search for places, offers..."
                    className="w-full px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <FiSearch className="absolute right-3 top-2.5 text-gray-400" />
                </div> */}

                <div className="relative">
                  <button
                    onClick={toggleCityPopup}
                    className="flex items-center gap-1 text-gray-600 hover:text-red-600 text-sm px-3 py-1.5 rounded-full bg-gray-50"
                  >
                    <FiMapPin className="text-red-500" />
                    <span>{selectedCity || "Select City"}</span>
                    <FiChevronDown
                      className={`transition-transform ${
                        showCityPopup ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                {user || guestUser ? (
                  <button
                    onClick={() => setShowLoginPopup(true)}
                    className="flex items-center space-x-1 text-gray-600 hover:text-red-600 text-sm"
                  >
                    <FiUser className="w-4 h-4" />
                    {user ? (
                      <span>{user.name.split(" ")[0]}</span>
                    ) : (
                      <span>{guestUser}</span>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => setShowLoginPopup(true)}
                    className="flex items-center space-x-1 text-gray-600 hover:text-red-600 text-sm"
                  >
                    <FiUser className="w-4 h-4" />
                    <span>Login</span>
                  </button>
                )}
              </div>

              <div className="md:hidden flex items-center space-x-4">
                <button
                  onClick={() => setShowMobileSearch(!showMobileSearch)}
                  className="p-2 text-gray-600"
                >
                  <FiSearch className="w-5 h-5" />
                </button>

                <button onClick={toggleCityPopup} className="p-2 text-gray-600">
                  <FiMapPin className="w-5 h-5" />
                </button>

                {user ? (
                  <button
                    onClick={() => setShowLoginPopup(true)}
                    className="flex items-center text-gray-600"
                  >
                    <span className="text-sm">
                      Hi, {user.name.split(" ")[0]}
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={() => setShowLoginPopup(true)}
                    className="text-gray-600"
                  >
                    <FiUser className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {showMobileSearch && (
              <div className="mt-3 md:hidden">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <FiSearch className="absolute right-3 top-2.5 text-gray-400" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* {isKanpurSelected && ( */}
        <div className="border-b border-gray-100 overflow-x-auto no-scrollbar">
          <div className="container mx-auto px-2">
            <nav className="flex items-center space-x-2 py-3 whitespace-nowrap">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center gap-1 py-2 px-3 text-sm transition-colors border-b-2 ${
                      isActive
                        ? "border-red-600 text-red-600"
                        : "border-transparent text-gray-600 hover:text-red-600"
                    }`}
                  >
                    <span
                      className={`transition-colors ${
                        isActive
                          ? "text-red-600"
                          : "text-gray-600 group-hover:text-red-600"
                      }`}
                    >
                      {item.icon}
                    </span>
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
        {/* )} */}

        <AnimatePresence>
          {showCityPopup && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg z-50 border border-gray-200 px-4 py-3"
            >
              <div className="mb-3">
                <button
                  onClick={detectLocation}
                  disabled={isDetectingLocation}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                >
                  {isDetectingLocation ? (
                    "Detecting your location..."
                  ) : (
                    <>
                      <FiMapPin className="text-red-600" />
                      <span className="text-red-600">Detect My Location</span>
                    </>
                  )}
                </button>
                {locationError && (
                  <p className="mt-2 text-sm text-red-500 text-center">
                    {locationError}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  Available Cities
                </p>
                {cities
                  // .filter((c) => c.available)
                  .map((city, i) => (
                    <button
                      key={i}
                      onClick={() => selectCity(city.data.city)}
                      className="w-full text-left px-4 py-2 hover:bg-red-50 text-sm rounded-md flex justify-between items-center"
                    >
                      {city.data.city}
                    </button>
                  ))}

                {/* <p className="text-xs text-gray-500 uppercase tracking-wider mt-3">
                  Coming Soon
                </p>
                {cities
                  .filter((c) => !c.available)
                  .map((city) => (
                    <button
                      key={city.name}
                      disabled
                      className="w-full text-left px-4 py-2 text-sm rounded-md flex justify-between items-center opacity-60 cursor-not-allowed"
                    >
                      {city.name}
                      <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                        Soon
                      </span>
                    </button>
                  ))} */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <LoginPopup
        isOpen={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
        isMobile={isMobile}
      />

      {selectedCity && !isKanpurSelected && (
        <div className="fixed inset-0 bg-white bg-opacity-90 z-30 flex flex-col items-center justify-center p-6 text-center mt-16">
          <div className="max-w-md">
            <FiMapPin className="mx-auto text-red-500 text-4xl mb-4" />
            <h2 className="text-2xl font-medium mb-4">
              Coming Soon to {selectedCity}!
            </h2>
            <p className="text-gray-600 mb-6">
              We&apos;re currently only available in Kanpur. We&apos;ll be
              expanding to your city soon!
            </p>
            <button
              onClick={handleCityChange}
              className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
            >
              Change City
            </button>
          </div>
        </div>
      )}

      <div className="pt-28 md:pt-24"></div>
    </>
  );
}
