"use client";

import Providers from "./providers";
import Layout from "@/components/layout";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/store";

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <PersistGate loading={null} persistor={persistor}>
            <ToastContainer />
          </PersistGate>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
