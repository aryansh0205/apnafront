"use client";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Offer type definition
// type Offer = {
//   _id: number;
//   title?: string;
//   store?: string;
//   location?: string;
//   contact?: string;
//   description?: string;
//   image?: File;
//   offerImage?: string;
//   offerName?: string;
//   offerType?: string;
//   offerPrice?: string;
//   storeName?: string;
//   offerEndDate?: string;
//   offerStartDate?: string;
//   offerDescription?: string;
// };

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [city, setCity] = useState<string | null>(null);

  useEffect(() => {
    const storedCity = localStorage.getItem("selectedCity");
    if (storedCity) {
      setCity(storedCity);
    }
  }, []);

  // const [data, setData] = useState<Offer[] | null>(null);

  // const getOffer = async () => {
  //   try {
  //     await axios.get<Offer[]>("http://144.202.117.80:5002/api/getOffer", {
  //       headers: {
  //         "Cache-Control": "no-cache, no-store, must-revalidate",
  //         Pragma: "no-cache",
  //         Expires: "0",
  //       },
  //     });
  //     // setData(res.data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  type Banner = {
    BannerImage?: string;
    BannerName?: string;
    subtitle?: string;
    buttonText?: string;
    link?: string;
    bgImageMobile?: string;
  };

  const [banners, setBanners] = useState<Banner[]>([]);

  const getBanners = async () => {
    try {
      if (!city) return;
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/getBanners`, {
        params: {
          city,
        },
      });
      console.log(res?.data, "banners");
      if (res.data.success) setBanners(res.data.banners);
    } catch (err) {
      console.error("Banner fetch error", err);
    }
  };

  const slides = [
    {
      id: 1,
      title: "Discover the Best of Kanpur",
      subtitle:
        "Find local deals, events, and experiences tailored just for you.",
      bgImage: "../Travel.webp",
      bgImageMobile: "../Travel-mobile.webp",
      buttonText: "Explore Now",
    },
    {
      id: 2,
      title: "Exclusive Local Offers",
      subtitle: "Limited-time discounts from your favorite Kanpur businesses.",
      bgImage: "../Local-offer.webp",
      bgImageMobile: "../offers-mobile.webp",
      buttonText: "View Offers",
    },
    {
      id: 3,
      title: "Upcoming Events",
      subtitle: "Concerts, exhibitions and more happening near you.",
      bgImage: "../Events.webp",
      bgImageMobile: "../Events-mobile.webp",
      buttonText: "Browse Events",
    },
    {
      id: 4,
      title: "Premium Memberships",
      subtitle: "Unlock special benefits with our membership programs.",
      bgImage: "../Membership.webp",
      bgImageMobile: "../Membership-mobile.webp",
      buttonText: "Learn More",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  useEffect(() => {
    getBanners();
  }, [city]);
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    // getOffer();
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative h-[600px]  overflow-hidden">
      {/* Slides */}
      <div
        className="flex transition-transform duration-1000 ease-in-out
"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0 relative h-[600px]">
            {/* Desktop Background */}
            <div
              className="hidden md:block absolute inset-0"
              style={{
                backgroundImage: `url(${slide?.BannerImage})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundColor: "black",
              }}
            />
            {/* Mobile Background */}
            <div
              className="block md:hidden absolute inset-0"
              style={{
                backgroundImage: `url(${slide?.bgImageMobile})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundColor: "black",
              }}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/70 to-transparent"></div>

            {/* Slide content */}
            <div className="absolute inset-0 flex items-center justify-center text-center">
              <div className="max-w-4xl px-4 text-white relative z-10">
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 font-serif">
                  {slide?.BannerName}
                </h1>
                <p className="text-sm sm:text-base md:text-xl mb-8">
                  {slide?.subtitle}
                </p>

                {slide?.buttonText && (
                  <Link
                    href={`${slide?.link}`}
                    className="bg-[#F03C56] hover:bg-red-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold transition-colors duration-300 text-sm sm:text-base"
                  >
                    {slide?.buttonText}
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
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

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
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
    </div>
  );
}
