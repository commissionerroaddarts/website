"use client";

import Providers from "./providers";
import Layout from "@/components/layout";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/store";
import Head from "next/head";
import Preloader from "@/components/global/Preloader";

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>Road Darts - The Ultimate Game</title>
        <meta
          name="description"
          content="Play and enjoy Road Darts with friends!"
        />
        <meta property="og:title" content="Road Darts" />
        <meta
          property="og:description"
          content="Compete and have fun in Road Darts."
        />
        <meta property="og:image" content="/images/og-image.png" />
      </Head>

      <body>
        <Preloader duration={3000}>
          <Providers>
            <PersistGate loading={null} persistor={persistor}>
              <ToastContainer />
            </PersistGate>
            <Layout>{children}</Layout>
          </Providers>
        </Preloader>
      </body>
    </html>
  );
}
