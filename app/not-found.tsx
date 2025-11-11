import { getStorageImageUrl, BLUR_DATA_URL } from "@/utils/supabase/storage";
import Image from "next/image";
import Button from "../components/common/ui/Button";

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image src={getStorageImageUrl("/public/pacu-jalur-1.webp")} alt="Pacu Jalur Background" fill className="object-cover" priority blurDataURL={BLUR_DATA_URL} />
        <div className="absolute inset-0 bg-linear-to-br from-black/80 via-black/60 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 text-center text-white">
        <p className="uppercase tracking-widest text-sm text-orange-300/90">Halaman Tidak Ditemukan</p>
        <h1 className="mt-3 font-heading text-6xl md:text-8xl font-extrabold bg-linear-to-r from-orange-400 via-red-400 to-orange-600 bg-clip-text text-transparent">404</h1>
        <p className="mt-4 max-w-xl mx-auto text-base md:text-lg text-gray-200">Maaf, halaman yang Anda cari tidak tersedia. Yuk kembali menjelajahi keindahan Pacu Jalur.</p>
        <div className="mt-8 flex items-center justify-center">
          <Button href="/" size="lg">
            Kembali ke Beranda
          </Button>
        </div>
      </div>

      {/* Decorative ripples */}
      <div className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 w-[140%] aspect-3/1 rounded-[999px] bg-linear-to-t from-orange-500/10 to-transparent blur-3xl" />
    </main>
  );
}
