"use client";

import { Edit, Loader2 } from "lucide-react";
import Image from "next/image";

type GaleriFormData = {
  judul: string;
  caption: string;
  image: File | null;
  imagePreview: string;
};

type GaleriFormProps = {
  formData: GaleriFormData;
  onChange: (data: GaleriFormData) => void;
  onSubmit: () => void;
  onCancel?: () => void;
  isEditing: boolean;
  isUploading: boolean;
  isSaving: boolean;
};

export default function GaleriForm({ formData, onChange, onSubmit, onCancel, isEditing, isUploading, isSaving }: GaleriFormProps) {
  return (
    <div className="p-4 bg-gray-50 rounded-xl">
      <h3 className="font-semibold text-gray-900 mb-4 font-heading">{isEditing ? "Edit Galeri" : "Tambah Galeri Baru"}</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">Gambar *</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                onChange({ ...formData, image: file, imagePreview: URL.createObjectURL(file) });
              }
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body"
          />
          {formData.imagePreview && (
            <div className="mt-2 relative w-full h-48 rounded-lg overflow-hidden bg-gray-100">
              <Image src={formData.imagePreview} alt="Preview" fill className="object-cover" />
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">Judul</label>
          <input
            type="text"
            value={formData.judul}
            onChange={(e) => onChange({ ...formData, judul: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">Caption</label>
          <textarea
            value={formData.caption}
            onChange={(e) => onChange({ ...formData, caption: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body"
          />
        </div>
        <div className="flex gap-3">
          {isEditing && onCancel && (
            <button type="button" onClick={onCancel} className="flex-1 px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300 font-medium font-body">
              Batal
            </button>
          )}
          <button
            type="button"
            onClick={onSubmit}
            disabled={isUploading || isSaving || (!isEditing && !formData.image)}
            className="flex-1 px-4 py-2 rounded-xl bg-linear-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-medium font-body shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isUploading || isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {isUploading ? "Mengupload..." : "Menyimpan..."}
              </>
            ) : isEditing ? (
              "Update"
            ) : (
              "Tambah"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

