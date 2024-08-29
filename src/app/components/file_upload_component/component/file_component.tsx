import { CircularProgress } from "@nextui-org/progress";
import { useEffect, useState } from "react";
import { useFileList } from "../context/file_list_context";
import { readFileAsUint8Array } from "../../func/readFileAsUint8Array";
import { Tooltip } from "@nextui-org/tooltip";
import Image from "next/image";
import { Spinner } from "@nextui-org/spinner";
import { getFileNameAndExtension } from "../../func/getFileNameAndExtension";
import { FILE_EXTENSION } from "@/static/file_extension";
import { IMAGE_PATH } from "@/static/image_path";


export function FileComponent({
  file,
  fileTransLoading,
  onClick,
}: {
  file: File;
  fileTransLoading: boolean;
  onClick: () => void;
}) {
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const imagePath = getFileNameAndExtension(file.name)[1] === FILE_EXTENSION.XLSX ? IMAGE_PATH.xlsx : IMAGE_PATH.csv;

  const progressFunc = (progress: number) => {
    setProgress(progress);
  };

  const { addFileData } = useFileList();

  useEffect(() => {
    readFileAsUint8Array(file, progressFunc).then((res) => {
      addFileData({
        name: file.name,
        data: res,
        size: file.size,
      });

      setLoading(false);
    });
  }, []);

  return (
    <Tooltip showArrow={true} content={file.name}>
      <div
        className="relative animate-zoom-in shadow-md w-[100px] h-[100px] shadow-slate-600 flex justify-center items-center"
        onClick={onClick}
      >
        {loading ? (
          <CircularProgress
            aria-label="Loading..."
            size="lg"
            value={progress}
            color="warning"
            showValueLabel={true}
          />
        ) : fileTransLoading ? (
          <Spinner size="lg" color="primary" />
        ) : (
          <>
            <Image
              className="relative"
              src={imagePath}
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </>
        )}
        <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-gradient-to-r bg-red-400 opacity-0 transition duration-300 ease-in-out hover:opacity-70 flex justify-center items-center">
          <div className="absolute w-[8px] h-[32px] bg-red-600 rounded rotate-45"></div>
          <div className="absolute w-[8px] h-[32px] bg-red-600 rounded -rotate-45"></div>
        </div>
      </div>
    </Tooltip>
  );
}
