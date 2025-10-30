"use client";

import { useEffect, useRef, useState } from "react";
import { Languages } from "lucide-react";

type Lang = "id" | "en" | "ar";

type LanguageSwitcherProps = {
  lang: Lang;
  onChange: (lang: Lang) => void;
  isScrolled?: boolean;
  showLabel?: boolean;
};

const LanguageSwitcher = ({ lang, onChange, isScrolled, showLabel }: LanguageSwitcherProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (!ref.current) return;
      const target = e.target as Node;
      if (!ref.current.contains(target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const labelMap: Record<Lang, string> = { en: "English", id: "Indonesia", ar: "العربية" };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={
          `flex items-center justify-center ${showLabel ? "gap-2 px-3 py-1.5 rounded-full" : "w-9 h-9 rounded-full"} cursor-pointer ` +
          (isScrolled ? "bg-gray-100 text-gray-800 hover:bg-gray-200" : "bg-white/10 text-white hover:bg-white/20")
        }
      >
        <Languages className={showLabel ? "w-4 h-4" : "w-5 h-5"} />
        {showLabel && <span className="text-sm font-medium">Bahasa</span>}
      </button>

      {open && (
        <div className={`${showLabel ? "left-0" : "right-0"} absolute mt-2 w-40 rounded-xl border border-black/5 bg-white shadow-lg ring-1 ring-black/5 overflow-hidden z-50`}>
          {(["en", "id", "ar"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => {
                onChange(l);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${lang === l ? "text-orange-600 font-semibold" : "text-gray-700"}`}
              role="option"
              aria-selected={lang === l}
            >
              {labelMap[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;