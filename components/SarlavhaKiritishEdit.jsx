"use client";
import React from "react";

const SarlavhaKiritishEdit = ({
  label,
  placeholder,
  message,
  type,
  name,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col relative mr-[10px]">
      <h2 className="text-kulrang font-medium ml-[20px] mt-5 mb-2 text-sm max-md:mt-2">
        {label}
      </h2>
      <div className="flex flex-col">
        <input
          type={type || "text"}
          name={name}
          value={value}
          disabled={onChange?false:true}
          
          onChange={onChange}
          placeholder={placeholder}
          className="outline-none pr-4 overflow-hidden text-qora font-medium flex p-[10px] h-10 w-full rounded-[10px] justify-between items-center cursor-pointer border border-yozish"
        />
        {message && <p className="text-sm mt-1 ml-5 text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default SarlavhaKiritishEdit;
