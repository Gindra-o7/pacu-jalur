"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Trophy, Image as ImageIcon, Share2, ArrowRight } from "lucide-react";
import Image from "next/image";
import { BLUR_DATA_URL, getStorageImageUrl } from "@/utils/supabase/storage";

type Galeri = {
  id: string;
  image_url: string;
  judul: string | null;
  caption: string | null;
  jalur_id: string;
};

type Jalur = {
  id: string;
  nama: string;
  galeri: Galeri[];
  medsos: unknown[];
};

type DesaData = {
  desa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  jalur: Jalur[];
};

type DesaCardProps = {
  desaData: DesaData;
  index: number;
};

export default function DesaCard({ desaData, index }: DesaCardProps) {
  const totalJalur = desaData.jalur.length;
  const totalGaleri = desaData.jalur.reduce((sum, jalur) => sum + jalur.galeri.length, 0);
  const totalMedsos = desaData.jalur.reduce((sum, jalur) => sum + jalur.medsos.length, 0);

  // Get first gallery image or fallback
  const firstGaleri = desaData.jalur.find((jalur) => jalur.galeri.length > 0)?.galeri[0];
  const imageUrl = firstGaleri?.image_url || getStorageImageUrl("public/pacu-jalur-1.webp");

  // Create URL-friendly slug (format: desa-kecamatan)
  const desaSlug = `${desaData.desa.toLowerCase().replace(/\s+/g, "-")}-${desaData.kecamatan.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Link href={`/desa/${desaSlug}`}>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer">
          {/* Image Section */}
          <div className="relative h-48 overflow-hidden">
            <Image
              src={imageUrl}
              alt={`${desaData.desa}, ${desaData.kecamatan}`}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            
            {/* Badge */}
            <div className="absolute top-4 left-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <MapPin className="w-4 h-4 text-white" />
                <span className="text-xs font-semibold text-white font-body">{desaData.kecamatan}</span>
              </div>
            </div>

            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-bold mb-1 font-heading" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}>
                {desaData.desa}
              </h3>
              <p className="text-sm text-gray-200 font-body" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>
                {desaData.kabupaten}, {desaData.provinsi}
              </p>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6">
            {/* Stats */}
            <div className="flex items-center gap-6 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Trophy className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900 font-heading">{totalJalur}</p>
                  <p className="text-xs text-gray-600 font-body">Jalur</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ImageIcon className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900 font-heading">{totalGaleri}</p>
                  <p className="text-xs text-gray-600 font-body">Foto</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Share2 className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900 font-heading">{totalMedsos}</p>
                  <p className="text-xs text-gray-600 font-body">Media</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-sm font-medium text-gray-700 font-body">Lihat Detail</span>
              <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

