import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import React from "react";
import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "@/app/theme-provider";
import Footer from "@/components/layout/Footer";
import { SidebarProvider } from "@/components/ui/sidebar";
const font = Mulish({ subsets: ["latin"] });
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
    title: "Sulta AI - Your Personal AI Workforce Revolution",
    description: "Transform Your Productivity: Build Custom AI Agents in Minutes, No Coding Required",
    icons: {
        icon: "/vercel.svg",
    },
    openGraph: {
        images: [
            {
                url: 'https://www.sultatech.com/img/ai-thumb.jpg',
                width: 1200,
                height: 800,
                alt: 'Sulta AI - Custom AI Agents',
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        images: ['https://www.sultatech.com/img/ai-thumb.jpg'],
        description: "Unleash the Power of AI: Create Custom AI Agents That Work for You 24/7",
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
