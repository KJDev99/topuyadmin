"use client";
import { useEffect, useState } from "react";
import DetailPageImg from "./DetailPageImg";
import AddInfos from "./AddInfos";
import act from "@/assets/images/act.svg";
import noact from "@/assets/images/noact.svg";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import api from "@/lib/api";
import { format, parseISO } from "date-fns";
import Cookies from "js-cookie";
import ModalStatus from "./ModalStatus";

const formatDate = (dateString) => {
  const date = parseISO(dateString);
  return format(date, "dd.MM.yyyy");
};

const DetailElon = () => {
  const [adDetail, setAdDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState(null);
  const pathname = usePathname();
  const router = useRouter();
  const [adId, , status] = pathname.split("/").pop().split("&");
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchAdDetail = async () => {
      try {
        const response = await api.get(`/api/v1/root/ads/${adId}/detail`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAdDetail(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdDetail();
  }, [adId, token]);

  const handleActionClick = (type) => {
    setActionType(type);
    setIsModalOpen(true);
  };

  const handleConfirmAction = async () => {
    try {
      const newStatus = actionType === "activate" ? "ACTIVE" : "REJECTED";
      await api.put(
        `/api/v1/root/ads/${adId}/detail`,
        {
          id: adId,
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Refetch data or update state as needed
      const response = await api.get(`/api/v1/root/ads/${adId}/detail`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      router.push("/elonlar");
      setAdDetail(response.data);
    } catch (err) {
      setError(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!adDetail) return <p>No data found</p>;

  const infos = [
    { text1: "Turarjoy turi:", text2: adDetail.accommodation_type },
    { text1: "Qurilish turi:", text2: adDetail.construction_type },
    { text1: "Xonalar soni:", text2: adDetail.room },
    { text1: "Qavat:", text2: adDetail.floor },
    { text1: "Binoning qavatlari:", text2: adDetail.total_floor },
    { text1: "Uy qurilgan yil:", text2: adDetail.house_built_year },
    { text1: "Yashash maydoni:", text2: adDetail.living_area },
    { text1: "Umumiy maydoni:", text2: adDetail.total_area },
    { text1: "Mebel:", text2: adDetail.have_furniture ? "Bor" : "Yo'q" },
    {
      text1: "Vositachilik haqi:",
      text2: adDetail.have_broker_fee ? "Bor" : "Yo'q",
    },
  ];

  return (
    <div className="container">
      <div className="grid grid-cols-3">
        <div className="flex flex-col col-span-2 p-[30px]">
          <div className="flex justify-between">
            <h1 className="font-qora font-normal text-2xl">{adDetail.title}</h1>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h2 className="text-logoKok text-2xl font-normal mb-[10px]">
                {adDetail.price} {adDetail.currency}
              </h2>
              <div className="flex items-center">
                <p className="text-sm font-medium mr-5 text-kulrang">
                  Joyalangan sana:
                </p>
                <p className="text-qora font-medium">
                  {formatDate(adDetail.created)}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <DetailPageImg imgs={adDetail.media} />
          </div>
          <div className="flex flex-col">
            <h2 className="mt-[30px] mb-[10px] text-qora font-normal">
              Qo’shimcha ma’lumotlar
            </h2>
            {infos.map((info, index) => (
              <AddInfos
                key={index}
                bg={index % 2 === 0}
                text1={info.text1}
                text2={info.text2}
              />
            ))}
          </div>
          <div className="flex flex-col">
            <h2 className="mt-[20px] mb-[10px] text-qora font-normal">
              Tavsif
            </h2>
            <p className="p-5 bg-white rounded-[10px] text-qora text-lg">
              {adDetail.description}
            </p>
          </div>
        </div>
        <div className="col-span-1 flex flex-col mt-[30px]">
          <div className="bg-white shadow-lg p-[30px] rounded-[10px] mb-5">
            <h2 className="text mb-5 font-normal text-qora">
              Ushbu e'lonni boshqa statusga o'tkazish
            </h2>
            <div className="flex items-center gap-5">
              {status !== "ACTIVE" && (
                <button
                  onClick={() => handleActionClick("activate")}
                  className="rounded-[10px] w-full h-[50px] bg-[#00D73C] flex items-center justify-center"
                >
                  <Image src={act} alt="act" className="h-4 w-4" />
                  <p className="text-white ml-3">Aktiv qilish</p>
                </button>
              )}
              {status !== "REJECTED" && (
                <button
                  onClick={() => handleActionClick("deactivate")}
                  className="rounded-[10px] w-full h-[50px] bg-[#FF0000] flex items-center justify-center"
                >
                  <Image src={noact} alt="act" className="h-4 w-4" />
                  <p className="text-white ml-3">Noaktiv qilish</p>
                </button>
              )}
            </div>
          </div>
          <div className="bg-white shadow-lg p-[30px] rounded-[10px]">
            <h2 className="text-xl mb-5 font-normal text-qora">
              E’lon muallifi
            </h2>
            <div className="flex items-center">
              {adDetail.user.photo && (
                <img
                  src={adDetail.user.photo}
                  alt="img"
                  className="rounded-full h-[75px] w-[75px]"
                />
              )}
              <p className="text-2xl ml-[30px] font-normal text-qora">
                {adDetail.user.full_name || "Noma'lum"}
              </p>
            </div>
            <div className="h-10 w-full border rounded-[10px] mt-[30px] mb-[15px] flex items-center justify-center">
              <a
                href={`tel:${adDetail.phone}`}
                className="text-xl font-normal text-qora"
              >
                {adDetail.phone}
              </a>
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="mt-[30px] mb-5 text-qora font-normal">Manzil</h2>
            <div className="flex">
              <p className="border border-yozish rounded-[10px] bg-white py-[6px] px-5 text-qora text-lg font-medium mr-5">
                {adDetail.region.name_uz}
              </p>
              <p className="border border-yozish rounded-[10px] bg-white py-[6px] px-5 text-qora text-lg font-medium">
                {adDetail.district.name_uz}
              </p>
            </div>
            <p className="text-qora text-lg font-medium mt-[10px] mb-5">
              {adDetail.address}
            </p>
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?q=${adDetail.latitude},${adDetail.longitude}&key=YOUR_API_KEY`}
              width="full"
              height="280"
              loading="lazy"
              className="rounded-[10px]"
            ></iframe>
          </div>
        </div>
      </div>
      <ModalStatus
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmAction}
        actionType={actionType}
      />
    </div>
  );
};

export default DetailElon;
