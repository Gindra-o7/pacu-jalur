"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import JalurForm from "./JalurForm";
import GaleriForm from "./GaleriForm";
import GaleriList from "./GaleriList";
import MedsosForm from "./MedsosForm";
import MedsosList from "./MedsosList";

type Jalur = {
  id: string;
  nama: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  deskripsi: string | null;
};

type Galeri = {
  id: string;
  image_url: string;
  judul: string | null;
  caption: string | null;
  jalur_id: string;
};

type Medsos = {
  id: string;
  media: "FACEBOOK" | "INSTAGRAM" | "TWITTER" | "TIKTOK" | "YOUTUBE";
  link: string;
  jalur_id: string;
};

type JalurFormData = {
  nama: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  deskripsi: string;
};

type GaleriFormData = {
  judul: string;
  caption: string;
  image: File | null;
  imagePreview: string;
};

type MedsosFormData = {
  media: "FACEBOOK" | "INSTAGRAM" | "TWITTER" | "TIKTOK" | "YOUTUBE";
  link: string;
};

type JalurModalProps = {
  isOpen: boolean;
  onClose: () => void;
  editingJalur: Jalur | null;
  activeTab: "info" | "galeri" | "medsos";
  onTabChange: (tab: "info" | "galeri" | "medsos") => void;
  // Form data
  jalurFormData: JalurFormData;
  onJalurFormChange: (data: JalurFormData) => void;
  onJalurSubmit: (e: React.FormEvent) => void;
  galeriFormData: GaleriFormData;
  onGaleriFormChange: (data: GaleriFormData) => void;
  medsosFormData: MedsosFormData;
  onMedsosFormChange: (data: MedsosFormData) => void;
  // Lists
  galeriList: Galeri[];
  medsosList: Medsos[];
  // Handlers
  onGaleriSubmit: () => void;
  onGaleriEdit: (galeri: Galeri) => void;
  onGaleriCancel: () => void;
  onGaleriDelete: (id: string, name: string) => void;
  onMedsosSubmit: () => void;
  onMedsosEdit: (medsos: Medsos) => void;
  onMedsosCancel: () => void;
  onMedsosDelete: (id: string, name: string) => void;
  // States
  editingGaleri: Galeri | null;
  editingMedsos: Medsos | null;
  saving: boolean;
  uploading: boolean;
  savingGaleri: boolean;
  savingMedsos: boolean;
  mediaLabels: { [key: string]: string };
};

export default function JalurModal({
  isOpen,
  onClose,
  editingJalur,
  activeTab,
  onTabChange,
  jalurFormData,
  onJalurFormChange,
  onJalurSubmit,
  galeriFormData,
  onGaleriFormChange,
  medsosFormData,
  onMedsosFormChange,
  galeriList,
  medsosList,
  onGaleriSubmit,
  onGaleriEdit,
  onGaleriCancel,
  onGaleriDelete,
  onMedsosSubmit,
  onMedsosEdit,
  onMedsosCancel,
  onMedsosDelete,
  editingGaleri,
  editingMedsos,
  saving,
  uploading,
  savingGaleri,
  savingMedsos,
  mediaLabels,
}: JalurModalProps) {
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
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-6 md:p-8 pointer-events-auto max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 font-heading">{editingJalur ? "Edit Jalur" : "Tambah Jalur Baru"}</h2>
                <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-6 border-b border-gray-200">
                <button
                  onClick={() => onTabChange("info")}
                  className={`px-4 py-2 font-medium font-body transition-colors ${activeTab === "info" ? "text-orange-600 border-b-2 border-orange-600" : "text-gray-600 hover:text-gray-900"}`}
                >
                  Informasi
                </button>
                {editingJalur && (
                  <>
                    <button
                      onClick={() => onTabChange("galeri")}
                      className={`px-4 py-2 font-medium font-body transition-colors ${activeTab === "galeri" ? "text-orange-600 border-b-2 border-orange-600" : "text-gray-600 hover:text-gray-900"}`}
                    >
                      Galeri ({galeriList.length})
                    </button>
                    <button
                      onClick={() => onTabChange("medsos")}
                      className={`px-4 py-2 font-medium font-body transition-colors ${activeTab === "medsos" ? "text-orange-600 border-b-2 border-orange-600" : "text-gray-600 hover:text-gray-900"}`}
                    >
                      Media Sosial ({medsosList.length})
                    </button>
                  </>
                )}
              </div>

              {/* Tab Content */}
              {activeTab === "info" && (
                <JalurForm formData={jalurFormData} onChange={onJalurFormChange} onSubmit={onJalurSubmit} onCancel={onClose} isEditing={!!editingJalur} isLoading={saving} />
              )}

              {activeTab === "galeri" && editingJalur && (
                <div className="space-y-6">
                  <GaleriForm
                    formData={galeriFormData}
                    onChange={onGaleriFormChange}
                    onSubmit={onGaleriSubmit}
                    onCancel={onGaleriCancel}
                    isEditing={!!editingGaleri}
                    isUploading={uploading}
                    isSaving={savingGaleri}
                  />
                  <GaleriList galeriList={galeriList} onEdit={onGaleriEdit} onDelete={onGaleriDelete} />
                </div>
              )}

              {activeTab === "medsos" && editingJalur && (
                <div className="space-y-6">
                  <MedsosForm
                    formData={medsosFormData}
                    onChange={onMedsosFormChange}
                    onSubmit={onMedsosSubmit}
                    onCancel={onMedsosCancel}
                    isEditing={!!editingMedsos}
                    isSaving={savingMedsos}
                    mediaLabels={mediaLabels}
                  />
                  <MedsosList medsosList={medsosList} onEdit={onMedsosEdit} onDelete={onMedsosDelete} mediaLabels={mediaLabels} />
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

