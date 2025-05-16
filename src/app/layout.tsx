import Providers from "./providers";
import Layout from "@/components/layout";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import Preloader from "@/components/global/Preloader";
import { generateMetadata } from "@/utils/metaData";

export const metadata = generateMetadata({
  title: "Road Darts - The Ultimate Game",
  description: "Play and enjoy Road Darts with friends!",
  url: "/",
  image: "/images/og-image.png",
});

export default function RootLayout({
  children,
  modal,
}: {
  readonly children: React.ReactNode;
  readonly modal: React.ReactNode;
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
            <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
            <Layout>
              {modal}
              {children}
            </Layout>
          </Providers>
        </Preloader>
      </body>
    </html>
  );
}
