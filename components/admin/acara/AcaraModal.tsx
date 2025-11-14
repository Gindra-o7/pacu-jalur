"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import AcaraForm from "./AcaraForm";
import TribunForm from "./TribunForm";
import TribunList from "./TribunList";

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

type AcaraFormData = {
  nama: string;
  lokasi: string;
  image_url: string;
  deskripsi: string;
  tgl_mulai: string;
  tgl_selesai: string;
};

type TribunFormData = {
  nama_penyedia: string;
  kontak_penyedia: string;
  nama_tribun: string;
  kategori: "REGULER" | "VIP";
  harga_per_orang: string;
  total_kursi: string;
  deskripsi: string;
};

type AcaraModalProps = {
  isOpen: boolean;
  onClose: () => void;
  editingAcara: Acara | null;
  activeTab: "info" | "tribun";
  onTabChange: (tab: "info" | "tribun") => void;
  // Acara form
  acaraFormData: AcaraFormData;
  onAcaraFormChange: (data: AcaraFormData) => void;
  onAcaraSubmit: (e: React.FormEvent) => void;
  onImageUpload: (file: File) => Promise<string>;
  // Tribun form
  tribunFormData: TribunFormData;
  onTribunFormChange: (data: TribunFormData) => void;
  tribunList: Tribun[];
  onTribunSubmit: () => void;
  onTribunEdit: (tribun: Tribun) => void;
  onTribunCancel: () => void;
  onTribunDelete: (id: string, name: string) => void;
  editingTribun: Tribun | null;
  // States
  saving: boolean;
  uploading: boolean;
  savingTribun: boolean;
};

export default function AcaraModal({
  isOpen,
  onClose,
  editingAcara,
  activeTab,
  onTabChange,
  acaraFormData,
  onAcaraFormChange,
  onAcaraSubmit,
  onImageUpload,
  tribunFormData,
  onTribunFormChange,
  tribunList,
  onTribunSubmit,
  onTribunEdit,
  onTribunCancel,
  onTribunDelete,
  editingTribun,
  saving,
  uploading,
  savingTribun,
}: AcaraModalProps) {
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
                  {editingAcara ? "Edit Acara" : "Tambah Acara Baru"}
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
                {editingAcara && (
                  <button
                    type="button"
                    onClick={() => onTabChange("tribun")}
                    className={`px-4 py-2 font-medium font-body transition-colors ${
                      activeTab === "tribun"
                        ? "text-orange-600 border-b-2 border-orange-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Tribun ({tribunList.length})
                  </button>
                )}
              </div>

              {/* Tab Content */}
              {activeTab === "info" && (
                <AcaraForm
                  formData={acaraFormData}
                  onChange={onAcaraFormChange}
                  onSubmit={onAcaraSubmit}
                  onCancel={onClose}
                  onImageUpload={onImageUpload}
                  isEditing={!!editingAcara}
                  isLoading={saving}
                  isUploading={uploading}
                />
              )}

              {activeTab === "tribun" && editingAcara && (
                <div className="space-y-6">
                  <TribunForm
                    formData={tribunFormData}
                    onChange={onTribunFormChange}
                    onSubmit={onTribunSubmit}
                    onCancel={onTribunCancel}
                    isEditing={!!editingTribun}
                    isLoading={savingTribun}
                    disabled={false}
                  />
                  <TribunList tribunList={tribunList} onEdit={onTribunEdit} onDelete={onTribunDelete} />
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

