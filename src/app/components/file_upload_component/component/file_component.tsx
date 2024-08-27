import { CircularProgress } from "@nextui-org/progress";
import { useEffect, useState } from "react";
import { useFileList } from "../context/file_list_context";
import { readFileAsUint8Array } from "../../func/readFileAsUint8Array";
import { Tooltip } from "@nextui-org/tooltip";
import Image from "next/image";

export function FileComponent({ file, fileTransLoading }: { file: File, fileTransLoading: boolean }) {
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

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
      <div className="relative animate-zoom-in shadow-md w-[100px] h-[100px] shadow-slate-600">
        {loading ? (
          <CircularProgress
            aria-label="Loading..."
            size="lg"
            value={progress}
            color="warning"
            showValueLabel={true}
          />
        ) : (
          <>
            <Image
              className="relative"
              src={"/xlsx.svg"}
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </>
        )}
        <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 transition duration-300 ease-in-out hover:opacity-70"></div>
      </div>
    </Tooltip>
  );
}
