import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html className="dark">
      <Head />
      <body className="dark:bg-[#121212] dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
