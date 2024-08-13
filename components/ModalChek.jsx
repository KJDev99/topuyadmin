import React, { useState } from "react";
import ChekImage from "@/assets/images/chekyukla.svg";
import Image from "next/image";
import Cookies from "js-cookie";
import api from "@/lib/api";

const ModalChek = ({ isOpen, onClose, userId }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleConfirmPayment = async () => {
    if (!selectedFile) {
      alert("Iltimos, rasmni tanlang.");
      return;
    }

    const token = Cookies.get("token");
    if (!token) {
      alert("Foydalanuvchi tizimga kirilgan emas.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("chek", selectedFile);
      formData.append("user", userId);

      const response = await api.post(
        "/api/v1/root/referral/transfer/money",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Success:", response.data);
      // Additional success handling
    } catch (err) {
      console.error(
        "Error:",
        err.response?.data?.message || "Xatolik yuz berdi."
      );
      setError(err.response?.data?.message || "Xatolik yuz berdi.");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white py-6 px-10 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold text-[#212121] mb-4">
          To‘lovni tasdiqlash
        </h2>
        <p className="text-[#585858] font-[300] mt-7 mb-5">
          To‘lov chekini yuklang
        </p>
        <div className="relative w-[580px] h-[142px] border border-[#585858] border-dashed rounded-xl flex items-center justify-center cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          {selectedFile ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Selected"
              className="w-full h-full object-cover"
            />
          ) : (
            <Image src={ChekImage} alt="chek" width={75} height={60} />
          )}
        </div>
        <div className="mt-[30px] grid grid-cols-2 gap-10">
          <button
            onClick={onClose}
            className="bg-transparent text-[#015EA8] border border-[#015EA8] px-12 py-2 rounded-lg"
          >
            Inkor qilish
          </button>
          <button
            onClick={handleConfirmPayment}
            className="bg-[#015EA8] text-white px-12 py-2 rounded-lg"
            disabled={loading}
          >
            {loading ? "Yuklanmoqda..." : "To’lovni tasdiqlash"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalChek;
