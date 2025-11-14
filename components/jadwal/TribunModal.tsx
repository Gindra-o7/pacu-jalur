"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Users, BadgeCheck, Phone, TrendingUp, Ticket } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

type Tribun = {
  id: string;
  nama_penyedia: string;
  kontak_penyedia: string | null;
  nama_tribun: string;
  kategori: "REGULER" | "VIP";
  harga_per_orang: number;
  total_kursi: number;
  kursi_terjual: number;
  deskripsi: string | null;
  acara_id: string;
};

type TribunModalProps = {
  isOpen: boolean;
  onClose: () => void;
  tribunList: Tribun[];
  eventName: string;
};

export default function TribunModal({ isOpen, onClose, tribunList, eventName }: TribunModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isMounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-linear-to-r from-orange-50 to-red-50">
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold text-gray-900 font-heading mb-1 truncate">Detail Tribun</h2>
                <p className="text-xs text-gray-600 font-body truncate">{eventName}</p>
              </div>
              <button onClick={onClose} className="ml-3 p-1.5 text-gray-600 hover:bg-white rounded-lg transition-colors shrink-0" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {tribunList.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <Ticket className="w-16 h-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 font-body">Belum ada tribun untuk acara ini</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                  {tribunList.map((tribun, index) => {
                    const tribunTersedia = tribun.total_kursi - tribun.kursi_terjual;
                    const tribunPercentage = (tribun.kursi_terjual / tribun.total_kursi) * 100;
                    const isFull = tribunTersedia === 0;
                    const isAlmostFull = tribunPercentage >= 80 && !isFull;

                    return (
                      <motion.div
                        key={tribun.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        {/* Header */}
                        <div className="mb-3">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="text-base font-bold text-gray-900 font-heading line-clamp-1 flex-1">{tribun.nama_tribun}</h3>
                            <div className="text-right shrink-0">
                              <div className="text-lg font-bold text-orange-600 font-heading whitespace-nowrap">Rp {tribun.harga_per_orang.toLocaleString("id-ID")}</div>
                              <div className="text-[10px] text-gray-500 font-body">per orang</div>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${tribun.kategori === "VIP" ? "bg-linear-to-r from-purple-500 to-pink-500 text-white" : "bg-linear-to-r from-blue-500 to-cyan-500 text-white"}`}>
                              {tribun.kategori}
                            </span>
                            {isFull && <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700">PENUH</span>}
                            {isAlmostFull && <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-yellow-100 text-yellow-700">HAMPIR PENUH</span>}
                          </div>
                        </div>

                        {/* Info */}
                        <div className="space-y-1.5 mb-3">
                          <div className="flex items-start gap-2 text-xs text-gray-700">
                            <BadgeCheck className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                            <span className="font-body">
                              <span className="font-semibold">Penyedia:</span> {tribun.nama_penyedia}
                            </span>
                          </div>

                          {tribun.kontak_penyedia && (
                            <div className="flex items-start gap-2 text-xs text-gray-700">
                              <Phone className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                              <a href={`tel:${tribun.kontak_penyedia}`} className="font-body hover:text-green-600 transition-colors">
                                <span className="font-semibold">Kontak:</span> {tribun.kontak_penyedia}
                              </a>
                            </div>
                          )}

                          <div className="flex items-start gap-2 text-xs text-gray-700">
                            <Users className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                            <span className="font-body">
                              <span className="font-semibold">Tersedia:</span> {tribunTersedia} / {tribun.total_kursi} kursi
                            </span>
                          </div>

                          <div className="flex items-start gap-2 text-xs text-gray-700">
                            <TrendingUp className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
                            <span className="font-body">
                              <span className="font-semibold">Terjual:</span> {tribunPercentage.toFixed(0)}%
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-3">
                          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className={`h-full transition-all duration-300 ${isFull ? "bg-red-500" : isAlmostFull ? "bg-yellow-500" : "bg-linear-to-r from-green-500 to-emerald-500"}`} style={{ width: `${tribunPercentage}%` }} />
                          </div>
                        </div>

                        {/* Deskripsi */}
                        {tribun.deskripsi && (
                          <div className="pt-3 border-t border-gray-100">
                            <p className="text-xs text-gray-600 font-body line-clamp-2">{tribun.deskripsi}</p>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-900 font-body">Total Tribun</p>
                  <p className="text-xl font-bold text-orange-600 font-heading">{tribunList.length}</p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-linear-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-medium font-body shadow-md hover:shadow-lg text-sm"
                >
                  Tutup
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
