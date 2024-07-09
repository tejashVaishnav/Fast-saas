import { Navbar } from "@/components/layout/navbar";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { generateMetadata } from "@/lib/metadata";
 
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = generateMetadata({
  title: 'FastSaas: Everything you need to take-off soon as possible',
  description: 'Most straight forward Saas Boilerplate you will ever need.',
  openGraph: {
    type: 'website', // or any other valid OpenGraph type
    // ... other OpenGraph properties
  },
  canonical:'FastSaas: Everything you need to take-off soon as possible'
  // ... other metadata properties
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={cn("min-h-screen bg-background", inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar /> 
    
          {children}
          <Toaster  position="bottom-center" richColors/>
        </ThemeProvider>
      </body>
    </html>
  );
}
