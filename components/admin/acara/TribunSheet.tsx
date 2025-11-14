"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Users, Ticket, Phone, BadgeCheck } from "lucide-react";
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

type TribunSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  tribunList: Tribun[];
  acaraNama: string;
};

export default function TribunSheet({ isOpen, onClose, tribunList, acaraNama }: TribunSheetProps) {
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Sheet */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[500px] bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-linear-to-r from-orange-50 to-red-50">
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold text-gray-900 font-heading mb-1 truncate">Daftar Tribun</h2>
                <p className="text-sm text-gray-600 font-body truncate">{acaraNama}</p>
              </div>
              <button
                onClick={onClose}
                className="ml-4 p-2 text-gray-600 hover:bg-white rounded-lg transition-colors shrink-0"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {tribunList.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <Ticket className="w-16 h-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 font-body">Belum ada tribun untuk acara ini</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {tribunList.map((tribun, index) => {
                    const availability = ((tribun.total_kursi - tribun.kursi_terjual) / tribun.total_kursi) * 100;
                    const isAlmostFull = availability < 20 && availability > 0;
                    const isFull = tribun.kursi_terjual >= tribun.total_kursi;

                    return (
                      <motion.div
                        key={tribun.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-gray-900 font-heading mb-1">{tribun.nama_tribun}</h3>
                            <div className="flex items-center gap-2 mb-2">
                              <span
                                className={`text-xs px-2 py-1 rounded-full font-bold ${
                                  tribun.kategori === "VIP"
                                    ? "bg-linear-to-r from-purple-500 to-pink-500 text-white"
                                    : "bg-linear-to-r from-blue-500 to-cyan-500 text-white"
                                }`}
                              >
                                {tribun.kategori}
                              </span>
                              {isFull ? (
                                <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700 font-bold">PENUH</span>
                              ) : isAlmostFull ? (
                                <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 font-bold">HAMPIR PENUH</span>
                              ) : null}
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-2xl font-bold text-orange-600 font-heading">
                              Rp {tribun.harga_per_orang.toLocaleString("id-ID")}
                            </div>
                            <div className="text-xs text-gray-500 font-body">per orang</div>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="space-y-2 mb-3">
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <BadgeCheck className="w-4 h-4 text-blue-500 shrink-0" />
                            <span className="font-body">
                              <span className="font-semibold">Penyedia:</span> {tribun.nama_penyedia}
                            </span>
                          </div>

                          {tribun.kontak_penyedia && (
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                              <Phone className="w-4 h-4 text-green-500 shrink-0" />
                              <span className="font-body">
                                <span className="font-semibold">Kontak:</span> {tribun.kontak_penyedia}
                              </span>
                            </div>
                          )}

                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <Users className="w-4 h-4 text-orange-500 shrink-0" />
                            <span className="font-body">
                              <span className="font-semibold">Ketersediaan:</span> {tribun.total_kursi - tribun.kursi_terjual} / {tribun.total_kursi} kursi
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-3">
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all duration-300 ${
                                isFull ? "bg-red-500" : isAlmostFull ? "bg-yellow-500" : "bg-linear-to-r from-orange-500 to-red-500"
                              }`}
                              style={{ width: `${(tribun.kursi_terjual / tribun.total_kursi) * 100}%` }}
                            />
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-gray-500 font-body">{tribun.kursi_terjual} terjual</span>
                            <span className="text-xs text-gray-500 font-body">
                              {((tribun.kursi_terjual / tribun.total_kursi) * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>

                        {/* Deskripsi */}
                        {tribun.deskripsi && (
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <p className="text-sm text-gray-600 font-body">{tribun.deskripsi}</p>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900 font-body">Total Tribun</p>
                  <p className="text-2xl font-bold text-orange-600 font-heading">{tribunList.length}</p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-linear-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-medium font-body shadow-lg hover:shadow-xl"
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

