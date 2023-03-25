import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html className="dark" lang="es">
      <Head />
      <body className="dark:bg-neutral-10 dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
