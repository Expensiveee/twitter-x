"use client";
import { Toaster } from "react-hot-toast";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

import { SessionProvider } from "next-auth/react";

import Navbar from "@components/Navbar";

import LoginModal from "@components/modals/LoginModal";
import RegisterModal from "@components/modals/RegisterModal";
import EditModal from "@components/modals/EditModal";

import { Poppins } from "next/font/google";

import "@styles/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "300", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

TimeAgo.addDefaultLocale(en);
export default function RootLayout({ children, ...props }) {
  return (
    <SessionProvider>
      <html
        lang="en"
        className={`${poppins.variable} bg-twitter-100 text-neutral-300`}
      >
        <body className="flex scroll-smooth font-poppins flex-col scrollbar-thin overflow-y-auto max-w-6xl mx-auto px-8">
          {/* Modals */}
          <LoginModal />
          <RegisterModal />
          <EditModal />

          {/* Toast */}
          <Toaster />

          {/* Navbar */}
          <Navbar />

          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
