import { getStorageImageUrl, BLUR_DATA_URL } from "@/utils/supabase/storage";
import Image from "next/image";
import Button from "@/components/common/ui/Button";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image 
          src={getStorageImageUrl("/public/pacu-jalur-1.webp")} 
          alt="Pacu Jalur Background" 
          fill 
          className="object-cover" 
          priority 
          blurDataURL={BLUR_DATA_URL} 
        />
        <div className="absolute inset-0 bg-linear-to-br from-black/80 via-black/60 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 text-center text-white max-w-2xl">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-linear-to-br from-red-500/20 to-orange-500/20 border-2 border-red-500/50 flex items-center justify-center backdrop-blur-sm">
            <ShieldAlert className="w-12 h-12 text-red-400" />
          </div>
        </div>

        <p className="uppercase tracking-widest text-sm text-red-300/90 font-body">Akses Ditolak</p>
        <h1 className="mt-3 font-heading text-5xl md:text-7xl font-extrabold bg-linear-to-r from-red-400 via-orange-400 to-red-600 bg-clip-text text-transparent">
          403
        </h1>
        <p className="mt-6 text-base md:text-lg text-gray-200 font-body leading-relaxed">
          Maaf, Anda tidak memiliki akses untuk melihat halaman ini. Halaman ini hanya dapat diakses oleh pengguna dengan role tertentu.
        </p>
        <p className="mt-3 text-sm text-gray-300/80 font-body">
          Jika Anda merasa ini adalah kesalahan, silakan hubungi administrator.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/" size="lg">
            Kembali ke Beranda
          </Button>
          <Button href="/login" size="lg" variant="outline">
            Login
          </Button>
        </div>
      </div>

      {/* Decorative ripples */}
      <div className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 w-[140%] aspect-3/1 rounded-[999px] bg-linear-to-t from-red-500/10 to-transparent blur-3xl" />
    </main>
  );
}

