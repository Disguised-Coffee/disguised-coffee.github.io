import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Disguised_Coffee's Website",
  description: "This is website of Disguised_Coffee",
  icons: {
    icon: 'dcLogo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-y-hidden">
      <head>
        <link
          href="https://fonts.googleapis.com/css?family=Lato:light,lightitalic,bold,bolditalic,italic%7CIBM+Plex+Sans:bold,bolditalic,italic,400%7CBree+Serif%7CUbuntu:bold,bolditalic,italic%7CTS+Block%7CUbuntu+Mono"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
