import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import React from "react";
import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "@/app/theme-provider";
import Footer from "@/components/layout/Footer";
import { SidebarProvider } from "@/components/ui/sidebar";
const font = Mulish({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Sulta AI",
    description: "Create Your Own AI Agents",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className="dark">
            <body className={font.className}>
            
                    <ThemeProvider>

                        {children}

                    </ThemeProvider>
       
            </body>
        </html>
    );
}
