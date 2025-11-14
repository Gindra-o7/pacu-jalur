"use client";

import { useState, useEffect } from "react";
import { Ship, Plus, Search } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import ToastContainer from "@/components/common/Toast";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";
import JalurModal from "@/components/admin/jalur/JalurModal";
import JalurCard from "@/components/admin/jalur/JalurCard";
import JalurCardSkeleton from "@/components/admin/jalur/JalurCardSkeleton";

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

export default function KelolaJalurPage() {
  const { toasts, removeToast, success, error: showError } = useToast();
  const [jalurList, setJalurList] = useState<Jalur[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingJalur, setEditingJalur] = useState<Jalur | null>(null);
  const [expandedJalur, setExpandedJalur] = useState<string | null>(null);
  const [galeriList, setGaleriList] = useState<{ [key: string]: Galeri[] }>({});
  const [medsosList, setMedsosList] = useState<{ [key: string]: Medsos[] }>({});
  const [formData, setFormData] = useState({
    nama: "",
    desa: "",
    kecamatan: "",
    kabupaten: "",
    provinsi: "",
    deskripsi: "",
  });
  const [activeTab, setActiveTab] = useState<"info" | "galeri" | "medsos">("info");
  const [galeriForm, setGaleriForm] = useState({ judul: "", caption: "", image: null as File | null, imagePreview: "" });
  const [medsosForm, setMedsosForm] = useState({ media: "FACEBOOK" as Medsos["media"], link: "" });
  const [editingGaleri, setEditingGaleri] = useState<Galeri | null>(null);
  const [editingMedsos, setEditingMedsos] = useState<Medsos | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [savingGaleri, setSavingGaleri] = useState(false);
  const [savingMedsos, setSavingMedsos] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; type: "jalur" | "galeri" | "medsos" | null; id: string | null; name: string }>({
    isOpen: false,
    type: null,
    id: null,
    name: "",
  });

  useEffect(() => {
    loadAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load semua data sekaligus (jalur, galeri, medsos)
  const loadAllData = async () => {
    try {
      setIsLoading(true);

      // 1. Load data jalur terlebih dahulu
      const jalurResponse = await fetch("/api/admin/jalur");
      if (!jalurResponse.ok) throw new Error("Failed to fetch jalur");
      const { data: jalurData } = await jalurResponse.json();
      setJalurList(jalurData || []);

      // 2. Load galeri dan medsos untuk semua jalur secara parallel
      if (jalurData && jalurData.length > 0) {
        const galeriPromises = jalurData.map((jalur: Jalur) =>
          fetch(`/api/admin/jalur/${jalur.id}/galeri`)
            .then((res) => (res.ok ? res.json() : { data: [] }))
            .then(({ data }) => ({ jalurId: jalur.id, data: data || [] }))
            .catch(() => ({ jalurId: jalur.id, data: [] }))
        );

        const medsosPromises = jalurData.map((jalur: Jalur) =>
          fetch(`/api/admin/jalur/${jalur.id}/medsos`)
            .then((res) => (res.ok ? res.json() : { data: [] }))
            .then(({ data }) => ({ jalurId: jalur.id, data: data || [] }))
            .catch(() => ({ jalurId: jalur.id, data: [] }))
        );

        // Wait for all galeri and medsos to load
        const [galeriResults, medsosResults] = await Promise.all([Promise.all(galeriPromises), Promise.all(medsosPromises)]);

        // Update state dengan semua data
        const newGaleriList: { [key: string]: Galeri[] } = {};
        galeriResults.forEach((result) => {
          newGaleriList[result.jalurId] = result.data;
        });
        setGaleriList(newGaleriList);

        const newMedsosList: { [key: string]: Medsos[] } = {};
        medsosResults.forEach((result) => {
          newMedsosList[result.jalurId] = result.data;
        });
        setMedsosList(newMedsosList);
      }
    } catch (err) {
      console.error("Error loading data:", err);
      showError("Terjadi kesalahan saat memuat data");
    } finally {
      setIsLoading(false);
    }
  };

  const loadJalur = async () => {
    // Reload semua data untuk memastikan sinkronisasi
    await loadAllData();
  };

  const loadGaleri = async (jalurId: string) => {
    try {
      const response = await fetch(`/api/admin/jalur/${jalurId}/galeri`);
      if (!response.ok) throw new Error("Failed to fetch galeri");
      const { data } = await response.json();
      setGaleriList((prev) => ({ ...prev, [jalurId]: data || [] }));
    } catch (error) {
      console.error("Error loading galeri:", error);
    }
  };

  const loadMedsos = async (jalurId: string) => {
    try {
      const response = await fetch(`/api/admin/jalur/${jalurId}/medsos`);
      if (!response.ok) throw new Error("Failed to fetch medsos");
      const { data } = await response.json();
      setMedsosList((prev) => ({ ...prev, [jalurId]: data || [] }));
    } catch (error) {
      console.error("Error loading medsos:", error);
    }
  };

  const handleExpandJalur = (jalurId: string) => {
    // Data sudah di-load sebelumnya, tinggal toggle expand
    if (expandedJalur === jalurId) {
      setExpandedJalur(null);
    } else {
      setExpandedJalur(jalurId);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingJalur) {
        const response = await fetch(`/api/admin/jalur/${editingJalur.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          const { error } = await response.json();
          throw new Error(error || "Failed to update jalur");
        }
        const { data } = await response.json();
        setEditingJalur(data);
        await Promise.all([loadGaleri(data.id), loadMedsos(data.id)]);
        success("Jalur berhasil diperbarui");
      } else {
        const response = await fetch("/api/admin/jalur", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          const { error } = await response.json();
          throw new Error(error || "Failed to create jalur");
        }
        const { data } = await response.json();
        // Set editingJalur dengan data baru agar bisa langsung menambah galeri/medsos
        setEditingJalur(data);
        await Promise.all([loadGaleri(data.id), loadMedsos(data.id)]);
        success("Jalur berhasil ditambahkan");
      }
      await loadJalur();
      // Jangan tutup modal, biarkan user bisa langsung menambah galeri/medsos
      // setShowModal(false);
      // resetForm();
    } catch (err) {
      console.error("Error saving jalur:", err);
      showError(err instanceof Error ? err.message : "Terjadi kesalahan saat menyimpan data");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (jalur: Jalur) => {
    // Data galeri dan medsos sudah di-load sebelumnya
    setEditingJalur(jalur);
    setFormData({
      nama: jalur.nama,
      desa: jalur.desa,
      kecamatan: jalur.kecamatan,
      kabupaten: jalur.kabupaten,
      provinsi: jalur.provinsi,
      deskripsi: jalur.deskripsi || "",
    });
    setShowModal(true);
    setActiveTab("info");
  };

  const handleDeleteClick = (id: string, name: string) => {
    const jalur = jalurList.find((j) => j.id === id);
    setDeleteModal({ isOpen: true, type: "jalur", id, name: jalur?.nama || name });
  };

  const handleDelete = async () => {
    if (!deleteModal.id || !deleteModal.type) return;

    setDeleting(deleteModal.id);
    try {
      let response;
      if (deleteModal.type === "jalur") {
        response = await fetch(`/api/admin/jalur/${deleteModal.id}`, {
          method: "DELETE",
        });
      } else if (deleteModal.type === "galeri") {
        response = await fetch(`/api/admin/jalur/galeri/${deleteModal.id}`, {
          method: "DELETE",
        });
      } else if (deleteModal.type === "medsos") {
        response = await fetch(`/api/admin/jalur/medsos/${deleteModal.id}`, {
          method: "DELETE",
        });
      }

      if (!response || !response.ok) {
        const { error } = await response!.json();
        throw new Error(error || "Failed to delete");
      }

      if (deleteModal.type === "jalur") {
        await loadJalur();
        success("Jalur berhasil dihapus");
      } else if (deleteModal.type === "galeri" && editingJalur) {
        await loadGaleri(editingJalur.id);
        success("Galeri berhasil dihapus");
      } else if (deleteModal.type === "medsos" && editingJalur) {
        await loadMedsos(editingJalur.id);
        success("Media sosial berhasil dihapus");
      }

      setDeleteModal({ isOpen: false, type: null, id: null, name: "" });
    } catch (err) {
      console.error("Error deleting:", err);
      showError(err instanceof Error ? err.message : "Terjadi kesalahan saat menghapus data");
    } finally {
      setDeleting(null);
    }
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "jalur"); // Upload ke folder jalur

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

  const handleAddGaleri = async () => {
    if (!editingJalur || !editingJalur.id || !galeriForm.image) {
      showError("Silakan simpan jalur terlebih dahulu sebelum menambah galeri");
      return;
    }

    setSavingGaleri(true);
    try {
      const imageUrl = await handleImageUpload(galeriForm.image);

      const response = await fetch(`/api/admin/jalur/${editingJalur.id}/galeri`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image_url: imageUrl,
          judul: galeriForm.judul || null,
          caption: galeriForm.caption || null,
        }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Failed to add galeri");
      }

      await loadGaleri(editingJalur.id);
      setGaleriForm({ judul: "", caption: "", image: null, imagePreview: "" });
      success("Galeri berhasil ditambahkan");
    } catch (err) {
      console.error("Error adding galeri:", err);
      showError(err instanceof Error ? err.message : "Terjadi kesalahan saat menambah galeri");
    } finally {
      setSavingGaleri(false);
    }
  };

  const handleEditGaleri = (galeri: Galeri) => {
    setEditingGaleri(galeri);
    setGaleriForm({
      judul: galeri.judul || "",
      caption: galeri.caption || "",
      image: null,
      imagePreview: galeri.image_url,
    });
    setActiveTab("galeri");
  };

  const handleUpdateGaleri = async () => {
    if (!editingJalur || !editingGaleri) return;

    setSavingGaleri(true);
    try {
      let imageUrl = editingGaleri.image_url;

      if (galeriForm.image) {
        imageUrl = await handleImageUpload(galeriForm.image);
      }

      const response = await fetch(`/api/admin/jalur/galeri/${editingGaleri.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image_url: imageUrl,
          judul: galeriForm.judul || null,
          caption: galeriForm.caption || null,
        }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Failed to update galeri");
      }

      await loadGaleri(editingJalur.id);
      setEditingGaleri(null);
      setGaleriForm({ judul: "", caption: "", image: null, imagePreview: "" });
      success("Galeri berhasil diperbarui");
    } catch (err) {
      console.error("Error updating galeri:", err);
      showError(err instanceof Error ? err.message : "Terjadi kesalahan saat mengupdate galeri");
    } finally {
      setSavingGaleri(false);
    }
  };

  const handleDeleteGaleriClick = (id: string, name: string) => {
    setDeleteModal({ isOpen: true, type: "galeri", id, name });
  };

  const handleAddMedsos = async () => {
    if (!editingJalur || !editingJalur.id) {
      showError("Silakan simpan jalur terlebih dahulu sebelum menambah media sosial");
      return;
    }

    setSavingMedsos(true);
    try {
      const response = await fetch(`/api/admin/jalur/${editingJalur.id}/medsos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(medsosForm),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Failed to add medsos");
      }

      await loadMedsos(editingJalur.id);
      setMedsosForm({ media: "FACEBOOK", link: "" });
      success("Media sosial berhasil ditambahkan");
    } catch (err) {
      console.error("Error adding medsos:", err);
      showError(err instanceof Error ? err.message : "Terjadi kesalahan saat menambah medsos");
    } finally {
      setSavingMedsos(false);
    }
  };

  const handleEditMedsos = (medsos: Medsos) => {
    setEditingMedsos(medsos);
    setMedsosForm({ media: medsos.media, link: medsos.link });
    setActiveTab("medsos");
  };

  const handleUpdateMedsos = async () => {
    if (!editingJalur || !editingMedsos) return;

    setSavingMedsos(true);
    try {
      const response = await fetch(`/api/admin/jalur/medsos/${editingMedsos.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(medsosForm),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Failed to update medsos");
      }

      await loadMedsos(editingJalur.id);
      setEditingMedsos(null);
      setMedsosForm({ media: "FACEBOOK", link: "" });
      success("Media sosial berhasil diperbarui");
    } catch (err) {
      console.error("Error updating medsos:", err);
      showError(err instanceof Error ? err.message : "Terjadi kesalahan saat mengupdate medsos");
    } finally {
      setSavingMedsos(false);
    }
  };

  const handleDeleteMedsosClick = (id: string, name: string) => {
    setDeleteModal({ isOpen: true, type: "medsos", id, name });
  };

  const resetForm = () => {
    setFormData({
      nama: "",
      desa: "",
      kecamatan: "",
      kabupaten: "",
      provinsi: "",
      deskripsi: "",
    });
    setEditingJalur(null);
    setActiveTab("info");
    setGaleriForm({ judul: "", caption: "", image: null, imagePreview: "" });
    setMedsosForm({ media: "FACEBOOK", link: "" });
    setEditingGaleri(null);
    setEditingMedsos(null);
  };

  const filteredJalur = jalurList.filter(
    (jalur) => jalur.nama.toLowerCase().includes(searchTerm.toLowerCase()) || jalur.desa.toLowerCase().includes(searchTerm.toLowerCase()) || jalur.kecamatan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const mediaLabels: { [key in Medsos["media"]]: string } = {
    FACEBOOK: "Facebook",
    INSTAGRAM: "Instagram",
    TWITTER: "Twitter",
    TIKTOK: "TikTok",
    YOUTUBE: "YouTube",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-heading">Kelola Jalur</h1>
          <p className="text-gray-600 mt-2 font-body">Mengelola data jalur setiap desa</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="px-4 py-2 bg-linear-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-medium font-body flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Tambah Jalur
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Cari jalur..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body"
        />
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <JalurCardSkeleton key={index} />
          ))}
        </div>
      ) : filteredJalur.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <Ship className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-body">Tidak ada data jalur</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredJalur.map((jalur) => (
            <JalurCard
              key={jalur.id}
              jalur={jalur}
              isExpanded={expandedJalur === jalur.id}
              onExpand={() => handleExpandJalur(jalur.id)}
              onEdit={() => handleEdit(jalur)}
              onDelete={() => handleDeleteClick(jalur.id, jalur.nama)}
              isDeleting={deleting === jalur.id}
              galeriList={galeriList[jalur.id] || []}
              medsosList={medsosList[jalur.id] || []}
              mediaLabels={mediaLabels}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <JalurModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        editingJalur={editingJalur}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        jalurFormData={formData}
        onJalurFormChange={setFormData}
        onJalurSubmit={handleSubmit}
        galeriFormData={galeriForm}
        onGaleriFormChange={setGaleriForm}
        medsosFormData={medsosForm}
        onMedsosFormChange={setMedsosForm}
        galeriList={editingJalur ? galeriList[editingJalur.id] || [] : []}
        medsosList={editingJalur ? medsosList[editingJalur.id] || [] : []}
        onGaleriSubmit={editingGaleri ? handleUpdateGaleri : handleAddGaleri}
        onGaleriEdit={handleEditGaleri}
        onGaleriCancel={() => {
          setEditingGaleri(null);
          setGaleriForm({ judul: "", caption: "", image: null, imagePreview: "" });
        }}
        onGaleriDelete={handleDeleteGaleriClick}
        onMedsosSubmit={editingMedsos ? handleUpdateMedsos : handleAddMedsos}
        onMedsosEdit={handleEditMedsos}
        onMedsosCancel={() => {
          setEditingMedsos(null);
          setMedsosForm({ media: "FACEBOOK", link: "" });
        }}
        onMedsosDelete={handleDeleteMedsosClick}
        editingGaleri={editingGaleri}
        editingMedsos={editingMedsos}
        saving={saving}
        uploading={uploading}
        savingGaleri={savingGaleri}
        savingMedsos={savingMedsos}
        mediaLabels={mediaLabels}
      />

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, type: null, id: null, name: "" })}
        onConfirm={handleDelete}
        title={deleteModal.type === "jalur" ? "Konfirmasi Hapus Jalur" : deleteModal.type === "galeri" ? "Konfirmasi Hapus Galeri" : "Konfirmasi Hapus Media Sosial"}
        message={deleteModal.type === "jalur" ? "Apakah Anda yakin ingin menghapus jalur ini?" : deleteModal.type === "galeri" ? "Apakah Anda yakin ingin menghapus gambar ini?" : "Apakah Anda yakin ingin menghapus media sosial ini?"}
        itemName={deleteModal.name}
        isLoading={!!deleting}
      />
    </div>
  );
}
