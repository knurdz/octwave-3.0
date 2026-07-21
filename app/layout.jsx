import { Space_Grotesk, Inter, Playfair_Display } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import {
  ogImage,
  organization,
  siteDescription,
  siteKeywords,
  siteName,
  siteUrl,
  webPartner,
} from "@/lib/seo";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

const pageTitle =
  "OctWave 3.0 | IEEE IAS Student Branch Chapter · University of Moratuwa";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: pageTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: siteKeywords,
  applicationName: siteName,
  authors: [
    { name: organization.name, url: organization.url },
    { name: webPartner.name, url: webPartner.url },
  ],
  creator: organization.name,
  publisher: organization.name,
  category: "education",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_LK",
    url: siteUrl,
    siteName,
    title: pageTitle,
    description: siteDescription,
    images: [
      {
        url: ogImage.url,
        width: ogImage.width,
        height: ogImage.height,
        alt: ogImage.alt,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: siteDescription,
    images: [ogImage.url],
  },
  icons: {
    icon: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${playfair.variable}`}>
      <body className={spaceGrotesk.className}>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
