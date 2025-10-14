"use client";
import React, { useState } from "react";
import { API } from "../utils/helpers";
import axios from "axios";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const [fullName, setFullname] = useState("");
  const [userName, setUsername] = useState("");
  const [storeName, setStorename] = useState("");
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const handleSave = async () => {
    try {
      const res = await axios.post(`${API}/signup`, {
        fullName,
        userName,
        storeName,
        type,
        email,
        phone,
      });

      if (res?.data?.success) {
        // console.log("done");
        localStorage.removeItem("guestUser");
        localStorage.removeItem("store");
        localStorage.removeItem("user");
        localStorage.removeItem("id");
        if (res?.data?.user?.type === "store") {
          localStorage.setItem("store", res?.data?.user?.storeName);
        }
        localStorage.setItem("user", res?.data?.user?.userName);
        localStorage.setItem("type", `${res?.data?.user?.type}`);
        localStorage.setItem("id", `${res?.data?.user?._id}`);

        router.push("/");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="text-2xl font-bold text-black">Fullname </div>
      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullname(e.target.value)}
        placeholder="Enter your Fullname"
      />

      <div className="text-2xl font-bold text-black">Username </div>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
      />
      <div className="text-2xl font-bold text-black">Store name if any </div>
      <input
        type="text"
        value={storeName}
        onChange={(e) => setStorename(e.target.value)}
        placeholder="Enter your username"
      />
      <div className="text-2xl font-bold text-black">Email </div>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <div className="text-2xl font-bold text-black">Phone </div>
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Enter your phone"
      />
      <div className="text-2xl font-bold text-black">User Type </div>
      <input
        type="text"
        value={type}
        onChange={(e) => setType(e.target.value)}
        placeholder="Enter your type(user,creator,store)"
      />
      <button onClick={handleSave}>Submit</button>
    </div>
  );
}

export default Page;
