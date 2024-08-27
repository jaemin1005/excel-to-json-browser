import { useRef } from "react";

export function AddFileComponent({func} : {func: (file: FileList) => void}) {

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      func(files);

      //! 중복된 파일도 선택할 수 있게한다
      event.target.value = ''; 
    }
  };

  return (
    <div className="relative group border-1 border-dashed border-black animate-zoom-in shadow-md w-[100px] h-[100px] shadow-slate-600 flex justify-center items-center hover:bg-[#90d3e8]" onClick={handleButtonClick}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <div className="absolute w-[8px] h-[32px] bg-[#D9D9D9] rounded group-hover:bg-white"></div>
      <div className="absolute w-[8px] h-[32px] bg-[#D9D9D9] rounded rotate-90 group-hover:bg-white"></div>
    </div>
  );
}