"use client";
import React, { useState } from "react";
import rasmYuklash from "@/assets/images/rasmyuklash.svg";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";

const Page = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [link, setLink] = useState(""); // State for the link input

  const handleImageChange = (event, setImage) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (setImage) => {
    setImage(null);
  };

  const handleSave = () => {
    // Handle the save functionality here
    console.log("Saved link:", link);
  };

  return (
    <div className="flex flex-col space-y-10 mt-10">
      <div className="flex space-x-10 mx-auto">
        {/* Banner 1 Section */}
        <div className="flex flex-col w-[396px]">
          <h2 className="text-black text-sm mb-5 text-center">
            Banner 1 o'lcham 1400x300 px
          </h2>
          <ImageUploadSection
            image={image1}
            onChange={(e) => handleImageChange(e, setImage1)}
            onRemove={() => removeImage(setImage1)}
            label="Banner 1"
          />
          <div className="mt-5">
            <input
              type="text"
              placeholder="Linkni yuklang"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full h-[44px] px-3 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        {/* Banner 2 Section */}
        <div className="flex flex-col w-[396px]">
          <h2 className="text-black text-sm mb-5 text-center">
            Banner 2 o'lcham 460x750 px
          </h2>
          <ImageUploadSection
            image={image2}
            onChange={(e) => handleImageChange(e, setImage2)}
            onRemove={() => removeImage(setImage2)}
            label="Banner 2"
          />
          <div className="mt-5">
            <input
              type="text"
              placeholder="Linkni yuklang"
              value={link}
              onChange={(e) => setLink(e.target.value)}
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
    <div className="relative flex flex-col items-center">
      <div className="w-[150px] h-[150px] overflow-hidden border border-dashed border-[#015EA8] flex flex-col justify-center items-center rounded-[10px] relative">
        {image ? (
          <div className="relative w-[150px] h-[150px]">
            <img
              className="w-full h-full object-cover"
              src={image}
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
