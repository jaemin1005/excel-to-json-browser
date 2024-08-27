import { DragDropComponent } from "./component/drag_drop_component";
import { useState, DragEventHandler, MouseEventHandler } from "react";
import { checkFileExtensions } from "../func/checKFileExtension";
import { useFileList } from "./context/file_list_context";
import { FileComponent } from "./component/file_component";

const MAX_TOTAL_SIZE = 1 * 1024 * 1024;

export function FileUploadComponent() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingFiles, setLoadingFiles] = useState<boolean[]>([]);
  const checkFile = checkFileExtensions("xlsx");

  const { fileDatas, clearDatas } = useFileList();

  const handleDragOver: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
  };

  const handleDragEnter: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault(); // 브라우저 기본 동작 방지
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    if (ev.dataTransfer === null) return;

    //* 확장자 체크
    const droppedFiles = Array.from(ev.dataTransfer.files);
    droppedFiles.every((item) => checkFile(item.name));

    const currentTotalSize = files.reduce((acc, file) => acc + file.size, 0);
    const newTotalSize = droppedFiles.reduce((acc, file) => acc + file.size, 0);
    const totalSize = currentTotalSize + newTotalSize;

    //* 용량계산하여 1MB가 넘어갔을 때
    //TODO 에러처리가 필요하다
    if (totalSize > MAX_TOTAL_SIZE) {
      return;
    }

    setFiles((prev) => [...prev, ...droppedFiles]);
    setLoadingFiles((prev) => [
      ...prev,
      ...new Array(droppedFiles.length).fill(false),
    ]);
  };

  const removeFile = (idx: number) => {
    setFiles((prev) => {
      return prev.filter((_, index) => index !== idx);
    });
  };

  const fileTransper: MouseEventHandler<HTMLDivElement> = async (ev) => {
    if (files.length === 0 || loading === true) return;

    setLoading(true);

    const promise = fileDatas.map((file) =>
      fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
        },
        body: file.data,
      }).then(async (res) => {
        if (!res.ok) throw new Error("파일 다운로드 실패");

        // Blob 객체로부터 URL 생성
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);

        // 임시 링크 생성 및 클릭하여 다운로드 트리거
        const a = document.createElement("a");
        a.href = url;
        a.download = "data.zip"; // 다운로드할 파일 이름
        a.click();

        // Blob URL 해제
        window.URL.revokeObjectURL(url);
      })
    );

    await Promise.all([promise]);
    setLoading(true);
  };

  return (
    <div className="relative w-[808px] h-[443px] bg-white rounded-[20px] pt-[10px]">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        className="w-[788px] h-[423px] border-dashed border-2 border-neutral-600 rounded-[20px] mx-auto flex flex-col items-center"
      >
        <DragDropComponent />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-auto py-5 px-2">
          {files.length > 0 &&
            files.map((file, idx) => (
              <FileComponent
                key={idx}
                file={file}
                fileTransLoading={loadingFiles[idx]}
              />
            ))}
        </div>
      </div>
      <div
        onClick={fileTransper}
        className="absolute w-[226px] h-[65px] top-[92%] left-[36.01%] right-[36.01%] bg-[#4AB2D3] rounded-[30px] flex justify-center items-center"
      >
        <span className="font-inter font-extrabold text-[20px] leading-[24px] text-white">
          Transfer
        </span>
      </div>
    </div>
  );
}
