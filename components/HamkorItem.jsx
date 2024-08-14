import Link from "next/link";
import React from "react";

const HamkorItems = ({ keyId, bg, num, text1, text2, users, amount }) => {
  console.log(keyId, "key");
  return (
    <div
      className={`w-full h-[60px] flex items-center ${bg && "bg-background"}`}
    >
      <div className="w-2/6 flex items-center h-full pl-[30px]">
        <p className=" text-qora text-[16px] font-medium bg-transparent ">
          {num}
        </p>

        <p className="  text-qora text-[16px] font-medium bg-transparent ml-5">
          {text1}
        </p>
      </div>
      <p className="w-1/6 flex justify-center items-center text-qora text-[16px] font-medium bg-transparent h-[60px] ">
        {text2}
      </p>
      <p className="w-1/6 flex justify-center items-center text-qora text-[16px] font-medium bg-transparent h-[60px] ">
        {users}
      </p>
      <p className="w-1/6 flex justify-center items-center text-qora text-[16px] font-medium bg-transparent h-[60px] ">
        {amount}
      </p>
      <div className="w-1/6 flex justify-center items-center text-qora text-[16px] font-medium bg-transparent h-[60px] ">
        <Link href={`/hamkorlar/${keyId}`}>
          <button className="flex items-center px-4 py-2 text-[16px] font-medium text-white bg-main border-0 rounded-md">
            Ochish
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HamkorItems;
