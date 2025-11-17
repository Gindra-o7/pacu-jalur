"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Trophy, Image as ImageIcon, Share2, ExternalLink, ArrowLeft, ChevronRight } from "lucide-react";
import { BLUR_DATA_URL, getStorageImageUrl } from "@/utils/supabase/storage";

type Galeri = {
  id: string;
  image_url: string;
  judul: string | null;
  caption: string | null;
  jalur_id: string;
};

type Medsos = {
  id: string;
  media: string;
  link: string;
  jalur_id: string;
};

type Jalur = {
  id: string;
  nama: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  deskripsi: string | null;
  galeri: Galeri[];
  medsos: Medsos[];
};

type DesaData = {
  desa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  jalur: Jalur[];
};

type DesaDetailContentProps = {
  desaData: DesaData;
};

function getMediaIcon(media: string) {
  const mediaLower = media.toLowerCase();
  switch (mediaLower) {
    case "facebook":
      return "📘";
    case "instagram":
      return "📷";
    case "twitter":
      return "🐦";
    case "tiktok":
      return "🎵";
    case "youtube":
      return "▶️";
    default:
      return "🔗";
  }
}

export default function DesaDetailContent({ desaData }: DesaDetailContentProps) {
  const totalJalur = desaData.jalur.length;
  const totalGaleri = desaData.jalur.reduce((sum, jalur) => sum + jalur.galeri.length, 0);
  const totalMedsos = desaData.jalur.reduce((sum, jalur) => sum + jalur.medsos.length, 0);

  // Get all gallery images
  const allGaleri = desaData.jalur.flatMap((jalur) =>
    jalur.galeri.map((g) => ({ ...g, jalurNama: jalur.nama }))
  );

  // Get featured image
  const featuredImage = allGaleri[0]?.image_url || getStorageImageUrl("public/pacu-jalur-1.webp");

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Back Button */}
      <Link
        href="/desa"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors mb-6 font-body"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Daftar Desa</span>
      </Link>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative h-96 rounded-2xl overflow-hidden mb-8 shadow-2xl"
      >
        <Image
          src={featuredImage}
          alt={`${desaData.desa}, ${desaData.kecamatan}`}
          fill
          className="object-cover"
          style={{
            filter: "contrast(1.05) saturate(1.15) brightness(0.85)",
          }}
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30"></div>

        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full mb-4 border border-white/30">
            <MapPin className="w-4 h-4" />
            <span className="text-xs font-medium">{desaData.kecamatan}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2 font-heading" style={{ textShadow: "0 4px 20px rgba(0,0,0,0.9)" }}>
            {desaData.desa}
          </h1>
          <p className="text-lg text-gray-200 font-body" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}>
            {desaData.kabupaten}, {desaData.provinsi}
          </p>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-3 gap-4 mb-12"
      >
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
          <div className="inline-flex p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-full mb-3">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <p className="text-3xl font-bold text-gray-900 font-heading mb-1">{totalJalur}</p>
          <p className="text-sm text-gray-600 font-body">Jalur Berlomba</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
          <div className="inline-flex p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-3">
            <ImageIcon className="w-6 h-6 text-white" />
          </div>
          <p className="text-3xl font-bold text-gray-900 font-heading mb-1">{totalGaleri}</p>
          <p className="text-sm text-gray-600 font-body">Foto Galeri</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
          <div className="inline-flex p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full mb-3">
            <Share2 className="w-6 h-6 text-white" />
          </div>
          <p className="text-3xl font-bold text-gray-900 font-heading mb-1">{totalMedsos}</p>
          <p className="text-sm text-gray-600 font-body">Media Sosial</p>
        </div>
      </motion.div>

      {/* Jalur Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-6 h-6 text-orange-500" />
          <h2 className="text-2xl font-bold text-gray-900 font-heading">Data Jalur ({totalJalur})</h2>
        </div>

        <div className="space-y-4">
          {desaData.jalur.map((jalur, index) => (
            <motion.div
              key={jalur.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 font-heading mb-2">{jalur.nama}</h3>
                    {jalur.deskripsi && (
                      <p className="text-gray-700 font-body leading-relaxed">{jalur.deskripsi}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600 font-body">
                    <ImageIcon className="w-4 h-4 text-blue-500" />
                    <span>{jalur.galeri.length} Foto</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 font-body">
                    <Share2 className="w-4 h-4 text-purple-500" />
                    <span>{jalur.medsos.length} Media</span>
                  </div>
                  {jalur.medsos.length > 0 && (
                    <div className="flex items-center gap-2 ml-auto">
                      {jalur.medsos.map((medsos) => (
                        <a
                          key={medsos.id}
                          href={medsos.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-orange-100 rounded-lg transition-colors duration-200"
                          title={medsos.media}
                        >
                          <span className="text-sm">{getMediaIcon(medsos.media)}</span>
                          <span className="text-xs font-medium text-gray-700 font-body">{medsos.media}</span>
                          <ExternalLink className="w-3 h-3 text-gray-600" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Galeri Section */}
      {totalGaleri > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <ImageIcon className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-900 font-heading">Galeri Foto ({totalGaleri})</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allGaleri.map((gallery, index) => (
              <motion.div
                key={gallery.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <Image
                  src={gallery.image_url}
                  alt={gallery.judul || gallery.caption || `Galeri ${gallery.jalurNama}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <p className="text-sm font-semibold font-heading truncate mb-1">{gallery.judul || gallery.jalurNama}</p>
                    {gallery.caption && (
                      <p className="text-xs text-gray-200 font-body line-clamp-2">{gallery.caption}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

