"use client";

import axios from "axios";
import { useState } from "react";
import { API } from "../utils/helpers";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";
import {  FiUser } from "react-icons/fi";
import Header from "../components/Header";
import { MdPhone } from "react-icons/md";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (username.trim() === "") {
      setError("Username is required");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(`${API}/loginUser`, {
        username,
      });

      const user = res.data?.user;
      if (user) {
        localStorage.removeItem("guestUser");
        if (user?.storeName) {
          localStorage.setItem("store", user?.storeName);
        }
        localStorage.setItem("user", user?.userName);
        localStorage.setItem("type", `${user?.type}`);
        localStorage.setItem("id", user._id);

        setLoggedIn(true);
        setError("");
        router.push("/");
      } else {
        setError("Login failed - please check your username");
      }
    } catch (err) {
      console.error(err);
      setError("Server error during login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    // Placeholder for social login functionality
    alert(`${provider} login will be available soon!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Header */}
      <Header />

      {/* Enhanced Login Box */}
      <div className="flex justify-center items-center py-12 px-4">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden w-full max-w-md">
          {/* <div className="bg-red-600 h-2 w-full"></div> */}

          <div className="p-8">
            {!loggedIn ? (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Welcome Back
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Login to access your account
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Enter your username"
                      className="border border-gray-300 rounded-lg px-4 py-3 w-full pl-10 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        setError("");
                      }}
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  )}

                  <button
                    onClick={handleLogin}
                    disabled={isLoading}
                    className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
                      isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </button>

                  <div className="relative flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink mx-4 text-gray-500 text-sm">
                      OR
                    </span>
                    <div className="flex-grow border-t border-gray-300"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleSocialLogin("Google")}
                      className="flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <FcGoogle className="text-lg" />
                      <span className="text-sm">Google</span>
                    </button>
                    <button
                      onClick={() => handleSocialLogin("Facebook")}
                      className="flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <FaFacebook className="text-blue-600 text-lg" />
                      <span className="text-sm">Facebook</span>
                    </button>
                    <button
                      onClick={() => handleSocialLogin("Apple")}
                      className="flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <FaApple className="text-gray-800 text-lg" />
                      <span className="text-sm">Apple</span>
                    </button>
                    <button
                      onClick={() => handleSocialLogin("Phone")}
                      className="flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <MdPhone className="text-gray-600 text-lg" />
                      <span className="text-sm">Phone</span>
                    </button>
                  </div>

                  <div className="text-center mt-6">
                    <p className="text-gray-600 text-sm">
                      Don&apos;t have an account?
                      <a
                        href="#"
                        className="text-red-600 hover:underline font-medium"
                        onClick={(e) => {
                          e.preventDefault();
                          alert("Sign up functionality coming soon!");
                        }}
                      >
                        Sign up
                      </a>
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Login Successful!
                </h3>
                <p className="text-gray-600 mb-6">
                  Welcome back, <span className="font-medium">{username}</span>
                </p>
                <button
                  onClick={() => router.push("/")}
                  className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                >
                  Continue to Home
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
