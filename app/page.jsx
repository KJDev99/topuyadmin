"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Statistika from "@/components/Statistika";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = true;
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [router]);
  return <Statistika />;
};

export default Home;
