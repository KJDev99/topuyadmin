import "@/assets/styles/globals.css";
import ClientLayout from "@/components/ClientLayout";
import NProgressComponent from "@/components/NProgress";

export const metadata = {
  title: "TOPUY Admin",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background">
        <NProgressComponent />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
