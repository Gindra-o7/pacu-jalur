"use client";

import { Plus, Loader2, Edit2 } from "lucide-react";

type TribunFormData = {
  nama_penyedia: string;
  kontak_penyedia: string;
  nama_tribun: string;
  kategori: "REGULER" | "VIP";
  harga_per_orang: string;
  total_kursi: string;
  deskripsi: string;
};

type TribunFormProps = {
  formData: TribunFormData;
  onChange: (data: TribunFormData) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isEditing: boolean;
  isLoading: boolean;
  disabled: boolean;
};

export default function TribunForm({
  formData,
  onChange,
  onSubmit,
  onCancel,
  isEditing,
  isLoading,
  disabled,
}: TribunFormProps) {
  // Format number to Indonesian currency format
  const formatCurrency = (value: string): string => {
    const numbers = value.replace(/\D/g, "");
    
    if (!numbers) return "";
    
    const formatted = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(parseInt(numbers));
    
    return formatted;
  };

  // Parse currency format back to plain number string
  const parseCurrency = (formatted: string): string => {
    return formatted.replace(/\D/g, "");
  };

  const handleHargaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const plainNumber = parseCurrency(inputValue);
    const formatted = formatCurrency(plainNumber);
    
    onChange({ ...formData, harga_per_orang: formatted });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3 font-body">
        {isEditing ? "Edit Tribun" : "Tambah Tribun"}
      </label>
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Nama Penyedia & Kontak */}
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            value={formData.nama_penyedia}
            onChange={(e) => onChange({ ...formData, nama_penyedia: e.target.value })}
            placeholder="Nama Penyedia *"
            disabled={disabled}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <input
            type="text"
            value={formData.kontak_penyedia}
            onChange={(e) => onChange({ ...formData, kontak_penyedia: e.target.value })}
            placeholder="Kontak (081234567890)"
            disabled={disabled}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body text-sm disabled:bg-gray-100"
          />
        </div>
        
        {/* Nama Tribun & Kategori */}
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            value={formData.nama_tribun}
            onChange={(e) => onChange({ ...formData, nama_tribun: e.target.value })}
            placeholder="Nama Tribun (Tribun Utara) *"
            disabled={disabled}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <select
            value={formData.kategori}
            onChange={(e) => onChange({ ...formData, kategori: e.target.value as "REGULER" | "VIP" })}
            disabled={disabled}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body text-sm disabled:bg-gray-100"
          >
            <option value="REGULER">Reguler</option>
            <option value="VIP">VIP</option>
          </select>
        </div>

        {/* Harga & Total Kursi */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <input
              type="text"
              value={formData.harga_per_orang}
              onChange={handleHargaChange}
              placeholder="Harga/Orang (50000) *"
              disabled={disabled}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body text-sm disabled:bg-gray-100"
            />
            <p className="text-[10px] text-gray-500 mt-1 font-body">
              Format otomatis: Rp XX.XXX
            </p>
          </div>
          <input
            type="number"
            value={formData.total_kursi}
            onChange={(e) => onChange({ ...formData, total_kursi: e.target.value })}
            placeholder="Total Kursi *"
            disabled={disabled}
            required
            min="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body text-sm disabled:bg-gray-100"
          />
        </div>

        {/* Deskripsi */}
        <textarea
          value={formData.deskripsi}
          onChange={(e) => onChange({ ...formData, deskripsi: e.target.value })}
          placeholder="Deskripsi tribun (opsional)"
          disabled={disabled}
          rows={2}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body text-sm disabled:bg-gray-100 resize-none"
        />

        {/* Buttons */}
        <div className="flex gap-2">
          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium font-body text-sm"
            >
              Batal
            </button>
          )}
          <button
            type="submit"
            disabled={isLoading || !formData.nama_penyedia.trim() || !formData.nama_tribun.trim() || disabled}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 font-medium font-body text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isEditing ? (
              <>
                <Edit2 className="w-4 h-4" />
                Update
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Tambah
              </>
            )}
          </button>
        </div>
        {disabled && (
          <p className="text-xs text-gray-500 font-body">Simpan acara terlebih dahulu untuk menambah tribun</p>
        )}
      </form>
    </div>
  );
}

