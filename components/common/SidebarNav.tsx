"use client";

import { useEffect, useState } from "react";

type Section = { id: string; label: string };

interface SidebarNavProps {
  sections: Section[];
}

const SidebarNav = ({ sections }: SidebarNavProps) => {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -60% 0px", threshold: 0.2 }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="hidden lg:block fixed left-0 top-0 z-30 h-screen w-6 group">
      <div className="absolute left-6 top-1/2 -translate-y-1/2 transition-all duration-300 ease-out opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0">
        <div className="relative flex flex-col items-center gap-4 px-2 py-4 rounded-full bg-black/30 backdrop-blur-md border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                const el = document.getElementById(s.id);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="group relative flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300"
              aria-label={s.label}
            >
              <span className="pointer-events-none absolute inset-0 -m-1 rounded-full bg-orange-500/25 blur-md opacity-0 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100" />
              <span
                className={`relative block w-3.5 h-3.5 rounded-full outline outline-white/70 shadow-[0_0_0_2px_rgba(0,0,0,0.35)] transition-all duration-300 ${
                  activeSection === s.id ? "bg-orange-500 scale-125 ring-2 ring-white/70 animate-[pulse_1.8s_ease-in-out_infinite]" : "bg-white/90 group-hover:scale-110 group-hover:rotate-6"
                }`}
              />
              <span
                className="pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs text-white opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.35)] bg-linear-to-r from-orange-500 to-red-500 px-3 py-1 border border-white/10 scale-95 group-hover:scale-100"
                style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}
              >
                {s.label}
                <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-orange-500 rotate-45 border border-white/10" />
              </span>
            </button>
          ))}
          <div className="absolute w-px bg-white/20 left-1/2 -translate-x-1/2 top-2 bottom-2" />
        </div>
      </div>
    </div>
  );
};

export default SidebarNav;
