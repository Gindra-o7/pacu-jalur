"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Trophy, Award, ChevronRight } from "lucide-react";
import Link from "next/link";
import { getStorageImageUrl, BLUR_DATA_URL } from "@/utils/supabase/storage";

type Jalur = {
  id: string;
  nama: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  deskripsi: string | null;
};

type JalurData = {
  id: string;
  nama: string;
  desa: string;
  kecamatan: string;
};

type Galeri = {
  id: string;
  image_url: string;
  judul: string | null;
  caption: string | null;
  jalur_id: string;
  jalur: JalurData | null;
};

type DesaItem = {
  desa: string;
  kecamatan: string;
  jalur: Jalur[];
};

type DesaBerlombaContentProps = {
  desaList: DesaItem[];
  totalJalur: number;
  galleryImages: Galeri[];
};

// Fallback images jika tidak ada dari gallery
const fallbackImages = [
  getStorageImageUrl("public/pacu-jalur-1.webp"),
  getStorageImageUrl("public/pacu-jalur-2.png"),
  getStorageImageUrl("public/pacu-jalur-3.jpeg"),
  getStorageImageUrl("public/pacu-jalur-4.jpeg"),
  getStorageImageUrl("public/pacu-jalur-5.jpeg"),
];

// Helper function untuk mendapatkan gambar dari gallery berdasarkan jalur
function getDesaImages(desaItem: DesaItem, galleryImages: Galeri[], desaIndex: number): string[] {
  const images: string[] = [];

  // Ambil gambar dari gallery yang terkait dengan jalur di desa ini
  desaItem.jalur.forEach((jalur) => {
    const galleryImagesForJalur = galleryImages.filter((img) => img.jalur_id === jalur.id);
    galleryImagesForJalur.forEach((img) => {
      if (!images.includes(img.image_url)) {
        images.push(img.image_url);
      }
    });
  });

  // Jika tidak ada gambar dari gallery, gunakan fallback
  if (images.length === 0) {
    images.push(fallbackImages[desaIndex % fallbackImages.length]);
  }

  return images;
}

