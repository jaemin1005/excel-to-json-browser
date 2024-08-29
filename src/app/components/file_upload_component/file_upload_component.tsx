import { DragDropComponent } from "./component/drag_drop_component";
import { useState, DragEventHandler, MouseEventHandler } from "react";
import { checkFileExtensions } from "../func/checKFileExtension";
import { useFileList } from "./context/file_list_context";
import { FileComponent } from "./component/file_component";
import { getFileNameAndExtension } from "../func/getFileNameAndExtension";
import { AddFileComponent } from "./component/add_file_component";
import { transferJSON } from "../../../utils/transfer_json";

export function FileUploadComponent() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingFiles, setLoadingFiles] = useState<boolean[]>([]);
  const checkFile = checkFileExtensions("xlsx", "csv");

  const { fileDatas, removeFileData } = useFileList();

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

    addFileFunc(ev.dataTransfer.files);
  };

  const addFileFunc = (uploadFiles: FileList) => {
    const filterFiles = Array.from(uploadFiles).filter((file) =>
      checkFile(file.name)
    );

    //* 필터된 결과가 길이가 0이면 빠져나온다.
    if (filterFiles.length === 0) return;

    setFiles((prev) => [...prev, ...filterFiles]);
    setLoadingFiles((prev) => [
      ...prev,
      ...new Array(filterFiles.length).fill(false),
    ]);
  };

  const removeFile = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
    setLoadingFiles((prev) => prev.filter((_, i) => i !== idx));
    removeFileData(idx);
  };

  const fileTransper: MouseEventHandler<HTMLDivElement> = async (ev) => {
    if (files.length === 0 || loading === true) return;

    //* 중간에 제거되는 인덱스에 따라 값이 늘어난다.
    let removeIdx = 0;

    setLoading(true);

    const promise = fileDatas.map((file, idx) => {
      setLoadingFiles((prev) => {
        const newLoadingFiles = [...prev];
        newLoadingFiles[idx] = true; // 파일 전송 시작 시 로딩 상태 설정
        return newLoadingFiles;
      });

      return new Promise<void>((res) => {
        transferJSON(getFileNameAndExtension(file.name), file.data);
        res();
      }).finally(() => {
        //* 제거되면 배열이 길이가 줄어듬으로 그만큼 removeIdx를 빼준다.
        removeFile(idx - removeIdx++);
      });

      // return fetch("/api/download", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/octet-stream",
      //   },
      //   body: file.data,
      // })
      //   .then(async (res) => {
      //     if (!res.ok) throw new Error("파일 다운로드 실패");

      //     //* Blob 객체로부터 URL 생성
      //     const blob = await res.blob();
      //     const url = window.URL.createObjectURL(blob);

      //     //* 임시 링크 생성 및 클릭하여 다운로드 트리거
      //     const a = document.createElement("a");
      //     a.href = url;
      //     a.download = `${getFileNameWithoutExtension(file.name)}.zip`;
      //     a.click();

      //     // Blob URL 해제
      //     window.URL.revokeObjectURL(url);
      //   })
      //   .finally(() => {
      //     //* 변환이 완료되면 파일과 로딩 상태를 동시에 제거
      //     removeFile(idx);
      //   });
    });

    await Promise.all([promise]);
    setLoading(false);
  };

  return (
    <div className="relative h-[443px] bg-white rounded-[20px] pt-[10px] px-[10px] shadow-lg shadow-gray-500 flex justify-center w-full">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        className="w-full h-[423px] border-dashed border-2 border-neutral-600 rounded-[20px] flex flex-col items-center"
      >
        <DragDropComponent />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-auto py-5 px-2">
          {files.length > 0 &&
            files.map((file, idx) => (
              <FileComponent
                key={idx}
                file={file}
                fileTransLoading={loadingFiles[idx]}
                onClick={() => {
                  removeFile(idx);
                }}
              />
            ))}
          <AddFileComponent func={addFileFunc} />
        </div>
      </div>
      <div
        onClick={fileTransper}
        className="hover:cursor-pointer absolute w-[226px] h-[65px] top-[92%] bg-[#4AB2D3] rounded-[30px] flex justify-center items-center hover:bg-[#31839e] shadow-lg shadow-slate-500"
      >
        <span className="select-none font-inter font-extrabold text-[20px] leading-[24px] text-white">
          Convert
        </span>
      </div>
    </div>
  );
}
