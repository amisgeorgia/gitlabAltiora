import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/providers/AuthProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ToastProvider } from "@/providers/ToastProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";

const manrope = localFont({
  src: "../../public/fonts/Manrope-VariableFont_wght.ttf",
  variable: "--font-manrope",
  display: "swap",
  preload: true,
});

const baiJamjuree = localFont({
  src: "../../public/fonts/BaiJamjuree-SemiBold.ttf",
  variable: "--font-bai-jamjuree",
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B1F4D",
};

export const metadata: Metadata = {
  title: "ALTIORA CONNECT",
  description:
    "Plateforme de conseil, de formation et de solutions numériques.",
  robots: "index, follow",
  alternates: {
    canonical: "https://altiora-connect.fr",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${manrope.variable} ${baiJamjuree.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <QueryProvider>
          <AuthProvider>
            <ThemeProvider>
              <LanguageProvider>
                <ToastProvider>{children}</ToastProvider>
              </LanguageProvider>
            </ThemeProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}