export default function DesaBerlombaContent({ desaList, totalJalur, galleryImages }: DesaBerlombaContentProps) {
  if (desaList.length === 0) {
    return (
      <section id="desa-berlomba" className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-lg">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 font-body">Belum ada data desa yang berpartisipasi.</p>
          </div>
        </div>
      </section>
    );
  }

  // Ambil desa pertama untuk featured image besar
  const featuredDesa = desaList[0];
  const featuredImages = getDesaImages(featuredDesa, galleryImages, 0);
  const featuredImage = featuredImages[0] || fallbackImages[0];

  // Ambil 3 desa berikutnya untuk card kecil (jika ada)
  const otherDesas = desaList.slice(1, 4);

  // Jika kurang dari 3 desa lainnya, isi dengan desa pertama yang diulang (untuk design consistency)
  while (otherDesas.length < 3 && desaList.length > 1) {
    otherDesas.push(desaList[otherDesas.length % desaList.length]);
  }

  // Jika hanya ada 1 desa, isi dengan desa yang sama
  if (desaList.length === 1) {
    otherDesas.push(desaList[0], desaList[0], desaList[0]);
  }

  // Hitung total kecamatan unik
  const uniqueKecamatan = new Set(desaList.map((d) => d.kecamatan)).size;

  return (
    <section id="desa-berlomba" className="relative min-h-screen overflow-hidden">
      <div className="grid lg:grid-cols-3 gap-0 min-h-screen">
        {/* Left Section - Visual Content (Dark Theme) - 2/3 width */}
        <div className="lg:col-span-2 bg-gray-900 relative flex flex-col lg:flex-row">
          {/* Large Featured Image - Left 2/3 of left section */}
          <div className="flex-[2] relative min-h-[500px] lg:min-h-screen group">
            <Image
              src={featuredImage}
              alt={`${featuredDesa.desa}, ${featuredDesa.kecamatan}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              style={{
                filter: "contrast(1.05) saturate(1.15) brightness(0.85)",
              }}
              priority
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40 group-hover:opacity-0 transition-opacity duration-700"></div>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 text-white">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full mb-4 border border-white/30">
                  <MapPin className="w-4 h-4" />
                  <span className="text-xs font-medium">{featuredDesa.kecamatan}</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-3 font-heading" style={{ textShadow: "0 4px 20px rgba(0,0,0,0.9)" }}>
                  {featuredDesa.desa}
                </h2>
                <p className="text-base lg:text-lg text-gray-200 mb-6 max-w-lg font-body" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}>
                  {featuredDesa.desa} memiliki {featuredDesa.jalur.length} jalur yang ikut berlomba dalam festival Pacu Jalur. Desa ini terletak di Kecamatan {featuredDesa.kecamatan}, Kabupaten Kuantan Singingi.
                </p>
                <Link
                  href="/desa"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg font-body"
                >
                  Pelajari Lebih Lanjut
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Small Cards - Right 1/3 of left section */}
          <div className="flex-1 flex flex-col gap-0 lg:gap-0">
            {otherDesas.map((desaItem, index) => {
              const desaImages = getDesaImages(desaItem, galleryImages, index + 1);
              const desaImage = desaImages[0] || fallbackImages[(index + 1) % fallbackImages.length];

              return (
                <motion.div
                  key={`${desaItem.desa}-${desaItem.kecamatan}-${index}`}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative flex-1 min-h-[250px] lg:min-h-0 group cursor-pointer"
                >
                  <Image
                    src={desaImage}
                    alt={`${desaItem.desa}, ${desaItem.kecamatan}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    style={{
                      filter: "contrast(1.05) saturate(1.15) brightness(0.75)",
                    }}
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 group-hover:opacity-0 transition-opacity duration-500"></div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="inline-flex items-center gap-2 px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full mb-2 border border-white/30">
                      <MapPin className="w-3 h-3" />
                      <span className="text-[10px] font-medium">{desaItem.kecamatan}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-1 font-heading" style={{ textShadow: "0 3px 12px rgba(0,0,0,0.9)" }}>
                      {desaItem.desa}
                    </h3>
                    <p className="text-sm text-gray-300 font-body" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>
                      {desaItem.jalur.length} Jalur
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Section - Text Content (Light Theme) - 1/3 width */}
        <div className="lg:col-span-1 bg-gray-50 relative p-8 lg:p-12 flex flex-col justify-center">
          {/* Pattern Background */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>

          <div className="relative z-10">
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-100 rounded-full mb-6">
                <Trophy className="w-4 h-4 text-orange-600" />
                <span className="text-xs font-semibold text-orange-700 font-body uppercase tracking-wider">Desa</span>
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-heading leading-tight">
                {desaList.length} Desa. {totalJalur} Jalur. Satu Festival.
              </h2>

              <div className="w-16 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 mb-8 rounded-full"></div>

              <p className="text-base lg:text-lg text-gray-700 mb-8 leading-relaxed font-body">
                Pelajari tentang desa-desa dari seluruh Kabupaten Kuantan Singingi—dari tepian Sungai Kuantan hingga dataran tinggi— dan temukan semangat persatuan yang mereka bagikan dalam tradisi Pacu Jalur.
              </p>

              {/* Stats */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 font-heading">{desaList.length}</p>
                    <p className="text-sm text-gray-600 font-body">Desa Berpartisipasi</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 font-heading">{totalJalur}</p>
                    <p className="text-sm text-gray-600 font-body">Jalur Berlomba</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 font-heading">{uniqueKecamatan}</p>
                    <p className="text-sm text-gray-600 font-body">Kecamatan</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Link
                href="/jadwal"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 bg-white border-2 border-gray-300 text-gray-900 rounded-full font-semibold transition-all duration-300 hover:border-orange-500 hover:text-orange-600 hover:shadow-lg font-body"
              >
                Lihat Jadwal Acara
                <ChevronRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
