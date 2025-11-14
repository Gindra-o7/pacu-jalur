"use client";

import { useState } from "react";
import { Calendar, MapPin, Ticket, Clock, Filter, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import JadwalCard from "./JadwalCard";

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

type JadwalListProps = {
  upcomingEvents: Acara[];
  pastEvents: Acara[];
};

export default function JadwalList({ upcomingEvents, pastEvents }: JadwalListProps) {
  const [filter, setFilter] = useState<"upcoming" | "past" | "all">("upcoming");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const displayEvents = filter === "upcoming" ? upcomingEvents : filter === "past" ? pastEvents : [...upcomingEvents, ...pastEvents];

  const filterOptions = [
    { value: "upcoming", label: "Acara Mendatang", count: upcomingEvents.length, color: "text-green-600" },
    { value: "past", label: "Acara Selesai", count: pastEvents.length, color: "text-gray-600" },
    { value: "all", label: "Semua Acara", count: upcomingEvents.length + pastEvents.length, color: "text-orange-600" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-heading">Jadwal Acara Pacu Jalur</h1>
        <div className="w-24 h-1 bg-linear-to-r from-orange-500 to-red-500 mx-auto mb-6"></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-body">Jangan lewatkan festival budaya terbesar di Kuantan Singingi. Pesan tribun Anda sekarang!</p>
      </motion.div>

      {/* Filter Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <Filter className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 font-heading">Filter Acara</h3>
                <p className="text-sm text-gray-500 font-body">Pilih kategori acara yang ingin ditampilkan</p>
              </div>
            </div>

            {/* Desktop Filter Buttons */}
            <div className="hidden sm:flex gap-2">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilter(option.value as typeof filter)}
                  className={`px-4 py-2 rounded-xl font-medium font-body transition-all duration-300 flex items-center gap-2 ${
                    filter === option.value
                      ? "bg-linear-to-r from-orange-500 to-red-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <span>{option.label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${filter === option.value ? "bg-white/20" : "bg-gray-200"}`}>
                    {option.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Mobile Filter Dropdown */}
            <div className="sm:hidden w-full relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-full px-4 py-3 bg-linear-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium font-body flex items-center justify-between shadow-lg"
              >
                <span>{filterOptions.find((opt) => opt.value === filter)?.label}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-10"
                  >
                    {filterOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setFilter(option.value as typeof filter);
                          setIsFilterOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left font-body transition-colors flex items-center justify-between ${
                          filter === option.value ? "bg-orange-50 text-orange-600" : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <span className="font-medium">{option.label}</span>
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100">{option.count}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-linear-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 opacity-80" />
            <span className="text-sm font-medium opacity-90 font-body">Upcoming</span>
          </div>
          <div className="text-3xl font-bold font-heading">{upcomingEvents.length}</div>
          <div className="text-sm opacity-90 font-body">Acara Mendatang</div>
        </div>

        <div className="bg-linear-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Ticket className="w-8 h-8 opacity-80" />
            <span className="text-sm font-medium opacity-90 font-body">Available</span>
          </div>
          <div className="text-3xl font-bold font-heading">
            {upcomingEvents.reduce((sum, event) => sum + event.tribun.reduce((tSum, t) => tSum + (t.total_kursi - t.kursi_terjual), 0), 0)}
          </div>
          <div className="text-sm opacity-90 font-body">Kursi Tersedia</div>
        </div>

        <div className="bg-linear-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-8 h-8 opacity-80" />
            <span className="text-sm font-medium opacity-90 font-body">History</span>
          </div>
          <div className="text-3xl font-bold font-heading">{pastEvents.length}</div>
          <div className="text-sm opacity-90 font-body">Acara Selesai</div>
        </div>
      </motion.div>

      {/* Events List */}
      <AnimatePresence mode="wait">
        {displayEvents.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-20 bg-white rounded-2xl shadow-lg border border-gray-100"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-linear-to-br from-orange-100 to-red-100 flex items-center justify-center">
              <Calendar className="w-10 h-10 text-orange-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 font-heading">Tidak Ada Acara</h3>
            <p className="text-gray-600 font-body">
              {filter === "upcoming" ? "Belum ada acara yang dijadwalkan." : filter === "past" ? "Belum ada acara yang selesai." : "Tidak ada acara yang tersedia."}
            </p>
          </motion.div>
        ) : (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            {displayEvents.map((event, index) => (
              <JadwalCard key={event.id} event={event} index={index} isPast={filter === "past" || new Date(event.tgl_selesai) < new Date()} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

