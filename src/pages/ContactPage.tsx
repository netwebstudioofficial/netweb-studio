import React from "react";
import { ContactForm } from "../components/ContactForm";
import { SectionTitle } from "../components/SectionTitle";
import { siteConfig } from "../config/siteConfig";
import { Mail, Phone, MessageSquare, MapPin, Clock, Shield } from "lucide-react";
import { FaTelegram } from "react-icons/fa6";
import { RevealOnScroll, RevealGroup, RevealChild } from "../components/RevealOnScroll";

export const ContactPage: React.FC = () => {
  return (
    <div className="w-full pt-28 pb-20">
      {/* Header */}
      <section className="border-b border-white/[0.08] pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <span className="font-mono text-xs text-[#A3FF12] uppercase tracking-widest px-3 py-1 rounded bg-[#141814] border border-[#A3FF12]/20 inline-block mb-4">
              Direct Communication
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#F5F7F2] tracking-tight uppercase font-['Space_Grotesk'] leading-[1.08] mb-6">
              START A PROJECT. <br />
              <span className="text-[#A3FF12]">LET'S BUILD SOMETHING GREAT.</span>
            </h1>
            <p className="text-base sm:text-xl text-[#A7ADA5] max-w-3xl leading-relaxed">
              Tell us about your upcoming digital venture, redesign, or custom web application. Our senior leadership reviews all inquiries and responds within 24 hours.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-16 sm:py-24 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <ContactForm />
          </RevealOnScroll>
        </div>
      </section>

      {/* Direct Contact Methods & Offices */}
      <section className="py-16 sm:py-24 bg-[#0c0e0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Direct Email */}
            <RevealChild className="p-6 rounded-xl bg-[#101310] border border-white/[0.08]">
              <div className="w-10 h-10 rounded-lg bg-[#141814] border border-[#A3FF12]/30 flex items-center justify-center text-[#A3FF12] mb-4">
                <Mail className="w-5 h-5" />
              </div>
              <p className="text-xs font-mono text-[#A7ADA5] uppercase tracking-wider mb-1">Direct Inquiries</p>
              <h3 className="text-base font-bold text-white mb-2">
                <a
                  href={siteConfig.gmailLink || `https://mail.google.com/mail/?view=cm&fs=1&to=${siteConfig.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#A3FF12] transition-colors break-all"
                  id="contact-page-email-link"
                  title="Compose message on Gmail"
                >
                  {siteConfig.email}
                </a>
              </h3>
              <p className="text-xs text-[#A7ADA5]">Send RFPs, specifications, or preliminary scopes via Gmail.</p>
            </RevealChild>

            {/* Direct Phone */}
            <RevealChild className="p-6 rounded-xl bg-[#101310] border border-white/[0.08]">
              <div className="w-10 h-10 rounded-lg bg-[#141814] border border-[#A3FF12]/30 flex items-center justify-center text-[#A3FF12] mb-4">
                <Phone className="w-5 h-5" />
              </div>
              <p className="text-xs font-mono text-[#A7ADA5] uppercase tracking-wider mb-1">Voice & Direct Lines</p>
              <div className="space-y-1.5 mb-2">
                <div>
                  <a
                    href="tel:+917862040387"
                    className="text-sm sm:text-base font-bold text-white hover:text-[#A3FF12] transition-colors block"
                    id="contact-page-phone-primary"
                  >
                    {siteConfig.primaryPhone}
                  </a>
                </div>
                <div>
                  <a
                    href="tel:+918144951561"
                    className="text-xs sm:text-sm font-semibold text-white/90 hover:text-[#A3FF12] transition-colors block"
                    id="contact-page-phone-secondary"
                  >
                    {siteConfig.secondaryPhone}
                  </a>
                </div>
                <div>
                  <a
                    href="tel:+917750870859"
                    className="text-xs sm:text-sm font-semibold text-white/90 hover:text-[#A3FF12] transition-colors block"
                    id="contact-page-phone-additional"
                  >
                    {siteConfig.additionalPhone}
                  </a>
                </div>
              </div>
              <p className="text-xs text-[#A7ADA5]">Mon–Sat: 09:30 AM – 07:00 PM IST</p>
            </RevealChild>

            {/* Telegram */}
            <RevealChild className="p-6 rounded-xl bg-[#101310] border border-white/[0.08]">
              <div className="w-10 h-10 rounded-lg bg-[#141814] border border-[#A3FF12]/30 flex items-center justify-center text-[#A3FF12] mb-4">
                <FaTelegram className="w-5 h-5" />
              </div>
              <p className="text-xs font-mono text-[#A7ADA5] uppercase tracking-wider mb-1">Instant Telegram</p>
              <h3 className="text-base font-bold text-white mb-2">Telegram Live Chat</h3>
              <a
                href={siteConfig.TELEGRAM_LINK || `https://t.me/${siteConfig.TELEGRAM_USERNAME}?text=${encodeURIComponent("Hi NETWEB STUDIO, I'd like to discuss a website project.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#A3FF12] hover:underline font-mono inline-block mt-1"
                id="contact-page-telegram-link"
              >
                Chat on Telegram →
              </a>
            </RevealChild>

            {/* Studio HQ */}
            <RevealChild className="p-6 rounded-xl bg-[#101310] border border-white/[0.08]">
              <div className="w-10 h-10 rounded-lg bg-[#141814] border border-[#A3FF12]/30 flex items-center justify-center text-[#A3FF12] mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <p className="text-xs font-mono text-[#A7ADA5] uppercase tracking-wider mb-1">Studio Base</p>
              <h3 className="text-base font-bold text-white mb-2">{siteConfig.location}</h3>
              <p className="text-xs text-[#A7ADA5]">Serving clients across India & international timezones.</p>
            </RevealChild>
          </RevealGroup>
        </div>
      </section>
    </div>
  );
};
