import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Doriane Zoko — Psychologue clinicienne",
  description:
    "Consultations psychologiques individuelles en visioconférence avec Doriane Zoko, psychologue clinicienne : approche intégrative à dominante TCC et dimension interculturelle.",
  openGraph: {
    title: "Doriane Zoko — Psychologue clinicienne",
    description:
      "Des séances individuelles en visio, flexibles et sans jugement, pour un soutien ponctuel ou un accompagnement dans la durée.",
    type: "website",
    locale: "fr_FR",
  },
};

export const viewport: Viewport = { themeColor: "#f7f5f1" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${geistSans.variable} antialiased`}>
      <body className="min-h-dvh overflow-x-clip">
        <Header />
        {children}
      </body>
    </html>
  );
}
