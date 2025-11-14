"use client";

import { useState } from "react";
import { Calendar, MapPin, Ticket, Clock, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import TribunModal from "./TribunModal";

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

type Acara = {
  id: string;
  nama: string;
  lokasi: string;
  image_url: string | null;
  deskripsi: string | null;
  tgl_mulai: string;
  tgl_selesai: string;
  tribun: Tribun[];
};

type JadwalCardProps = {
  event: Acara;
  index: number;
  isPast: boolean;
};

export default function JadwalCard({ event, index, isPast }: JadwalCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDateShort = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  };

  const getDaysUntil = (dateString: string) => {
    const target = new Date(dateString);
    const now = new Date();
    const diff = target.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  const getGoogleMapsUrl = (location: string) => {
    const encodedLocation = encodeURIComponent(location);
    return `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
  };

  const totalKursi = event.tribun.reduce((sum, t) => sum + t.total_kursi, 0);
  const terjual = event.tribun.reduce((sum, t) => sum + t.kursi_terjual, 0);
  const tersedia = totalKursi - terjual;
  const percentage = totalKursi > 0 ? (terjual / totalKursi) * 100 : 0;
  const daysUntil = getDaysUntil(event.tgl_mulai);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`bg-white rounded-lg shadow-sm border overflow-hidden transition-all duration-300 hover:shadow-md ${isPast ? "border-gray-200 opacity-75" : "border-orange-100"}`}
      >
        <div className="flex flex-col sm:flex-row">
          {/* Image Section */}
          <div className="relative h-40 sm:h-auto sm:w-48 shrink-0">
            {event.image_url ? (
              <Image src={event.image_url} alt={event.nama} fill className="object-cover" />
            ) : (
              <div className="absolute inset-0 bg-linear-to-br from-orange-200 via-red-200 to-orange-300 flex items-center justify-center">
                <Calendar className="w-12 h-12 text-white/50" />
              </div>
            )}

            {/* Status Badge */}
            <div className="absolute top-2 left-2">
              {isPast ? (
                <div className="px-2 py-1 bg-gray-900/90 backdrop-blur-sm text-white rounded-full text-[10px] font-bold shadow-md font-body">Selesai</div>
              ) : daysUntil <= 7 && daysUntil > 0 ? (
                <div className="px-2 py-1 bg-red-500/90 backdrop-blur-sm text-white rounded-full text-[10px] font-bold shadow-md font-body animate-pulse">{daysUntil} Hari!</div>
              ) : (
                <div className="px-2 py-1 bg-green-500/90 backdrop-blur-sm text-white rounded-full text-[10px] font-bold shadow-md font-body">Upcoming</div>
              )}
            </div>

            {/* Tribun Count Badge */}
            {event.tribun.length > 0 && (
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-white/95 backdrop-blur-sm rounded-full shadow-md flex items-center gap-1">
                <Ticket className="w-3 h-3 text-orange-500" />
                <span className="text-[10px] font-bold text-gray-900 font-body">{event.tribun.length}</span>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="flex-1 p-4">
            {/* Header */}
            <div className="mb-3">
              <h2 className="text-lg font-bold text-gray-900 mb-2 font-heading line-clamp-1">{event.nama}</h2>

              <div className="space-y-1.5 mb-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                  <span className="font-body text-xs">
                    <span className="font-semibold text-gray-900">{formatDateShort(event.tgl_mulai)}</span>
                    <span className="text-gray-500"> - {formatDateShort(event.tgl_selesai)}</span>
                  </span>
                </div>

                <a href={getGoogleMapsUrl(event.lokasi)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group">
                  <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-body text-xs truncate">
                    <span className="font-semibold text-gray-900 group-hover:text-blue-600">{event.lokasi}</span>
                    <ExternalLink className="w-3 h-3 inline-block ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </a>

                {!isPast && daysUntil > 0 && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-3.5 h-3.5 text-green-500 shrink-0" />
                    <span className="font-body text-xs">
                      <span className="font-semibold text-gray-900">{daysUntil} hari</span>
                      <span className="text-gray-500"> lagi</span>
                    </span>
                  </div>
                )}
              </div>

              {event.deskripsi && <p className="text-xs text-gray-600 line-clamp-2 font-body leading-relaxed">{event.deskripsi}</p>}
            </div>

            {/* Ticket Stats */}
            {totalKursi > 0 && (
              <div className="bg-linear-to-br from-orange-50 to-red-50 rounded-md p-3 mb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Ticket className="w-3.5 h-3.5 text-orange-600" />
                    <span className="text-xs font-bold text-gray-900 font-heading">Tiket</span>
                  </div>
                  <div className="text-[10px] font-semibold text-orange-600 font-body">{percentage.toFixed(0)}%</div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-2">
                  <div className="text-center">
                    <div className="text-sm font-bold text-gray-900 font-heading">{totalKursi}</div>
                    <div className="text-[9px] text-gray-600 font-body">Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-orange-600 font-heading">{terjual}</div>
                    <div className="text-[9px] text-gray-600 font-body">Terjual</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-green-600 font-heading">{tersedia}</div>
                    <div className="text-[9px] text-gray-600 font-body">Tersedia</div>
                  </div>
                </div>

                <div className="h-1.5 bg-white rounded-full overflow-hidden">
                  <div className="h-full bg-linear-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500" style={{ width: `${percentage}%` }} />
                </div>
              </div>
            )}

            {/* View Tribun Button */}
            {event.tribun.length > 0 && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full px-3 py-2 bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-md font-semibold transition-all duration-300 shadow-sm hover:shadow-md font-body text-xs"
              >
                Lihat {event.tribun.length} Tribun
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Tribun Modal */}
      <TribunModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} tribunList={event.tribun} eventName={event.nama} />
    </>
  );
}
