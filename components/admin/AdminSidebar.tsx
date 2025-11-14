"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Ship, Hotel, Calendar, LogOut, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const menuItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Kelola Jalur",
    href: "/admin/jalur",
    icon: Ship,
  },
  {
    label: "Kelola Penginapan",
    href: "/admin/penginapan",
    icon: Hotel,
  },
  {
    label: "Kelola Acara",
    href: "/admin/acara",
    icon: Calendar,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user?.email) {
          setUserEmail(user.email);
        }
      } catch (error) {
        console.error("Error fetching user email:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserEmail();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.email) {
        setUserEmail(session.user.email);
      } else {
        setUserEmail("");
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
    setIsMobileOpen(false);
  };

  const confirmLogout = async () => {
    setShowLogoutModal(false);
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg" aria-label="Toggle menu">
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen w-[280px] bg-gray-900 text-white z-40 transform transition-transform duration-300 ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-800">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Ship className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-lg font-heading">Admin Panel</h2>
                {isLoading ? (
                  <p className="text-xs text-gray-400 font-body animate-pulse">Loading...</p>
                ) : userEmail ? (
                  <p className="text-xs text-gray-400 font-body truncate" title={userEmail}>
                    {userEmail}
                  </p>
                ) : (
                  <p className="text-xs text-gray-400 font-body">Pacu Jalur</p>
                )}
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              // Untuk Dashboard (/admin), hanya exact match
              // Untuk item lain, check exact match atau startsWith
              const isActive = item.href === "/admin" ? pathname === item.href : pathname === item.href || pathname?.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-body ${
                    isActive ? "bg-linear-to-r from-orange-500 to-red-500 text-white shadow-lg" : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-800">
            <button onClick={handleLogoutClick} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200 font-body">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && <div className="lg:hidden fixed inset-0 bg-black/50 z-30" onClick={() => setIsMobileOpen(false)} />}

      {/* Logout Confirmation Modal - Rendered via Portal */}
      {isMounted &&
        createPortal(
          <AnimatePresence>
            {showLogoutModal && (
              <>
                {/* Backdrop */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={cancelLogout} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-100" />

                {/* Modal */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-101 flex items-center justify-center p-4 pointer-events-none"
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
    </>
  );
}
