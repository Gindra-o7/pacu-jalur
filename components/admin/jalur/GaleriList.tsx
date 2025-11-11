"use client";

import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";

type Galeri = {
  id: string;
  image_url: string;
  judul: string | null;
  caption: string | null;
  jalur_id: string;
};

type GaleriListProps = {
  galeriList: Galeri[];
  onEdit: (galeri: Galeri) => void;
  onDelete: (id: string, name: string) => void;
};

export default function GaleriList({ galeriList, onEdit, onDelete }: GaleriListProps) {
  if (galeriList.length === 0) {
    return <p className="text-sm text-gray-500 font-body">Tidak ada galeri</p>;
  }

  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-4 font-heading">Daftar Galeri</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {galeriList.map((galeri) => (
          <div key={galeri.id} className="relative group">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
              <Image src={galeri.image_url} alt={galeri.judul || "Galeri"} fill className="object-cover" />
            </div>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button onClick={() => onEdit(galeri)} className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Edit className="w-4 h-4" />
              </button>
              <button onClick={() => onDelete(galeri.id, galeri.judul || "Gambar")} className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            {galeri.judul && <p className="text-xs text-gray-600 mt-1 font-body truncate">{galeri.judul}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

