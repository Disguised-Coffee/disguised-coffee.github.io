import { Inter } from "next/font/google";
import "./globals.css";
import GLOBALSFORMRWORLDWIDE from "./const";
import manifest from "./manifest";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Disguised_Coffee's Website",
  description: "gg, no re",
  icons: {
    icon: 'dcLogo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-y-hidden">
      <head>
        <link
          href="https://fonts.googleapis.com/css?family=Lato:light,lightitalic,bold,bolditalic,italic%7CIBM+Plex+Sans:bold,bolditalic,italic,400%7CBree+Serif%7CUbuntu:bold,bolditalic,italic%7CTS+Block"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" sizes="180x180" href={GLOBALSFORMRWORLDWIDE.faviconLoc + "/apple-touch-icon.png"} />
        <link rel="icon" type="image/png" sizes="32x32" href={GLOBALSFORMRWORLDWIDE.faviconLoc + "/favicon-32x32.png"} />
        <link rel="icon" type="image/png" sizes="16x16" href={GLOBALSFORMRWORLDWIDE.faviconLoc + "/favicon-16x16.png"} />
        {/* <link rel="manifest" href={manifest()} /> */ /*ok, how do I import this? */} 
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
