import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Adult Marketing Intelligence Dashboard",
    description: "Next-gen insights for the adult industry",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.className} bg-[#121212] text-white overflow-x-hidden`}>
                <Sidebar />
                <Header />
                <main className="ml-64 p-6 min-h-[calc(100vh-64px)]">
                    {children}
                </main>
            </body>
        </html>
    );
}
