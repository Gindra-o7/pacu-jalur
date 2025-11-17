"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Trophy, Image as ImageIcon, Share2, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { BLUR_DATA_URL } from "@/utils/supabase/storage";

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

export default function DesaAccordion({ desaData, index }: { desaData: DesaData; index: number }) {
  const [isOpen, setIsOpen] = useState(index === 0); // First item open by default
  const totalJalur = desaData.jalur.length;
  const totalGaleri = desaData.jalur.reduce((sum, jalur) => sum + jalur.galeri.length, 0);
  const totalMedsos = desaData.jalur.reduce((sum, jalur) => sum + jalur.medsos.length, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 font-heading">{desaData.desa}</h3>
              <p className="text-sm text-gray-600 font-body">Kec. {desaData.kecamatan}, {desaData.kabupaten}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-3 text-sm text-gray-600 font-body">
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4 text-orange-500" />
              <span>{totalJalur} Jalur</span>
            </div>
            <div className="flex items-center gap-1">
              <ImageIcon className="w-4 h-4 text-blue-500" />
              <span>{totalGaleri} Foto</span>
            </div>
            <div className="flex items-center gap-1">
              <Share2 className="w-4 h-4 text-purple-500" />
              <span>{totalMedsos} Media</span>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 ml-4">
          {isOpen ? <ChevronUp className="w-6 h-6 text-gray-400" /> : <ChevronDown className="w-6 h-6 text-gray-400" />}
        </div>
      </button>

      {/* Content */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="border-t border-gray-200"
        >
          <div className="p-6 space-y-6">
            {/* Jalur Table */}
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-4 font-heading flex items-center gap-2">
                <Trophy className="w-5 h-5 text-orange-500" />
                Data Jalur ({totalJalur})
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-4 py-3 text-left font-semibold text-gray-900 font-body">Nama Jalur</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900 font-body">Deskripsi</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-900 font-body">Galeri</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-900 font-body">Media Sosial</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {desaData.jalur.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-4 py-8 text-center text-gray-500 font-body">
                          Tidak ada data jalur
                        </td>
                      </tr>
                    ) : (
                      desaData.jalur.map((jalur) => (
                        <motion.tr
                          key={jalur.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="hover:bg-orange-50/50 transition-colors duration-200"
                        >
                          <td className="px-4 py-4 font-semibold text-gray-900 font-heading">{jalur.nama}</td>
                          <td className="px-4 py-4 text-gray-700 font-body">
                            {jalur.deskripsi ? (
                              <p className="line-clamp-2 max-w-md">{jalur.deskripsi}</p>
                            ) : (
                              <span className="text-gray-400 italic">Tidak ada deskripsi</span>
                            )}
                          </td>
                          <td className="px-4 py-4 text-center">
                            {jalur.galeri.length > 0 ? (
                              <div className="flex items-center justify-center gap-2">
                                <ImageIcon className="w-4 h-4 text-blue-500" />
                                <span className="text-gray-700 font-body">{jalur.galeri.length}</span>
                              </div>
                            ) : (
                              <span className="text-gray-400 font-body">-</span>
                            )}
                          </td>
                          <td className="px-4 py-4 text-center">
                            {jalur.medsos.length > 0 ? (
                              <div className="flex items-center justify-center gap-1 flex-wrap">
                                {jalur.medsos.map((medsos) => (
                                  <a
                                    key={medsos.id}
                                    href={medsos.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 hover:bg-orange-100 rounded-lg transition-colors duration-200"
                                    title={medsos.media}
                                  >
                                    <span className="text-sm">{getMediaIcon(medsos.media)}</span>
                                    <ExternalLink className="w-3 h-3 text-gray-600" />
                                  </a>
                                ))}
                              </div>
                            ) : (
                              <span className="text-gray-400 font-body">-</span>
                            )}
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Galeri Section */}
            {totalGaleri > 0 && (
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-4 font-heading flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-blue-500" />
                  Galeri Foto ({totalGaleri})
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {desaData.jalur.map((jalur) =>
                    jalur.galeri.map((gallery) => (
                      <motion.div
                        key={gallery.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        className="relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
                      >
                        <Image
                          src={gallery.image_url}
                          alt={gallery.judul || gallery.caption || `Galeri ${jalur.nama}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          placeholder="blur"
                          blurDataURL={BLUR_DATA_URL}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                            <p className="text-sm font-semibold font-heading truncate">{gallery.judul || jalur.nama}</p>
                            {gallery.caption && (
                              <p className="text-xs text-gray-200 font-body line-clamp-2 mt-1">{gallery.caption}</p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

