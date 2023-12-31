import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
    title: "TechTreasury",
    description:
        "TechTreasury - A Modern Fullstack E-Commerce Marketplace for Digital Products",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="h-full">
            <body className={cn("relative h-full antialiased")}>
                <main className=" relative flex flex-col min-h-screen">
                    <Providers>
                        <Navbar />
                        <div className=" flex-grow flex-1">{children}</div>
                    </Providers>
                </main>
            </body>
        </html>
    );
}
