"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import api from "@/lib/api";
import TolovItems from "@/components/TolovItems";
import Loader from "@/components/Loader";
import { usePathname } from "next/navigation";
import ModalChek from "@/components/ModalChek";

const page = () => {
  const [userData, setUserData] = useState();
  const [error, setError] = useState(null);
  const [tolovlar, setTolovlar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const pathName = usePathname();
  const getLastSegment = (url) => {
    const segments = url.split("/").filter(Boolean); // Bo'sh segmentlarni olib tashlash
    return segments[segments.length - 1]; // Oxirgi segmentni qaytarish
  };
  const lastSegment = getLastSegment(pathName);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = Cookies.get("token");
      if (!token) {
        console.error("Foydalanuvchi tizimga kirilgan emas.");
        return;
      }
      console.log("first", lastSegment);
      try {
        const response = await api.get(
          `/api/v1/root/referral/${lastSegment}/detail`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        setUserData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Xatolik yuz berdi.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
    const fetchUserTolov = async () => {
      const token = Cookies.get("token");
      if (!token) {
        console.error("Foydalanuvchi tizimga kirilgan emas.");
        return;
      }
      try {
        const response = await api.get(
          `api/v1/root/referral/${lastSegment}/payment/history`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setTolovlar(response.data.results);
        // console.log(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Xatolik yuz berdi.");
      }
    };
    fetchUserTolov();
  }, []);

  const handleActionClick = () => {
    setSelectedUserId("id");
    setIsModalOpen(true);
  };

  if (loading) return <Loader type="ball-grid-pulse" />;
  return (
    <div>
      <div className="py-7 px-[60px] bg-white border border-[#015EA8] rounded-xl mb-5">
        <div className="grid grid-cols-3">
          <h2 className="text-xl font-semibold mb-3 ">
            {userData?.user?.full_name}
          </h2>
          <h2 className="text-xl font-semibold mb-3">
            {userData?.user?.phone}
          </h2>
        </div>
        <div className="border border-[#015EA8] mb-3"></div>
        <div className="grid grid-cols-3">
          <div className="flex flex-col">
            <p className="text-[#212121] mt-4">Karta raqami:</p>
            <p className="text-[#585858] font-[300] text-sm mt-2">
              {userData?.card_number}
            </p>
            <p className="text-[#212121] mt-4">Karta egasi:</p>
            <p className="text-[#585858] font-[300] text-sm mt-2">
              {userData?.card_name}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-[#212121] mt-4">Yetkazilgan buyurtmalar:</p>
            <p className="text-[#585858] font-[500] text-lg mt-2">
              {userData?.users}{" "}
            </p>
            <p className="text-[#212121] mt-4">Ish haqi:</p>
            <p className="text-[#585858] font-[500] text-lg mt-2">
              {userData?.amount}
            </p>
          </div>
          <div className="flex justify-end items-end">
            <button
              className="py-[10px] px-5 rounded-[10px] bg-[#015EA8] text-white"
              onClick={handleActionClick}
            >
              To’lovni tasdiqlash
            </button>
          </div>
        </div>
      </div>
      <div className="py-7 px-[60px] bg-white border border-[#015EA8] rounded-xl mb-5">
        <h2 className="text-xl font-semibold mb-3">To‘lovlar tarixi</h2>
        <div className="flex flex-col">
          <div className="mt-[30px] w-full flex">
            <div className="w-1/4 flex justify-center items-center text-white text-sm font-medium bg-[#015EA8] h-[40px]">
              Summa
            </div>
            <div className="w-1/4 flex justify-center items-center text-white text-sm font-medium bg-[#015EA8] h-[40px]">
              Referaldan kelganlar
            </div>
            <div className="w-1/4 flex justify-center items-center text-white text-sm font-medium bg-[#015EA8] h-[40px]">
              Chekni ko’rish
            </div>
            <div className="w-1/4 flex justify-center items-center text-white text-sm font-medium bg-[#015EA8] h-[40px]">
              To‘langan sana
            </div>
          </div>
          <div className="flex flex-col">
            {tolovlar.length > 0 ? (
              tolovlar.map((tolovlar, id) => (
                <TolovItems
                  bg={id % 2 == 1 ? true : false}
                  amount={tolovlar.amount}
                  users={tolovlar.users_count}
                  chek={tolovlar.chek}
                  created={tolovlar.created}
                />
              ))
            ) : (
              <p className="text-center mt-4">No found.</p>
            )}
          </div>
        </div>
      </div>
      <ModalChek
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={userData.user.id}
      />
    </div>
  );
};

export default page;
