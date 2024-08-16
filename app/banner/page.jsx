"use client";
import React, { useState } from "react";
import rasmYuklash from "@/assets/images/rasmyuklash.svg";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie"; // Ensure you've installed js-cookie
import api from "@/lib/api";

const Page = () => {
  const [image1, setImage1] = useState(null);
  const [image1ru, setImage1ru] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image2ru, setImage2ru] = useState(null);
  const [link1, setLink1] = useState(""); // State for the first link input
  const [link2, setLink2] = useState(""); // State for the second link input

  const handleImageChange = (event, setImage) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // Store the file directly
    }
  };

  const removeImage = (setImage) => {
    setImage(null);
  };

  const handleSave = async () => {
    const token = Cookies.get("token"); // Get the token from cookies
    if (!token) {
      console.error("No token found, please log in.");
      return;
    }

    const formData = new FormData();
    if (image1) formData.append("banner1_uz", image1);
    if (image1ru) formData.append("banner1_ru", image1ru);
    if (image2) formData.append("banner2_uz", image2);
    if (image2ru) formData.append("banner2_ru", image2ru);
    formData.append("url1", link1);
    formData.append("url2", link2);

    try {
      const response = await api.patch("/api/v1/banner/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Add the token to the headers
        },
      });

      console.log("Response data:", response.data);
    } catch (error) {
      console.error("Error while updating banner:", error);
    }
  };

  return (
    <div className="flex flex-col space-y-10 mt-10">
      <div className="flex space-x-10 mx-auto">
        {/* Banner 1 Section */}
        <div className="flex flex-col w-[396px]">
          <h2 className="text-black text-sm mb-5 text-center">
            Banner 1 o'lcham 1400x300 px
          </h2>
          <div className="flex justify-evenly">
            <ImageUploadSection
              image={image1}
              onChange={(e) => handleImageChange(e, setImage1)}
              onRemove={() => removeImage(setImage1)}
              label="Banner 1"
            />
            <ImageUploadSection
              image={image1ru}
              onChange={(e) => handleImageChange(e, setImage1ru)}
              onRemove={() => removeImage(setImage1ru)}
              label="Banner 1 ru"
            />
          </div>
          <div className="mt-5">
            <input
              type="text"
              placeholder="Linkni yuklang"
              value={link1}
              onChange={(e) => setLink1(e.target.value)}
              className="w-full h-[44px] px-3 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        {/* Banner 2 Section */}
        <div className="flex flex-col w-[396px]">
          <h2 className="text-black text-sm mb-5 text-center">
            Banner 2 o'lcham 460x750 px
          </h2>
          <div className="flex justify-evenly">
            <ImageUploadSection
              image={image2}
              onChange={(e) => handleImageChange(e, setImage2)}
              onRemove={() => removeImage(setImage2)}
              label="Banner 2"
            />
            <ImageUploadSection
              image={image2ru}
              onChange={(e) => handleImageChange(e, setImage2ru)}
              onRemove={() => removeImage(setImage2ru)}
              label="Banner 2 ru"
            />
          </div>
          <div className="mt-5">
            <input
              type="text"
              placeholder="Linkni yuklang"
              value={link2}
              onChange={(e) => setLink2(e.target.value)}
              className="w-full h-[44px] px-3 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
      <button
        onClick={handleSave}
        className="w-[396px] mx-auto mt-2 h-[44px] bg-logoKok text-white rounded-md"
      >
        Saqlash
      </button>
    </div>
  );
};

const ImageUploadSection = ({ image, onChange, onRemove, label }) => {
  return (
    <div className="relative flex flex-col items-center mt-5">
      <div className="w-[150px] h-[150px] overflow-hidden border border-dashed border-[#015EA8] flex flex-col justify-center items-center rounded-[10px] relative">
        {image ? (
          <div className="relative w-[150px] h-[150px]">
            <img
              className="w-full h-full object-cover"
              src={URL.createObjectURL(image)} // Display the image
              alt="user"
            />
            <button
              className="absolute top-2 right-2 text-red-500 bg-white rounded-full p-1 z-10"
              onClick={onRemove}
            >
              <FaTimes size={12} />
            </button>
          </div>
        ) : (
          <>
            <Image
              className="h-[28px] object-cover"
              src={rasmYuklash}
              alt="upload"
            />
            <div className="text-sm text-logoKok">{label}</div>
          </>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={onChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Page;
