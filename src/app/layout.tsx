
import { Poppins } from "next/font/google";
import SiteHeader from "./(client-components)/(Header)/SiteHeader";
import ClientCommons from "./ClientCommons";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import Footer from "@/components/Footer";

import { description, title } from "@/lib/constants";
import { Metadata } from "next";
import WhatsApp from "./whatsApp/WhatsApp";

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  keywords: [
  "Sri Lanka travel",
  "Sri Lanka travel packages",
  "Sri Lanka tour operator",
  "Custom Sri Lanka tours",
  "Sri Lanka holiday packages",
  "Sri Lanka hotel booking",
  "Sri Lanka vehicle rental",
  "Sri Lanka tour planner",
  "Sri Lanka travel guide",
  "Sri Lanka adventure tours",
  "Sri Lanka cultural tours",
  "International travelers Sri Lanka",
  "Ceylon travel agency",
  "Book Sri Lanka tour"
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_BASE_URL!,
    title,
    description,
    siteName: title,
    images: [
      {
        url: "./opengraph-image.png",
        width: 1200,
        height: 630,
        alt: title,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["./opengraph-image.png"],
  },
  icons: {
    icon: "./favicon.ico",
  },
};

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <ClientCommons />
        <SiteHeader />

        {children}
        <WhatsApp/>
        <Footer />
      </body>
    </html>
  );
}
