"use client";

import { useState } from "react";
import { Loader2, Upload, X } from "lucide-react";
import Image from "next/image";

type PenginapanFormData = {
  nama: string;
  tipe: string;
  harga: string;
  image_url: string;
  deskripsi: string;
  rating: string;
  maps_url: string;
};

type PenginapanFormProps = {
  formData: PenginapanFormData;
  onChange: (data: PenginapanFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  onImageUpload: (file: File) => Promise<string>;
  isEditing: boolean;
  isLoading: boolean;
  isUploading: boolean;
};

export default function PenginapanForm({ formData, onChange, onSubmit, onCancel, onImageUpload, isEditing, isLoading, isUploading }: PenginapanFormProps) {
  const [imagePreview, setImagePreview] = useState<string>(formData.image_url);
  const [isDragging, setIsDragging] = useState(false);

  // Format number to Indonesian currency format
  const formatCurrency = (value: string): string => {
    // Remove all non-digit characters
    const numbers = value.replace(/\D/g, "");

    if (!numbers) return "";

    // Convert to number and format
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

    onChange({ ...formData, harga: formatted });
  };

  const validateAndUploadFile = async (file: File) => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("File harus berupa gambar");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran file maksimal 5MB");
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload image
    try {
      const imageUrl = await onImageUpload(file);
      onChange({ ...formData, image_url: imageUrl });
    } catch (error) {
      console.error("Error uploading image:", error);
      setImagePreview(formData.image_url);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await validateAndUploadFile(file);
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

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      await validateAndUploadFile(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview("");
    onChange({ ...formData, image_url: "" });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Image Upload */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">Gambar Penginapan</label>
        {imagePreview ? (
          <div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-gray-200">
            <Image src={imagePreview} alt="Preview" fill className="object-cover" />
            <button type="button" onClick={handleRemoveImage} className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-lg">
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
              isDragging ? "border-orange-500 bg-orange-100 scale-105" : "border-gray-300 bg-gray-50 hover:border-orange-500 hover:bg-orange-50"
            }`}
          >
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" disabled={isUploading} id="penginapan-image-input" />
            <label htmlFor="penginapan-image-input" className="flex flex-col items-center justify-center h-full cursor-pointer">
              {isUploading ? (
                <>
                  <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-2" />
                  <p className="text-sm text-gray-600 font-body">Mengupload...</p>
                </>
              ) : (
                <>
                  <Upload className={`w-12 h-12 mb-2 transition-colors ${isDragging ? "text-orange-500" : "text-gray-400"}`} />
                  <p className="text-sm text-gray-600 font-body font-semibold">{isDragging ? "Drop gambar di sini" : "Drag & Drop atau Klik untuk upload"}</p>
                  <p className="text-xs text-gray-500 mt-1 font-body">PNG, JPG, WEBP (Max 5MB)</p>
                </>
              )}
            </label>
          </div>
        )}
      </div>

      {/* Nama */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">Nama Penginapan *</label>
        <input
          type="text"
          required
          value={formData.nama}
          onChange={(e) => onChange({ ...formData, nama: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body"
          placeholder="Contoh: Hotel Tepian Narosa"
        />
      </div>

      {/* Tipe & Harga */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">Tipe *</label>
          <select
            required
            value={formData.tipe}
            onChange={(e) => onChange({ ...formData, tipe: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body"
          >
            <option value="">Pilih Tipe</option>
            <option value="Hotel">Hotel</option>
            <option value="Penginapan">Penginapan</option>
            <option value="Homestay">Homestay</option>
            <option value="Villa">Villa</option>
            <option value="Guest House">Guest House</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">Harga per Malam</label>
          <input
            type="text"
            value={formData.harga}
            onChange={handleHargaChange}
            placeholder="Contoh: 200000"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body"
          />
          <p className="text-xs text-gray-500 mt-1 font-body">Ketik angka saja, format otomatis akan diterapkan</p>
        </div>
      </div>

      {/* Rating & Maps URL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">Rating</label>
          <input
            type="text"
            value={formData.rating}
            onChange={(e) => onChange({ ...formData, rating: e.target.value })}
            placeholder="Contoh: 4.5"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">URL Maps</label>
          <input
            type="url"
            value={formData.maps_url}
            onChange={(e) => onChange({ ...formData, maps_url: e.target.value })}
            placeholder="https://maps.google.com/..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body"
          />
        </div>
      </div>

      {/* Deskripsi */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">Deskripsi</label>
        <textarea
          value={formData.deskripsi}
          onChange={(e) => onChange({ ...formData, deskripsi: e.target.value })}
          rows={4}
          placeholder="Deskripsi penginapan..."
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body resize-none"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <button type="button" onClick={onCancel} className="flex-1 px-4 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300 font-medium font-body">
          Batal
        </button>
        <button
          type="submit"
          disabled={isLoading || isUploading}
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
