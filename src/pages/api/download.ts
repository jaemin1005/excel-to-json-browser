import excel from "fast-excel-to-json";
import archiver from "archiver";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false, // bodyParser 비활성화
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // 데이터를 읽어오기 위해 Buffer 배열을 사용합니다.
      const chunks: Buffer[] = [];

      // 요청 본문을 청크로 수신합니다.
      req.on("data", (chunk) => {
        chunks.push(chunk);
      });

      // 데이터 수신이 완료되면 처리합니다.
      req.on("end", async () => {
        const data = Buffer.concat(chunks);
        const byteArray = new Uint8Array(data);

        const jsonArray = excel.all_excel_to_json(byteArray, true);
        
        // 압축 아카이브 생성
        const archive = archiver("zip", { zlib: { level: 9 } });

        // 클라이언트로 전송할 스트림
        res.setHeader("Content-Type", "application/zip");
        res.setHeader(
          "Content-Disposition",
          'attachment; filename="files.zip"'
        );
        archive.pipe(res);

        // JSON 배열의 각 요소를 별도의 파일로 추가
        jsonArray.forEach((item, index) => {
          archive.append(JSON.stringify(item), {
            name: `file${index + 1}.json`,
          });
        });

        await archive.finalize();
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to process the request" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
