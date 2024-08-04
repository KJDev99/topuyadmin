"use client";
import { usePathname } from "next/navigation";
import MenuLeft from "@/components/MenuLeft";
import TopProfil from "@/components/TopProfil";

const ClientLayout = ({ children }) => {
  const pathname = usePathname();

  // Regular expression to check if the pathname contains a number
  const containsNumber = /\d+/;

  // Determine if MenuLeft and TopProfil should be shown
  const showMenuAndProfile =
    !pathname.startsWith("/login") && !containsNumber.test(pathname);

  return (
    <div className="container">
      <div className="flex justify-between w-full">
        {showMenuAndProfile && (
          <div className="w-1/4">
            <MenuLeft />
          </div>
        )}
        <div
          className={`p-10 min-h-screen ${
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
