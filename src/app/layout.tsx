import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "../context/AppContext";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { ExpoDemoBanner } from "../components/layout/ExpoDemoBanner";

export const metadata: Metadata = {
  title: "AgroSight | AI-Based Crop Disease Identification & Treatment Guidance",
  description:
    "International university & exhibition platform for real-time computer vision foliar crop pathology identification, treatment guidance, and regional agricultural epidemiology.",
  keywords: [
    "Crop Disease Detection",
    "Computer Vision",
    "Deep Learning",
    "Smart Agriculture",
    "FastAPI",
    "EfficientNet",
    "Pakistan Agriculture",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen flex flex-col bg-[#f8faf8] dark:bg-[#06110c] text-zinc-900 dark:text-zinc-100 selection:bg-emerald-500 selection:text-white">
        <AppProvider>
          <ExpoDemoBanner />
          <Navbar />
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}

