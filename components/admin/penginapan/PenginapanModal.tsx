"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import PenginapanForm from "./PenginapanForm";
import FasilitasForm from "./FasilitasForm";
import FasilitasList from "./FasilitasList";

type Penginapan = {
  id: string;
  nama: string;
  tipe: string;
  harga: string | null;
  image_url: string | null;
  deskripsi: string | null;
  rating: string | null;
  maps_url: string | null;
};

type Fasilitas = {
  id: string;
  nama: string;
  penginapan_id: string;
};

type PenginapanFormData = {
  nama: string;
  tipe: string;
  harga: string;
  image_url: string;
  deskripsi: string;
  rating: string;
  maps_url: string;
};

type PenginapanModalProps = {
  isOpen: boolean;
  onClose: () => void;
  editingPenginapan: Penginapan | null;
  activeTab: "info" | "fasilitas";
  onTabChange: (tab: "info" | "fasilitas") => void;
  // Form data
  penginapanFormData: PenginapanFormData;
  onPenginapanFormChange: (data: PenginapanFormData) => void;
  onPenginapanSubmit: (e: React.FormEvent) => void;
  onImageUpload: (file: File) => Promise<string>;
  fasilitasValue: string;
  onFasilitasChange: (value: string) => void;
  fasilitasList: Fasilitas[];
  onFasilitasSubmit: () => void;
  onFasilitasDelete: (id: string, name: string) => void;
  // States
  saving: boolean;
  uploading: boolean;
  savingFasilitas: boolean;
};

export default function PenginapanModal({
  isOpen,
  onClose,
  editingPenginapan,
  activeTab,
  onTabChange,
  penginapanFormData,
  onPenginapanFormChange,
  onPenginapanSubmit,
  onImageUpload,
  fasilitasValue,
  onFasilitasChange,
  fasilitasList,
  onFasilitasSubmit,
  onFasilitasDelete,
  saving,
  uploading,
  savingFasilitas,
}: PenginapanModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-6 md:p-8 pointer-events-auto max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 font-heading">
                  {editingPenginapan ? "Edit Penginapan" : "Tambah Penginapan Baru"}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-6 border-b border-gray-200">
                <button
                  type="button"
                  onClick={() => onTabChange("info")}
                  className={`px-4 py-2 font-medium font-body transition-colors ${
                    activeTab === "info"
                      ? "text-orange-600 border-b-2 border-orange-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Informasi
                </button>
                {editingPenginapan && (
                  <button
                    type="button"
                    onClick={() => onTabChange("fasilitas")}
                    className={`px-4 py-2 font-medium font-body transition-colors ${
                      activeTab === "fasilitas"
                        ? "text-orange-600 border-b-2 border-orange-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Fasilitas ({fasilitasList.length})
                  </button>
                )}
              </div>

              {/* Tab Content */}
              {activeTab === "info" && (
                <PenginapanForm
                  formData={penginapanFormData}
                  onChange={onPenginapanFormChange}
                  onSubmit={onPenginapanSubmit}
                  onCancel={onClose}
                  onImageUpload={onImageUpload}
                  isEditing={!!editingPenginapan}
                  isLoading={saving}
                  isUploading={uploading}
                />
              )}

              {activeTab === "fasilitas" && editingPenginapan && (
                <div className="space-y-6">
                  <FasilitasForm
                    value={fasilitasValue}
                    onChange={onFasilitasChange}
                    onSubmit={onFasilitasSubmit}
                    isLoading={savingFasilitas}
                    disabled={false}
                  />
                  <FasilitasList fasilitasList={fasilitasList} onDelete={onFasilitasDelete} />
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

