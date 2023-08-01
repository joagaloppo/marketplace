import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Nav from "@/components/nav";
import GoogleProvider from "@/components/google-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Marketplace - Home",
    description: "Welcome to the Marketplace",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
                />
            </head>
            <GoogleProvider>
                <body className={inter.className}>
                    <Nav />
                    {children}
                </body>
            </GoogleProvider>
        </html>
    );
}
