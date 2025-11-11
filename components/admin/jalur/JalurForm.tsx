"use client";

import { Loader2 } from "lucide-react";

type JalurFormData = {
  nama: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  deskripsi: string;
};

type JalurFormProps = {
  formData: JalurFormData;
  onChange: (data: JalurFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isEditing: boolean;
  isLoading: boolean;
};

export default function JalurForm({ formData, onChange, onSubmit, onCancel, isEditing, isLoading }: JalurFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">Nama Jalur *</label>
        <input
          type="text"
          required
          value={formData.nama}
          onChange={(e) => onChange({ ...formData, nama: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">Desa *</label>
          <input
            type="text"
            required
            value={formData.desa}
            onChange={(e) => onChange({ ...formData, desa: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">Kecamatan *</label>
          <input
            type="text"
            required
            value={formData.kecamatan}
            onChange={(e) => onChange({ ...formData, kecamatan: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">Kabupaten *</label>
          <input
            type="text"
            required
            value={formData.kabupaten}
            onChange={(e) => onChange({ ...formData, kabupaten: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">Provinsi *</label>
          <input
            type="text"
            required
            value={formData.provinsi}
            onChange={(e) => onChange({ ...formData, provinsi: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">Deskripsi</label>
        <textarea
          value={formData.deskripsi}
          onChange={(e) => onChange({ ...formData, deskripsi: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body"
        />
      </div>
      <div className="flex gap-3 pt-4">
        <button type="button" onClick={onCancel} className="flex-1 px-4 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300 font-medium font-body">
          Batal
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 px-4 py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-medium font-body shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Menyimpan...
            </>
          ) : isEditing ? (
            "Update"
          ) : (
            "Simpan"
          )}
        </button>
      </div>
    </form>
  );
}

