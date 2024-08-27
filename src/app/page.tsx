"use client";
import { FileUploadComponent } from "./components/file_upload_component/file_upload_component";


export default function Home() {
  return (
    <div className="flex flex-col">
      <FileUploadComponent />
    </div>
  );
}
