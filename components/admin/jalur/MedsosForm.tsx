"use client";

import { Loader2 } from "lucide-react";

type MedsosFormData = {
  media: "FACEBOOK" | "INSTAGRAM" | "TWITTER" | "TIKTOK" | "YOUTUBE";
  link: string;
};

type MedsosFormProps = {
  formData: MedsosFormData;
  onChange: (data: MedsosFormData) => void;
  onSubmit: () => void;
  onCancel?: () => void;
  isEditing: boolean;
  isSaving: boolean;
  mediaLabels: { [key: string]: string };
};

export default function MedsosForm({ formData, onChange, onSubmit, onCancel, isEditing, isSaving, mediaLabels }: MedsosFormProps) {
  return (
    <div className="p-4 bg-gray-50 rounded-xl">
      <h3 className="font-semibold text-gray-900 mb-4 font-heading">{isEditing ? "Edit Media Sosial" : "Tambah Media Sosial Baru"}</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">Media *</label>
          <select
            value={formData.media}
            onChange={(e) => onChange({ ...formData, media: e.target.value as MedsosFormData["media"] })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body"
          >
            {Object.entries(mediaLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">Link *</label>
          <input
            type="url"
            required
            value={formData.link}
            onChange={(e) => onChange({ ...formData, link: e.target.value })}
            placeholder="https://..."
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
            disabled={!formData.link || isSaving}
            className="flex-1 px-4 py-2 rounded-xl bg-linear-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-medium font-body shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Menyimpan...
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

