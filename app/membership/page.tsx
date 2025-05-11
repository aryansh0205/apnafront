"use client";
import { useState, useEffect, useRef } from "react";
import { FiCheck, FiClock, FiAward, FiTrendingUp } from "react-icons/fi";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PromotionPage() {
  const [selectedPromotion, setSelectedPromotion] = useState<
    "trending" | "featured" | null
  >(null);
  const [duration, setDuration] = useState<number>(1);
  const [showContactForm, setShowContactForm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const contactFormRef = useRef<HTMLDivElement>(null);

  // Promotion options
  const promotions = {
    trending: {
      title: "Trending Spotlight",
      description: "Get your offer featured in our trending section",
      basePrice: 99,
      durationOptions: [
        { days: 1, price: 99 },
        { days: 3, price: 249 },
        { days: 7, price: 499 },
      ],
      auctionNote: "Top positions go to highest bidders",
    },
    featured: {
      title: "Featured Placement",
      description: "Premium visibility at the top of relevant categories",
      basePrice: 199,
      durationOptions: [
        { days: 1, price: 199 },
        { days: 3, price: 499 },
        { days: 7, price: 999 },
      ],
      auctionNote: "Bid competitively for prime spots",
    },
  };

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Calculate total price
  const calculateTotal = () => {
    if (!selectedPromotion) return 0;
    const selectedOption = promotions[selectedPromotion].durationOptions.find(
      (opt) => opt.days === duration
    );
    return selectedOption ? selectedOption.price : 0;
  };

  // Handle promotion selection
  const handlePromotionSelect = (type: "trending" | "featured") => {
    setSelectedPromotion(type);
    setDuration(1); // Reset to default duration
    setShowContactForm(false);
    setIsSubmitted(false);

    // Scroll to contact form on desktop
    if (!isMobile && contactFormRef.current) {
      setTimeout(() => {
        contactFormRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log({
      promotionType: selectedPromotion,
      duration,
      phoneNumber,
      totalPrice: calculateTotal(),
    });
    setIsSubmitted(true);
  };

  // Handle mobile continue button click
  const handleMobileContinue = () => {
    setShowContactForm(true);
    if (contactFormRef.current) {
      contactFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-5">
        {/* Page Header */}
        <div className="text-center mb-12 pt-15">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Boost Your Business Visibility
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pay-per-promotion options to get your offers seen by more customers
          </p>
        </div>

        {/* Promotion Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Trending Spotlight */}
          <div
            className={`bg-white rounded-xl border-1 border-[#f1f1f1] p-6 transition-all ${
              selectedPromotion === "trending"
                ? "border-orange-500"
                : "border-gray-200 hover:border-orange-300"
            }`}
            onClick={() => handlePromotionSelect("trending")}
          >
            <div className="flex items-center mb-4">
              <div className="bg-orange-100 p-3 rounded-full mr-4">
                <FiTrendingUp className="text-orange-600 text-xl" />
              </div>
              <h2 className="text-xl font-semibold">Trending Spotlight</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Get your offer featured in our trending section
            </p>

            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">
                Starting at just ₹99
              </h3>
              <div className="bg-orange-50 border border-orange-100 rounded-lg p-3 text-sm text-orange-800">
                <FiAward className="inline mr-2" />
                {promotions.trending.auctionNote}
              </div>
            </div>

            {/* <ul className="space-y-3 mb-6">
              <FeatureItem text="Increased visibility in trending section" />
              <FeatureItem text="Higher click-through rates" />
              <FeatureItem text="Priority placement over regular listings" />
              <FeatureItem text="Appears in trending notifications" />
              <FeatureItem text="Boosted search results" />
              <FeatureItem text="Free basic banner design to match your offer theme" />
              <FeatureItem text="Higher chances of going viral among nearby users" />
            </ul> */}
            <ul className="space-y-3 mb-6">
              <FeatureItem text="Visible in the 'Trending Offers' section for up to 7 days" />
              <FeatureItem text="Get up to 2x higher click-through rate vs regular listings" />
              <FeatureItem text="Priority placement in main feed during top activity hours" />
              <FeatureItem text="Included in real-time 'Trending Now' notifications" />
              <FeatureItem text="Boosted ranking in category searches and filters" />
              <FeatureItem text="Free basic banner design (worth ₹199) to match your branding" />
              <FeatureItem text="Great for flash sales, event promos, and new launches" />
              <FeatureItem text="Instant visibility boost without long-term lock-ins" />
              <FeatureItem text="Higher chances of local discovery via app & web traffic" />
            </ul>

            <button
              className={`w-full py-3 px-6 rounded-lg font-medium ${
                selectedPromotion === "trending"
                  ? "bg-orange-600 text-white hover:bg-orange-700"
                  : "bg-orange-100 text-orange-800 hover:bg-orange-200"
              } transition-colors`}
            >
              {selectedPromotion === "trending"
                ? "Selected"
                : "Select Promotion"}
            </button>
          </div>

          {/* Featured Placement */}
          <div
            className={`bg-white rounded-xl border-1 border-[#f1f1f1] p-6 transition-all ${
              selectedPromotion === "featured"
                ? "border-blue-500"
                : "border-gray-200 hover:border-blue-300"
            }`}
            onClick={() => handlePromotionSelect("featured")}
          >
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <FiAward className="text-blue-600 text-xl" />
              </div>
              <h2 className="text-xl font-semibold">Featured Placement</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Premium visibility at the top of relevant categories
            </p>

            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">
                Starting at just ₹199
              </h3>
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm text-blue-800">
                <FiAward className="inline mr-2" />
                {promotions.featured.auctionNote}
              </div>
            </div>
            {/* 
            <ul className="space-y-3 mb-6">
              <FeatureItem text="Prime placement at category tops" />
              <FeatureItem text="Featured badge for credibility" />
              <FeatureItem text="2x more visibility than standard listings" />
              <FeatureItem text="Appears in featured collections" />
              <FeatureItem text="Receive a professionally designed banner for your offer" />
              <FeatureItem text="Boosted visibility during peak hours and local events" />
              <FeatureItem text="Boost credibility with a trusted 'Featured' badge" />
            </ul> */}
            <ul className="space-y-3 mb-6">
              <FeatureItem text="Top-of-category placement for maximum visibility (7 days)" />
              <FeatureItem text="Get 2x–3x more views than regular listings" />
              <FeatureItem text="Trusted 'Featured' badge improves credibility & conversions" />
              <FeatureItem text="Displayed in 'Flash Deals' on homepage + spotlight widgets" />
              <FeatureItem text="Average 60% more engagement vs non-featured listings" />
              <FeatureItem text="Boosted visibility during high-traffic local times" />
              <FeatureItem text="Includes premium banner design (worth ₹499) for free" />
              <FeatureItem text="Featured in weekly 'Top Picks' and seasonal campaigns" />
              <FeatureItem text="Priority seller support + campaign insights for better ROI" />
            </ul>

            <button
              className={`w-full py-3 px-6 rounded-lg font-medium ${
                selectedPromotion === "featured"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-100 text-blue-800 hover:bg-blue-200"
              } transition-colors`}
            >
              {selectedPromotion === "featured"
                ? "Selected"
                : "Select Promotion"}
            </button>
          </div>
        </div>

        {/* Duration Selection */}
        {selectedPromotion && (
          <div className="bg-white rounded-xl border-1 border-[#f1f1f1] p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Select Promotion Duration
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
              {promotions[selectedPromotion].durationOptions.map((option) => (
                <div
                  key={option.days}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    duration === option.days
                      ? "border-blue-500 bg-blue-50"
                      : "border-blue-200 hover:border-gray-300"
                  }`}
                  onClick={() => setDuration(option.days)}
                >
                  <div className="flex items-center mb-2">
                    <FiClock className="text-gray-500 mr-2" />
                    <h3 className="font-medium">
                      {option.days} Day{option.days > 1 ? "s" : ""}
                    </h3>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">
                    ₹{option.price}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    ₹{Math.round(option.price / option.days)}/day
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Form */}
        <div ref={contactFormRef}>
          {selectedPromotion && !isSubmitted && (
            <div className="bg-white rounded-xl border-2 border-[#f1f1f1] p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Complete Your Promotion Request
              </h2>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">
                  Order Summary
                </h3>
                <p className="text-gray-600">
                  {promotions[selectedPromotion].title} for {duration} day
                  {duration > 1 ? "s" : ""}
                </p>
                <p className="text-2xl font-bold text-green-600 mt-2">
                  ₹{calculateTotal()}
                </p>
              </div>

              {!showContactForm ? (
                <div className="text-center">
                  <button
                    onClick={
                      isMobile
                        ? handleMobileContinue
                        : () => setShowContactForm(true)
                    }
                    className="px-8 py-3 bg-blue-500 text-white rounded-4xl font-medium hover:bg-blue-700 transition-colors"
                  >
                    Continue for ₹{calculateTotal()}
                  </button>
                  <p className="text-sm text-gray-500 mt-3">
                    Our team will contact you to confirm details and payment
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Enter your WhatsApp number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      We&apos;ll call you soon to confirm.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Submit Request
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Confirmation Message */}
        {isSubmitted && (
          <div className="bg-white rounded-xl border border-[#f1f1f1] p-8 text-center">
            <div className="bg-green-100 text-green-800 p-4 rounded-full inline-flex items-center justify-center mb-6">
              <FiCheck className="text-2xl" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Request Submitted Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Our team will reach out to you shortly to confirm your promotion
              details and payment.
            </p>
            <p className="text-sm text-gray-500">
              For immediate assistance, call us at +91 63067 60227
            </p>
          </div>
        )}

        {/* How It Works */}
        <div className="mt-16 bg-gray-50 rounded-xl md:p-8 p-2">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            How Our Promotion System Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Choose Your Promotion
              </h3>
              <p className="text-gray-600">
                Select between Trending Spotlight or Featured Placement based on
                your needs
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-lg mb-2">Set Duration</h3>
              <p className="text-gray-600">
                Pick how long you want your promotion to run (1, 3, or 7 days)
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-lg mb-2">Confirm & Pay</h3>
              <p className="text-gray-600">
                Our team contacts you to finalize placement and payment
              </p>
            </div>
          </div>

          <div className="mt-8  bg-white p-6 rounded-2xl border border-[#f1f1f1]">
            <h3 className="font-bold text-lg text-gray-900 mb-3">
              Auction-Style Placement
            </h3>
            <p className="text-gray-600 mb-4">
              For maximum visibility, we offer premium positions that are
              allocated based on:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <FiCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Bid amount (higher bids get better placement)
                </span>
              </li>
              <li className="flex items-start">
                <FiCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Relevance to user searches
                </span>
              </li>
              <li className="flex items-start">
                <FiCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Quality of your offer</span>
              </li>
            </ul>
            <p className="text-sm text-gray-500 mt-4">
              Note: Starting prices shown guarantee basic placement. Contact us
              for premium position pricing.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Fixed Promotion Bar */}
      {isMobile && selectedPromotion && !isSubmitted && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-50">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-900">
                {promotions[selectedPromotion].title}
              </p>
              <p className="text-gray-600 text-sm">
                {duration} day{duration > 1 ? "s" : ""} • ₹{calculateTotal()}
              </p>
            </div>
            <button
              onClick={handleMobileContinue}
              className="px-6 py-2 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <li className="flex items-start">
      <FiCheck className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
      <span className="text-gray-700">{text}</span>
    </li>
  );
}
