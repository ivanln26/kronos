import { type AppType } from "next/app";
import Head from "next/head";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { trpc } from "@/utils/trpc";

import "@/styles/globals.css";

const App: AppType<{ session: Session | null }> = (
  { Component, pageProps: { session, ...pageProps } },
) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Kronos</title>
        <meta name="description" content="Daily schedule of UCC courses" />
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default trpc.withTRPC(App);
