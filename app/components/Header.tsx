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

const CoinIcon = () => (
  <svg
    width="27"
    height="27"
    viewBox="0 0 27 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="coin-icon"
  >
    <circle cx="12" cy="12" r="10" fill="#FBBF24" />
    <circle cx="12" cy="12" r="8" fill="#F59E0B" />
    <path
      d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4Z"
      stroke="#D97706"
      strokeWidth="1.5"
    />
    <path
      d="M12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6Z"
      stroke="#FCD34D"
      strokeWidth="1.5"
    />
    <circle cx="12" cy="12" r="3" fill="#FDE68A" />
    <path
      d="M12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9Z"
      stroke="#FBBF24"
      strokeWidth="1.5"
    />
  </svg>
);

const LoginPopup = ({
  isOpen,
  onClose,
  isMobile,
  guestUser,
  coins,
}: {
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
  guestUser: string | null;
  coins: number;
}) => {
  const guestCreation = async () => {
    if (typeof window === "undefined") return;

    try {
      const existingUser = localStorage.getItem("guestUser");
      const user = localStorage.getItem("user");
      if (user) return;
      if (existingUser) return;

      const ipRes = await axios.get("https://api.ipify.org?format=json");
      const ipAddress = ipRes.data.ip;

      const res = await axios.post(`${API}/createGuestUser`, {
        IPAddress: ipAddress,
      });
      const newUser = res.data?.data?.userName;

      if (newUser) {
        localStorage.setItem("guestUser", newUser);
        localStorage.setItem("id", res.data?.data?._id);
      }
    } catch (error) {
      console.error("Guest creation error:", error);
    }
  };

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
                ? "bottom-0 left-0 right-0 rounded-t-3xl"
                : "inset-0 m-auto max-w-md w-full h-fit rounded-2xl"
            } bg-white shadow-xl z-50 overflow-hidden`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <div className="bg-red-600 h-2 w-full"></div>
              <div className="flex items-center justify-between p-5 pb-3">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Welcome to Apna City
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {guestUser
                      ? `Logged in as ${guestUser}`
                      : "Login or continue as guest"}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <FiX className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-5 pt-0 space-y-4">
              {guestUser && (
                <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 flex items-start gap-3">
                  <div className="relative">
                    <CoinIcon />
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center border-2 border-white font-bold">
                      {coins > 999 ? `${Math.floor(coins / 1000)}k` : coins}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">
                      You have {coins.toLocaleString()} coins!
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Use them to get discounts on your bookings
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <Link
                  href="/bookings"
                  className="block w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white text-center rounded-lg font-medium transition-colors"
                >
                  My Bookings
                </Link>

                {guestUser ? (
                  <Link
                    href="/Login"
                    className="block w-full py-3 px-4 border border-gray-300 hover:bg-gray-50 text-gray-700 text-center rounded-lg font-medium transition-colors"
                  >
                    Login with other account
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        guestCreation();
                        onClose();
                      }}
                      className="w-full py-3 px-4 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors"
                    >
                      Continue as Guest
                    </button>
                    <Link
                      href="/Login"
                      className="block w-full py-3 px-4 bg-gray-800 hover:bg-gray-900 text-white text-center rounded-lg font-medium transition-colors"
                    >
                      Login / Sign Up
                    </Link>
                  </>
                )}
              </div>

              <div className="pt-2 text-center">
                <p className="text-xs text-gray-500">
                  By continuing, you agree to our <br />
                  <Link href="/terms" className="text-red-600 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-red-600 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
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
  const [coins, setCoins] = useState(0);
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("id") : null;

  const getcoins = async () => {
    try {
      if (!userId) return;
      const res = await axios.get(`${API}/getcoins/${userId}`);
      setCoins(res?.data?.user?.coins || 0);
    } catch (e) {
      console.log(e);
    }
  };

  interface City {
    name: string;
    data: {
      city: string;
    };
  }

  const [cities, setCities] = useState<City[]>([]);

  const getLocation = async () => {
    try {
      const res = await axios.get(`${API}/getLocations`);
      setCities(res?.data?.locations || []);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getLocation();
    getcoins();

    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedGuestUser =
      localStorage.getItem("guestUser") || localStorage.getItem("user");
    if (storedGuestUser) setGuestUser(storedGuestUser);

    const savedCity = localStorage.getItem("selectedCity");
    if (savedCity) {
      setSelectedCity(savedCity);
      setUser(null);
    } else {
      setShowCityPopup(true);
    }

    const handleScroll = () => setIsScrolled(window.scrollY > 100);
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
              (c) => c.data.city.toLowerCase() === city.toLowerCase()
            );
            if (foundCity) {
              selectCity(foundCity.data.city);
            } else {
              setLocationError(
                `We'll soon come to ${city}! Currently only available in Kanpur.`
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

  const navItems = [
    { name: "Home", href: "/", icon: <FiHome size={18} /> },
    { name: "Offers", href: "/offers", icon: <FiTag size={18} /> },
    { name: "Creators", href: "/creators", icon: <FiUsers size={18} /> },
    { name: "Contact Us", href: "/ContactUs", icon: <FiPhone size={18} /> },
    { name: "About Us", href: "/AboutUs", icon: <FiInfo size={18} /> },
  ];

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
                <div className="relative group">
                  <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-sans shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 hover:from-yellow-300 hover:to-yellow-400 active:scale-95">
                    <div className="relative">
                      <CoinIcon />
                      <div className="absolute -top-2 -right-2 bg-green-500/80 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center border-2 border-white">
                        {coins > 999 ? `${Math.floor(coins / 1000)}k` : coins}
                      </div>
                    </div>
                    <span className="font">Apna Coins</span>
                  </button>

                  <div className="absolute right-0 top-full mt-2 w-72 bg-white shadow-xl rounded-xl p-4 hidden group-hover:block z-50 border border-gray-200 animate-fade-in">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <CoinIcon />
                        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center border-2 border-white font-bold">
                          {coins > 999 ? `${Math.floor(coins / 1000)}k` : coins}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">
                          Apna City Coins
                        </h3>
                        <p className="text-sm text-gray-600 mt-1 ">
                          You have
                          <span className="font-bold text-green-600 px-1">
                            {coins.toLocaleString()}
                          </span>
                          coins
                        </p>
                        <div className="mt-3 bg-yellow-50 p-2 rounded-lg">
                          <p className="text-xs text-yellow-800">
                            Use coins to unlock exclusive discounts and rewards!
                          </p>
                        </div>
                        <Link
                          href="/offers"
                          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                        >
                          View available offers
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
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
                <button
                  onClick={() => setShowLoginPopup(true)}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-600 text-sm"
                >
                  <FiUser className="w-4 h-4" />
                  {user ? (
                    <span>{user.name.split(" ")[0]}</span>
                  ) : (
                    <span>{guestUser || "Login"}</span>
                  )}
                </button>
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
                {cities.map((city, i) => (
                  <button
                    key={i}
                    onClick={() => selectCity(city.data.city)}
                    className="w-full text-left px-4 py-2 hover:bg-red-50 text-sm rounded-md flex justify-between items-center"
                  >
                    {city.data.city}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <LoginPopup
        isOpen={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
        isMobile={isMobile}
        guestUser={guestUser}
        coins={coins}
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
