"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import soni from "@/assets/images/soni.svg";
import elonlaract from "@/assets/images/elonlaract.svg";
import topga from "@/assets/images/topga.svg";
import activ from "@/assets/images/activ.svg";
import bekor from "@/assets/images/bekor.svg";
import Image from "next/image";
import api from "@/lib/api";

const Statistika = () => {
  const [data, setData] = useState({
    users: 0,
    total_ads: 0,
    top_ads: 0,
    active_ads: 0,
    rejected_ads: 0,
  });

  const fetchData = async () => {
    const token = Cookies.get("token"); // Tokenni cookies-dan olish

    try {
      const response = await api.get("/api/v1/root/analytics", {
        headers: {
          Authorization: `Bearer ${token}`, // Tokenni Authorization sarlavhasida yuborish
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Optional: handle unauthorized access or other errors
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-5 gap-6">
      <div className="flex flex-col p-4 rounded-[10px] bg-[#F8FCFF]">
        <h2 className="text-qora h-[70px] text">Foydalanuvchilar soni:</h2>
        <div className="flex justify-between">
          <Image src={soni} alt="soni" />
          <p className="text-2xl text-logoKok font-semibold">{data.users}</p>
        </div>
      </div>
      <div className="flex flex-col p-4 rounded-[10px] bg-[#F8FCFF]">
        <h2 className="text-qora h-[70px] text">Jami e'lonlar:</h2>
        <div className="flex justify-between">
          <Image src={elonlaract} alt="soni" />
          <p className="text-2xl text-logoKok font-semibold">
            {data.total_ads}
          </p>
        </div>
      </div>
      <div className="flex flex-col p-4 rounded-[10px] bg-[#F8FCFF]">
        <h2 className="text-qora h-[70px] text">Topga chiqarilgan:</h2>
        <div className="flex justify-between">
          <Image src={topga} alt="soni" />
          <p className="text-2xl text-logoKok font-semibold">{data.top_ads}</p>
        </div>
      </div>
      <div className="flex flex-col p-4 rounded-[10px] bg-[#F8FCFF]">
        <h2 className="text-qora h-[70px] text">Aktiv e'lonlar:</h2>
        <div className="flex justify-between">
          <Image src={activ} alt="soni" />
          <p className="text-2xl text-logoKok font-semibold">
            {data.active_ads}
          </p>
        </div>
      </div>
      <div className="flex flex-col p-4 rounded-[10px] bg-[#F8FCFF]">
        <h2 className="text-qora h-[70px] text">Bekor qilingan elonlar:</h2>
        <div className="flex justify-between">
          <Image src={bekor} alt="soni" />
          <p className="text-2xl text-logoKok font-semibold">
            {data.rejected_ads}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Statistika;
