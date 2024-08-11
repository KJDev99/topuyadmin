"use client";
import React, { useEffect, useState } from "react";
import api from "@/lib/api";
import Cookies from "js-cookie";

const TopProfil = () => {
  const [userData, setUserData] = useState(null);
  const fetchUserProfile = async () => {
    const token = Cookies.get("token");
    if (!token) {
      console.error("Foydalanuvchi tizimga kirilgan emas.");
      return;
    }
    try {
      const response = await api.get("/api/v1/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setUserData(response.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };
  useEffect(() => {
    fetchUserProfile();
  }, []);
  return (
    <div className="w-full h-[70px] border border-ochKok bg-background rounded-[10px] flex justify-end mb-5">
      <div className="flex items-center ">
        <h2 className="text-qora text-2xl font-medium">
          {userData?.full_name}
        </h2>
        {userData?.photo && (
          <img
            src={userData?.photo}
            alt="img"
            className="h-10 w-10 mr-[60px] cursor-pointer ml-10"
          />
        )}
      </div>
    </div>
  );
};

export default TopProfil;
