import type { Metadata } from "next";
import "./globals.css";
import { FileContextProvider } from "./components/file_upload_component/context/file_list_context";
import { Meta as META } from "../static/meta";

export const metadata: Metadata = {
  metadataBase: META.METADATABASE,
  title: META.TITLE,
  description: META.DESCRIPTION,
  keywords: META.KEY_WORDS,
  authors: { name: "Jae Min" },
  robots: META.ROBOTS,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
      </head>
      <FileContextProvider>
        <body className="bg-[#E9E0E0] w-screen h-screen flex flex-col justify-center items-center overscroll-y-none">
          {children}
        </body>
      </FileContextProvider>
    </html>
  );
}
