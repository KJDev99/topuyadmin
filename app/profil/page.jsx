import SarlavhaKiritish from "@/components/SarlavhaKiritish";
import React from "react";

const page = () => {
  return (
    <div className="bg-white p-[30px] rounded-[10px] mb-[30px] flex justify-between">
      <div className="w-3/5 flex flex-col">
        <h2 className="text-xl text-qora font-semibold">Profil ma’lumotlari</h2>
        <SarlavhaKiritish label="Ismingiz" type="text" />
        <SarlavhaKiritish label="Telefon raqam" type="number" />
        <h2 className="text-xl text-qora font-semibold mt-[30px]">
          Parolni yangilash
        </h2>
        <SarlavhaKiritish label="Parolni kiriting" type="number" />
        <SarlavhaKiritish label="Yangi parolni kiriting" type="number" />
        <button className="h-[44px] w-full border-none bg-main outline-none text-white text-lg rounded-[10px] mt-[30px]">
          Saqlash
        </button>
      </div>
      <div className="w-2/5 flex flex-col items-center">
        <div className="relative w-[223px] h-[223px] rounded-full mt-10 overflow-hidden ">
          <img
            className="w-full h-full object-cover"
            src="/images/person.png"
            alt="user"
          />
          <div className="absolute bottom-0 left-0 h-[58px] w-full bg-[#ffffffcd] text-lg text-logoKok flex items-center justify-center">
            O’zgartirish
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
