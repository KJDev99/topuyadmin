"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import api from "@/lib/api";
import HamkorItems from "@/components/HamkorItem";

const HamkorPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    const token = Cookies.get("token"); // Tokenni cookies-dan olish

    try {
      const response = await api.get("/api/v1/root/referral/list", {
        headers: {
          Authorization: `Bearer ${token}`, // Tokenni Authorization sarlavhasida yuborish
        },
      });
      setUsers(response.data.results);
      console.log(response.data.results);
    } catch (error) {
      setError("Failed to fetch users.");
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
              bg={id % 2 == 1 ? true : false}
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
    </div>
  );
};

export default HamkorPage;
