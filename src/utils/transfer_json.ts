import init, { all_excel_to_json } from "./wasm/excel_to_json";
import { saveAs } from 'file-saver';
import JSZip from "jszip";

export async function transferJSON(fileName: string, byteArray: Uint8Array) {
  await init();
  const jsonObjs = all_excel_to_json(byteArray, true);

  const zip = new JSZip();

  jsonObjs.forEach((obj, idx) =>
    zip.file(`${fileName}_${idx}.json`, JSON.stringify(obj, null, 2))
  );

  zip.generateAsync({ type: "blob" })
  .then(function(content) {
    // 6. 파일을 다운로드합니다.
    saveAs(content, `${fileName}.zip`);
  });
}
