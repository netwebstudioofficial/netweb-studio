import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "lime-outline";
  size?: "sm" | "md" | "lg";
  to?: string;
  href?: string;
  withArrow?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  to,
  href,
  withArrow = false,
  isLoading = false,
  children,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 tracking-tight select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3FF12] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080A08] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group relative";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 rounded gap-1.5",
    md: "text-sm px-5 py-2.5 rounded gap-2",
    lg: "text-base px-7 py-3.5 rounded gap-2.5 font-semibold",
  }[size];

  const variantStyles = {
    primary: "bg-[#A3FF12] text-[#080A08] font-bold hover:bg-[#9CFF00] hover:shadow-[0_0_24px_rgba(163,255,18,0.3)] active:translate-y-0.5",
    secondary: "bg-[#141814] text-[#F5F7F2] border border-white/10 hover:border-[#A3FF12]/40 hover:text-white hover:bg-[#1a201a] active:translate-y-0.5",
    outline: "bg-transparent text-[#F5F7F2] border border-white/20 hover:border-white/60 hover:text-white active:translate-y-0.5",
    "lime-outline": "bg-transparent text-[#A3FF12] border border-[#A3FF12]/40 hover:border-[#A3FF12] hover:bg-[#A3FF12]/10 active:translate-y-0.5",
    ghost: "bg-transparent text-[#A7ADA5] hover:text-[#F5F7F2] hover:bg-white/5 active:translate-y-0.5",
  }[variant];

  const classes = `${baseStyles} ${sizeStyles} ${variantStyles} ${className}`;

  const content = (
    <>
      {isLoading && <Loader2 className="w-4 h-4 animate-spin text-current" />}
      <span>{children}</span>
      {withArrow && !isLoading && (
        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} disabled={disabled || isLoading} {...props}>
      {content}
    </button>
  );
};
