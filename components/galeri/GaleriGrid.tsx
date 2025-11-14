"use client";

import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GaleriItem from "./GaleriItem";
import ImageModal from "./ImageModal";

type Jalur = {
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
  jalur: Jalur;
};

type GaleriGridProps = {
  galeriList: Galeri[];
};

export default function GaleriGrid({ galeriList }: GaleriGridProps) {
  const [selectedImage, setSelectedImage] = useState<Galeri | null>(null);

  console.log("GaleriGrid received data:", galeriList.length, "items");

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-heading">Galeri Pacu Jalur</h1>
        <div className="w-24 h-1 bg-linear-to-r from-purple-500 to-indigo-500 mx-auto mb-6"></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-body">Jelajahi keindahan dan kemegahan tradisi Pacu Jalur melalui koleksi foto dari berbagai jalur di Kuantan Singingi</p>
      </motion.div>

      {/* Gallery Grid */}
      <AnimatePresence mode="wait">
        {galeriList.length === 0 ? (
          <motion.div key="empty" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="text-center py-20 bg-white rounded-2xl shadow-md border border-gray-100">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-linear-to-br from-purple-100 to-indigo-100 flex items-center justify-center">
              <ImageIcon className="w-10 h-10 text-purple-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 font-heading">Tidak Ada Foto</h3>
            <p className="text-gray-600 font-body">Belum ada foto dalam galeri. Tambahkan foto melalui panel admin.</p>
          </motion.div>
        ) : (
          <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {galeriList.map((item, index) => (
              <GaleriItem key={item.id} item={item} index={index} onClick={() => setSelectedImage(item)} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Modal */}
      <ImageModal isOpen={!!selectedImage} onClose={() => setSelectedImage(null)} image={selectedImage} allImages={galeriList} onNavigate={(newImage) => setSelectedImage(newImage)} />
    </div>
  );
}
