"use client";

import { useState } from "react";
import { Edit, Loader2, Upload, X } from "lucide-react";
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
  const [isDragging, setIsDragging] = useState(false);

  const validateAndSetFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('File harus berupa gambar');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file maksimal 5MB');
      return;
    }

    onChange({ ...formData, image: file, imagePreview: URL.createObjectURL(file) });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const handleRemoveImage = () => {
    onChange({ ...formData, image: null, imagePreview: '' });
  };

  return (
    <div className="p-4 bg-gray-50 rounded-xl">
      <h3 className="font-semibold text-gray-900 mb-4 font-heading">{isEditing ? "Edit Galeri" : "Tambah Galeri Baru"}</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">Gambar *</label>
          {formData.imagePreview ? (
            <div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-gray-200">
              <Image src={formData.imagePreview} alt="Preview" fill className="object-cover" />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className={`block w-full h-48 border-2 border-dashed rounded-xl transition-all duration-300 cursor-pointer ${
                isDragging
                  ? 'border-orange-500 bg-orange-100 scale-105'
                  : 'border-gray-300 bg-gray-50 hover:border-orange-500 hover:bg-orange-50'
              }`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                disabled={isUploading}
                id="galeri-image-input"
              />
              <label htmlFor="galeri-image-input" className="flex flex-col items-center justify-center h-full cursor-pointer">
                {isUploading ? (
                  <>
                    <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-2" />
                    <p className="text-sm text-gray-600 font-body">Mengupload...</p>
                  </>
                ) : (
                  <>
                    <Upload className={`w-12 h-12 mb-2 transition-colors ${isDragging ? 'text-orange-500' : 'text-gray-400'}`} />
                    <p className="text-sm text-gray-600 font-body font-semibold">
                      {isDragging ? 'Drop gambar di sini' : 'Drag & Drop atau Klik untuk upload'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 font-body">PNG, JPG, WEBP (Max 5MB)</p>
                  </>
                )}
              </label>
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

