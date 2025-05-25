import Providers from "@/app/providers";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Preloader from "@/components/global/Preloader";
import { generateMetadata } from "@/utils/metaData";
import Layout from "@/components/layout";

export const metadata = generateMetadata({
  title: "Road Darts - Admin Dashboard",
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
      <body>
        <Preloader duration={3000}>
          <Providers>
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
