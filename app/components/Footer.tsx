"use client";
import { motion } from "framer-motion";
import logo from "../Asset/logob.png";
import Image from "next/image";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiTag,
  FiUsers,
  FiCalendar,
  FiInfo,
  FiTrendingUp,
} from "react-icons/fi";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full flex justify-center">
      <div className="w-full pp:px-5 px-3">
        <div className="w-full bg-[#FAE8EC] rounded-xl p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Quick Links */}

            <div>
              <h4 className="text-[#0D0D0D] font-semibold text-lg mb-4">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "Offers", icon: <FiTag /> },
                  { label: "Creators", icon: <FiUsers /> },
                  { label: "Places", icon: <FiMapPin /> },
                  { label: "Events", icon: <FiCalendar /> },
                  { label: "Promote Your Business", icon: <FiTrendingUp /> },
                  { label: "About Us", icon: <FiInfo /> },
                ].map(({ label, icon }) => {
                  const href =
                    label === "Promote Your Business"
                      ? "/membership"
                      : label === "Creators"
                      ? "/creators"
                      : label === "About Us"
                      ? "/AboutUs"
                      : label === "Offers"
                      ? "/offers"
                      : "/under-construction";

                  return (
                    <motion.li
                      key={label}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Link
                        href={href}
                        className="text-gray-600 hover:text-red-600 transition-colors flex items-center gap-2"
                      >
                        <span className="text-red-400">{icon}</span>
                        {label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-[#0D0D0D] font-semibold text-lg mb-4 ">
                Contact Us
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="p-2 text-red-600 mr-3">
                    <FiMail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Email</p>
                    <a
                      href="mailto:support@apnacity.in"
                      className="text-gray-700 hover:text-red-600 transition-colors"
                    >
                      support@apnacity.in
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="p-2 text-red-600 mr-3">
                    <FiPhone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Phone</p>
                    <a
                      href="tel:+916306760227"
                      className="text-gray-700 hover:text-red-600 transition-colors"
                    >
                      +91 92505 91119
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex items-center">
                    <div className="p-2 text-red-600 mr-3">
                      <FiMapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-gray-700">Kanpur, India</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Newsletter & Social */}
            <div>
              <h4 className="text-[#0D0D0D] font-semibold text-lg mb-4">
                Newsletter
              </h4>
              <p className="text-gray-600 text-sm mb-4">
                Subscribe to get updates on exciting offers
              </p>
              <form className="flex sm:flex-row flex-col gap-2 custom-email-form">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-grow px-4 py-2 rounded-lg border bg-white border-white focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent email-input"
                  required
                />
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors email-button"
                >
                  Subscribe
                </button>
              </form>

              <h4 className="text-[#0D0D0D] font-semibold text-lg mt-6 mb-3">
                Follow Us
              </h4>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: <FiFacebook />, name: "Facebook" },
                  { icon: <FiTwitter />, name: "Twitter" },
                  { icon: <FiInstagram />, name: "Instagram" },
                  { icon: <FiLinkedin />, name: "LinkedIn" },
                ].map((platform, i) => (
                  <motion.a
                    key={i}
                    href="https://www.instagram.com/apnacity.in/"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-red-100 text-red-600 hover:bg-red-600 hover:text-white p-3 rounded-full transition-colors"
                    aria-label={platform.name}
                  >
                    {platform.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Brand & Copyright */}
          <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center ">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <Image
                  src={logo}
                  alt="Apna City Logo"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <span className="text-xl text-red-600 font-semibold">
                Apna City
              </span>
            </div>
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Apna City. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
