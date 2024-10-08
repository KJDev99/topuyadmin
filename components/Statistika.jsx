"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import soni from "@/assets/images/soni.svg";
import elonlaract from "@/assets/images/elonlaract.svg";
import topga from "@/assets/images/topga.svg";
import activ from "@/assets/images/activ.svg";
import bekor from "@/assets/images/bekor.svg";
import Image from "next/image";
import api from "@/lib/api";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Chart,
} from "chart.js";
import CalendarIcon from "@/assets/images/calendar.svg"; // Make sure to add this icon

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const Statistika = () => {
  const [data, setData] = useState({
    users: 0,
    total_ads: 0,
    top_ads: 0,
    active_ads: 0,
    rejected_ads: 0,
    line_chart: {},
  });
  const [summ, setSumm] = useState();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const fetchData = async (from = "", to = "") => {
    const token = Cookies.get("token");

    try {
      const response = await api.get(
        `/api/v1/root/analytics${
          from && to ? `?from_date=${from}&to_date=${to}` : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);
      setSumm(
        Object.values(response.data.line_chart).reduce(
          (acc, value) => acc + value,
          0
        )
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDateChange = async () => {
    if (fromDate && toDate) {
      await fetchData(fromDate, toDate);
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        border: false,
      },
      title: {
        display: true,
        text: "",
      },
    },
  };

  const lineChartData = {
    labels: [0, ...Object.keys(data.line_chart)],
    datasets: [
      {
        label: "",
        data: [0, ...Object.values(data.line_chart)],
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="relative">
      <div className="bg-[#F8FCFF] mb-[30px] flex items-center rounded-lg px-4">
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="outline-none mr-12 bg-transparent"
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="outline-none mr-12 bg-transparent"
        />
        <button onClick={handleDateChange} className="p-2 rounded">
          <Image
            src={CalendarIcon}
            alt="Calendar Icon"
            width={20}
            height={20}
          />
        </button>
      </div>
      <div className="grid grid-cols-5 gap-6">
        <div className="flex flex-col p-4 rounded-[10px] bg-[#F8FCFF]">
          <h2 className="text-qora h-[70px] text">Foydalanuvchilar soni:</h2>
          <div className="flex justify-between">
            <Image src={soni} alt="soni" />
            <p className="text-2xl text-logoKok font-semibold">{data.users}</p>
          </div>
        </div>
        <div className="flex flex-col p-4 rounded-[10px] bg-[#F8FCFF]">
          <h2 className="text-qora h-[70px] text">Jami e'lonlar:</h2>
          <div className="flex justify-between">
            <Image src={elonlaract} alt="elonlaract" />
            <p className="text-2xl text-logoKok font-semibold">
              {data.total_ads}
            </p>
          </div>
        </div>
        <div className="flex flex-col p-4 rounded-[10px] bg-[#F8FCFF]">
          <h2 className="text-qora h-[70px] text">Topga chiqarilgan:</h2>
          <div className="flex justify-between">
            <Image src={topga} alt="topga" />
            <p className="text-2xl text-logoKok font-semibold">
              {data.top_ads}
            </p>
          </div>
        </div>
        <div className="flex flex-col p-4 rounded-[10px] bg-[#F8FCFF]">
          <h2 className="text-qora h-[70px] text">Aktiv e'lonlar:</h2>
          <div className="flex justify-between">
            <Image src={activ} alt="activ" />
            <p className="text-2xl text-logoKok font-semibold">
              {data.active_ads}
            </p>
          </div>
        </div>
        <div className="flex flex-col p-4 rounded-[10px] bg-[#F8FCFF]">
          <h2 className="text-qora h-[70px] text">Bekor qilingan elonlar:</h2>
          <div className="flex justify-between">
            <Image src={bekor} alt="bekor" />
            <p className="text-2xl text-logoKok font-semibold">
              {data.rejected_ads}
            </p>
          </div>
        </div>
      </div>
      <h2 className="text-xl text-qora mt-[30px] mb-[10px]">
        Jami tushum: {summ}
      </h2>
      <div className="relative mt-6">
        <Line data={lineChartData} options={options} />
      </div>
    </div>
  );
};

export default Statistika;
