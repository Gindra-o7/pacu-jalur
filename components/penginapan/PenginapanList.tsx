"use client";

import { useState } from "react";
import { Search, Filter, Hotel, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PenginapanCard from "./PenginapanCard";

type Fasilitas = {
  id: string;
  nama: string;
};

type Penginapan = {
  id: string;
  nama: string;
  tipe: string;
  harga: string | null;
  image_url: string | null;
  deskripsi: string | null;
  rating: string | null;
  maps_url: string | null;
  fasilitas: Fasilitas[];
};

type PenginapanListProps = {
  penginapanList: Penginapan[];
  tipeList: string[];
};

export default function PenginapanList({ penginapanList, tipeList }: PenginapanListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTipe, setSelectedTipe] = useState<string>("all");

  const filteredPenginapan = penginapanList.filter((p) => {
    const matchSearch = p.nama.toLowerCase().includes(searchTerm.toLowerCase()) || p.tipe.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTipe = selectedTipe === "all" || p.tipe === selectedTipe;
    return matchSearch && matchTipe;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-heading">Penginapan & Hotel</h1>
        <div className="w-24 h-1 bg-linear-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-body">Temukan akomodasi terbaik untuk pengalaman festival Pacu Jalur yang tak terlupakan</p>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-md border border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <Hotel className="w-8 h-8 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900 font-heading">{penginapanList.length}</div>
          <div className="text-xs text-gray-600 font-body">Total Penginapan</div>
        </div>

        {tipeList.map((tipe, index) => {
          const count = penginapanList.filter((p) => p.tipe === tipe).length;
          const colors = ["from-green-500 to-emerald-500", "from-orange-500 to-red-500", "from-purple-500 to-pink-500"];
          return (
            <div key={tipe} className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <div className={`w-8 h-8 rounded-lg bg-linear-to-br ${colors[index % colors.length]} mb-2 flex items-center justify-center`}>
                <Star className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 font-heading">{count}</div>
              <div className="text-xs text-gray-600 font-body">{tipe}</div>
            </div>
          );
        })}
      </motion.div>

      {/* Filter & Search */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari penginapan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 font-body"
            />
          </div>

          {/* Filter */}
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={selectedTipe}
              onChange={(e) => setSelectedTipe(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 font-body appearance-none cursor-pointer"
            >
              <option value="all">Semua Tipe</option>
              {tipeList.map((tipe) => (
                <option key={tipe} value={tipe}>
                  {tipe}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters Info */}
        {(searchTerm || selectedTipe !== "all") && (
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 font-body">
            <span className="font-semibold">Menampilkan:</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">{filteredPenginapan.length} hasil</span>
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
                Clear search
              </button>
            )}
            {selectedTipe !== "all" && (
              <button onClick={() => setSelectedTipe("all")} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
                Clear filter
              </button>
            )}
          </div>
        )}
      </motion.div>

      {/* Penginapan Grid */}
      <AnimatePresence mode="wait">
        {filteredPenginapan.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-20 bg-white rounded-2xl shadow-md border border-gray-100"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-linear-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <Hotel className="w-10 h-10 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 font-heading">Tidak Ada Penginapan</h3>
            <p className="text-gray-600 font-body">Tidak ada penginapan yang sesuai dengan pencarian Anda</p>
          </motion.div>
        ) : (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPenginapan.map((penginapan, index) => (
              <PenginapanCard key={penginapan.id} penginapan={penginapan} index={index} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

