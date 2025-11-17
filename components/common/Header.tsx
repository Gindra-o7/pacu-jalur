"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import MegaMenuPanel from "./header/MegaMenuPanel";
import MotionButton from "./ui/Button";
import { ChevronDown, LogOut } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

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

type Messages = {
  nav?: {
    cta?: { schedule?: string; exploreSchedule?: string };
    top?: TopMenu[];
  };
};

const navigationMessages: Messages = {
  nav: {
    cta: {
      schedule: "Jadwal",
      exploreSchedule: "Jelajahi Jadwal",
    },
    top: [
      {
        key: "home",
        label: "Beranda",
        groups: [],
      },
      {
        key: "wisata",
        label: "Wisata",
        groups: [
          {
            title: "Wisata Alam",
            items: [
              { label: "Air Terjun Guruh Gemurai", href: "/guruh-gemurai" },
              { label: "Lainnya", href: "/wisata-alam" },
            ],
          },
          {
            title: "Wisata Budaya",
            items: [
              { label: "Perahu Baganduang", href: "/perahu-baganduang" },
              { label: "Miniatur Jalur", href: "/miniatur-jalur" },
              { label: "Kerajinan", href: "/kerajinan" },
            ],
          },
        ],
      },
      {
        key: "akomodasi",
        label: "Akomodasi & Transportasi",
        groups: [
          {
            title: "Akomodasi",
            items: [{ label: "Daftar Hotel & Penginapan", href: "/penginapan" }],
          },
          {
            title: "Transportasi",
            items: [
              { label: "Info Transportasi ke Kuantan Singingi", href: "/transportasi" },
              { label: "Rental Mobil/Travel", href: "/rental" },
            ],
          },
        ],
      },
      {
        key: "budaya",
        label: "Budaya & Sejarah",
        groups: [
          {
            title: "Tentang Pacu Jalur",
            items: [
              { label: "Tentang Pacu Jalur", href: "/tentang-pacu-jalur", description: "Sejarah, makna, dan nilai budaya" },
              { label: "Jadwal & Countdown", href: "/jadwal" },
              { label: 'Video Viral "Aura Farming"', href: "/aura-farming", description: "Fenomena unik yang mendunia" },
              { label: "Highlight Event", href: "/highlight-event" },
              { label: "Galeri Pacu Jalur", href: "/galeri" },
            ],
          },
        ],
      },
      {
        key: "desa",
        label: "Desa",
        groups: [],
      },
      {
        key: "info",
        label: "Info Wisatawan",
        groups: [
          {
            title: "Bantuan",
            items: [
              { label: "Tips & Do's and Don'ts", href: "/tips" },
              { label: "Kontak & Bantuan Darurat", href: "/bantuan-darurat" },
              { label: "FAQ", href: "/faq" },
            ],
          },
        ],
      },
    ],
  },
};

