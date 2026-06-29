import { Inter, Barlow, Lateef } from "next/font/google";
import "./globals.css";
import RootLayoutClient from "./layout-client";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-barlow",
});

const lateef = Lateef({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-lateef",
});

export const metadata = {
  title: "Zamalek SC | Official Website",
  description: "Official website of Zamalek Sporting Club - The Pride of Art and Engineering.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${barlow.variable} ${lateef.variable}`}>
      <body className="font-body antialiased pt-24 w-full">
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
