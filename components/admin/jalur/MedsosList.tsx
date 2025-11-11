"use client";

import { Edit, Trash2 } from "lucide-react";

type Medsos = {
  id: string;
  media: "FACEBOOK" | "INSTAGRAM" | "TWITTER" | "TIKTOK" | "YOUTUBE";
  link: string;
  jalur_id: string;
};

type MedsosListProps = {
  medsosList: Medsos[];
  onEdit: (medsos: Medsos) => void;
  onDelete: (id: string, name: string) => void;
  mediaLabels: { [key: string]: string };
};

export default function MedsosList({ medsosList, onEdit, onDelete, mediaLabels }: MedsosListProps) {
  if (medsosList.length === 0) {
    return <p className="text-sm text-gray-500 font-body">Tidak ada media sosial</p>;
  }

  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-4 font-heading">Daftar Media Sosial</h3>
      <div className="space-y-2">
        {medsosList.map((medsos) => (
          <div key={medsos.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <span className="font-medium text-gray-900 font-body">{mediaLabels[medsos.media]}</span>
              <a href={medsos.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline ml-2 font-body">
                {medsos.link}
              </a>
            </div>
            <div className="flex gap-2">
              <button onClick={() => onEdit(medsos)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Edit className="w-4 h-4" />
              </button>
              <button onClick={() => onDelete(medsos.id, mediaLabels[medsos.media])} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

