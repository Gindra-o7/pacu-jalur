import Link from "next/link";
import { MapPinX } from "lucide-react";
import Header from "@/components/common/Header";
import Footer from "@/components/landing/Footer";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-red-50/30">
      <Header />
      <div className="pt-24 pb-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-12">
            <MapPinX className="w-20 h-20 mx-auto mb-6 text-gray-400" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4 font-heading">Desa Tidak Ditemukan</h1>
            <p className="text-gray-600 mb-8 font-body">
              Maaf, desa yang Anda cari tidak ditemukan atau mungkin telah dihapus.
            </p>
            <Link
              href="/desa"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg font-body"
            >
              Kembali ke Daftar Desa
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

