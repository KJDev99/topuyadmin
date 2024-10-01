"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import api from "@/lib/api";
import HamkorItems from "@/components/HamkorItem";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HamkorPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [limit, setLimit] = useState(10); // Limit per page
  const [offset, setOffset] = useState(0); // Offset for pagination
  const [totalUsers, setTotalUsers] = useState(0); // Total number of users
  const [nextPageUrl, setNextPageUrl] = useState(null); // URL for next page
  const [previousPageUrl, setPreviousPageUrl] = useState(null); // URL for previous page

  const fetchUsers = async (page = 1) => {
    const token = Cookies.get("token");
    const newOffset = (page - 1) * limit; // Calculate offset based on page

    try {
      const response = await api.get(
        `/api/v1/root/referral/list?limit=${limit}&offset=${newOffset}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(response.data.results);
      setTotalUsers(response.data.count); // Total count of users
      setNextPageUrl(response.data.next); // Next page URL
      setPreviousPageUrl(response.data.previous); // Previous page URL
      setError(null); // Clear any previous error
    } catch (error) {
      setError("Failed to fetch users.");
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage); // Fetch users when currentPage changes
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (previousPageUrl) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
    }
  };

  const handleNextPage = () => {
    if (nextPageUrl) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
    }
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(totalUsers / limit); // Calculate total pages
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex justify-center mt-[50px] mb-5">
        <button
          onClick={handlePreviousPage}
          disabled={!previousPageUrl}
          className={`h-10 bg-white rounded-md w-10 mr-2 flex justify-center items-center ${
            !previousPageUrl ? "bg-kulrangOch" : ""
          }`}
        >
          <FaChevronLeft />
        </button>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            className={`w-10 h-10 rounded-md font-semibold mx-1 ${
              pageNumber === currentPage
                ? "bg-ochKok text-logoKok"
                : "text-qora bg-white"
            }`}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={!nextPageUrl}
          className={`h-10 bg-white rounded-md w-10 ml-2 flex justify-center items-center ${
            !nextPageUrl ? "bg-kulrangOch" : ""
          }`}
        >
          <FaChevronRight />
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      <div className="mt-[30px] w-full flex">
        <div className="w-2/6 flex justify-center items-center text-qora text-[16px] font-medium bg-ochKok h-[50px]">
          Ism familya
        </div>
        <div className="w-1/6 flex justify-center items-center text-qora text-[16px] font-medium bg-ochKok h-[50px]">
          Telefon raqami
        </div>
        <div className="w-1/6 flex justify-center items-center text-qora text-[16px] font-medium bg-ochKok h-[50px]">
          Referallar
        </div>
        <div className="w-1/6 flex justify-center items-center text-qora text-[16px] font-medium bg-ochKok h-[50px]">
          Ish haqi
        </div>
        <div className="w-1/6 flex justify-center items-center text-qora text-[16px] font-medium bg-ochKok h-[50px]">
          Profil
        </div>
      </div>
      <div className="flex flex-col">
        {users.length > 0 ? (
          users.map((user, id) => (
            <HamkorItems
              keyId={user.user.id}
              num={id + 1}
              bg={id % 2 === 1}
              text1={user.user.full_name}
              text2={user.user.phone}
              amount={user.amount}
              users={user.users}
              userId={user.user.id}
            />
          ))
        ) : (
          <p className="text-center mt-4">No users found.</p>
        )}
      </div>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {renderPagination()} {/* Render pagination buttons */}
    </div>
  );
};

export default HamkorPage;
