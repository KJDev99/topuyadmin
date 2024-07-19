const AddInfos = ({ bg, text1, text2 }) => {
  return (
    <div
      className={`w-full h-10 rounded-[10px] px-[30px] flex items-center ${
        bg && "bg-white"
      }`}
    >
      <p className="w-[60%] text-lg text-kulrang">{text1}</p>
      <p className="w-[40%] text-xl text-qora">{text2}</p>
    </div>
  );
};

export default AddInfos;
