"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode, MouseEvent, MouseEventHandler } from "react";

type MotionButtonProps = {
  href?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
};

const baseClasses =
  "inline-flex items-center justify-center rounded-full font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60 disabled:opacity-60 disabled:pointer-events-none select-none transition-all duration-300";

const sizeMap: Record<NonNullable<MotionButtonProps["size"]>, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

const variantMap: Record<NonNullable<MotionButtonProps["variant"]>, string> = {
  primary: "bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 text-white shadow-[0_8px_24px_rgba(234,88,12,0.35)] hover:shadow-[0_12px_32px_rgba(234,88,12,0.45)] hover:from-orange-600 hover:via-red-600 hover:to-orange-700",
  ghost: "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/30",
  outline: "bg-transparent text-white hover:bg-white/10 border-2 border-white/50 hover:border-white/70 backdrop-blur-sm",
};

const Button = ({ href, onClick, children, className = "", variant = "primary", size = "md", fullWidth = false }: MotionButtonProps) => {
  const classes = `${baseClasses} ${sizeMap[size]} ${variantMap[variant]} ${fullWidth ? "w-full" : ""} ${className}`;

  const hoverAnim = { y: -3, scale: 1.02 };
  const tapAnim = { y: 0, scale: 0.97 };

  const Shine = (
    <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <motion.span
        className="absolute -inset-y-8 -left-1/2 w-[200%] rotate-12 bg-linear-to-r from-transparent via-white/30 to-transparent"
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut",
        }}
      />
    </span>
  );

  const Glow = variant === "primary" && (
    <span aria-hidden className="pointer-events-none absolute -inset-0.5 rounded-full bg-linear-to-r from-orange-400 via-red-400 to-orange-500 opacity-0 blur-xl group-hover:opacity-50 transition-opacity duration-500" />
  );

  const InnerGradient = variant === "primary" && <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full bg-linear-to-b from-white/20 to-transparent opacity-50" />;

  if (href) {
    return (
      <motion.span className="relative inline-block group">
        {Glow}
        <Link href={href} onClick={onClick as MouseEventHandler<HTMLAnchorElement>} className={`${classes} relative overflow-hidden`}>
          {InnerGradient}
          {Shine}
          <span className="relative z-10">{children}</span>
        </Link>
      </motion.span>
    );
  }

  return (
    <motion.button whileHover={hoverAnim} whileTap={tapAnim} onClick={onClick as MouseEventHandler<HTMLButtonElement>} className={`${classes} relative overflow-hidden group`}>
      {Glow}
      {InnerGradient}
      {Shine}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default Button;
