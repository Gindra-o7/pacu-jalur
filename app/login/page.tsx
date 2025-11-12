"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import { getStorageImageUrl, BLUR_DATA_URL } from "@/utils/supabase/storage";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Handle specific error messages
        if (error.message.includes("Invalid login credentials")) {
          setError("Email atau password salah");
        } else if (error.message.includes("Email not confirmed")) {
          setError("Silakan verifikasi email Anda terlebih dahulu. Cek inbox email Anda.");
        } else {
          setError(error.message || "Terjadi kesalahan saat login");
        }
        return;
      }

      if (data.user && data.session) {
        // Get user role to redirect accordingly
        try {
          const response = await fetch("/api/auth/get-user-role");
          const { role } = await response.json();

          setMessage("Login berhasil! Mengalihkan...");
          setTimeout(() => {
            if (role === "ADMIN") {
              router.push("/admin");
            } else {
              router.push("/");
            }
            router.refresh();
          }, 1000);
        } catch {
          // If profile fetch fails, redirect to home
          setMessage("Login berhasil! Mengalihkan...");
          setTimeout(() => {
            router.push("/");
            router.refresh();
          }, 1000);
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Terjadi kesalahan saat login";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image 
        src={getStorageImageUrl("public/pacu-jalur-1.webp")} 
        alt="Pacu Jalur Background" 
        fill 
        className="object-cover" 
        priority 
        blurDataURL={BLUR_DATA_URL} 
        />
        <div className="absolute inset-0 bg-linear-to-br from-black/70 via-black/60 to-black/70" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-orange-500/20 blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-red-500/20 blur-3xl animate-float" style={{ animationDelay: "1s" }} />

      {/* Login Container - Wide Layout */}
      <div className="relative z-10 w-full max-w-6xl mx-4 lg:mx-8">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex flex-col justify-center items-center p-12 bg-linear-to-br from-orange-500 via-red-500 to-orange-600 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <Image src="/pacu-jalur/pacu-jalur-1.webp" alt="Pattern" fill className="object-cover" />
              </div>
              <div className="relative z-10 text-center">
                <Image src="/sampan.png" alt="Pacu Jalur Logo" width={120} height={120} className="mx-auto mb-6 drop-shadow-2xl animate-float" />
                <h2 className="font-heading text-4xl font-bold mb-4">Pacu Jalur</h2>
                <p className="text-lg text-white/90 font-body max-w-md">Bergabunglah dengan komunitas pecinta tradisi Pacu Jalur Riau</p>
                <div className="mt-8 space-y-3 text-left max-w-sm mx-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-white/90 font-body">Lihat jadwal pertandingan terbaru</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-white/90 font-body">Ikuti berita dan update terkini</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-white/90 font-body">Temukan informasi desa terfavorit</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="p-8 lg:p-12">
              {/* Logo & Title for Mobile */}
              <div className="text-center mb-8 lg:text-left">
                <Link href="/" className="inline-block mb-4 lg:hidden">
                  <Image src="/sampan.png" alt="Pacu Jalur Logo" width={64} height={64} className="mx-auto animate-float" />
                </Link>
                <h1 className="font-heading text-3xl font-bold bg-linear-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent mb-2">Selamat Datang</h1>
                <p className="text-gray-600 font-body">Masuk ke akun Pacu Jalur Anda</p>
              </div>

              {/* Error Message */}
              {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-body">{error}</div>}

              {/* Success Message */}
              {message && <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm">{message}</div>}

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2 font-body">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="nama@email.com"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all font-body"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2 font-body">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all font-body"
                      disabled={isLoading}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors" disabled={isLoading}>
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500" />
                    <span className="ml-2 text-gray-600 font-body">Ingat saya</span>
                  </label>
                  <Link href="/forgot-password" className="text-orange-500 hover:text-orange-600 font-semibold transition-colors font-body">
                    Lupa Password?
                  </Link>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full inline-flex items-center justify-center px-5 py-3 text-lg font-semibold rounded-full bg-linear-to-r from-orange-500 via-red-500 to-orange-600 text-white shadow-[0_8px_24px_rgba(234,88,12,0.35)] hover:shadow-[0_12px_32px_rgba(234,88,12,0.45)] hover:from-orange-600 hover:via-red-600 hover:to-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60 disabled:opacity-60 disabled:pointer-events-none transition-all duration-300"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Memproses...
                    </>
                  ) : (
                    "Masuk"
                  )}
                </button>
              </form>

              {/* Register Link */}
              <p className="mt-6 text-center text-sm text-gray-600 font-body">
                Belum punya akun?{" "}
                <Link href="/register" className="text-orange-500 hover:text-orange-600 font-semibold transition-colors">
                  Daftar Sekarang
                </Link>
              </p>

              {/* Back to Home */}
              <div className="mt-4 text-center">
                <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition-colors font-body">
                  ← Kembali ke Beranda
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
