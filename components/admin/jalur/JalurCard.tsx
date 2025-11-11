"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Edit, Trash2, ChevronDown, ChevronUp, ImageIcon, Share2, Loader2 } from "lucide-react";
import Image from "next/image";

type Jalur = {
  id: string;
  nama: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  deskripsi: string | null;
};

type Galeri = {
  id: string;
  image_url: string;
  judul: string | null;
  caption: string | null;
  jalur_id: string;
};

type Medsos = {
  id: string;
  media: "FACEBOOK" | "INSTAGRAM" | "TWITTER" | "TIKTOK" | "YOUTUBE";
  link: string;
  jalur_id: string;
};

type JalurCardProps = {
  jalur: Jalur;
  isExpanded: boolean;
  onExpand: () => void;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting: boolean;
  galeriList: Galeri[];
  medsosList: Medsos[];
  mediaLabels: { [key: string]: string };
};

export default function JalurCard({ jalur, isExpanded, onExpand, onEdit, onDelete, isDeleting, galeriList, medsosList, mediaLabels }: JalurCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 font-heading">{jalur.nama}</h3>
            <p className="text-sm text-gray-600 mt-1 font-body">
              {jalur.desa}, {jalur.kecamatan}, {jalur.kabupaten}, {jalur.provinsi}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onExpand} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title={isExpanded ? "Sembunyikan" : "Lihat Detail"}>
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            <button onClick={onEdit} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
              <Edit className="w-4 h-4" />
            </button>
            <button onClick={onDelete} disabled={isDeleting} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed" title="Hapus">
              {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-4 pt-4 border-t border-gray-200">
              {/* Galeri */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 font-heading flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" />
                    Galeri ({galeriList.length})
                  </h4>
                </div>
                {galeriList.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {galeriList.map((galeri) => (
                      <div key={galeri.id} className="relative group">
                        <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                          <Image src={galeri.image_url} alt={galeri.judul || "Galeri"} fill className="object-cover" />
                        </div>
                        {galeri.judul && <p className="text-xs text-gray-600 mt-1 font-body truncate">{galeri.judul}</p>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 font-body">Tidak ada galeri</p>
                )}
              </div>

              {/* Medsos */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 font-heading flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    Media Sosial ({medsosList.length})
                  </h4>
                </div>
                {medsosList.length > 0 ? (
                  <div className="space-y-2">
                    {medsosList.map((medsos) => (
                      <div key={medsos.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium text-gray-900 font-body">{mediaLabels[medsos.media]}</span>
                          <a href={medsos.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline ml-2 font-body">
                            {medsos.link}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 font-body">Tidak ada media sosial</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

