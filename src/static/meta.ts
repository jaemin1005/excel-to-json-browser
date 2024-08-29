const KEY_WORDS = ["XLSX", "JSON", "XLSX to JSON", "Free", "Fast", "Local", "CSV", "CSV to JSON"];
const DESCRIPTION =
  "Convert Excel files (xlsx, csv) to JSON quickly and securely with our client-side web application. Utilizing WebAssembly for fast processing, our tool ensures efficient conversion of large datasets without server-side data transmission or storage.";
const TITLE = "Fast JSON Converter";
const ROBOTS = "index, follow";
const CHARSET = "utf-8";
const ADDRESS = "https://fastexceltojson.com"

export const Meta = Object.freeze({
  TITLE: TITLE,
  KEY_WORDS: KEY_WORDS,
  DESCRIPTION: DESCRIPTION,
  AUTHOR: { name: "JAE MIN" },
  ROBOTS: ROBOTS,
  CHARSET: CHARSET,
  METADATABASE: new URL(ADDRESS),
});
