import type { Metadata } from "next";
import "./globals.css";
import { LocaleProvider } from "@/context/LocaleContext";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";

export const metadata: Metadata = {
  title: "Greeny | แพลตฟอร์มบรรจุภัณฑ์และสินค้าเกษตรรักษ์โลก 100%",
  description:
    "ตลาดกลางพาณิชย์อิเล็กทรอนิกส์สำหรับบรรจุภัณฑ์ธรรมชาติย่อยสลายได้ ผักตบชวา ฟางข้าว เส้นใยเห็ด ขุยมะพร้าว ทั้งขายปลีกและขายส่งราคาส่งทั่วไทย",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className="bg-surface font-body text-on-surface min-h-screen flex flex-col">
        <LocaleProvider>
          <CartProvider>
            <Header />
            <main className="flex-1 pt-28 sm:pt-32 w-full">{children}</main>
            <CartDrawer />
            <Footer />
          </CartProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
