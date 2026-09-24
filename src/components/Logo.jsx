import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../assets/netweb-studio-logo2.png";

export const Logo = ({
  className = "",
  isLink = true,
  size = "md",
}) => {
  // Proportional responsive width (approx 150-170px on desktop) preserving exact aspect ratio
  const widthClasses = {
    sm: "w-[125px] sm:w-[135px]",
    md: "w-[140px] sm:w-[155px] md:w-[165px]",
    lg: "w-[160px] sm:w-[180px] md:w-[200px]",
  }[size];

  const content = (
    <div
      className={`inline-flex items-center select-none ${className}`}
      id="brand-logo-container"
    >
      <img
        id="brand-logo-img"
        src={logoImg}
        alt="NETWEB STUDIO"
        className={`${widthClasses} h-auto object-contain block shrink-0`}
        loading="eager"
        decoding="async"
      />
    </div>
  );

  if (isLink) {
    return (
      <Link
        to="/"
        className="inline-flex items-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[#A3FF12] rounded transition-opacity duration-200 hover:opacity-90"
        aria-label="NETWEB STUDIO Home"
      >
        {content}
      </Link>
    );
  }

  return content;
};
