"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Eye, EyeOff, Mail, Lock, User, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    // Validasi password
    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: "CUSTOMER",
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      if (data.user) {
        // Jika email confirmation tidak diperlukan, langsung buat profile
        if (data.session) {
          // User langsung ter-authenticate (email confirmation disabled)
          try {
            // Buat user profile
            const response = await fetch("/api/auth/create-profile", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: data.user.id,
                email: data.user.email,
                fullName: fullName,
                role: "CUSTOMER",
              }),
            });

            if (!response.ok) {
              console.error("Failed to create user profile");
            }
          } catch (profileError) {
            console.error("Error creating profile:", profileError);
          }

          setMessage("Pendaftaran berhasil! Mengalihkan...");
          setTimeout(() => {
            router.push("/");
            router.refresh();
          }, 1000);
        } else {
          // Email confirmation diperlukan
          setMessage("Pendaftaran berhasil! Silakan cek email Anda untuk verifikasi akun.");
        }

        // Reset form
        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Terjadi kesalahan saat mendaftar";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden py-12">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image src="/pacu-jalur/pacu-jalur-3.jpeg" alt="Pacu Jalur Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-linear-to-br from-black/70 via-black/60 to-black/70" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-24 h-24 rounded-full bg-orange-500/20 blur-3xl animate-float" />
      <div className="absolute bottom-20 left-20 w-32 h-32 rounded-full bg-red-500/20 blur-3xl animate-float" style={{ animationDelay: "1s" }} />

      {/* Register Container - Wide Layout */}
      <div className="relative z-10 w-full max-w-6xl mx-4 lg:mx-8">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left Side - Register Form */}
            <div className="p-8 lg:p-12 order-2 lg:order-1">
              {/* Logo & Title for Mobile */}
              <div className="text-center mb-6 lg:text-left">
                <Link href="/" className="inline-block mb-4 lg:hidden">
                  <Image src="/sampan.png" alt="Pacu Jalur Logo" width={64} height={64} className="mx-auto animate-float" />
                </Link>
                <h1 className="font-heading text-3xl font-bold bg-linear-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent mb-2">Daftar Akun</h1>
                <p className="text-gray-600 font-body">Bergabunglah dengan komunitas Pacu Jalur</p>
              </div>

              {/* Error Message */}
              {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>}

              {/* Success Message */}
              {message && <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm">{message}</div>}

              {/* Register Form */}
              <form onSubmit={handleRegister} className="space-y-4">
                {/* Full Name Input */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2 font-body">
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      placeholder="Nama lengkap Anda"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all font-body"
                      disabled={isLoading}
                    />
                  </div>
                </div>

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
                      placeholder="Minimal 6 karakter"
                      className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all font-body"
                      disabled={isLoading}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors" disabled={isLoading}>
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Input */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2 font-body">
                    Konfirmasi Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      placeholder="Ulangi password"
                      className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all font-body"
                      disabled={isLoading}
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors" disabled={isLoading}>
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="flex items-start">
                  <input type="checkbox" required className="w-4 h-4 mt-1 text-orange-500 border-gray-300 rounded focus:ring-orange-500" disabled={isLoading} />
                  <label className="ml-2 text-sm text-gray-600 font-body">
                    Saya setuju dengan{" "}
                    <Link href="/terms" className="text-orange-500 hover:text-orange-600 font-semibold">
                      Syarat & Ketentuan
                    </Link>{" "}
                    dan{" "}
                    <Link href="/privacy" className="text-orange-500 hover:text-orange-600 font-semibold">
                      Kebijakan Privasi
                    </Link>
                  </label>
                </div>

                {/* Register Button */}
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
                    "Daftar Sekarang"
                  )}
                </button>
              </form>

              {/* Login Link */}
              <p className="mt-6 text-center text-sm text-gray-600 font-body">
                Sudah punya akun?{" "}
                <Link href="/login" className="text-orange-500 hover:text-orange-600 font-semibold transition-colors">
                  Masuk Sekarang
                </Link>
              </p>

              {/* Back to Home */}
              <div className="mt-4 text-center">
                <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition-colors font-body">
                  ← Kembali ke Beranda
                </Link>
              </div>
            </div>

            {/* Right Side - Branding */}
            <div className="hidden lg:flex flex-col justify-center items-center p-12 bg-linear-to-br from-orange-500 via-red-500 to-orange-600 text-white relative overflow-hidden order-1 lg:order-2">
              <div className="absolute inset-0 opacity-10">
                <Image src="/pacu-jalur/pacu-jalur-3.jpeg" alt="Pattern" fill className="object-cover" />
              </div>
              <div className="relative z-10 text-center">
                <Image src="/sampan.png" alt="Pacu Jalur Logo" width={120} height={120} className="mx-auto mb-6 drop-shadow-2xl animate-float" />
                <h2 className="font-heading text-4xl font-bold mb-4">Bergabung Bersama Kami</h2>
                <p className="text-lg text-white/90 font-body max-w-md mb-8">Daftarkan diri Anda dan nikmati pengalaman terbaik menjelajahi tradisi Pacu Jalur</p>
                <div className="mt-8 space-y-3 text-left max-w-sm mx-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white/90 font-body">Akses penuh ke semua fitur</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white/90 font-body">Update berita dan jadwal terkini</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white/90 font-body">Bergabung dengan komunitas</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white/90 font-body">Gratis selamanya</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
