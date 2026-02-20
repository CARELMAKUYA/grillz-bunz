import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import MuiThemeProvider from "@/context/MuiThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
    title: "Grillz $ Bunz | Premium Food Delivery",
    description:
        "Flame Grilled Ribs, Wings, Burgers & Traditional Pap Dishes. Developed by Makuvion Technologies.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${outfit.variable} ${inter.variable}`}
                style={{ margin: 0 }}
            >
                <MuiThemeProvider>
                    <CartProvider>
                        <Navbar />
                        <CartDrawer />
                        <main>{children}</main>
                        <Footer />
                    </CartProvider>
                </MuiThemeProvider>
            </body>
        </html>
    );
}
