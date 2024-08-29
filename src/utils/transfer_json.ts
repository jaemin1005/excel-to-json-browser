import { FILE_EXTENSION } from "@/static/file_extension";
import init, { all_excel_to_json, csv_to_json } from "./wasm/excel_to_json";
import { saveAs } from "file-saver";
import JSZip from "jszip";

export async function transferJSON(
  fileName: [string, string],
  byteArray: Uint8Array
) {
  await init();
  const zip = new JSZip();

  if (fileName[1] === FILE_EXTENSION.XLSX)
    all_excel_to_json(byteArray, true).forEach((obj, idx) =>
      zip.file(`${fileName[0]}_${idx}.json`, JSON.stringify(obj, null, 2))
    );
  else {
    zip.file(
      `${fileName[0]}.json`,
      JSON.stringify(csv_to_json(byteArray), null, 2)
    );
  }

  zip.generateAsync({ type: "blob" }).then(function (content) {
    // 6. 파일을 다운로드합니다.
    saveAs(content, `${fileName[0]}.zip`);
  });
}
