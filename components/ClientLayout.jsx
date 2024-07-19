"use client";
import { usePathname } from "next/navigation";
import MenuLeft from "@/components/MenuLeft";
import TopProfil from "@/components/TopProfil";

const ClientLayout = ({ children }) => {
  const pathname = usePathname();

  const showMenuAndProfile = !pathname.startsWith("/detail");

  return (
    <div className="container">
      <div className="flex justify-between w-full">
        {showMenuAndProfile && (
          <div className="w-1/4">
            <MenuLeft />
          </div>
        )}
        <div
          className={` p-10 min-h-screen ${
            showMenuAndProfile ? "w-3/4 bg-white" : "w-full bg-transparent"
          }`}
        >
          {showMenuAndProfile && <TopProfil />}
          {children}
        </div>
      </div>
    </div>
  );
};

export default ClientLayout;
