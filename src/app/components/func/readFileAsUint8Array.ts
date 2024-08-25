/**
 * * 파일을 읽어 Uint8 배열로 변환한다.
 * @param file : 파일
 * @param onProgress : 파일 읽기 진행도에 따른 콜백함수
 * @returns 
 */
const readFileAsUint8Array = (file: File, onProgress: (progress: number) => void ): Promise<Uint8Array> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      //* 읽기 완료 Uint8Array로 변환
      reader.onload = () => {
        //* readAsArrayBuffer 메서드로 파일을 읽으니 타입 단언
        resolve(new Uint8Array(reader.result as ArrayBuffer));
      };

      reader.onprogress = (event: ProgressEvent<FileReader>) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          onProgress(progress);
        }
      };

      reader.onerror = () => reject(new Error("File reading failed"));
      reader.readAsArrayBuffer(file);
    });
  };