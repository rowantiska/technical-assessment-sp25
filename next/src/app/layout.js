import localFont from "next/font/local";
import "../globals.css";

const inter = localFont({
  src: "./fonts/inter.ttf",
  variable: "--font-inter",
  weight: "100 900",
});

export const metadata = {
  title: "Daily Song",
  description: "Talk about 3 new songs daily",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
