"use client";
import React, { useState } from "react";
import MyElonItem from "./MyElonItem";
import MainImg from "@/assets/images/asosiyrasm.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const itemsPerPage = 20;
const MyElon = () => {
  const [selectedDuration, setSelectedDuration] = useState("aktiv");

  const [currentPage, setCurrentPage] = useState(1);

  const allElonlar = [
    {
      top: true,
      image: MainImg,
      activ: true,
      wait: false,
      finish: false,
      turi: "sotiladi",
      name: "Srochni sotiladi 1 xonali Yakkasaroy Rovd orqasida",
      address: "Toshkent, Yakksaroy",
      data: "17.05.2024",
      price: "1 250 000 000 so‘m ",
    },
    {
      image: MainImg,
      activ: false,
      wait: false,
      finish: true,
      turi: "sotiladi",
      name: "Srochni sotiladi 2 xonali Yakkasaroy Rovd orqasida",
      address: "Toshkent, Yakksaroy",
      data: "17.05.2024",
      price: "1 250 000 000 so‘m ",
    },
    {
      image: MainImg,
      activ: false,
      wait: true,
      finish: false,
      turi: "sotiladi",
      name: "Srochni sotiladi 3 xonali Yakkasaroy Rovd orqasida",
      address: "Toshkent, Yakksaroy",
      data: "17.05.2024",
      price: "1 250 000 000 so‘m ",
    },
    {
      top: true,
      image: MainImg,
      activ: true,
      wait: true,
      finish: false,
      turi: "sotiladi",
      name: "Srochni sotiladi 4 xonali Yakkasaroy Rovd orqasida",
      address: "Toshkent, Yakksaroy",
      data: "17.05.2024",
      price: "1 250 000 000 so‘m ",
    },
    {
      image: MainImg,
      activ: false,
      wait: true,
      finish: false,
      turi: "ijara",
      name: "Srochni sotiladi 5 xonali Yakkasaroy Rovd orqasida",
      address: "Toshkent, Yakksaroy",
      data: "17.05.2024",
      price: "1 250 000 000 so‘m ",
    },
    {
      top: true,
      image: MainImg,
      activ: true,
      wait: false,
      finish: false,
      turi: "sotiladi",
      name: "Srochni sotiladi 6 xonali Yakkasaroy Rovd orqasida",
      address: "Toshkent, Yakksaroy",
      data: "17.05.2024",
      price: "1 250 000 000 so‘m ",
    },
    {
      image: MainImg,
      activ: true,
      wait: false,
      finish: false,
      turi: "sotiladi",
      name: "Srochni sotiladi 7 xonali Yakkasaroy Rovd orqasida",
      address: "Toshkent, Yakksaroy",
      data: "17.05.2024",
      price: "1 250 000 000 so‘m ",
    },
  ];

  const totalPages = Math.ceil(allElonlar.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentElonlar = allElonlar.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const renderPagination = () => {
    if (allElonlar.length <= itemsPerPage) return null;

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex justify-center mt-[50px] mb-5">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`h-10 bg-white rounded-md w-10 mr-2 flex justify-center items-center ${
            currentPage === 1 && "bg-kulrangOch"
          }`}
        >
          <FaChevronLeft />
        </button>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            className={`w-10 h-10 rounded-md  font-semibold mx-1 ${
              currentPage === pageNumber
                ? "bg-ochKok text-logoKok"
                : "text-qora bg-white"
            }`}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`h-10 bg-white rounded-md w-10 ml-2 flex justify-center items-center ${
            currentPage === totalPages && "bg-kulrangOch"
          }`}
        >
          <FaChevronRight />
        </button>
      </div>
    );
  };

  const handleDurationClick = (duration) => {
    setSelectedDuration(duration);
  };
  return (
    <div className="bg-white px-5 pb-10 pt-[30px] rounded-[10px] flex flex-col">
      <div className="flex h-[50px] rounded-[10px] p-[5px] border border-kulrangOch bg-yozish mb-5">
        <input
          type="text"
          className="h-full border-none outline-none ml-[15px] w-full bg-transparent"
          placeholder="E'lon nomi bo'yicha qidirish"
        />
        <button className="ml-2 h-full text-lg font-medium border-none bg-logoKok text-white rounded-[10px] !w-[146px]">
          Qidirish
        </button>
      </div>
      <div className="flex justify-between mb-[30px] gap-7">
        <div
          className={`flex rounded-[10px] w-full text-center h-[44px] items-center justify-center cursor-pointer border text-xl font-medium ${
            selectedDuration === "aktiv"
              ? " bg-ochKok text-logoKok border-logoKok"
              : "bg-transparent text-qora border-kulrangOch"
          }`}
          onClick={() => handleDurationClick("aktiv")}
        >
          <p className="text-lg">Aktiv e’lonlar</p>
        </div>
        <div
          className={`flex rounded-[10px] w-full text-center h-[44px] items-center justify-center cursor-pointer border text-xl font-medium ${
            selectedDuration === "tasdiq"
              ? " bg-ochKok text-logoKok border-logoKok"
              : "bg-transparent text-qora border-kulrangOch"
          }`}
          onClick={() => handleDurationClick("tasdiq")}
        >
          <p className="text-lg">Kutilayotgan e'lonlar</p>
        </div>
        <div
          className={`flex rounded-[10px] w-full text-center h-[44px] items-center justify-center cursor-pointer border text-xl font-medium ${
            selectedDuration === "noaktiv"
              ? " bg-ochKok text-logoKok border-logoKok"
              : "bg-transparent text-qora border-kulrangOch"
          }`}
          onClick={() => handleDurationClick("noaktiv")}
        >
          <p className="text-lg">Noaktiv e'lonlar</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5">
        {currentElonlar.map((elon, index) => {
          if (selectedDuration === "aktiv") {
            return elon.activ && <MyElonItem key={index} {...elon} />;
          } else if (selectedDuration === "tasdiq") {
            return elon.wait && <MyElonItem key={index} {...elon} />;
          } else if (selectedDuration === "noaktiv") {
            return elon.finish && <MyElonItem key={index} {...elon} />;
          } else {
            return "Elon Mavjud emas";
          }
        })}
      </div>
      {renderPagination()}
    </div>
  );
};

export default MyElon;
