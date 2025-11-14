"use client";

import { motion } from "framer-motion";
import { Trash2, Wifi } from "lucide-react";

type Fasilitas = {
  id: string;
  nama: string;
  penginapan_id: string;
};

type FasilitasListProps = {
  fasilitasList: Fasilitas[];
  onDelete: (id: string, name: string) => void;
};

export default function FasilitasList({ fasilitasList, onDelete }: FasilitasListProps) {
  if (fasilitasList.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
        <Wifi className="w-12 h-12 text-gray-300 mx-auto mb-2" />
        <p className="text-sm text-gray-500 font-body">Belum ada fasilitas</p>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3 font-body">
        Daftar Fasilitas ({fasilitasList.length})
      </label>
      <div className="flex flex-wrap gap-2">
        {fasilitasList.map((fasilitas, index) => (
          <motion.div
            key={fasilitas.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: {
                delay: index * 0.05,
                duration: 0.2
              }
            }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 text-gray-700 rounded-lg text-sm font-body group transition-all duration-200 hover:shadow-md"
          >
            <Wifi className="w-4 h-4 text-orange-500" />
            <span className="font-medium">{fasilitas.nama}</span>
            <button
              type="button"
              onClick={() => onDelete(fasilitas.id, fasilitas.nama)}
              className="text-red-600 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

