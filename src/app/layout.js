import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { Providers } from "@/components/Providers";

export const metadata = {
  title: "My Store",
  description: "E-commerce project with Next.js App Router",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#F1F5F1] antialiased">
        <Providers>
          <CartProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}