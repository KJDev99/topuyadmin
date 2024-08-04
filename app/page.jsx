"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Statistika from "@/components/Statistika";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // Cookies-da token mavjudligini tekshiring
    const token = Cookies.get("token");

    // Agar token mavjud bo'lmasa, foydalanuvchini /login sahifasiga yo'naltiring
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  // Agar token mavjud bo'lsa, Statistika komponentini ko'rsating
  return <Statistika />;
};

export default Home;
