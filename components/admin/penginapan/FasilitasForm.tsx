"use client";

import { Plus, Loader2 } from "lucide-react";

type FasilitasFormProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  disabled: boolean;
};

export default function FasilitasForm({ value, onChange, onSubmit, isLoading, disabled }: FasilitasFormProps) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">
        Tambah Fasilitas
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Contoh: WiFi Gratis, AC, Kolam Renang..."
          disabled={disabled}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <button
          type="button"
          onClick={onSubmit}
          disabled={isLoading || !value.trim() || disabled}
          className="px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-300 font-medium font-body disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-md hover:shadow-lg"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
        </button>
      </div>
      {disabled && (
        <p className="text-xs text-gray-500 mt-2 font-body">Simpan penginapan terlebih dahulu untuk menambah fasilitas</p>
      )}
    </div>
  );
}

