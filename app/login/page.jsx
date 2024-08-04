"use client";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import LogoImage from "@/assets/images/logo.svg";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation"; // Import useRouter hook
import api from "@/lib/api";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter(); // Initialize router

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/v1/root/login", {
        phone,
        password,
      });

      // Assuming the token is in the response data

      // Store token in cookies
      Cookies.set("token", response.data.access); // Token expires in 7 days

      // Redirect to the home page
      router.push("/"); // Redirect to home page
      console.log(response.data);
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center ">
      <div className="flex flex-col items-center justify-center w-[450px] !bg-white shadow-lg rounded-[20px]">
        <Image src={LogoImage} alt="image" className="mb-[30px] mt-[60px]" />
        <form className="flex flex-col w-full p-[30px]" onSubmit={handleSubmit}>
          <p className="mt-5 mb-2 ml-5 text-qora font-medium text-sm">
            Telefon raqamingiz
          </p>
          <input
            type="tel"
            placeholder="Telefon raqam"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border-none outline-none px-5 py-3 rounded-[5px] bg-yozish text-qora"
          />
          <p className="mt-5 mb-2 ml-5 text-qora font-medium text-sm">Parol</p>
          <div className="relative w-full">
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Parol"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            className="bg-main text-white h-[50px] mb-2 text-lg rounded-[5px] mt-5"
          >
            Kirish
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
