"use client";

import { motion } from "framer-motion";
import { Edit, Trash2, ChevronDown, ImageIcon, Share2, Loader2 } from "lucide-react";
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
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-base font-bold text-gray-900 font-heading">{jalur.nama}</h3>
            <p className="text-xs text-gray-600 mt-0.5 font-body">
              {jalur.desa}, {jalur.kecamatan}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={onExpand} className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-300 hover:scale-110" title={isExpanded ? "Sembunyikan" : "Lihat Detail"}>
              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}>
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>
            <button onClick={onEdit} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
              <Edit className="w-3.5 h-3.5" />
            </button>
            <button onClick={onDelete} disabled={isDeleting} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed" title="Hapus">
              {isDeleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Expanded Content */}
        <motion.div
          initial={false}
          animate={{
            maxHeight: isExpanded ? 2000 : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{
            maxHeight: {
              duration: isExpanded ? 0.5 : 0.4,
              ease: [0.4, 0, 0.2, 1],
            },
            opacity: {
              duration: isExpanded ? 0.4 : 0.25,
              delay: isExpanded ? 0.1 : 0,
              ease: isExpanded ? "easeOut" : "easeIn",
            },
          }}
          className="overflow-hidden"
        >
          {isExpanded && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              {/* Galeri */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.15, duration: 0.3 },
                }}
                className="mb-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-gray-900 font-heading flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4" />
                    Galeri ({galeriList.length})
                  </h4>
                </div>
                {galeriList.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {galeriList.map((galeri, index) => (
                      <motion.div
                        key={galeri.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          transition: {
                            delay: 0.2 + index * 0.05,
                            duration: 0.3,
                            ease: [0.4, 0, 0.2, 1],
                          },
                        }}
                        className="relative group"
                      >
                        <div className="relative aspect-square rounded-md overflow-hidden bg-gray-100 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg">
                          <Image src={galeri.image_url} alt={galeri.judul || "Galeri"} fill className="object-cover" />
                        </div>
                        {galeri.judul && <p className="text-[10px] text-gray-600 mt-0.5 font-body truncate">{galeri.judul}</p>}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 font-body">Tidak ada galeri</p>
                )}
              </motion.div>

              {/* Medsos */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.2, duration: 0.3 },
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-gray-900 font-heading flex items-center gap-1.5">
                    <Share2 className="w-4 h-4" />
                    Media Sosial ({medsosList.length})
                  </h4>
                </div>
                {medsosList.length > 0 ? (
                  <div className="space-y-1.5">
                    {medsosList.map((medsos, index) => (
                      <motion.div
                        key={medsos.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          transition: {
                            delay: 0.25 + index * 0.05,
                            duration: 0.3,
                            ease: [0.4, 0, 0.2, 1],
                          },
                        }}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-md transition-all duration-300 hover:bg-gray-100 hover:shadow-sm"
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <span className="text-sm font-medium text-gray-900 font-body">{mediaLabels[medsos.media]}</span>
                          <a href={medsos.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline font-body transition-colors duration-200 truncate">
                            {medsos.link}
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 font-body">Tidak ada media sosial</p>
                )}
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
