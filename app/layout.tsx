import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: " Quiz App",
  description: "This is a full stack quiz app developed by Japheth Nyarandi using Next js and Firebase.It has two sections ,admin and user sections.The admin can register ,login,add quizes and view results of the users who had done the quiz.Users can register,login,view and do the quizes.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <footer className="flex flex-col p-1 w-full  bg-green-600 font-serif sm:items-center sm:justify-center  sm:p-2 sm:font-extrabold ">
      <h1>{`@ ${new Date().getFullYear()} FULL STACK QUIZ APP designed and build by Japheth Nyarandi`}</h1>
        </footer>
        </body>
    </html>
  );
}
