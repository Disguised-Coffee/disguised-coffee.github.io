import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Disguised_Coffee's Website",
  description: "gg, no re",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css?family=Lato:light,lightitalic,bold,bolditalic,italic%7CIBM+Plex+Sans:bold,bolditalic,italic,400%7CBree+Serif%7CUbuntu:bold,bolditalic,italic"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
