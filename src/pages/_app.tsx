import type { AppProps } from "next/app";
import Head from "next/head";
import { trpc } from "@/utils/trpc";

import "@/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Kronos</title>
        <meta name="description" content="Daily schedule of UCC courses" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default trpc.withTRPC(MyApp);
