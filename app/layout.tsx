import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ExitModal } from "@/components/modals/ExitModal";
import { Toaster } from "@/components/ui/sonner";
import { HeartsModal } from "@/components/modals/HeartsModal";
import { PracticeModal } from "@/components/modals/PracticeModal";
import { siteConfig } from "@/config";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = siteConfig;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          logoImageUrl: "/favicon.ico",
        },
        variables: {
          colorPrimary: "#22C55E",
        },
      }}
    >
      <html lang="en">
        <body className={font.className}>
          <Toaster />
          <ExitModal />
          <HeartsModal />
          <PracticeModal />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
