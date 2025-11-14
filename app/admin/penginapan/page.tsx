"use client";

import { useState, useEffect } from "react";
import { Hotel, Plus, Search } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import ToastContainer from "@/components/common/Toast";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";
import PenginapanModal from "@/components/admin/penginapan/PenginapanModal";
import PenginapanCard from "@/components/admin/penginapan/PenginapanCard";
import PenginapanCardSkeleton from "@/components/admin/penginapan/PenginapanCardSkeleton";

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

export default function KelolaPenginapanPage() {
  const { toasts, removeToast, success, error: showError } = useToast();
  const [penginapanList, setPenginapanList] = useState<Penginapan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingPenginapan, setEditingPenginapan] = useState<Penginapan | null>(null);
  const [fasilitasList, setFasilitasList] = useState<{ [key: string]: Fasilitas[] }>({});
  const [formData, setFormData] = useState({
    nama: "",
    tipe: "",
    harga: "",
    image_url: "",
    deskripsi: "",
    rating: "",
    maps_url: "",
  });
  const [activeTab, setActiveTab] = useState<"info" | "fasilitas">("info");
  const [newFasilitas, setNewFasilitas] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [savingFasilitas, setSavingFasilitas] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    type: "penginapan" | "fasilitas" | null;
    id: string | null;
    name: string;
  }>({
    isOpen: false,
    type: null,
    id: null,
    name: "",
  });

  useEffect(() => {
    loadAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load semua data sekaligus (penginapan + fasilitas)
  const loadAllData = async () => {
    try {
      setIsLoading(true);

      // 1. Load data penginapan terlebih dahulu
      const penginapanResponse = await fetch("/api/admin/penginapan");
      if (!penginapanResponse.ok) throw new Error("Failed to fetch penginapan");
      const { data: penginapanData } = await penginapanResponse.json();
      setPenginapanList(penginapanData || []);

      // 2. Load fasilitas untuk semua penginapan secara parallel
      if (penginapanData && penginapanData.length > 0) {
        const fasilitasPromises = penginapanData.map((penginapan: Penginapan) =>
          fetch(`/api/admin/penginapan/${penginapan.id}/fasilitas`)
            .then((res) => (res.ok ? res.json() : { data: [] }))
            .then(({ data }) => ({ penginapanId: penginapan.id, data: data || [] }))
            .catch(() => ({ penginapanId: penginapan.id, data: [] }))
        );

        const fasilitasResults = await Promise.all(fasilitasPromises);

        // Update state dengan semua data
        const newFasilitasList: { [key: string]: Fasilitas[] } = {};
        fasilitasResults.forEach((result) => {
          newFasilitasList[result.penginapanId] = result.data;
        });
        setFasilitasList(newFasilitasList);
      }
    } catch (err) {
      console.error("Error loading data:", err);
      showError("Terjadi kesalahan saat memuat data");
    } finally {
      setIsLoading(false);
    }
  };

  const loadPenginapan = async () => {
    // Reload semua data untuk memastikan sinkronisasi
    await loadAllData();
  };

  const loadFasilitas = async (penginapanId: string) => {
    try {
      const response = await fetch(`/api/admin/penginapan/${penginapanId}/fasilitas`);
      if (!response.ok) throw new Error("Failed to fetch fasilitas");
      const { data } = await response.json();
      setFasilitasList((prev) => ({ ...prev, [penginapanId]: data || [] }));
    } catch (error) {
      console.error("Error loading fasilitas:", error);
    }
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "penginapan"); // Upload ke folder penginapan

      const response = await fetch("/api/admin/upload/image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Failed to upload image");
      }

      const { compressed_url } = await response.json();
      return compressed_url;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingPenginapan) {
        const response = await fetch(`/api/admin/penginapan/${editingPenginapan.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          const { error } = await response.json();
          throw new Error(error || "Failed to update penginapan");
        }
        const { data } = await response.json();
        setEditingPenginapan(data);
        await loadFasilitas(data.id);
        success("Penginapan berhasil diperbarui");
      } else {
        const response = await fetch("/api/admin/penginapan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          const { error } = await response.json();
          throw new Error(error || "Failed to create penginapan");
        }
        const { data } = await response.json();
        // Set editingPenginapan dengan data baru agar bisa langsung menambah fasilitas
        setEditingPenginapan(data);
        await loadFasilitas(data.id);
        success("Penginapan berhasil ditambahkan");
      }
      await loadPenginapan();
      // Jangan tutup modal, biarkan user bisa langsung menambah fasilitas
    } catch (err) {
      console.error("Error saving penginapan:", err);
      showError(err instanceof Error ? err.message : "Terjadi kesalahan saat menyimpan data");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (penginapan: Penginapan) => {
    // Data fasilitas sudah di-load sebelumnya
    setEditingPenginapan(penginapan);
    setFormData({
      nama: penginapan.nama,
      tipe: penginapan.tipe,
      harga: penginapan.harga || "",
      image_url: penginapan.image_url || "",
      deskripsi: penginapan.deskripsi || "",
      rating: penginapan.rating || "",
      maps_url: penginapan.maps_url || "",
    });
    setShowModal(true);
    setActiveTab("info");
  };

  const handleDeleteClick = (id: string, name: string, type: "penginapan" | "fasilitas" = "penginapan") => {
    setDeleteModal({ isOpen: true, type, id, name });
  };

  const handleDelete = async () => {
    if (!deleteModal.id || !deleteModal.type) return;

    setDeleting(deleteModal.id);
    try {
      let response;
      if (deleteModal.type === "penginapan") {
        response = await fetch(`/api/admin/penginapan/${deleteModal.id}`, {
          method: "DELETE",
        });
      } else if (deleteModal.type === "fasilitas") {
        response = await fetch(`/api/admin/penginapan/fasilitas/${deleteModal.id}`, {
          method: "DELETE",
        });
      }

      if (!response || !response.ok) {
        const { error } = await response!.json();
        throw new Error(error || "Failed to delete");
      }

      if (deleteModal.type === "penginapan") {
        await loadPenginapan();
        success("Penginapan berhasil dihapus");
      } else if (deleteModal.type === "fasilitas" && editingPenginapan) {
        await loadFasilitas(editingPenginapan.id);
        success("Fasilitas berhasil dihapus");
      }

      setDeleteModal({ isOpen: false, type: null, id: null, name: "" });
    } catch (err) {
      console.error("Error deleting:", err);
      showError(err instanceof Error ? err.message : "Terjadi kesalahan saat menghapus data");
    } finally {
      setDeleting(null);
    }
  };

  const handleAddFasilitas = async () => {
    if (!newFasilitas.trim() || !editingPenginapan) {
      showError("Silakan simpan penginapan terlebih dahulu sebelum menambah fasilitas");
      return;
    }

    setSavingFasilitas(true);
    try {
      const response = await fetch(`/api/admin/penginapan/${editingPenginapan.id}/fasilitas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama: newFasilitas }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Failed to add fasilitas");
      }

      await loadFasilitas(editingPenginapan.id);
      setNewFasilitas("");
      success("Fasilitas berhasil ditambahkan");
    } catch (err) {
      console.error("Error adding fasilitas:", err);
      showError(err instanceof Error ? err.message : "Terjadi kesalahan saat menambah fasilitas");
    } finally {
      setSavingFasilitas(false);
    }
  };

  const handleDeleteFasilitasClick = (id: string, name: string) => {
    setDeleteModal({ isOpen: true, type: "fasilitas", id, name });
  };

  const resetForm = () => {
    setFormData({
      nama: "",
      tipe: "",
      harga: "",
      image_url: "",
      deskripsi: "",
      rating: "",
      maps_url: "",
    });
    setEditingPenginapan(null);
    setNewFasilitas("");
    setActiveTab("info");
  };

  const filteredPenginapan = penginapanList.filter((p) => p.nama.toLowerCase().includes(searchTerm.toLowerCase()) || p.tipe.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-heading">Kelola Penginapan</h1>
          <p className="text-gray-600 mt-2 font-body">Mengelola data penginapan di Kuantan Singingi</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="px-4 py-2 bg-linear-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-medium font-body flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Tambah Penginapan
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Cari penginapan..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body"
        />
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <PenginapanCardSkeleton key={index} />
          ))}
        </div>
      ) : filteredPenginapan.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <Hotel className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-body">Tidak ada data penginapan</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPenginapan.map((penginapan) => (
            <PenginapanCard
              key={penginapan.id}
              penginapan={penginapan}
              onEdit={() => handleEdit(penginapan)}
              onDelete={() => handleDeleteClick(penginapan.id, penginapan.nama, "penginapan")}
              isDeleting={deleting === penginapan.id}
              fasilitasList={fasilitasList[penginapan.id] || []}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <PenginapanModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        editingPenginapan={editingPenginapan}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        penginapanFormData={formData}
        onPenginapanFormChange={setFormData}
        onPenginapanSubmit={handleSubmit}
        onImageUpload={handleImageUpload}
        fasilitasValue={newFasilitas}
        onFasilitasChange={setNewFasilitas}
        fasilitasList={editingPenginapan ? fasilitasList[editingPenginapan.id] || [] : []}
        onFasilitasSubmit={handleAddFasilitas}
        onFasilitasDelete={handleDeleteFasilitasClick}
        saving={saving}
        uploading={uploading}
        savingFasilitas={savingFasilitas}
      />

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, type: null, id: null, name: "" })}
        onConfirm={handleDelete}
        title={deleteModal.type === "penginapan" ? "Konfirmasi Hapus Penginapan" : "Konfirmasi Hapus Fasilitas"}
        message={deleteModal.type === "penginapan" ? "Apakah Anda yakin ingin menghapus penginapan ini?" : "Apakah Anda yakin ingin menghapus fasilitas ini?"}
        itemName={deleteModal.name}
        isLoading={!!deleting}
      />
    </div>
  );
}
