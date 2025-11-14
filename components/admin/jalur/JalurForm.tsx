"use client";

import { useState, useEffect, useRef } from "react";
import { Loader2, Search, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

type WilayahSuggestion = {
  desa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
};

export default function JalurForm({ formData, onChange, onSubmit, onCancel, isEditing, isLoading }: JalurFormProps) {
  const [suggestions, setSuggestions] = useState<WilayahSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchingDesa, setSearchingDesa] = useState(false);
  const [desaInput, setDesaInput] = useState(formData.desa);
  const [autoFilled, setAutoFilled] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);

  // Sync desaInput dengan formData.desa saat form di-edit
  useEffect(() => {
    setDesaInput(formData.desa);
  }, [formData.desa]);

  // Close suggestions saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search desa dengan debounce
  useEffect(() => {
    const searchDesa = async () => {
      if (desaInput.length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setSearchingDesa(true);
      try {
        const response = await fetch(`/api/wilayah/search-desa?q=${encodeURIComponent(desaInput)}`);
        if (response.ok) {
          const { data } = await response.json();
          setSuggestions(data || []);
          setShowSuggestions(data && data.length > 0);
        }
      } catch (error) {
        console.error("Error searching desa:", error);
      } finally {
        setSearchingDesa(false);
      }
    };

    const timeoutId = setTimeout(searchDesa, 300);
    return () => clearTimeout(timeoutId);
  }, [desaInput]);

  const handleSelectDesa = (wilayah: WilayahSuggestion) => {
    setDesaInput(wilayah.desa);
    onChange({
      ...formData,
      desa: wilayah.desa,
      kecamatan: wilayah.kecamatan,
      kabupaten: wilayah.kabupaten,
      provinsi: wilayah.provinsi,
    });
    setShowSuggestions(false);
    
    // Show auto-fill animation
    setAutoFilled(true);
    setTimeout(() => setAutoFilled(false), 2000);
  };

  const handleDesaInputChange = (value: string) => {
    setDesaInput(value);
    onChange({ ...formData, desa: value });
  };

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
        <div className="relative" ref={suggestionRef}>
          <label className="block text-sm font-semibold text-gray-700 mb-2 font-body flex items-center gap-2">
            Desa *
            <span className="text-xs font-normal text-gray-500">(Ketik untuk mencari dan auto-fill)</span>
          </label>
          <div className="relative">
            <input
              type="text"
              required
              value={desaInput}
              onChange={(e) => handleDesaInputChange(e.target.value)}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              placeholder="Ketik nama desa..."
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body"
            />
            {searchingDesa && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
              </div>
            )}
            {!searchingDesa && desaInput.length >= 2 && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
            )}
          </div>
          
          {/* Suggestions Dropdown */}
          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10, scaleY: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scaleY: 1,
                  transition: {
                    duration: 0.2,
                    ease: [0.4, 0, 0.2, 1]
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  y: -10, 
                  scaleY: 0.8,
                  transition: {
                    duration: 0.15,
                    ease: "easeIn"
                  }
                }}
                style={{ transformOrigin: "top" }}
                className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-y-auto"
              >
                {suggestions.map((wilayah, index) => (
                  <motion.button
                    key={index}
                    type="button"
                    onClick={() => handleSelectDesa(wilayah)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      transition: {
                        delay: index * 0.03,
                        duration: 0.2
                      }
                    }}
                    whileHover={{ backgroundColor: "rgb(255 247 237)" }}
                    className="w-full px-4 py-3 text-left transition-colors duration-200 border-b border-gray-100 last:border-b-0 flex items-start gap-3"
                  >
                    <MapPin className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900 font-body">{wilayah.desa}</div>
                      <div className="text-xs text-gray-500 font-body mt-1">
                        {wilayah.kecamatan}, {wilayah.kabupaten}, {wilayah.provinsi}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">Kecamatan *</label>
          <motion.div
            animate={autoFilled ? {
              scale: [1, 1.02, 1],
              borderColor: ["rgb(209 213 219)", "rgb(249 115 22)", "rgb(209 213 219)"],
            } : {}}
            transition={{ duration: 0.5 }}
          >
            <input
              type="text"
              required
              value={formData.kecamatan}
              onChange={(e) => onChange({ ...formData, kecamatan: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body transition-all duration-300"
            />
          </motion.div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">Kabupaten *</label>
          <motion.div
            animate={autoFilled ? {
              scale: [1, 1.02, 1],
              borderColor: ["rgb(209 213 219)", "rgb(249 115 22)", "rgb(209 213 219)"],
            } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <input
              type="text"
              required
              value={formData.kabupaten}
              onChange={(e) => onChange({ ...formData, kabupaten: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body transition-all duration-300"
            />
          </motion.div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">Provinsi *</label>
          <motion.div
            animate={autoFilled ? {
              scale: [1, 1.02, 1],
              borderColor: ["rgb(209 213 219)", "rgb(249 115 22)", "rgb(209 213 219)"],
            } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <input
              type="text"
              required
              value={formData.provinsi}
              onChange={(e) => onChange({ ...formData, provinsi: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body transition-all duration-300"
            />
          </motion.div>
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

