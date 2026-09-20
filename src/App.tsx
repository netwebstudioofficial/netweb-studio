import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { TelegramButton } from "./components/TelegramButton";
import { ScrollToTop } from "./components/ScrollToTop";
import { ScrollProgressBar } from "./components/ScrollProgressBar";
import { RouteSeoHandler } from "./components/RouteSeoHandler";

import { HomePage } from "./pages/HomePage";
import { ServicesPage } from "./pages/ServicesPage";
import { SolutionsPage } from "./pages/SolutionsPage";
import { WorkPage } from "./pages/WorkPage";
import { ProcessPage } from "./pages/ProcessPage";
import { PricingPage } from "./pages/PricingPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { AuditPage } from "./pages/AuditPage";

export default function App() {
  return (
    <Router>
      <RouteSeoHandler />
      <ScrollToTop />
      <ScrollProgressBar />
      <div className="min-h-screen flex flex-col bg-[#080A08] text-[#F5F7F2] selection:bg-[#A3FF12] selection:text-[#080A08] font-['Manrope',sans-serif]">
        {/* Persistent Sticky Navbar */}
        <Navbar />

        {/* Dynamic Route Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/process" element={<ProcessPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/audit" element={<AuditPage />} />
            {/* Catch-all fallback */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        {/* Global Floating Direct Telegram trigger */}
        <TelegramButton />

        {/* Standard Brand Studio Footer */}
        <Footer />
      </div>
    </Router>
  );
}
