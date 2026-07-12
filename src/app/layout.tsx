import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartProvider from "@/context/CartContext";

export const metadata: Metadata = {
  title: "FoodRush — Order Food Online | Fast Delivery",
  description:
    "Order from the best restaurants near you. Fast delivery, amazing food, unbeatable prices. FoodRush brings your favorite meals right to your door.",
  keywords: "food delivery, online food order, restaurants, fast delivery",
  openGraph: {
    title: "FoodRush — Order Food Online",
    description: "Fast food delivery from top restaurants near you",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
