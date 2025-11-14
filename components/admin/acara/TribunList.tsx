"use client";

import { motion } from "framer-motion";
import { Trash2, Users, Ticket, Edit } from "lucide-react";

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

type TribunListProps = {
  tribunList: Tribun[];
  onEdit: (tribun: Tribun) => void;
  onDelete: (id: string, name: string) => void;
};

export default function TribunList({ tribunList, onEdit, onDelete }: TribunListProps) {
  if (tribunList.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
        <Ticket className="w-12 h-12 text-gray-300 mx-auto mb-2" />
        <p className="text-sm text-gray-500 font-body">Belum ada tribun</p>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3 font-body">
        Daftar Tribun ({tribunList.length})
      </label>
      <div className="space-y-2">
        {tribunList.map((tribun, index) => (
          <motion.div
            key={tribun.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                delay: index * 0.05,
                duration: 0.2,
              },
            }}
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg group transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-gray-900 font-heading">{tribun.nama_tribun}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                    tribun.kategori === 'VIP' 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {tribun.kategori}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm mb-1">
                  <span className="font-bold text-orange-600 font-body">
                    Rp {tribun.harga_per_orang.toLocaleString('id-ID')}/orang
                  </span>
                  <span className="text-gray-600 font-body flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {tribun.kursi_terjual}/{tribun.total_kursi} kursi
                  </span>
                </div>
                <p className="text-xs text-gray-600 font-body">
                  Penyedia: {tribun.nama_penyedia}
                  {tribun.kontak_penyedia && ` • ${tribun.kontak_penyedia}`}
                </p>
                {tribun.deskripsi && (
                  <p className="text-xs text-gray-500 mt-1 font-body line-clamp-1">{tribun.deskripsi}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onEdit(tribun)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(tribun.id, tribun.nama_tribun)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  title="Hapus"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

