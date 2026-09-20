import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import netwebStudioLogo from "../assets/netweb-studio-logo2.png";
import { Button } from "./Button";
import { siteConfig } from "../config/siteConfig";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const DEFAULT_NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navLinks = siteConfig?.NAV_LINKS || DEFAULT_NAV_LINKS;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#080A08]/90 backdrop-blur-md border-b border-white/[0.08] py-3.5 shadow-2xl"
            : "bg-transparent border-b border-transparent py-5"
        }`}
        id="main-navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="inline-flex items-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[#A3FF12] rounded transition-opacity duration-200 hover:opacity-90 shrink-0"
            aria-label="NETWEB STUDIO Home"
          >
            <img
              src={netwebStudioLogo}
              alt="NETWEB STUDIO"
              className="w-[145px] sm:w-[165px] md:w-[200px] h-auto object-contain block"
              loading="eager"
              decoding="async"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3 py-1.5 rounded-md transition-all duration-150 relative ${
                    isActive
                      ? "text-[#A3FF12] font-semibold"
                      : "text-[#A7ADA5] hover:text-[#F5F7F2] hover:bg-white/[0.04]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#A3FF12] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/audit"
              className="text-xs font-semibold px-3 py-1.5 rounded text-[#A3FF12] border border-[#A3FF12]/30 hover:border-[#A3FF12] hover:bg-[#A3FF12]/10 transition-all duration-200 inline-flex items-center gap-1.5"
              id="nav-audit-button"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Free Audit</span>
            </Link>

            <Button
              to="/contact"
              variant="primary"
              size="sm"
              withArrow
              id="nav-cta-button"
            >
              Start a Project
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/audit"
              className="text-xs font-medium px-2.5 py-1 rounded text-[#A3FF12] border border-[#A3FF12]/30 sm:hidden"
            >
              Audit
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded text-[#F5F7F2] hover:text-[#A3FF12] hover:bg-white/5 transition-colors focus:outline-none focus:ring-1 focus:ring-[#A3FF12]"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[60px] z-40 bg-[#080A08]/98 backdrop-blur-xl border-b border-white/10 lg:hidden flex flex-col p-6 overflow-y-auto"
            id="mobile-menu-drawer"
          >
            <div className="flex flex-col gap-2 py-4">
              <span className="text-[11px] font-bold text-[#A7ADA5] uppercase tracking-widest px-3 mb-1">
                Navigation
              </span>
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`text-lg font-semibold px-3 py-3 rounded-lg flex items-center justify-between transition-colors ${
                      isActive
                        ? "text-[#A3FF12] bg-[#141814] border border-[#A3FF12]/20"
                        : "text-[#F5F7F2] hover:bg-white/5"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-[#A3FF12]" />}
                  </Link>
                );
              })}
            </div>

            <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-3">
              <Button to="/audit" variant="lime-outline" size="md" className="w-full">
                <Sparkles className="w-4 h-4 mr-2" />
                Free Website Audit
              </Button>
              <Button to="/contact" variant="primary" size="md" withArrow className="w-full">
                Start a Project
              </Button>
              <div className="text-center pt-2">
                <span className="text-xs text-[#A7ADA5]">
                  {siteConfig.TAGLINE}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
