"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode, MouseEvent, MouseEventHandler } from "react";

type MotionButtonProps = {
  href?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
};

const baseClasses = "inline-flex items-center justify-center rounded-full font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60 disabled:opacity-60 disabled:pointer-events-none select-none";

const sizeMap: Record<NonNullable<MotionButtonProps["size"]>, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

const variantMap: Record<NonNullable<MotionButtonProps["variant"]>, string> = {
  primary: "bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 text-white shadow-[0_8px_24px_rgba(234,88,12,0.35)]",
  ghost: "bg-white/10 text-white hover:bg-white/15",
};

const Button = ({ href, onClick, children, className = "", variant = "primary", size = "md", fullWidth = false }: MotionButtonProps) => {
  const classes = `${baseClasses} ${sizeMap[size]} ${variantMap[variant]} ${fullWidth ? "w-full" : ""} ${className}`;

  const hoverAnim = { y: -2, scale: 1.015 };
  const tapAnim = { y: 0, scale: 0.985 };

  const Shine = (
    <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
      <span className="absolute -inset-y-8 -left-1/2 w-[200%] rotate-12 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
    </span>
  );

  if (href) {
    return (
      <motion.span className="relative inline-block">
        {Shine}
        <Link href={href} onClick={onClick as MouseEventHandler<HTMLAnchorElement>} className={classes}>
          {children}
        </Link>
      </motion.span>
    );
  }

  return (
    <motion.button whileHover={hoverAnim} whileTap={tapAnim} onClick={onClick as MouseEventHandler<HTMLButtonElement>} className={`${classes} relative`}>
      {Shine}
      {children}
    </motion.button>
  );
};

export default Button;
