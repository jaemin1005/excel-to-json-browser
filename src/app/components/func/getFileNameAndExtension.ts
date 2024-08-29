/**
 * * 파일전체이름을, 파일 이름과 확장자이름을 분리하여 반환한다.
 * @param fileName : 파일 전체 이름
 * @returns [0: 파일 이름, 1: 확장자 이름]
 */
export const getFileNameAndExtension = (fileName: string): [string, string] => {
    const lastDotIndex = fileName.lastIndexOf('.');

    //* 확장자가 없는 경우
    if (lastDotIndex === -1) {
        return [fileName, ''];
    }

    const name = fileName.substring(0, lastDotIndex);
    const extension = fileName.substring(lastDotIndex + 1);

    return [name, extension];
}