"use client";
import { Toaster } from "react-hot-toast";

import { SessionProvider } from "next-auth/react";

import Navbar from "@components/Navbar";

import LoginModal from "@components/modals/LoginModal";
import RegisterModal from "@components/modals/RegisterModal";

import { Poppins } from "next/font/google";

import "@styles/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "300", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export default function RootLayout({ children, ...props }) {
  return (
    <SessionProvider session={props.session}>
      <html
        lang="en"
        className={`${poppins.variable} bg-twitter-100 text-neutral-300`}
      >
        <body className="flex font-poppins flex-col scrollbar-none overflow-y-auto max-w-[120rem] mx-auto px-8">
          {/* Modals */}
          <LoginModal />
          <RegisterModal />

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
