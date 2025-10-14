"use client";
import React, { useEffect, useState } from "react";
import { API } from "../utils/helpers";
import axios from "axios";
import {
  FiCheck,
  FiCopy,
  FiDollarSign,
  FiMapPin,
  FiShoppingBag,
  FiUser,
  FiX,
  FiClock,
} from "react-icons/fi";
import { FaStore } from "react-icons/fa";
import { BsCoin } from "react-icons/bs";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface UserBooking {
  _id: string;
  customerName: string;
  bookedOn: string;
  offerEndsOn: string;
  couponCode: string;
  type: string;
  storeName: string;
  location: string;
  originalPrice: number;
  bookedPrice: number;
  used?: boolean;
  offerId?: {
    storeId?: {
      storeName?: string;
    };
    offerPrice?: number;
    offerDiscount?: number;
  };
  createdAt: string;
  expiresAt: string;
  coinsRewarded: number;
}

interface StoreBookingEntry {
  _id: string;
  userId?: {
    userName?: string;
  };
  quantity?: number;
  createdAt: string;
  used?: boolean;
  couponCode?: string;
}

interface StoreOffer {
  _id: string;
  offerName: string;
  offerType: string;
  offerPrice: number;
  offerDiscount: number;
  offerStartDate: string;
  offerEndDate: string;
  status: string;
  bookings?: StoreBookingEntry[];
}

interface CustomerBookingsData {
  type: "user" | "creator" | "guest";
  bookings: UserBooking[];
}

interface StoreBookingsData {
  type: "store";
  store: {
    type: "store";
    offerId: StoreOffer[];
  };
  bookings: StoreBookingEntry[];
}

