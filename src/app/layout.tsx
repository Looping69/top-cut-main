import "./globals.css";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Footer } from "@/components/Footer";
import dynamic from "next/dynamic";
import JobCounter from "@/components/JobCounter";
import { Sidebar } from "@/components/Sidebar";
import { twMerge } from "tailwind-merge";

// Dynamically import FloatingWhatsApp to avoid SSR issues
const FloatingWhatsAppClient = dynamic(
  () => import("@/components/FloatingWhatsApp").then(mod => ({ default: mod.FloatingWhatsApp })),
  { ssr: false }
);

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "Top Cut | Professional Outdoor & Garden Services in South Africa",
    template: "%s | Top Cut",
  },
  description: "Top Cut offers professional outdoor services, including tree care, greenhouse, wood sales, and specialized garden maintenance. Owner always on-site.",
  keywords: "tree felling, greenhouse, wood sales, garden services, pest control, weed control, South Africa",
  manifest: "/manifest.json",
  themeColor: "#166534",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={twMerge(
          inter.className,
          poppins.variable,
          inter.variable,
          "flex flex-col antialiased min-h-screen bg-[var(--background-light)]"
        )}
      >
        <Sidebar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        {/* Global floating WhatsApp button */}
        <FloatingWhatsAppClient />
        <JobCounter />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                  }, function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
