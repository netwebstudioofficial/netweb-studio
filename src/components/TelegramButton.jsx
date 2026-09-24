import React, { useState } from "react";
import { FaTelegram } from "react-icons/fa6";
import { siteConfig } from "../config/siteConfig";

export const TelegramButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const prefilledMessage = encodeURIComponent("Hi NETWEB STUDIO, I'd like to discuss a website project.");
  const telegramUsername = siteConfig.TELEGRAM_USERNAME || siteConfig.telegramUsername || "REPLACE_WITH_TELEGRAM_USERNAME";
  const telegramUrl = `https://t.me/${telegramUsername}?text=${prefilledMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3" id="floating-telegram-container">
      {/* Tooltip on hover */}
      {showTooltip && (
        <div className="hidden sm:block bg-[#141814] text-[#F5F7F2] border border-[#A3FF12]/30 px-3.5 py-1.5 rounded-lg text-xs shadow-xl animate-fade-in whitespace-nowrap">
          <p className="font-semibold text-white">Chat with us on Telegram</p>
          <p className="text-[11px] text-[#A7ADA5]">Direct Studio Communication</p>
        </div>
      )}

      <a
        href={telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-13 h-13 rounded-full bg-[#101310] border-2 border-[#A3FF12] text-[#A3FF12] flex items-center justify-center shadow-[0_0_20px_rgba(163,255,18,0.25)] hover:bg-[#A3FF12] hover:text-[#080A08] hover:scale-105 active:scale-95 transition-all duration-200 group relative"
        aria-label="Chat with us on Telegram"
        id="floating-telegram-trigger"
      >
        {/* Subtle pulse ring */}
        <span className="absolute -inset-1 rounded-full border border-[#A3FF12]/40 animate-ping pointer-events-none opacity-60" />
        <FaTelegram className="w-6 h-6 transition-transform group-hover:scale-110" />
      </a>
    </div>
  );
};
