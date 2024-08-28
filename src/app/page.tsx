"use client";
import { FileUploadComponent } from "./components/file_upload_component/file_upload_component";

export default function Home() {
  return (
    <div className="w-screen grid grid-rows-3-[1fr_3fr_1fr] lg:grid-cols-[1fr_3fr_1fr] grid-cols-2 h-screen gap-2">
      <div className="row-start-1 lg:col-start-2 col-start-1">
        {/* 상단 광고 */}
        </div>
      <div className="lg:row-start-2 lg:col-start-1 row-start-1 col-start-2">
        {/* 좌측 광고 */}
      </div>
      <div className="row-start-2 lg:col-start-2border lg:col-span-1 col-span-2 p-4 flex justify-center items-center">
        <FileUploadComponent />
      </div>
      <div className="lg:row-start-2 lg:col-start-3 row-start-3 col-start-2">
        {/* 우측 광고 */}
      </div>
      <div className="row-start-3 lg:col-start-2 col-start-1">
        {/* 하단 광고 */}
        </div>
    </div>
  );

  // return (

  //   <div className="flex flex-col justify-center items-center h-full w-full">
  //     <FileUploadComponent />
  //   </div>
  // );
}
