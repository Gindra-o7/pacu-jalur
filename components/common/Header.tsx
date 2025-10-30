"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { NextIntlClientProvider } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import MegaMenuPanel from "./header/MegaMenuPanel";
import LanguageSwitcher from "./header/LanguageSwitcher";
import MotionButton from "./ui/Button";
import { ChevronDown } from "lucide-react";

type Lang = "id" | "en" | "ar";

type MenuItem = {
  label: string;
  href?: string;
  description?: string;
};

type MenuGroup = {
  title: string;
  items: MenuItem[];
};

type TopMenu = {
  key: string;
  label: string;
  groups: MenuGroup[];
};

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [closeTimer, setCloseTimer] = useState<number | null>(null);
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "id";
    return (localStorage.getItem("lang") as Lang) || "id";
  });

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("lang", lang);
  }, [lang]);

  type Messages = {
    nav?: {
      cta?: { schedule?: string; exploreSchedule?: string };
      top?: TopMenu[];
    };
  };
  const [messages, setMessages] = useState<Messages | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`/locales/${lang}/common.json`);
        const json = await res.json();
        if (alive) setMessages(json);
      } catch (e) {
        console.error("Failed to load locale messages", e);
      }
    })();
    return () => {
      alive = false;
    };
  }, [lang]);

  const handleLangChange = (newLang: Lang) => setLang(newLang);

  const openMenu = (key: string | null) => {
    if (closeTimer) {
      clearTimeout(closeTimer);
      setCloseTimer(null);
    }
    setActiveMenu(key);
  };

  const scheduleCloseMenu = () => {
    if (closeTimer) clearTimeout(closeTimer);
    const t = window.setTimeout(() => setActiveMenu(null), 150);
    setCloseTimer(t);
  };

  if (!messages) {
    return null;
  }

  return (
    <NextIntlClientProvider messages={messages} locale={lang}>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black/60 backdrop-blur-md`}
        onMouseLeave={() => setActiveMenu(null)}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <nav className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image src="/sampan.png" alt="Logo" width={40} height={40} />
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              {(() => {
                const menus = ((messages && messages.nav && messages.nav.top) || []) as TopMenu[];
                return menus.map((menu: TopMenu) => (
                  <div key={menu.key} className="relative" onMouseEnter={() => openMenu(menu.groups && menu.groups.length ? menu.key : null)} onMouseLeave={scheduleCloseMenu}>
                    <motion.button whileHover={{ y: -1 }} className={`font-medium font-body inline-flex items-center gap-1 text-white hover:text-orange-400`}>
                      {menu.label}
                      <ChevronDown className="w-4 h-4 text-gray-300 group-hover:text-orange-400 shrink-0" />
                    </motion.button>

                    <AnimatePresence>{activeMenu === menu.key && menu.groups && menu.groups.length ? <MegaMenuPanel groups={menu.groups} onMouseEnter={() => openMenu(menu.key)} onMouseLeave={scheduleCloseMenu} /> : null}</AnimatePresence>
                  </div>
                ));
              })()}
            </div>

            <div className="hidden md:flex items-center gap-2">
              <LanguageSwitcher lang={lang} onChange={handleLangChange} />

              <MotionButton href="/login" className="ml-2" size="md" variant="primary">
                Login
              </MotionButton>
            </div>

            <button className={`md:hidden p-2 rounded-lg text-white hover:bg-white/10`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-expanded={isMobileMenuOpen} aria-label="Toggle navigation">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden mt-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl ring-1 ring-black/5 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-black/5">
                <LanguageSwitcher lang={lang} onChange={handleLangChange} showLabel isScrolled />
              </div>

              <div className="divide-y divide-black/5">
                {(() => {
                  const menus = ((messages && messages.nav && messages.nav.top) || []) as TopMenu[];
                  return menus.map((menu: TopMenu) => (
                    <details key={menu.key} className="group">
                      <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
                        <span className="font-medium text-gray-900">{menu.label}</span>
                        <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="px-4 pb-4 grid grid-cols-1 gap-4">
                        {menu.groups.map((group) => (
                          <div key={group.title}>
                            <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">{group.title}</div>
                            <ul className="space-y-2">
                              {group.items.map((item) => (
                                <li key={item.label}>
                                  <Link href={item.href || "#"} onClick={() => setIsMobileMenuOpen(false)} className="block rounded-md p-3 bg-gray-50 hover:bg-orange-50">
                                    <div className="text-sm font-medium text-gray-900">{item.label}</div>
                                    {item.description && <p className="mt-1 text-xs text-gray-500">{item.description}</p>}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </details>
                  ));
                })()}
              </div>

              <div className="p-4">
                <MotionButton href="/login" onClick={() => setIsMobileMenuOpen(false)} fullWidth size="md">
                  Login
                </MotionButton>
              </div>
            </div>
          )}
        </nav>
      </motion.header>
    </NextIntlClientProvider>
  );
};

export default Header;
