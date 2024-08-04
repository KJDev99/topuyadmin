"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import UserItems from "@/components/UserItems";
import img from "@/assets/images/person.png";
import api from "@/lib/api";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    const token = Cookies.get("token"); // Tokenni cookies-dan olish

    try {
      const response = await api.get("/api/v1/root/user/list", {
        headers: {
          Authorization: `Bearer ${token}`, // Tokenni Authorization sarlavhasida yuborish
        },
      });
      setUsers(response.data.results);
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
        <div className="w-2/3 flex justify-center items-center text-qora text-lg font-medium bg-ochKok h-[50px]">
          Foydalanuvchi ismi
        </div>
        <div className="w-1/3 flex justify-center items-center text-qora text-lg font-medium bg-ochKok h-[50px]">
          Telefon raqami
        </div>
      </div>
      <div className="flex flex-col">
        {users.length > 0 ? (
          users.map((user, id) => (
            <UserItems
              key={user.id}
              num={id + 1}
              bg={id % 2 == 1 ? true : false}
              image={user.photo || null} // Agar `photo` bo'lmasa, default rasm
              text1={user.full_name}
              text2="Telefon raqami mavjud emas" // API natijasi telefon raqamni ko'rsatmayapti
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

export default UsersPage;
