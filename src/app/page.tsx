"use client";
import { useEffect } from "react";
import { FileUploadComponent } from "./components/file_upload_component/file_upload_component";
import dynamic from "next/dynamic";

const AdSense = dynamic(() => import("./components/ad_sense"), { ssr: false });

export default function Home() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div className="w-screen grid grid-rows-3-[1fr_3fr_1fr] lg:grid-cols-[1fr_3fr_1fr] grid-cols-1 h-screen gap-2">
      <div className="row-start-1 lg:col-start-2 col-start-1 p-1">
        <AdSense ad_slot="8151973360" />
      </div>
      <div className="lg:row-start-2 lg:col-start-1 lg:block hidden">
        {/* 좌측 광고 */}
      </div>
      <div className="row-start-2 lg:col-start-2border lg:col-span-1 col-span-2  flex justify-center items-center">
        <FileUploadComponent />
      </div>
      <div className="lg:row-start-2 lg:col-start-3 row-start-3 col-start-2 lg:block hidden">
        {/* 우측 광고 */}
      </div>
      <div className="row-start-3 lg:col-start-2 col-start-1 p-1">
        <AdSense ad_slot="5004099684" />
      </div>
    </div>
  );

  // return (

  //   <div className="flex flex-col justify-center items-center h-full w-full">
  //     <FileUploadComponent />
  //   </div>
  // );
}
