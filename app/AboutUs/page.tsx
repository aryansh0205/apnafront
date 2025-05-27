"use client";
import { useEffect, useState, useRef } from "react";
import {
  motion,
  animate,
  useMotionValue,
  useAnimationFrame,
  useInView,
} from "framer-motion";
import {
  FiUsers,
  FiAward,
  FiGlobe,
  FiHeart,
  FiMapPin,
  FiCalendar,
  FiShoppingBag,
  FiCoffee,
} from "react-icons/fi";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";

// CountUp with inView detection
function CountUpNumber({
  target,
  duration = 1.2,
}: {
  target: number;
  duration?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);
  const motionValue = useMotionValue(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, target, {
        duration,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [isInView, motionValue, target, duration]);

  useAnimationFrame(() => {
    setDisplayValue(Math.floor(motionValue.get()));
  });

  return <span ref={ref}>{displayValue.toLocaleString()}</span>;
}

export default function AboutPage() {
  const stats = [
    {
      value: 1000,
      label: "Local Users",
      icon: <FiUsers className="text-2xl md:text-3xl" />,
      description: "Active community members discovering their city",
    },
    {
      value: 500,
      label: "Collaborations",
      icon: <FiAward className="text-2xl md:text-3xl" />,
      description: "Successful partnerships with local businesses",
    },
    {
      value: 200,
      label: "Local Businesses",
      icon: <FiGlobe className="text-2xl md:text-3xl" />,
      description: "Shops and services featured on our platform",
    },
    {
      value: 50,
      label: "Events Monthly",
      icon: <FiHeart className="text-2xl md:text-3xl" />,
      description: "Community gatherings and activities",
    },
  ];

  const features = [
    {
      icon: <FiMapPin className="w-6 h-6 text-red-500" />,
      title: "Local Discovery",
      description: "Find hidden gems in your neighborhood.",
    },
    {
      icon: <FiCalendar className="w-6 h-6 text-red-500" />,
      title: "Event Calendar",
      description: "Stay updated on what's happening nearby.",
    },
    {
      icon: <FiShoppingBag className="w-6 h-6 text-red-500" />,
      title: "Exclusive Deals",
      description: "Unlock special offers from local businesses.",
    },
    {
      icon: <FiCoffee className="w-6 h-6 text-red-500" />,
      title: "Community Hub",
      description: "Engage with neighbors and community groups.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />

      {/* Hero */}
      <section className="relative md:py-15 py-10 md:mt-20 mt-10 overflow-hidden">
        <div className="absolute inset-0 opacity-5 pattern-dots pattern-red-500 pattern-bg-white pattern-size-4 pattern-opacity-100" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900"
          >
            Discover the <span className="text-red-600">Heartbeat</span> of Your
            City
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-lg sm:text-xl max-w-2xl mx-auto text-gray-600"
          >
            Apna City is your digital gateway to everything local — from hidden
            gems and exclusive deals to community events and essential services.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10"
          >
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition transform hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-red-200">
              Explore Your Neighborhood
            </button>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <span className="inline-block bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm font-medium mb-4">
              Our Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Building Community Connections
            </h2>
            <div className="space-y-5 text-gray-600">
              <p>
                Apna City began as a simple idea: to help local businesses shine
                and give communities a reason to connect more deeply.
              </p>
              <p>
                From a neighborhood directory to a thriving platform, we now
                empower residents to rediscover their cities with every click
                and connection.
              </p>
              <p>
                We’re proud to be the bridge between local passion and the
                people it serves.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative h-80 md:h-[28rem] rounded-2xl overflow-hidden shadow-xl order-1 md:order-2"
          >
            <Image
              src="/bg.jpg"
              alt="Community gathering in Kanpur"
              className="w-full h-full object-cover"
              fill
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white text-sm">
              Kanpur Community Market, 2023
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl font-bold text-gray-900"
            >
              Apna City By The Numbers
            </motion.h2>
            <p className="text-gray-600 mt-4 max-w-xl mx-auto">
              Celebrating the local impact we’ve made so far — and growing every
              day.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl border border-gray-100 shadow hover:shadow-md transition"
              >
                <div className="text-red-500 mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <p className="text-4xl font-bold text-gray-900 text-center">
                  <CountUpNumber target={stat.value} />
                </p>
                <p className="text-lg font-medium text-gray-800 text-center">
                  {stat.label}
                </p>
                <p className="text-sm text-gray-500 text-center mt-2">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Why Choose Apna City?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              Discover the best of your city, all in one place.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-red-50 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 bg-gradient-to-r from-[#fefefe] to-[#fff] text-black text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto px-4"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Explore Your City?
          </h2>
          <p className="text-lg sm:text-xl mb-8 text-black/70">
            Join thousands of locals already discovering, supporting, and
            celebrating their neighborhoods.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href={"/"}
              className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium text-lg shadow-md transition hover:scale-105"
            >
              Get Started
            </Link>
            <button className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-medium text-lg transition hover:bg-white/10">
              Learn More
            </button>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
