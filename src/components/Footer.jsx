import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { siteConfig } from "../config/siteConfig";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#050605] border-t border-white/[0.08] text-[#F5F7F2] pt-16 pb-12 relative overflow-hidden" id="site-footer">
      {/* Subtle top lime glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#A3FF12]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/[0.08]">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <Logo variant="full" />
            <p className="text-sm text-[#A7ADA5] leading-relaxed max-w-sm pt-2">
              {siteConfig.DESCRIPTION}
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#101310] border border-[#A3FF12]/20 text-[#A3FF12] text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A3FF12] animate-ping" />
                ACCEPTING SELECT NEW CLIENTS FOR Q3/Q4
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Studio
            </h3>
            <ul className="space-y-2 text-sm text-[#A7ADA5]">
              <li><Link to="/" className="hover:text-[#A3FF12] transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#A3FF12] transition-colors">About Us</Link></li>
              <li><a href="/#work" className="hover:text-[#A3FF12] transition-colors">Selected Work</a></li>
              <li><Link to="/solutions" className="hover:text-[#A3FF12] transition-colors">Business Solutions</Link></li>
              <li><Link to="/audit" className="hover:text-[#A3FF12] transition-colors">Free Website Audit</Link></li>
              <li><Link to="/contact" className="hover:text-[#A3FF12] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Services
            </h3>
            <ul className="space-y-2 text-sm text-[#A7ADA5]">
              <li><Link to="/services" className="hover:text-[#A3FF12] transition-colors">Web Design & Development</Link></li>
              <li><Link to="/services" className="hover:text-[#A3FF12] transition-colors">E-Commerce Platforms</Link></li>
              <li><Link to="/services" className="hover:text-[#A3FF12] transition-colors">Web Applications</Link></li>
              <li><Link to="/services" className="hover:text-[#A3FF12] transition-colors">UI / UX Strategy</Link></li>
              <li><Link to="/services" className="hover:text-[#A3FF12] transition-colors">Website Redesign</Link></li>
              <li><Link to="/services" className="hover:text-[#A3FF12] transition-colors">Maintenance & Support</Link></li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Direct Contact
            </h3>
            <div className="space-y-2.5 text-sm text-[#A7ADA5]">
              <a
                href={siteConfig.gmailLink || `https://mail.google.com/mail/?view=cm&fs=1&to=${siteConfig.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#A3FF12] transition-colors group"
                id="footer-email-link"
                title="Compose email on Gmail"
              >
                <Mail className="w-4 h-4 text-[#A3FF12] shrink-0 group-hover:scale-110 transition-transform" />
                <span>{siteConfig.email}</span>
              </a>
              <div className="space-y-1.5 pt-0.5">
                <a
                  href="tel:+917862040387"
                  className="flex items-center gap-2 hover:text-[#A3FF12] transition-colors"
                  id="footer-phone-primary"
                >
                  <Phone className="w-4 h-4 text-[#A3FF12] shrink-0" />
                  <span>{siteConfig.primaryPhone}</span>
                </a>
                <a
                  href="tel:+918144951561"
                  className="flex items-center gap-2 hover:text-[#A3FF12] transition-colors pl-6 text-xs text-[#A7ADA5] hover:text-[#A3FF12]"
                  id="footer-phone-secondary"
                >
                  <span>{siteConfig.secondaryPhone}</span>
                </a>
                <a
                  href="tel:+917750870859"
                  className="flex items-center gap-2 hover:text-[#A3FF12] transition-colors pl-6 text-xs text-[#A7ADA5] hover:text-[#A3FF12]"
                  id="footer-phone-additional"
                >
                  <span>{siteConfig.additionalPhone}</span>
                </a>
              </div>
              <div className="flex items-start gap-2 text-xs text-[#A7ADA5] pt-1">
                <MapPin className="w-4 h-4 text-[#A3FF12] shrink-0 mt-0.5" />
                <span>{siteConfig.location}</span>
              </div>
            </div>

            <div className="pt-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-2">
                Connect
              </h4>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={`https://t.me/${siteConfig.TELEGRAM_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded bg-[#101310] border border-white/10 hover:border-[#A3FF12]/40 text-xs font-medium text-[#A7ADA5] hover:text-[#A3FF12] transition-all flex items-center gap-1"
                  id="footer-telegram-link"
                >
                  Telegram <ArrowUpRight className="w-3 h-3" />
                </a>
                <a
                  href={siteConfig.INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded bg-[#101310] border border-white/10 hover:border-[#A3FF12]/40 text-xs font-medium text-[#A7ADA5] hover:text-[#A3FF12] transition-all flex items-center gap-1"
                >
                  Instagram <ArrowUpRight className="w-3 h-3" />
                </a>
                <a
                  href={siteConfig.LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded bg-[#101310] border border-white/10 hover:border-[#A3FF12]/40 text-xs font-medium text-[#A7ADA5] hover:text-[#A3FF12] transition-all flex items-center gap-1"
                >
                  LinkedIn <ArrowUpRight className="w-3 h-3" />
                </a>
                <a
                  href={siteConfig.GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded bg-[#101310] border border-white/10 hover:border-[#A3FF12]/40 text-xs font-medium text-[#A7ADA5] hover:text-[#A3FF12] transition-all flex items-center gap-1"
                >
                  GitHub <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A7ADA5]">
          <p>© 2026 NETWEB STUDIO. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="font-mono text-[11px] text-white/40 uppercase">
              DESIGN × TECHNOLOGY × PERFORMANCE
            </span>
            <span className="text-[#A3FF12]">●</span>
            <span className="text-white/60">High-Performance Studio</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
