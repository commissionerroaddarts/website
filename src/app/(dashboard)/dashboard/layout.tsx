import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Preloader from "@/components/global/Preloader";
import { generateMetadata } from "@/utils/metaData";
import AdminDashboardLayout from "@/components/dashboard/layout";
import Providers from "@/app/providers";

export const metadata = generateMetadata({
  title: "Road Darts - Admin Dashboard",
  description: "Play and enjoy Road Darts with friends!",
  url: "/",
  image: "/images/og-image.png",
});

export default function RootDashboardLayout({
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
            <AdminDashboardLayout>
              {modal}
              {children}
            </AdminDashboardLayout>
          </Providers>
        </Preloader>
      </body>
    </html>
  );
}
