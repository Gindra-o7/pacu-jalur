"use client";

import { useState } from "react";
import { Edit, Trash2, MapPin, Calendar, Loader2, Ticket } from "lucide-react";
import Image from "next/image";
import TribunSheet from "./TribunSheet";

type Acara = {
  id: string;
  nama: string;
  lokasi: string;
  image_url: string | null;
  deskripsi: string | null;
  tgl_mulai: string;
  tgl_selesai: string;
};

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

type AcaraCardProps = {
  acara: Acara;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting: boolean;
  tribunList: Tribun[];
  formatDate: (date: string) => string;
};

export default function AcaraCard({ acara, onEdit, onDelete, isDeleting, tribunList, formatDate }: AcaraCardProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg">
        {/* Image with Tribun Badge */}
        <div className="relative">
          {acara.image_url ? (
            <div className="relative h-40 w-full overflow-hidden bg-gray-100">
              <Image src={acara.image_url} alt={acara.nama} fill className="object-cover transition-transform duration-300 hover:scale-110" />
            </div>
          ) : (
            <div className="relative h-40 w-full bg-linear-to-br from-gray-100 to-gray-200" />
          )}

          {/* Tribun Count Badge - Top Right */}
          {tribunList.length > 0 && (
            <button
              onClick={() => setIsSheetOpen(true)}
              className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-linear-to-r from-orange-500 to-red-500 text-white rounded-full shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-medium font-body text-sm group"
            >
              <Ticket className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>{tribunList.length} Tribun</span>
            </button>
          )}
        </div>

        <div className="p-4">
          <div className="mb-2">
            <h3 className="text-lg font-bold text-gray-900 font-heading line-clamp-1 mb-1">{acara.nama}</h3>
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <MapPin className="w-4 h-4 shrink-0" />
              <span className="font-body truncate">{acara.lokasi}</span>
            </div>
          </div>

          <div className="text-xs text-gray-600 mb-2 font-body flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>
              {formatDate(acara.tgl_mulai)} - {formatDate(acara.tgl_selesai)}
            </span>
          </div>

          {acara.deskripsi && <p className="text-sm text-gray-600 line-clamp-2 mb-3 font-body">{acara.deskripsi}</p>}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-3 border-t border-gray-100">
            <button
              onClick={onEdit}
              className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 text-sm font-medium font-body flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={onDelete}
              disabled={isDeleting}
              className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 text-sm font-medium font-body disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-sm hover:shadow-md"
            >
              {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Tribun Sheet */}
      <TribunSheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)} tribunList={tribunList} acaraNama={acara.nama} />
    </>
  );
}
