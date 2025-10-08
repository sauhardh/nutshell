import type { Metadata } from "next";
import "./globals.css";
import { Geist_Mono, Roboto } from "next/font/google";
import ThemeProvider from "@/components/theme-provider";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistMono.variable} ${roboto.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
