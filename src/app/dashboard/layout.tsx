import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Preloader from "@/components/global/Preloader";
import { generateMetadata } from "@/utils/metaData";
import AdminDashboardLayout from "@/components/dashboard/(main)/layout";
import Providers from "@/app/providers";

export const metadata = generateMetadata({
  title: "Road Darts - Admin Dashboard",
  description: "Play and enjoy Road Darts with friends!",
  url: "/",
  image: "/images/og-image.png",
});

export default function RootDashboardLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
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
        <AdminDashboardLayout>{children}</AdminDashboardLayout>
      </Providers>
    </Preloader>
  );
}
