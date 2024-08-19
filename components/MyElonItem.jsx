"use client";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { CiLocationOn } from "react-icons/ci";
const formatDate = (dateString) => {
  const date = parseISO(dateString);
  return format(date, "dd.MM.yyyy");
};

const MyElonItem = ({
  is_top,
  media,
  ad_type,
  title,
  region,
  district,
  created,
  price,
  currency,
  id,
  status,
}) => {
  return (
    <Link href={`/${id}&${status}`}>
      <div className="flex bg-white rounded-[20px] overflow-hidden shadow-lg relative ">
        <div className="relative w-[268px] flex-shrink-0">
          {is_top && (
            <div className="absolute left-0 top-0 bg-sariq rounded-tl-[20px] rounded-tr-[0px] rounded-br-[15px] rounded-bl-[0px] color-white flex item items-center justify-center font-medium text-white h-[30px] w-[78px]">
              Top
            </div>
          )}
          <img
            src={media}
            alt="image"
            className="!w-[268px] h-[190px] object-cover"
          />

          <div
            className={`absolute h-5 w-20 flex items-center justify-center text-white text-xs capitalize bottom-2 right-2 rounded-full max-md:w-[48px] max-md:h-4 max-md:text-[10px] ${
              ad_type == "RENT" ? "bg-ijara" : "bg-ochYashil"
            }`}
          >
            {ad_type == "RENT" ? "Ijara" : "Sotiladi"}
          </div>
        </div>
        <div className="py-5 px-5 flex flex-col flex-grow">
          <h3 className="line-clamp-2 text-qora text-lg font-semibold flex-grow">
            {title}
          </h3>
          <div className="flex mt-2 mb-[10px]">
            <CiLocationOn className="text-lg" />
            <p className="text-sm text-kulrang ml-2 ">
              {region?.name_uz} {district?.name_uz}
            </p>
          </div>
          <div className="flex justify-between mb-[10px] items-center">
            <p className="text-sm text-kulrang">{formatDate(created)}</p>
            <p className="text-xl text-qora font-semibold">
              {Number(price).toLocaleString()} {currency}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MyElonItem;
