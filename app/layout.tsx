import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ThemeToggle from "@/components/ui/ThemeToggle";
import CircularText from "@/components/CircularText";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Khalil - Full Stack Developer",
  description: "Portfolio of Khalil - Full-stack engineer specializing in Next.js, React, Node.js, and TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased scrollbar-hide relative`}
      >
        <ThemeProvider>
          {children}
          <div className="lg:absolute lg:top-8 lg:right-8 z-50 hidden lg:block">
            <ThemeToggle />
          </div>
          {/* <div className="fixed bottom-6 right-6 z-40">
            <CircularText
              text="Khalil Bchir - Full Stack Dev - "
              onHover="speedUp"
              spinDuration={20}
              className="w-[130px] h-[130px] text-sm font-bold"
            />
          </div> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
