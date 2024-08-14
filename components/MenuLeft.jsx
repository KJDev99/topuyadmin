"use client";
import React, { useState } from "react";

import Link from "next/link";
import Image from "next/image";
import LogoImage from "@/assets/images/logo.svg";
import users from "@/assets/images/users.svg";
import usersact from "@/assets/images/usersact.svg";
import elonlar from "@/assets/images/elonlar.svg";
import elonlaract from "@/assets/images/elonlaract.svg";
import sozlamalar from "@/assets/images/sozlamalar.svg";
import sozlamalaract from "@/assets/images/sozlamalaract.svg";
import statistika from "@/assets/images/statistika.svg";
import statistikaact from "@/assets/images/statistikaact.svg";
import { usePathname } from "next/navigation";

const MenuLeft = () => {
  const pathname = usePathname();
  const [selectedDuration, setSelectedDuration] = useState(pathname);
  const handleDurationClick = (duration) => {
    setSelectedDuration(duration);
  };

  return (
    <div className="flex flex-col mt-[30px] pr-10">
      <div className="w-full gap-5 flex flex-col mb-10">
        <Image
          src={LogoImage}
          alt="logo"
          className="mt-5 mb-[20px] mx-auto w-[80px]"
        />
        <Link href={"/"}>
          <div
            className={`flex rounded-[10px] px-[30px] py-2 cursor-pointer text-xl bg-white ${
              selectedDuration === "/"
                ? " bg-white text-logoKok shadow-lg"
                : "bg-white text-qora"
            }`}
            onClick={() => handleDurationClick("/")}
          >
            <Image
              src={selectedDuration === "/" ? statistikaact : statistika}
              alt="logo"
            />
            <p className="ml-4">Statistika</p>
          </div>
        </Link>
        <Link href={"/hamkorlar"}>
          <div
            className={`flex rounded-[10px] px-[30px] py-2 cursor-pointer text-xl ${
              selectedDuration === "hamkorlar"
                ? " bg-white text-logoKok shadow-lg"
                : "bg-white text-qora"
            }`}
            onClick={() => handleDurationClick("hamkorlar")}
          >
            <Image
              src={selectedDuration === "/hamkorlar" ? elonlaract : elonlar}
              alt="logo"
            />
            <p className="ml-4">Hamkorlar</p>
          </div>
        </Link>
        <Link href={"/elonlar"}>
          <div
            className={`flex rounded-[10px] px-[30px] py-2 cursor-pointer text-xl ${
              selectedDuration === "elonlar"
                ? " bg-white text-logoKok shadow-lg"
                : "bg-white text-qora"
            }`}
            onClick={() => handleDurationClick("elonlar")}
          >
            <Image
              src={selectedDuration === "/elonlar" ? elonlaract : elonlar}
              alt="logo"
            />
            <p className="ml-4">E’lonlar</p>
          </div>
        </Link>
        <Link href={"/users"}>
          <div
            className={`flex rounded-[10px] px-[30px] py-2 cursor-pointer text-xl ${
              selectedDuration === "users"
                ? " bg-white text-logoKok shadow-lg"
                : "bg-white text-qora"
            }`}
            onClick={() => handleDurationClick("users")}
          >
            <Image
              src={selectedDuration === "users" ? usersact : users}
              alt="logo"
            />
            <p className="ml-4">Foydalanuvchilar</p>
          </div>
        </Link>
        <Link href={"/profil"}>
          <div
            className={`flex rounded-[10px] px-[30px] py-2 cursor-pointer text-xl ${
              selectedDuration === "profil"
                ? " bg-white text-logoKok shadow-lg"
                : "bg-white text-qora"
            }`}
            onClick={() => handleDurationClick("profil")}
          >
            <Image
              src={selectedDuration === "profil" ? sozlamalaract : sozlamalar}
              alt="logo"
            />
            <p className="ml-4">Sozlamalar</p>
          </div>
        </Link>
        <Link href={"/banner"}>
          <div
            className={`flex rounded-[10px] px-[30px] py-2 cursor-pointer text-xl bg-white ${
              selectedDuration === "/banner"
                ? " bg-white text-logoKok shadow-lg"
                : "bg-white text-qora"
            }`}
            onClick={() => handleDurationClick("/banner")}
          >
            <Image
              src={selectedDuration === "/banner" ? statistikaact : statistika}
              alt="logo"
            />
            <p className="ml-4">Bannerlar</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MenuLeft;