const Header = () => {
  const router = useRouter();
  const supabase = createClient();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [closeTimer, setCloseTimer] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const messages = navigationMessages;

  // Check authentication status and role
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);

      // Get user role if authenticated
      if (session) {
        try {
          const response = await fetch("/api/auth/get-user-role");
          const { role } = await response.json();
          setUserRole(role);
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUserRole(null);
        }
      } else {
        setUserRole(null);
      }

      setIsLoading(false);
    };

    checkAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setIsAuthenticated(!!session);

      if (session) {
        try {
          const response = await fetch("/api/auth/get-user-role");
          const { role } = await response.json();
          setUserRole(role);
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUserRole(null);
        }
      } else {
        setUserRole(null);
      }
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle logout confirmation
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
    setIsMobileMenuOpen(false);
  };

  // Confirm logout
  const confirmLogout = async () => {
    setShowLogoutModal(false);
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  // Cancel logout
  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

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

  return (
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
              const menus = (messages.nav?.top || []) as TopMenu[];
              return menus.map((menu: TopMenu) => {
                if (!menu.groups || menu.groups.length === 0) {
                  return (
                    <Link key={menu.key} href={menu.key === "desa" ? "/desa" : "/"} className="font-medium font-body text-white hover:text-orange-400">
                      {menu.label}
                    </Link>
                  );
                }
                return (
                  <div key={menu.key} className="relative" onMouseEnter={() => openMenu(menu.key)} onMouseLeave={scheduleCloseMenu}>
                    <motion.button whileHover={{ y: -1 }} className={`font-medium font-body inline-flex items-center gap-1 text-white hover:text-orange-400`}>
                      {menu.label}
                      <ChevronDown className="w-4 h-4 text-gray-300 group-hover:text-orange-400 shrink-0" />
                    </motion.button>

                    <AnimatePresence>{activeMenu === menu.key && <MegaMenuPanel groups={menu.groups} onMouseEnter={() => openMenu(menu.key)} onMouseLeave={scheduleCloseMenu} />}</AnimatePresence>
                  </div>
                );
              });
            })()}
          </div>

          <div className="hidden md:flex items-center gap-2">
            {isLoading ? (
              <div className="w-20 h-9 bg-gray-700 rounded-full animate-pulse"></div>
            ) : isAuthenticated ? (
              <>
                <MotionButton href={userRole === "ADMIN" ? "/admin" : "/customer"} className="ml-2" size="md" variant="primary">
                  Dashboard
                </MotionButton>
                <button
                  onClick={handleLogoutClick}
                  className="ml-2 px-4 py-2 rounded-full bg-transparent border border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 font-medium font-body flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <MotionButton href="/login" className="ml-2" size="md" variant="primary">
                Login
              </MotionButton>
            )}
          </div>

          <button className={`md:hidden p-2 rounded-lg text-white hover:bg-white/10`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-expanded={isMobileMenuOpen} aria-label="Toggle navigation">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl ring-1 ring-black/5 overflow-hidden">
            {/* LanguageSwitcher dihapus dari menu mobile */}

            <div className="divide-y divide-black/5">
              {(() => {
                const menus = (messages.nav?.top || []) as TopMenu[];
                return menus.map((menu: TopMenu) => {
                  if (!menu.groups || menu.groups.length === 0) {
                    return (
                      <div key={menu.key} className="px-4 py-3">
                        <Link href={menu.key === "desa" ? "/desa" : "/"} onClick={() => setIsMobileMenuOpen(false)} className="font-medium text-gray-900">
                          {menu.label}
                        </Link>
                      </div>
                    );
                  }
                  return (
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
                  );
                });
              })()}
            </div>

            <div className="p-4 border-t border-black/5 space-y-2">
              {isLoading ? (
                <div className="w-full h-10 bg-gray-200 rounded-full animate-pulse"></div>
              ) : isAuthenticated ? (
                <>
                  <MotionButton href={userRole === "ADMIN" ? "/admin" : "/customer"} onClick={() => setIsMobileMenuOpen(false)} fullWidth size="md">
                    Dashboard
                  </MotionButton>
                  <button
                    onClick={handleLogoutClick}
                    className="w-full px-4 py-2 rounded-full bg-transparent border border-gray-300 text-gray-900 hover:bg-gray-50 transition-all duration-300 font-medium font-body flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <MotionButton href="/login" onClick={() => setIsMobileMenuOpen(false)} fullWidth size="md">
                  Login
                </MotionButton>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Logout Confirmation Modal - Rendered via Portal */}
      {isMounted &&
        createPortal(
          <AnimatePresence>
            {showLogoutModal && (
              <>
                {/* Backdrop */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={cancelLogout} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]" />

                {/* Modal */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-red-100">
                      <LogOut className="w-8 h-8 text-red-600" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 text-center mb-2 font-heading">Konfirmasi Logout</h3>

                    <p className="text-gray-600 text-center mb-6 font-body">Apakah Anda yakin ingin keluar dari akun Anda?</p>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button onClick={cancelLogout} className="flex-1 px-4 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300 font-medium font-body">
                        Batal
                      </button>
                      <button
                        onClick={confirmLogout}
                        className="flex-1 px-4 py-3 rounded-xl bg-linear-to-r from-orange-500 via-red-500 to-orange-600 text-white hover:from-orange-600 hover:via-red-600 hover:to-orange-700 transition-all duration-300 font-medium font-body shadow-lg hover:shadow-xl"
                      >
                        Ya, Logout
                      </button>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </motion.header>
  );
};

export default Header;
