const AddInfos = ({ bg, text1, text2 }) => {
  // Define a mapping object for translations
  const translationMap = {
    NEW: "Yangi qurilgan",
    OLD: "Ikkilamchi bozor",
    BRICK: "G'isht",
    MONOLITH: "Monolit",
    PANEL: "Panelli",
    BLOCK: "Blokli",
  };

  // Translate text2 based on the mapping
  const translatedText2 = translationMap[text2] || text2;

  return (
    <div
      className={`w-full h-10 rounded-[10px] px-[30px] max-md:px-[10px] flex items-center ${
        bg && "bg-white"
      }`}
    >
      <p className="w-[60%] text-lg max-md:text-sm text-kulrang">{text1}</p>
      <p className="w-[40%] text-xl max-md:text-sm text-qora">
        {translatedText2}
      </p>
    </div>
  );
};

export default AddInfos;
