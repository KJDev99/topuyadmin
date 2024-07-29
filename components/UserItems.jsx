import Image from "next/image";
import React from "react";

const UserItems = ({ bg, num, text1, image, text2 }) => {
  return (
    <div
      className={`w-full h-[60px] flex items-center ${
        bg && "bg-background"
      }`}
    >
      <div className="w-2/3 flex items-center h-full pl-[30px]">
        <p className=" text-qora text-lg font-medium bg-transparent ">{num}</p>
        <Image src={image} alt="text1" className="ml-20 mr-10" />
        <p className="  text-qora text-lg font-medium bg-transparent ">
          {text1}
        </p>
      </div>
      <p className="w-1/3 flex justify-center items-center text-qora text-lg font-medium bg-transparent h-[60px]">
        {text2}
      </p>
    </div>
  );
};

export default UserItems;
