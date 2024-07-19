"use client";
import Image from "next/image";
import Link from "next/link";
import { CiLocationOn } from "react-icons/ci";

const MyElonItem = ({ top, image, turi, name, address, data, price }) => {
  return (
    <Link href="/detail">
      <div className="flex bg-white rounded-[20px] overflow-hidden shadow-lg relative">
        <div className="relative">
          {top && (
            <div className="absolute left-0 top-0 bg-sariq rounded-tl-[20px] rounded-tr-[0px] rounded-br-[15px] rounded-bl-[0px] color-white flex item items-center justify-center font-medium text-white h-[30px] w-[78px]">
              Top
            </div>
          )}
          <Image src={image} alt={image} className="w-full" />

          <div
            className={`absolute h-5 w-20 flex items-center justify-center text-white text-xs capitalize bottom-2 right-2 rounded-full ${
              turi == "ijara" ? "bg-ijara" : "bg-ochYashil"
            }`}
          >
            {turi}
          </div>
        </div>
        <div className="py-5 px-5 flex flex-col flex-grow">
          <h3 className="line-clamp-2 text-qora text-xl font-semibold flex-grow">
            {name}
          </h3>
          <div className="flex mt-2 mb-[10px]">
            <CiLocationOn className="text-lg" />
            <p className="text-sm text-kulrang ml-2 ">{address}</p>
          </div>
          <div className="flex justify-between mb-[10px] items-center">
            <p className="text-sm text-kulrang">{data}</p>
            <p className="text-xl text-qora font-semibold">{price}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MyElonItem;