const BookingsPage = () => {
const [userId, setUserId] = useState<string | null>(null);
const [userType, setUserType] = useState<string | null>(null);

useEffect(() => {
  if (typeof window !== "undefined") {
    setUserId(localStorage.getItem("id"));
    setUserType(localStorage.getItem("type"));
  }
}, []);
  const [activeTab, setActiveTab] = useState<"active" | "past">("active");
  const [activeStoreTab, setActiveStoreTab] = useState<
    "verify" | "bookings" | "past"
  >("verify");
  const [bookings, setBookings] = useState<
    CustomerBookingsData | StoreBookingsData | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [verificationCode, setVerificationCode] = useState("");
  const [selectedBooking, setSelectedBooking] =
    useState<StoreBookingEntry | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      let endpoint = "";

      if (userType === "store") {
        endpoint = `${API}/getStoreBookings/${userId}`;
      } else {
        endpoint = `${API}/getBookings/${userId}`;
      }

      const res = await axios.get(endpoint);
      if (res?.data?.success) {
        setBookings(
          userType === "store"
            ? res.data
            : { ...res.data.user, type: userType || "user" }
        );
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyBooking = async () => {
    if (!verificationCode.trim() || !selectedBooking) return;

    setIsVerifying(true);
    try {
      const res = await axios.post(`${API}/verifyCoupon/${verificationCode}`);
      if (res?.data?.success) {
        alert("Booking verified successfully!");
        fetchBookings();
        setSelectedBooking(null);
        setVerificationCode("");
      } else {
        alert("Verification failed. Please check the code and try again.");
      }
    } catch (error) {
      console.error("Verification error:", error);
      alert("An error occurred during verification.");
    } finally {
      setIsVerifying(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  useEffect(() => {
    fetchBookings();
  }, [userType, activeTab, activeStoreTab]);

  const filterActiveBookings = (bookingsList: UserBooking[]) => {
    const now = new Date();
    return bookingsList.filter(
      (booking) => new Date(booking.expiresAt) > now && !booking.used
    );
  };

  const filterPastBookings = (bookingsList: UserBooking[]) => {
    const now = new Date();
    return bookingsList.filter(
      (booking) => new Date(booking.expiresAt) <= now || booking.used
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  // Customer View
  if (userType !== "store") {
    const customerBookings = bookings as CustomerBookingsData;
    const activeBookings = filterActiveBookings(
      customerBookings?.bookings || []
    );
    const pastBookings = filterPastBookings(customerBookings?.bookings || []);

    return (
      <div>
        <Header />
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 mt-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                My Bookings
              </h1>
              <div className="flex bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mt-4 md:mt-0">
                <button
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === "active"
                      ? "bg-red-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("active")}
                >
                  Active Bookings
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === "past"
                      ? "bg-red-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("past")}
                >
                  Past Bookings
                </button>
              </div>
            </div>

            {activeTab === "active" && activeBookings.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <FiShoppingBag className="mx-auto text-gray-400 text-4xl mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  No Active Bookings
                </h3>
                <p className="text-gray-500">
                  You don&apos;t have any active bookings yet.
                </p>
                <a
                  href="/offers"
                  className="mt-4 inline-block px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Browse Offers
                </a>
              </div>
            )}

            {activeTab === "past" && pastBookings.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <FiShoppingBag className="mx-auto text-gray-400 text-4xl mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  No Past Bookings
                </h3>
                <p className="text-gray-500">
                  You don&apos;t have any past bookings yet.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(activeTab === "active" ? activeBookings : pastBookings).map(
                (booking) => (
                  <div
                    key={booking._id}
                    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <FaStore className="text-red-500 mr-2" />
                          <h3 className="text-lg font-semibold text-gray-800">
                            {booking.offerId?.storeId?.storeName ||
                              booking.storeName}
                          </h3>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            booking.used
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {booking.used ? "Used" : "Active"}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center text-gray-600">
                          <FiMapPin className="mr-2" />
                          <span>{booking.location}</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-gray-600">
                            <FiDollarSign className="mr-2" />
                            <span>
                              ₹
                              {booking.offerId?.offerPrice ||
                                booking.originalPrice}
                            </span>
                          </div>
                          <div className="text-red-500 font-medium">
                            {booking.offerId?.offerDiscount || 0}% OFF
                          </div>
                        </div>

                        <div className="flex items-center text-gray-600">
                          <FiClock className="mr-2" />
                          <span>
                            Booked:{" "}
                            {new Date(booking.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex items-center text-gray-600">
                          <FiClock className="mr-2" />
                          <span>
                            Expires:{" "}
                            {new Date(booking.expiresAt).toLocaleDateString()}
                          </span>
                        </div>

                        {booking.coinsRewarded > 0 && (
                          <div className="flex items-center text-yellow-600 bg-yellow-50 px-3 py-2 rounded-lg">
                            <BsCoin className="mr-2" />
                            <span className="font-medium">
                              +{booking.coinsRewarded} coins on verification
                            </span>
                          </div>
                        )}
                      </div>

                      {!booking.used && (
                        <div className="mt-4">
                          <button
                            onClick={() =>
                              copyToClipboard(booking.couponCode, booking._id)
                            }
                            className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                          >
                            {copiedCodeId === booking._id ? (
                              <>
                                <FiCheck className="text-green-300" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <FiCopy />
                                Copy Code: {booking.couponCode}
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Store View
  const storeBookings = bookings as StoreBookingsData;
  const allBookings =
    storeBookings?.store?.offerId?.flatMap((offer) => offer.bookings || []) ||
    [];

  const activeStoreBookings = allBookings.filter((booking) => !booking.used);

  const pastStoreBookings = allBookings.filter((booking) => booking.used);

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 mt-10">
        <div className="max-w-6xl mx-auto">
          {/* <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-red-600 mb-4 transition-colors"
          >
            <FiChevronLeft className
            ="mr-2" /> Back
          </button> */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Store Bookings
            </h1>
            <div className="flex bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mt-4 md:mt-0">
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeStoreTab === "verify"
                    ? "bg-red-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveStoreTab("verify")}
              >
                Verify Bookings
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeStoreTab === "bookings"
                    ? "bg-red-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveStoreTab("bookings")}
              >
                My Bookings
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  activeStoreTab === "past"
                    ? "bg-red-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveStoreTab("past")}
              >
                Past Bookings
              </button>
            </div>
          </div>

          {/* Verify Bookings Tab */}
          {activeStoreTab === "verify" && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Verify Customer Bookings
                </h2>

                {activeStoreBookings.length === 0 ? (
                  <div className="text-center py-8">
                    <FiCheck className="mx-auto text-gray-400 text-4xl mb-4" />
                    <h3 className="text-lg font-medium text-gray-700 mb-2">
                      No Bookings to Verify
                    </h3>
                    <p className="text-gray-500">
                      All current bookings have been verified.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {storeBookings.store.offerId?.map((offer) =>
                      offer.bookings
                        ?.filter((b) => !b.used)
                        .map((booking) => (
                          <div
                            key={booking._id}
                            className="border border-gray-200 rounded-lg p-4"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center">
                                <FiUser className="text-gray-500 mr-2" />
                                <span className="font-medium">
                                  {booking.userId?.userName || "Customer"}
                                </span>
                              </div>
                              <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                                Pending
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                              <div>
                                <div className="text-xs text-gray-500">
                                  Offer
                                </div>
                                <div>{offer.offerName}</div>
                              </div>
                              <div>
                                <div className="text-xs text-gray-500">
                                  Booked On
                                </div>
                                <div>
                                  {new Date(
                                    booking.createdAt
                                  ).toLocaleDateString()}
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={() => {
                                setSelectedBooking(booking);
                                setVerificationCode(booking.couponCode || "");
                              }}
                              className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                            >
                              Verify Booking
                            </button>
                          </div>
                        ))
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* My Bookings Tab */}
          {activeStoreTab === "bookings" && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Current Bookings
                </h2>

                {storeBookings.store.offerId?.length === 0 ? (
                  <div className="text-center py-8">
                    <FiShoppingBag className="mx-auto text-gray-400 text-4xl mb-4" />
                    <h3 className="text-lg font-medium text-gray-700 mb-2">
                      No Active Offers
                    </h3>
                    <p className="text-gray-500">
                      You don&apos;t have any active offers with bookings.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {storeBookings.store.offerId?.map((offer) => (
                      <div
                        key={offer._id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">
                              {offer.offerName}
                            </h3>
                            <p className="text-gray-600">{offer.offerType}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-red-600">
                              ₹{offer.offerPrice}
                            </div>
                            <div className="text-sm text-gray-500">
                              {offer.offerDiscount}% discount
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-xs text-gray-500">
                              Start Date
                            </div>
                            <div>
                              {new Date(
                                offer.offerStartDate
                              ).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-xs text-gray-500">
                              End Date
                            </div>
                            <div>
                              {new Date(
                                offer.offerEndDate
                              ).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-xs text-gray-500">
                              Total Bookings
                            </div>
                            <div>{offer.bookings?.length || 0}</div>
                          </div>
                        </div>

                        {offer.bookings?.length ? (
                          <div className="space-y-3">
                            {offer.bookings.map((booking) => (
                              <div
                                key={booking._id}
                                className="border-t border-gray-200 pt-3"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <FiUser className="text-gray-500 mr-2" />
                                    <span>
                                      {booking.userId?.userName || "Customer"}
                                    </span>
                                  </div>
                                  <span
                                    className={`px-2 py-1 text-xs rounded-full ${
                                      booking.used
                                        ? "bg-green-100 text-green-800"
                                        : "bg-yellow-100 text-yellow-800"
                                    }`}
                                  >
                                    {booking.used ? "Verified" : "Pending"}
                                  </span>
                                </div>
                                <div className="text-sm text-gray-600 mt-1">
                                  Booked on{" "}
                                  {new Date(
                                    booking.createdAt
                                  ).toLocaleDateString()}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-4 text-gray-500">
                            No bookings for this offer yet
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Past Bookings Tab */}
          {activeStoreTab === "past" && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Past Bookings
                </h2>

                {pastStoreBookings.length === 0 ? (
                  <div className="text-center py-8">
                    <FiClock className="mx-auto text-gray-400 text-4xl mb-4" />
                    <h3 className="text-lg font-medium text-gray-700 mb-2">
                      No Past Bookings
                    </h3>
                    <p className="text-gray-500">
                      You don&apos;t have any past bookings yet.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pastStoreBookings.map((booking) => (
                      <div
                        key={booking._id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <FiUser className="text-gray-500 mr-2" />
                            <span className="font-medium">
                              {booking.userId?.userName || "Customer"}
                            </span>
                          </div>
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            Verified
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-xs text-gray-500">
                              Verified On
                            </div>
                            <div>
                              {new Date(booking.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Code</div>
                            <div className="font-mono">
                              {booking.couponCode}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Verification Modal */}
          {selectedBooking && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Verify Booking
                    </h3>
                    <button
                      onClick={() => {
                        setSelectedBooking(null);
                        setVerificationCode("");
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FiX size={20} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Customer
                      </label>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        {selectedBooking.userId?.userName || "Customer"}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Booking Code
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Enter verification code"
                        />
                        <button
                          onClick={() =>
                            copyToClipboard(
                              selectedBooking.couponCode || "",
                              "modal"
                            )
                          }
                          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                          title="Copy to clipboard"
                        >
                          {copiedCodeId === "modal" ? (
                            <FiCheck className="text-green-500" />
                          ) : (
                            <FiCopy />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => {
                          setSelectedBooking(null);
                          setVerificationCode("");
                        }}
                        className="flex-1 py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={verifyBooking}
                        disabled={isVerifying || !verificationCode.trim()}
                        className={`flex-1 py-3 px-4 text-white rounded-lg transition-colors ${
                          isVerifying || !verificationCode.trim()
                            ? "bg-red-400 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                      >
                        {isVerifying ? "Verifying..." : "Confirm Verification"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingsPage;
