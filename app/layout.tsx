import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import { DisableDraftMode } from "@/components/DisableDraftMode";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Padho - Learn Smarter, Achieve More",
  description: "Padho is a modern LMS platform offering high-quality educational content with interactive lessons and progress tracking.",
  openGraph: {
    title: "Padho - Learn Smarter, Achieve More",
    description: "Join Padho to access high-quality educational content, track progress, and enhance your learning experience.",
    url: "https://padho.vercel.app",
    siteName: "Padho",
    images: [
      {
        url: "https://padho.vercel.app/og-image.png", // Replace with actual image
        width: 1200,
        height: 630,
        alt: "Padho - LMS Platform",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@your_twitter_handle", // Add your Twitter handle if applicable
    title: "Padho - Learn Smarter, Achieve More",
    description: "Join Padho for interactive learning and progress tracking.",
    images: ["https://padho.vercel.app/og-image.png"], // Replace with actual image
  },
  metadataBase: new URL("https://padho.vercel.app"),
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {(await draftMode()).isEnabled && (
          <>
            <DisableDraftMode />
            <VisualEditing />
          </>
        )}

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
