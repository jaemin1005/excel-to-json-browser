export const getFileNameWithoutExtension = (fileName: string) => {
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex === -1) return fileName; // 확장자가 없는 경우
    return fileName.substring(0, lastDotIndex); // 마지막 점까지 잘라내기
}