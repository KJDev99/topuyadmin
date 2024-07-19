import "@/assets/styles/globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata = {
  title: "TOPUY Admin",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
