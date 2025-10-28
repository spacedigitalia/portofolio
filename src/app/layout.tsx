import { metadata, viewport } from "@/base/meta/Metadata";

import React, { Suspense } from "react";

export { metadata, viewport };

metadata.manifest = "/manifest.json";

import "@/base/styling/globals.css";

import { ThemeProvider } from "@/context/ThemaContext"

import { LoadingProvider } from "@/context/LoadingContext"

import LoadingOverlayWrapper, { RouteChangeLoadingOverlay } from "@/base/Loading/LoadingOverlayWrapper"

import { geistSans, geistMono } from "@/base/fonts/Fonts";

import Header from "@/components/layout/header/Header";

import { GoogleTagManager, GoogleTagManagerNoScript } from '@/base/analytics/GoogleTagManager'

import LenisProvider from '@/base/smooth-scroll/LenisProvider'

import Footer from "@/components/layout/footer/Footer"

import Overlay from "@/base/helper/Overlay";

import { AllSchemas } from "@/lib/Script";

import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <GoogleTagManager />
        <AllSchemas />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <GoogleTagManagerNoScript />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
          storageKey="theme"
        >
          <LenisProvider>
            <LoadingProvider>
              <Header />
              {children}
              <Footer />
              <LoadingOverlayWrapper />
              <Suspense fallback={null}>
                <RouteChangeLoadingOverlay />
              </Suspense>
              <Overlay />
            </LoadingProvider>
            <Toaster position="top-center" richColors />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
