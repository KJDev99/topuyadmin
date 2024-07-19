"use client";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import LogoImage from "@/assets/images/logo.svg";
import Image from "next/image";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center ">
      <div className=" flex flex-col items-center justify-center w-[450px] !bg-white shadow-lg rounded-[20px]">
        <Image src={LogoImage} alt="image" className="mb-[30px] mt-[60px]" />
        <div className="flex flex-col w-full p-[30px]">
          <p className="mt-5 mb-2 ml-5 text-qora font-medium text-sm">
            Telefon raqamingiz
          </p>
          <input
            type="tel"
            placeholder="Telefon raqam"
            className="border-none outline-none px-5 py-3 rounded-[5px] bg-yozish text-qora"
          />
          <p className="mt-5 mb-2 ml-5 text-qora font-medium text-sm">Parol</p>
          <div className="relative w-full">
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Parol"
              className="border-none outline-none px-5 py-3 rounded-[5px] bg-yozish text-qora w-full"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              onClick={handleTogglePasswordVisibility}
            >
              {isPasswordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
          <button className="bg-main text-white h-[50px] mb-2  text-lg rounded-[5px] mt-5">
            Kirish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
