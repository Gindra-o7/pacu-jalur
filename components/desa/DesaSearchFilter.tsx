"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";
import { motion } from "framer-motion";

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

type DesaSearchFilterProps = {
  desaList: DesaData[];
  onFilteredChange: (filtered: DesaData[]) => void;
};

export default function DesaSearchFilter({ desaList, onFilteredChange }: DesaSearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKecamatan, setSelectedKecamatan] = useState<string>("all");
  const [showFilter, setShowFilter] = useState(false);

  // Get unique kecamatan list
  const kecamatanList = useMemo(() => {
    const kecamatanSet = new Set<string>();
    desaList.forEach((desa) => {
      kecamatanSet.add(desa.kecamatan);
    });
    return Array.from(kecamatanSet).sort();
  }, [desaList]);

  // Filter desa based on search and filter
  const filteredDesa = useMemo(() => {
    let filtered = [...desaList];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((desa) => {
        const matchesDesa = desa.desa.toLowerCase().includes(query);
        const matchesKecamatan = desa.kecamatan.toLowerCase().includes(query);
        const matchesJalur = desa.jalur.some((jalur) => jalur.nama.toLowerCase().includes(query));
        return matchesDesa || matchesKecamatan || matchesJalur;
      });
    }

    // Kecamatan filter
    if (selectedKecamatan !== "all") {
      filtered = filtered.filter((desa) => desa.kecamatan === selectedKecamatan);
    }

    return filtered;
  }, [desaList, searchQuery, selectedKecamatan]);

  // Notify parent component of filtered changes
  useEffect(() => {
    onFilteredChange(filteredDesa);
  }, [filteredDesa, onFilteredChange]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedKecamatan("all");
  };

  const hasActiveFilters = searchQuery.trim() !== "" || selectedKecamatan !== "all";

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 mb-6">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Cari desa, kecamatan, atau jalur..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent font-body"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-body text-sm font-medium"
        >
          <Filter className="w-4 h-4" />
          Filter
          {hasActiveFilters && (
            <span className="px-2 py-0.5 bg-orange-500 text-white text-xs rounded-full">
              {selectedKecamatan !== "all" ? 1 : 0}
            </span>
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-orange-600 hover:text-orange-700 font-medium font-body transition-colors"
          >
            Hapus Filter
          </button>
        )}

        <div className="text-sm text-gray-600 font-body">
          Menampilkan <span className="font-semibold text-gray-900">{filteredDesa.length}</span> dari{" "}
          <span className="font-semibold text-gray-900">{desaList.length}</span> desa
        </div>
      </div>

      {/* Filter Dropdown */}
      {showFilter && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-4 pt-4 border-t border-gray-200"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2 font-body">Kecamatan</label>
            <select
              value={selectedKecamatan}
              onChange={(e) => setSelectedKecamatan(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent font-body"
            >
              <option value="all">Semua Kecamatan</option>
              {kecamatanList.map((kecamatan) => (
                <option key={kecamatan} value={kecamatan}>
                  {kecamatan}
                </option>
              ))}
            </select>
          </div>
        </motion.div>
      )}
    </div>
  );
}

