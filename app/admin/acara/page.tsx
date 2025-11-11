"use client";

import { useState, useEffect } from "react";
import { Calendar, Plus, Edit, Trash2, Search, MapPin, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useToast } from "@/hooks/useToast";
import ToastContainer from "@/components/common/Toast";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";

type Acara = {
  id: string;
  nama: string;
  lokasi: string;
  image_url: string | null;
  deskripsi: string | null;
  tgl_mulai: string;
  tgl_selesai: string;
};

export default function KelolaAcaraPage() {
  const { toasts, removeToast, success, error: showError } = useToast();
  const [acaraList, setAcaraList] = useState<Acara[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingAcara, setEditingAcara] = useState<Acara | null>(null);
  const [formData, setFormData] = useState({
    nama: "",
    lokasi: "",
    image_url: "",
    deskripsi: "",
    tgl_mulai: "",
    tgl_selesai: "",
  });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: string | null; name: string }>({
    isOpen: false,
    id: null,
    name: "",
  });

  useEffect(() => {
    loadAcara();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadAcara = async () => {
    try {
      const response = await fetch("/api/admin/acara");
      if (!response.ok) throw new Error("Failed to fetch acara");
      const { data } = await response.json();
      setAcaraList(data || []);
    } catch (error) {
      console.error("Error loading acara:", error);
      showError("Terjadi kesalahan saat memuat data");
    } finally {
      setIsLoading(false);
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
        success("Acara berhasil ditambahkan");
      }
      await loadAcara();
      setShowModal(false);
      resetForm();
    } catch (err) {
      console.error("Error saving acara:", err);
      showError(err instanceof Error ? err.message : "Terjadi kesalahan saat menyimpan data");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (acara: Acara) => {
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
  };

  const handleDeleteClick = (id: string, name: string) => {
    setDeleteModal({ isOpen: true, id, name });
  };

  const handleDelete = async () => {
    if (!deleteModal.id) return;

    setDeleting(deleteModal.id);
    try {
      const response = await fetch(`/api/admin/acara/${deleteModal.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Failed to delete acara");
      }
      await loadAcara();
      success("Acara berhasil dihapus");
      setDeleteModal({ isOpen: false, id: null, name: "" });
    } catch (err) {
      console.error("Error deleting acara:", err);
      showError(err instanceof Error ? err.message : "Terjadi kesalahan saat menghapus data");
    } finally {
      setDeleting(null);
    }
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
  };

  const filteredAcara = acaraList.filter((acara) => acara.nama.toLowerCase().includes(searchTerm.toLowerCase()) || acara.lokasi.toLowerCase().includes(searchTerm.toLowerCase()));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-heading">Kelola Acara</h1>
          <p className="text-gray-600 mt-2 font-body">Mengelola acara dan event Pacu Jalur</p>
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
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      ) : filteredAcara.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-body">Tidak ada data acara</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAcara.map((acara) => (
            <div key={acara.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
              {acara.image_url && (
                <div className="relative h-48 w-full">
                  <Image src={acara.image_url} alt={acara.nama} fill className="object-cover" />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading">{acara.nama}</h3>
                <div className="flex items-center gap-2 text-gray-600 mb-3 font-body">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{acara.lokasi}</span>
                </div>
                <div className="text-sm text-gray-600 mb-3 font-body">
                  <p>
                    <span className="font-semibold">Mulai:</span> {formatDate(acara.tgl_mulai)}
                  </p>
                  <p>
                    <span className="font-semibold">Selesai:</span> {formatDate(acara.tgl_selesai)}
                  </p>
                </div>
                {acara.deskripsi && <p className="text-sm text-gray-600 line-clamp-2 mb-4 font-body">{acara.deskripsi}</p>}
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(acara)} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium font-body flex items-center justify-center gap-2">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(acara.id, acara.nama)}
                    disabled={deleting === acara.id}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium font-body disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {deleting === acara.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 md:p-8 pointer-events-auto max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 font-heading">{editingAcara ? "Edit Acara" : "Tambah Acara Baru"}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">Nama Acara *</label>
                    <input
                      type="text"
                      required
                      value={formData.nama}
                      onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">Lokasi *</label>
                    <input
                      type="text"
                      required
                      value={formData.lokasi}
                      onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">Tanggal Mulai *</label>
                      <input
                        type="date"
                        required
                        value={formData.tgl_mulai}
                        onChange={(e) => setFormData({ ...formData, tgl_mulai: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">Tanggal Selesai *</label>
                      <input
                        type="date"
                        required
                        value={formData.tgl_selesai}
                        onChange={(e) => setFormData({ ...formData, tgl_selesai: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">URL Gambar</label>
                    <input
                      type="url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">Deskripsi</label>
                    <textarea
                      value={formData.deskripsi}
                      onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body"
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        resetForm();
                      }}
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300 font-medium font-body"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex-1 px-4 py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-medium font-body shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Menyimpan...
                        </>
                      ) : editingAcara ? (
                        "Update"
                      ) : (
                        "Simpan"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null, name: "" })}
        onConfirm={handleDelete}
        title="Konfirmasi Hapus Acara"
        message="Apakah Anda yakin ingin menghapus acara ini?"
        itemName={deleteModal.name}
        isLoading={!!deleting}
      />
    </div>
  );
}
