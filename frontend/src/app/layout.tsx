import type { Metadata } from "next";
import "./globals.css";
import { Geist_Mono, Roboto } from "next/font/google";
import ThemeProvider from "@/components/theme-provider";
import SessionWrapper from "@/components/SessionWrapper";
import Navbar from "@/components/Navbar";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500"],
  style: "normal",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Nutshell",
  description: "A developer cloud to build and deploy web application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en" suppressHydrationWarning={true}>
        <body
          suppressHydrationWarning
          className={`${geistMono.variable} ${roboto.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <header className="z-100">
              <Navbar />
            </header>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
