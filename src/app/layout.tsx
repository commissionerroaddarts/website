import Providers from "@/app/providers";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Preloader from "@/components/global/Preloader";
import { generateMetadata } from "@/utils/metaData";
import Layout from "@/components/layout";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

export const metadata = generateMetadata({
  title: "Road Darts",
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
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/images/logos/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <title>Road Darts</title>

        {/* ✅ External GA script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HQ7L9CY3N3"
          strategy="afterInteractive"
        />

        {/* ✅ Inline GA config script */}
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HQ7L9CY3N3');
          `}
        </Script>
      </head>
      <body>
        <Preloader duration={3000}>
          <Providers>
            <SpeedInsights />
            <ToastContainer
              position="top-center"
              autoClose={1500}
              hideProgressBar={true}
              newestOnTop
              rtl={false}
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
