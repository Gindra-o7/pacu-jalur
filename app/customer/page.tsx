"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import CustomerSidebar from "@/components/customer/CustomerSidebar";
import { Construction, Clock } from "lucide-react";

export default function CustomerDashboardPage() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          router.push("/login");
          return;
        }

        // Check user role
        const response = await fetch("/api/auth/get-user-role");
        const { role } = await response.json();

        if (role === "ADMIN") {
          router.push("/admin");
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error checking auth:", error);
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, supabase]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerSidebar />

      {/* Main Content */}
      <main className="lg:pl-[280px] min-h-screen">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 font-heading mb-2">Dashboard</h1>
            <p className="text-gray-600 font-body">Selamat datang di dashboard customer</p>
          </div>

          {/* Under Development Notice */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12">
            <div className="max-w-2xl mx-auto text-center">
              {/* Icon */}
              <div className="mb-6 flex justify-center">
                <div className="relative w-24 h-24 rounded-full bg-linear-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-xl">
                  <Construction className="w-12 h-12 text-white" />
                  <div className="absolute inset-0 rounded-full border-4 border-white/30 border-t-transparent animate-spin" style={{ animationDuration: "3s" }} />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-heading">Dashboard Sedang Dalam Tahap Pengembangan</h2>

              {/* Divider */}
              <div className="w-24 h-1 bg-linear-to-r from-orange-500 via-red-500 to-orange-600 mx-auto mb-6 rounded-full"></div>

              {/* Description */}
              <p className="text-lg text-gray-700 leading-relaxed font-body mb-8">Dashboard khusus untuk customer sedang dalam tahap pengembangan. Fitur-fitur seperti profil, riwayat pemesanan, dan preferensi akan segera hadir.</p>

              {/* Progress Indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-orange-500" />
                  <span className="text-gray-600 font-body font-medium">Sedang Dikerjakan</span>
                </div>
                <div className="w-full max-w-md mx-auto h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-linear-to-r from-orange-500 via-red-500 to-orange-600 rounded-full" style={{ width: "45%" }}>
                    <div className="h-full bg-white/30 animate-pulse"></div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2 font-body">45% Selesai</p>
              </div>

              {/* Features Coming Soon */}
              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                  <div className="text-2xl mb-2">👤</div>
                  <h3 className="font-semibold text-gray-900 mb-1 font-heading">Profil</h3>
                  <p className="text-sm text-gray-600 font-body">Kelola data pribadi</p>
                </div>
                <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                  <div className="text-2xl mb-2">📋</div>
                  <h3 className="font-semibold text-gray-900 mb-1 font-heading">Riwayat</h3>
                  <p className="text-sm text-gray-600 font-body">Lihat pemesanan</p>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                  <div className="text-2xl mb-2">⚙️</div>
                  <h3 className="font-semibold text-gray-900 mb-1 font-heading">Preferensi</h3>
                  <p className="text-sm text-gray-600 font-body">Pengaturan akun</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
