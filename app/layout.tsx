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
        icon: "/vercel.svg",
    },
    openGraph: {
        images: [
            {
                url: '/ai-hero.jpg',
                width: 1200,
                height: 800,
                alt: 'Sulta AI',
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        images: ['/ai-hero.jpg'],
        description: "Create Your Own AI Agents",
    }
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
