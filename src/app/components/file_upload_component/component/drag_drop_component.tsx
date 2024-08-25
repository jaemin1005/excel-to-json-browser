import Image from "next/image";

export function DragDropComponent() {
  return (
    <div className="flex flex-col items-center pt-[17px] h-[227px] justify-center">
      <div className="w-[120px] h-[120px] rounded-full bg-[#4AB2D3] relative flex justify-center items-center">
        <Image src="/cloud_upload.svg" width={80} height={80} alt="" objectFit="contain"/>
      </div>
      <h1 className="font-inter text-[40px] font-extrabold text-zinc-600">Drag & Drop</h1>
      <h3 className="font-inter text-[20px] line-[24px] font-extrabold text-[#B4B0B0]">Only Xlsx up to 10mb</h3>
    </div>
  );
}