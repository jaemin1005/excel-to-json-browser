'use client'

import { createContext, ReactNode, useContext, useState } from "react";

interface FileData {
  name: string;
  data: Uint8Array;
  size: number;
}

/**
 * * Context Type 정의
 */
interface FileContextType {
  fileDatas: FileData[];
  addFileData: (fileData: FileData) => void;
  clearDatas: () => void;
}

export const FileContext = createContext<FileContextType | null>(null);

export const FileContextProvider = ({ children }: { children: ReactNode }) => {
    const [fileDatas, setFilesData] = useState<FileData[]>([])
  
    //* Context의 메소드를 구현, 들어온 아이템을 배열에 더해준다.
    const addFileData = (fileData: FileData) => {
        setFilesData((prev) => [...prev, fileData]);
    }

    const clearDatas = () => {
        setFilesData([]);
    }

    return (
      <FileContext.Provider value={{ fileDatas, addFileData, clearDatas }}>
        {children}
      </FileContext.Provider>
    );
  };
  
  /**
   * * Custom Hook 정의
   * @returns 
   */
  export const useFileList = () => {
    const context = useContext(FileContext);
    
    //* Provider내에서 사용하지 않았을 경우
    if(!context){
      throw new Error("must be used within an FileContextProvider");
    }
  
    return context
  }