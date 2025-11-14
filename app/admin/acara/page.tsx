"use client";

import { useState, useEffect } from "react";
import { Calendar, Plus, Search } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import ToastContainer from "@/components/common/Toast";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";
import AcaraModal from "@/components/admin/acara/AcaraModal";
import AcaraCard from "@/components/admin/acara/AcaraCard";
import AcaraCardSkeleton from "@/components/admin/acara/AcaraCardSkeleton";

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

export default function KelolaAcaraPage() {
  const { toasts, removeToast, success, error: showError } = useToast();
  const [acaraList, setAcaraList] = useState<Acara[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingAcara, setEditingAcara] = useState<Acara | null>(null);
  const [tribunList, setTribunList] = useState<{ [key: string]: Tribun[] }>({});
  const [formData, setFormData] = useState({
    nama: "",
    lokasi: "",
    image_url: "",
    deskripsi: "",
    tgl_mulai: "",
    tgl_selesai: "",
  });
  const [activeTab, setActiveTab] = useState<"info" | "tribun">("info");
  const [tribunForm, setTribunForm] = useState({
    nama_penyedia: "",
    kontak_penyedia: "",
    nama_tribun: "",
    kategori: "REGULER" as "REGULER" | "VIP",
    harga_per_orang: "",
    total_kursi: "",
    deskripsi: "",
  });
  const [editingTribun, setEditingTribun] = useState<Tribun | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [savingTribun, setSavingTribun] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    type: "acara" | "tribun" | null;
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

  // Load semua data sekaligus (acara + tribun)
  const loadAllData = async () => {
    try {
      setIsLoading(true);

      // 1. Load data acara terlebih dahulu
      const acaraResponse = await fetch("/api/admin/acara");
      if (!acaraResponse.ok) throw new Error("Failed to fetch acara");
      const { data: acaraData } = await acaraResponse.json();
      setAcaraList(acaraData || []);

      // 2. Load tribun untuk semua acara secara parallel
      if (acaraData && acaraData.length > 0) {
        const tribunPromises = acaraData.map((acara: Acara) =>
          fetch(`/api/admin/acara/${acara.id}/tribun`)
            .then((res) => (res.ok ? res.json() : { data: [] }))
            .then(({ data }) => ({ acaraId: acara.id, data: data || [] }))
            .catch(() => ({ acaraId: acara.id, data: [] }))
        );

        const tribunResults = await Promise.all(tribunPromises);

        // Update state dengan semua data
        const newTribunList: { [key: string]: Tribun[] } = {};
        tribunResults.forEach((result) => {
          newTribunList[result.acaraId] = result.data;
        });
        setTribunList(newTribunList);
      }
    } catch (err) {
      console.error("Error loading data:", err);
      showError("Terjadi kesalahan saat memuat data");
    } finally {
      setIsLoading(false);
    }
  };

  const loadAcara = async () => {
    // Reload semua data untuk memastikan sinkronisasi
    await loadAllData();
  };

  const loadTribun = async (acaraId: string) => {
    try {
      const response = await fetch(`/api/admin/acara/${acaraId}/tribun`);
      if (!response.ok) throw new Error("Failed to fetch tribun");
      const { data } = await response.json();
      setTribunList((prev) => ({ ...prev, [acaraId]: data || [] }));
    } catch (error) {
      console.error("Error loading tribun:", error);
    }
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "acara"); // Upload ke folder acara

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
      if (editingAcara) {
        const response = await fetch(`/api/admin/acara/${editingAcara.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          const { error } = await response.json();
          throw new Error(error || "Failed to update acara");
        }
        const { data } = await response.json();
        setEditingAcara(data);
        await loadTribun(data.id);
        success("Acara berhasil diperbarui");
      } else {
        const response = await fetch("/api/admin/acara", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          const { error } = await response.json();
          throw new Error(error || "Failed to create acara");
        }
        const { data } = await response.json();
        setEditingAcara(data);
        await loadTribun(data.id);
        success("Acara berhasil ditambahkan");
      }
      await loadAcara();
    } catch (err) {
      console.error("Error saving acara:", err);
      showError(err instanceof Error ? err.message : "Terjadi kesalahan saat menyimpan data");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (acara: Acara) => {
    // Data tribun sudah di-load sebelumnya
    setEditingAcara(acara);
    setFormData({
      nama: acara.nama,
      lokasi: acara.lokasi,
      image_url: acara.image_url || "",
      deskripsi: acara.deskripsi || "",
      tgl_mulai: acara.tgl_mulai,
      tgl_selesai: acara.tgl_selesai,
    });
    setShowModal(true);
    setActiveTab("info");
  };

  const handleDeleteClick = (id: string, name: string, type: "acara" | "tribun" = "acara") => {
    setDeleteModal({ isOpen: true, type, id, name });
  };

  const handleDelete = async () => {
    if (!deleteModal.id || !deleteModal.type) return;

    setDeleting(deleteModal.id);
    try {
      let response;
      if (deleteModal.type === "acara") {
        response = await fetch(`/api/admin/acara/${deleteModal.id}`, {
          method: "DELETE",
        });
      } else if (deleteModal.type === "tribun") {
        response = await fetch(`/api/admin/acara/tribun/${deleteModal.id}`, {
          method: "DELETE",
        });
      }

      if (!response || !response.ok) {
        const { error } = await response!.json();
        throw new Error(error || "Failed to delete");
      }

      if (deleteModal.type === "acara") {
        await loadAcara();
        success("Acara berhasil dihapus");
      } else if (deleteModal.type === "tribun" && editingAcara) {
        await loadTribun(editingAcara.id);
        success("Tribun berhasil dihapus");
      }

      setDeleteModal({ isOpen: false, type: null, id: null, name: "" });
    } catch (err) {
      console.error("Error deleting:", err);
      showError(err instanceof Error ? err.message : "Terjadi kesalahan saat menghapus data");
    } finally {
      setDeleting(null);
    }
  };

  const handleAddTribun = async () => {
    if (!editingAcara || !tribunForm.nama_penyedia.trim() || !tribunForm.nama_tribun.trim() || !tribunForm.harga_per_orang || !tribunForm.total_kursi) {
      showError("Silakan lengkapi semua field yang wajib");
      return;
    }

    setSavingTribun(true);
    try {
      const response = await fetch(`/api/admin/acara/${editingAcara.id}/tribun`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tribunForm),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Failed to add tribun");
      }

      await loadTribun(editingAcara.id);
      setTribunForm({
        nama_penyedia: "",
        kontak_penyedia: "",
        nama_tribun: "",
        kategori: "REGULER",
        harga_per_orang: "",
        total_kursi: "",
        deskripsi: "",
      });
      success("Tribun berhasil ditambahkan");
    } catch (err) {
      console.error("Error adding tribun:", err);
      showError(err instanceof Error ? err.message : "Terjadi kesalahan saat menambah tribun");
    } finally {
      setSavingTribun(false);
    }
  };

  const handleEditTribun = (tribun: Tribun) => {
    setEditingTribun(tribun);
    setTribunForm({
      nama_penyedia: tribun.nama_penyedia,
      kontak_penyedia: tribun.kontak_penyedia || "",
      nama_tribun: tribun.nama_tribun,
      kategori: tribun.kategori,
      harga_per_orang: tribun.harga_per_orang.toString(),
      total_kursi: tribun.total_kursi.toString(),
      deskripsi: tribun.deskripsi || "",
    });
    setActiveTab("tribun");
  };

  const handleUpdateTribun = async () => {
    if (!editingAcara || !editingTribun) return;

    setSavingTribun(true);
    try {
      const response = await fetch(`/api/admin/acara/tribun/${editingTribun.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tribunForm),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Failed to update tribun");
      }

      await loadTribun(editingAcara.id);
      setEditingTribun(null);
      setTribunForm({
        nama_penyedia: "",
        kontak_penyedia: "",
        nama_tribun: "",
        kategori: "REGULER",
        harga_per_orang: "",
        total_kursi: "",
        deskripsi: "",
      });
      success("Tribun berhasil diperbarui");
    } catch (err) {
      console.error("Error updating tribun:", err);
      showError(err instanceof Error ? err.message : "Terjadi kesalahan saat mengupdate tribun");
    } finally {
      setSavingTribun(false);
    }
  };

  const handleDeleteTribunClick = (id: string, name: string) => {
    setDeleteModal({ isOpen: true, type: "tribun", id, name });
  };

  const resetForm = () => {
    setFormData({
      nama: "",
      lokasi: "",
      image_url: "",
      deskripsi: "",
      tgl_mulai: "",
      tgl_selesai: "",
    });
    setEditingAcara(null);
    setTribunForm({
      nama_penyedia: "",
      kontak_penyedia: "",
      nama_tribun: "",
      kategori: "REGULER",
      harga_per_orang: "",
      total_kursi: "",
      deskripsi: "",
    });
    setEditingTribun(null);
    setActiveTab("info");
  };

  const filteredAcara = acaraList.filter((acara) => acara.nama.toLowerCase().includes(searchTerm.toLowerCase()) || acara.lokasi.toLowerCase().includes(searchTerm.toLowerCase()));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-heading">Kelola Acara</h1>
          <p className="text-gray-600 mt-2 font-body">Mengelola acara dan tribun Pacu Jalur</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="px-4 py-2 bg-linear-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-medium font-body flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Tambah Acara
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Cari acara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body"
        />
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <AcaraCardSkeleton key={index} />
          ))}
        </div>
      ) : filteredAcara.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-body">Tidak ada data acara</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAcara.map((acara) => (
            <AcaraCard
              key={acara.id}
              acara={acara}
              onEdit={() => handleEdit(acara)}
              onDelete={() => handleDeleteClick(acara.id, acara.nama, "acara")}
              isDeleting={deleting === acara.id}
              tribunList={tribunList[acara.id] || []}
              formatDate={formatDate}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <AcaraModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        editingAcara={editingAcara}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        acaraFormData={formData}
        onAcaraFormChange={setFormData}
        onAcaraSubmit={handleSubmit}
        onImageUpload={handleImageUpload}
        tribunFormData={tribunForm}
        onTribunFormChange={setTribunForm}
        tribunList={editingAcara ? tribunList[editingAcara.id] || [] : []}
        onTribunSubmit={editingTribun ? handleUpdateTribun : handleAddTribun}
        onTribunEdit={handleEditTribun}
        onTribunCancel={() => {
          setEditingTribun(null);
          setTribunForm({
            nama_penyedia: "",
            kontak_penyedia: "",
            nama_tribun: "",
            kategori: "REGULER",
            harga_per_orang: "",
            total_kursi: "",
            deskripsi: "",
          });
        }}
        onTribunDelete={handleDeleteTribunClick}
        editingTribun={editingTribun}
        saving={saving}
        uploading={uploading}
        savingTribun={savingTribun}
      />

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, type: null, id: null, name: "" })}
        onConfirm={handleDelete}
        title={deleteModal.type === "acara" ? "Konfirmasi Hapus Acara" : "Konfirmasi Hapus Tribun"}
        message={deleteModal.type === "acara" ? "Apakah Anda yakin ingin menghapus acara ini?" : "Apakah Anda yakin ingin menghapus tribun ini?"}
        itemName={deleteModal.name}
        isLoading={!!deleting}
      />
    </div>
  );
}
