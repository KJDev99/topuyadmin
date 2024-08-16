"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import MyElonItem from "./MyElonItem";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import api from "@/lib/api";

const itemsPerPage = 20;

const MyElon = () => {
  const [selectedDuration, setSelectedDuration] = useState("aktiv");
  const [currentPage, setCurrentPage] = useState(1);
  const [ads, setAds] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [previousPageUrl, setPreviousPageUrl] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query

  const token = Cookies.get("token"); // Tokenni cookies-dan olish

  const [status, setStatus] = useState();

  const [countData, setCountData] = useState(null);

  const fetchAds = async (url) => {
    try {
      const response = await api.get(url, {
        headers: {
          Authorization: `Bearer ${token}`, // Tokenni Authorization sarlavhasida yuborish
        },
      });
      const { results, next, previous, count } = response.data;
      setAds(results);
      setNextPageUrl(next);
      setPreviousPageUrl(previous);
      console.log(response.data);
      setTotalPages(Math.ceil(count / itemsPerPage));
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
  };
  const fetchAdCounts = async () => {
    try {
      const response = await api.get("/api/v1/root/count/ads", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCountData(response.data); // Store count data in state
      console.log("Count Data:", response.data); // Log count data to console
    } catch (error) {
      console.error("Error fetching ad counts:", error);
    }
  };

  useEffect(() => {
    let url = `/api/v1/root/ads/list?limit=${itemsPerPage}&offset=${
      (currentPage - 1) * itemsPerPage
    }`;

    if (searchQuery) {
      url += `&search=${encodeURIComponent(searchQuery)}`;
    }

    if (selectedDuration === "aktiv") {
      url += `&status=ACTIVE`;
      setStatus("ACTIVE");
    } else if (selectedDuration === "tasdiq") {
      url += `&status=WAITING`;
      setStatus("WAITING");
    } else if (selectedDuration === "noaktiv") {
      url += `&status=REJECTED`;
      setStatus("REJECTED");
    }

    fetchAds(url);
    fetchAdCounts();
  }, [currentPage, selectedDuration, searchQuery]);

  const handleNextPage = () => {
    if (nextPageUrl) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePreviousPage = () => {
    if (previousPageUrl) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    let startPage = 1;
    let endPage = 3;

    if (currentPage > 2) {
      startPage = currentPage - 1;
      endPage = currentPage + 2;
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = endPage - 3;
        if (startPage < 1) startPage = 1;
      }
    }

    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) pageNumbers.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }

    return (
      <div className="flex justify-center mt-[50px] mb-5">
        <button
          onClick={handlePreviousPage}
          disabled={!previousPageUrl}
          className={`h-10 bg-white rounded-md w-10 mr-2 flex justify-center items-center ${
            !previousPageUrl && "bg-kulrangOch"
          }`}
        >
          <FaChevronLeft />
        </button>
        {pageNumbers.map((pageNumber, index) => (
          <button
            key={index}
            onClick={() => {
              if (pageNumber !== "...") {
                handlePageClick(pageNumber);
              }
            }}
            className={`w-10 h-10 rounded-md font-semibold mx-1 ${
              pageNumber === currentPage
                ? "bg-ochKok text-logoKok"
                : "text-qora bg-white"
            }`}
            disabled={pageNumber === "..."}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={!nextPageUrl}
          className={`h-10 bg-white rounded-md w-10 ml-2 flex justify-center items-center ${
            !nextPageUrl && "bg-kulrangOch"
          }`}
        >
          <FaChevronRight />
        </button>
      </div>
    );
  };

  const handleDurationClick = (duration) => {
    setSelectedDuration(duration);
    setCurrentPage(1); // Change to the first page when duration changes
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page when search changes
  };

  return (
    <div className="bg-white px-5 pb-10 pt-[30px] rounded-[10px] flex flex-col">
      <div className="flex h-[50px] rounded-[10px] p-[5px] border border-kulrangOch bg-yozish mb-5">
        <input
          type="text"
          className="h-full border-none outline-none ml-[15px] w-full bg-transparent"
          placeholder="E'lon nomi bo'yicha qidirish"
          value={searchQuery} // Set the input value to the search query state
          onChange={handleSearchChange} // Update the search query on input change
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
          <p className="text-lg">Aktiv e’lonlar {countData?.active}</p>
        </div>
        <div
          className={`flex rounded-[10px] w-full text-center h-[44px] items-center justify-center cursor-pointer border text-xl font-medium ${
            selectedDuration === "tasdiq"
              ? " bg-ochKok text-logoKok border-logoKok"
              : "bg-transparent text-qora border-kulrangOch"
          }`}
          onClick={() => handleDurationClick("tasdiq")}
        >
          <p className="text-lg">Kutilayotgan e'lonlar {countData?.waiting}</p>
        </div>
        <div
          className={`flex rounded-[10px] w-full text-center h-[44px] items-center justify-center cursor-pointer border text-xl font-medium ${
            selectedDuration === "noaktiv"
              ? " bg-ochKok text-logoKok border-logoKok"
              : "bg-transparent text-qora border-kulrangOch"
          }`}
          onClick={() => handleDurationClick("noaktiv")}
        >
          <p className="text-lg">Noaktiv e'lonlar {countData?.rejected}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5">
        {ads.length > 0 ? (
          ads.map((ad) => <MyElonItem key={ad.id} {...ad} status={status} />)
        ) : (
          <p className="text-center">No ads available.</p>
        )}
      </div>
      {renderPagination()}
    </div>
  );
};

export default MyElon;
