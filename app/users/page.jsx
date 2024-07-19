import UserItems from "@/components/UserItems";
import img from "@/assets/images/person.png";

const page = () => {
  return (
    <div className="flex flex-col">
      <div className="mt-[30px] w-full flex">
        <div className="w-2/3 flex justify-center items-center text-qora text-lg font-medium bg-ochKok h-[50px]">
          Foydalanuvchi ismi
        </div>
        <div className="w-1/3 flex justify-center items-center text-qora text-lg font-medium bg-ochKok h-[50px]">
          Telefon raqami
        </div>
      </div>
      <div className="flex flex-col">
        <UserItems
          num={1}
          bg={false}
          image={img}
          text1="Ibrohimjon"
          text2="+998 90 123 45 67"
        />
        <UserItems
          num={1}
          bg={true}
          image={img}
          text1="Ibrohimjon"
          text2="+998 90 123 45 67"
        />
        <UserItems
          num={1}
          bg={false}
          image={img}
          text1="Ibrohimjon"
          text2="+998 90 123 45 67"
        />
        <UserItems
          num={1}
          bg={true}
          image={img}
          text1="Ibrohimjon"
          text2="+998 90 123 45 67"
        />
        <UserItems
          num={1}
          bg={false}
          image={img}
          text1="Ibrohimjon"
          text2="+998 90 123 45 67"
        />
        <UserItems
          num={1}
          bg={true}
          image={img}
          text1="Ibrohimjon"
          text2="+998 90 123 45 67"
        />
        <UserItems
          num={1}
          bg={false}
          image={img}
          text1="Ibrohimjon"
          text2="+998 90 123 45 67"
        />
        <UserItems
          num={1}
          bg={true}
          image={img}
          text1="Ibrohimjon"
          text2="+998 90 123 45 67"
        />
        <UserItems
          num={1}
          bg={false}
          image={img}
          text1="Ibrohimjon"
          text2="+998 90 123 45 67"
        />
        <UserItems
          num={1}
          bg={true}
          image={img}
          text1="Ibrohimjon"
          text2="+998 90 123 45 67"
        />
      </div>
    </div>
  );
};

export default page;
