"use client";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Image from "next/image";
import { API } from "../utils/helpers";

type Banner = {
  _id: string;
  BannerImage?: string;
  BannerName?: string;
  subtitle?: string;
  buttonText?: string;
  link?: string;
  bgImageMobile?: string;
};

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [city, setCity] = useState<string | null>(null);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch city from localStorage
  useEffect(() => {
    const storedCity = localStorage.getItem("selectedCity");
    if (storedCity) {
      setCity(storedCity);
    }
  }, []);

  // Fetch banners when city changes
  useEffect(() => {
    const getBanners = async () => {
      try {
        if (!city) return;
        setLoading(true);
        const res = await axios.get(`${API}/getBanners`, {
          params: { city },
        });
        
        if (res.data?.success && res.data.banners?.length > 0) {
          setBanners(res.data.banners);
        } else {
          // Fallback to default banners if none from API
          setBanners([
            {
              _id: "1",
              BannerImage: "/default-banner-1.jpg",
              BannerName: "Discover Local Offers",
              subtitle: "Find amazing deals in your city",
              buttonText: "Explore Now",
              link: "/offers",
            },
            {
              _id: "2",
              BannerImage: "/default-banner-2.jpg",
              BannerName: "Premium Memberships",
              subtitle: "Unlock special benefits",
              buttonText: "Learn More",
              link: "/membership",
            },
          ]);
        }
      } catch (err) {
        console.error("Banner fetch error", err);
        // Fallback to default banners on error
        setBanners([
          {
            _id: "1",
            BannerImage: "/default-banner-1.jpg",
            BannerName: "Discover Local Offers",
            subtitle: "Find amazing deals in your city",
            buttonText: "Explore Now",
            link: "/offers",
          },
          {
            _id: "2",
            BannerImage: "/default-banner-2.jpg",
            BannerName: "Premium Memberships",
            subtitle: "Unlock special benefits",
            buttonText: "Learn More",
            link: "/membership",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    getBanners();
  }, [city]);

  // Auto-rotate slides
  useEffect(() => {
    if (banners.length <= 1) return; // Don't auto-rotate if only one banner
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [banners.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  if (loading) {
    return (
      <div className="relative h-[600px] bg-gray-200 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading banners...</div>
      </div>
    );
  }

  if (!banners || banners.length === 0) {
    return (
      <div className="relative h-[600px] bg-gray-800 flex items-center justify-center text-white">
        <div>No banners available</div>
      </div>
    );
  }

  return (
    <div className="relative h-[600px] overflow-hidden">
      {/* Slides */}
      <div
        className="flex transition-transform duration-1000 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <div key={banner._id} className="w-full flex-shrink-0 relative h-full">
            {/* Background Image with Next.js Image component */}
            <div className="absolute inset-0">
              <Image
                src={banner.BannerImage || "/default-banner.jpg"}
                alt={banner.BannerName || "Banner image"}
                fill
                className="object-cover"
                priority={index === 0} // Only prioritize first image
                unoptimized={true} // Remove if you have proper image optimization setup
              />
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/70 to-transparent"></div>

            {/* Slide content */}
            <div className="absolute inset-0 flex items-center justify-center text-center">
              <div className="max-w-4xl px-4 text-white relative z-10">
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 font-serif">
                  {banner.BannerName}
                </h1>
                <p className="text-sm sm:text-base md:text-xl mb-8">
                  {banner.subtitle}
                </p>

                {banner.buttonText && (
                  <Link
                    href={banner.link || "#"}
                    className="bg-[#F03C56] hover:bg-red-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold transition-colors duration-300 text-sm sm:text-base"
                  >
                    {banner.buttonText}
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows - only show if more than one banner */}
      {banners.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors z-20"
            aria-label="Previous slide"
          >
            <FiChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors z-20"
            aria-label="Next slide"
          >
            <FiChevronRight size={24} />
          </button>
        </>
      )}

      {/* Slide indicators - only show if more than one banner */}
      {banners.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index ? "bg-red-500 w-6" : "bg-red-100"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}