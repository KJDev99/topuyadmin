import React from "react";

const TolovItems = ({ bg, chek, created, users, amount }) => {
  // Sanani va vaqtni formatlash uchun yordamchi funksiyalar
  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);

    const formattedDate = date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "."); // '/' belgilarini '.' bilan almashtirish

    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    return { date: formattedDate, time: formattedTime };
  };

  // `formatDate` funksiyasini chaqirib, sanani va vaqtni ajratish
  const { date, time } = formatDate(created);

  // Rasmni yuklab olish uchun funksiyani yaratish
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = chek;
    link.download = "image.png"; // Yaxshi rasm nomini tanlang
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className={`w-full h-[60px] flex items-center ${bg && "bg-background"}`}
    >
      <p className="w-1/4 flex justify-center items-center text-[#747474] text-sm font-[300] bg-transparent h-[40px]">
        {amount}
      </p>
      <p className="w-1/4 flex justify-center items-center text-[#747474] text-sm font-[300] bg-transparent h-[40px]">
        {users}
      </p>
      <p className="w-1/4 flex justify-center items-center text-[#747474] text-sm font-[300] bg-transparent h-[40px]">
        {/* `chek` rasmni yuklab olish uchun tugma */}
        <button
          onClick={handleDownload}
          className="bg-white border border-[#015EA8] cursor-pointer text-[#015EA8] rounded-[6px] w-[84px] h-6"
        >
          Ko’rish
          <img src={chek} alt="Download" className="w-0 h-0" />
        </button>
      </p>

      <p className="w-1/4 flex justify-center items-center text-[#747474] text-sm font-[300] bg-transparent h-[40px]">
        <span>{date}</span>
        <span className="text-[10px] ml-5">{time}</span>
      </p>
    </div>
  );
};

export default TolovItems;
