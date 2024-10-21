// app/layout.tsx or your RootLayout file
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import PlausibleProvider from "next-plausible";
import "./globals.css";
import Sidebar from "../components/Sidebar"; // Import the sidebar

const montserrat = Montserrat({ subsets: ["latin"] });

let title = "AI Personal Tutor";
let description = "Learn faster with our open source AI personal tutor";
let url = "https://llamatutor.com/";
let ogimage = "https://llamatutor.together.ai/og-image.png";
let sitename = "llamatutor.com";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    images: [ogimage],
    title,
    description,
    url: url,
    siteName: sitename,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [ogimage],
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <PlausibleProvider domain="llamatutor.together.ai" />
      </head>
      <body
        className={`${montserrat.className} flex h-full flex-col justify-between text-gray-700 antialiased`}
      >
        {/* Main Layout with Sidebar */}
        <div className="flex h-full">
          <Sidebar />  {/* Sidebar is included here */}
          <main className="flex-grow ml-16 p-6 no-scrollbar">{children}</main>
        </div>
      </body>
    </html>
  );
}
