import soni from "@/assets/images/soni.svg";
import elonlaract from "@/assets/images/elonlaract.svg";
import topga from "@/assets/images/topga.svg";
import activ from "@/assets/images/activ.svg";
import bekor from "@/assets/images/bekor.svg";
import Image from "next/image";

const Statistika = () => {
  return (
    <div className="grid grid-cols-5 gap-6">
      <div className="flex flex-col p-4 rounded-[10px] bg-[#F8FCFF]">
        <h2 className="text-qora h-[70px] text">Foydalanuvchilar soni:</h2>
        <div className="flex justify-between">
          <Image src={soni} alt="soni" />
          <p className="text-2xl text-logoKok font-semibold">120</p>
        </div>
      </div>
      <div className="flex flex-col p-4 rounded-[10px] bg-[#F8FCFF]">
        <h2 className="text-qora h-[70px] text">Jami e'lonlar:</h2>
        <div className="flex justify-between">
          <Image src={elonlaract} alt="soni" />
          <p className="text-2xl text-logoKok font-semibold">280</p>
        </div>
      </div>
      <div className="flex flex-col p-4 rounded-[10px] bg-[#F8FCFF]">
        <h2 className="text-qora h-[70px] text">Topga chiqarilgan:</h2>
        <div className="flex justify-between">
          <Image src={topga} alt="soni" />
          <p className="text-2xl text-logoKok font-semibold">53</p>
        </div>
      </div>
      <div className="flex flex-col p-4 rounded-[10px] bg-[#F8FCFF]">
        <h2 className="text-qora h-[70px] text">Aktiv e'lonlar:</h2>
        <div className="flex justify-between">
          <Image src={activ} alt="soni" />
          <p className="text-2xl text-logoKok font-semibold">240</p>
        </div>
      </div>
      <div className="flex flex-col p-4 rounded-[10px] bg-[#F8FCFF]">
        <h2 className="text-qora h-[70px] text">Bekor qilingan elonlar:</h2>
        <div className="flex justify-between">
          <Image src={bekor} alt="soni" />
          <p className="text-2xl text-logoKok font-semibold">14</p>
        </div>
      </div>
    </div>
  );
};

export default Statistika;
