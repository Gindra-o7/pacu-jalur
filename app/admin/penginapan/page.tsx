"use client";

import { useState, useEffect } from "react";
import { Hotel, Plus, Edit, Trash2, Search, Star, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useToast } from "@/hooks/useToast";
import ToastContainer from "@/components/common/Toast";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";

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
  const [formData, setFormData] = useState({
    nama: "",
    tipe: "",
    harga: "",
    image_url: "",
    deskripsi: "",
    rating: "",
    maps_url: "",
  });
  const [fasilitasList, setFasilitasList] = useState<Fasilitas[]>([]);
  const [newFasilitas, setNewFasilitas] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [savingFasilitas, setSavingFasilitas] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: string | null; name: string }>({
    isOpen: false,
    id: null,
    name: "",
  });

  useEffect(() => {
    loadPenginapan();
  }, []);

  const loadPenginapan = async () => {
    try {
      const response = await fetch("/api/admin/penginapan");
      if (!response.ok) throw new Error("Failed to fetch penginapan");
      const { data } = await response.json();
      setPenginapanList(data || []);
    } catch (error) {
      console.error("Error loading penginapan:", error);
      showError("Terjadi kesalahan saat memuat data");
    } finally {
      setIsLoading(false);
    }
  };

  const loadFasilitas = async (penginapanId: string) => {
    try {
      const response = await fetch(`/api/admin/penginapan/${penginapanId}/fasilitas`);
      if (!response.ok) throw new Error("Failed to fetch fasilitas");
      const { data } = await response.json();
      setFasilitasList(data || []);
    } catch (error) {
      console.error("Error loading fasilitas:", error);
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
        success("Penginapan berhasil ditambahkan");
      }
      await loadPenginapan();
      setShowModal(false);
      resetForm();
    } catch (err) {
      console.error("Error saving penginapan:", err);
      showError(err instanceof Error ? err.message : "Terjadi kesalahan saat menyimpan data");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async (penginapan: Penginapan) => {
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
    await loadFasilitas(penginapan.id);
    setShowModal(true);
  };

  const handleDeleteClick = (id: string, name: string) => {
    setDeleteModal({ isOpen: true, id, name });
  };

  const handleDelete = async () => {
    if (!deleteModal.id) return;

    setDeleting(deleteModal.id);
    try {
      const response = await fetch(`/api/admin/penginapan/${deleteModal.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Failed to delete penginapan");
      }
      await loadPenginapan();
      success("Penginapan berhasil dihapus");
      setDeleteModal({ isOpen: false, id: null, name: "" });
    } catch (err) {
      console.error("Error deleting penginapan:", err);
      showError(err instanceof Error ? err.message : "Terjadi kesalahan saat menghapus data");
    } finally {
      setDeleting(null);
    }
  };

  const handleAddFasilitas = async () => {
    if (!newFasilitas.trim() || !editingPenginapan) return;
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
      setNewFasilitas("");
      await loadFasilitas(editingPenginapan.id);
      success("Fasilitas berhasil ditambahkan");
    } catch (err) {
      console.error("Error adding fasilitas:", err);
      showError(err instanceof Error ? err.message : "Terjadi kesalahan saat menambah fasilitas");
    } finally {
      setSavingFasilitas(false);
    }
  };

  const handleDeleteFasilitas = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/penginapan/fasilitas/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Failed to delete fasilitas");
      }
      if (editingPenginapan) await loadFasilitas(editingPenginapan.id);
      success("Fasilitas berhasil dihapus");
    } catch (err) {
      console.error("Error deleting fasilitas:", err);
      showError(err instanceof Error ? err.message : "Terjadi kesalahan saat menghapus fasilitas");
    }
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
    setFasilitasList([]);
    setNewFasilitas("");
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
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      ) : filteredPenginapan.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <Hotel className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-body">Tidak ada data penginapan</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPenginapan.map((penginapan) => (
            <div key={penginapan.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
              {penginapan.image_url && (
                <div className="relative h-48 w-full">
                  <Image src={penginapan.image_url} alt={penginapan.nama} fill className="object-cover" />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900 font-heading">{penginapan.nama}</h3>
                  {penginapan.rating && (
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-body">{penginapan.rating}</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2 font-body">{penginapan.tipe}</p>
                {penginapan.harga && <p className="text-lg font-bold text-orange-600 mb-3 font-body">{penginapan.harga}</p>}
                {penginapan.deskripsi && <p className="text-sm text-gray-600 line-clamp-2 font-body">{penginapan.deskripsi}</p>}
                <div className="flex gap-2 mt-4">
                  <button onClick={() => handleEdit(penginapan)} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium font-body flex items-center justify-center gap-2">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(penginapan.id, penginapan.nama)}
                    disabled={deleting === penginapan.id}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium font-body disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {deleting === penginapan.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
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
              <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6 md:p-8 pointer-events-auto max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 font-heading">{editingPenginapan ? "Edit Penginapan" : "Tambah Penginapan Baru"}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">Nama Penginapan *</label>
                    <input
                      type="text"
                      required
                      value={formData.nama}
                      onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">Tipe *</label>
                      <select
                        required
                        value={formData.tipe}
                        onChange={(e) => setFormData({ ...formData, tipe: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body"
                      >
                        <option value="">Pilih Tipe</option>
                        <option value="Hotel">Hotel</option>
                        <option value="Penginapan">Penginapan</option>
                        <option value="Homestay">Homestay</option>
                        <option value="Villa">Villa</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">Harga</label>
                      <input
                        type="text"
                        value={formData.harga}
                        onChange={(e) => setFormData({ ...formData, harga: e.target.value })}
                        placeholder="Contoh: Rp 200.000/malam"
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">Rating</label>
                      <input
                        type="text"
                        value={formData.rating}
                        onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                        placeholder="Contoh: 4.5"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">URL Maps</label>
                      <input
                        type="url"
                        value={formData.maps_url}
                        onChange={(e) => setFormData({ ...formData, maps_url: e.target.value })}
                        placeholder="https://maps.google.com/..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body"
                      />
                    </div>
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

                  {/* Fasilitas (hanya saat edit) */}
                  {editingPenginapan && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 font-body">Fasilitas</label>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={newFasilitas}
                          onChange={(e) => setNewFasilitas(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddFasilitas();
                            }
                          }}
                          placeholder="Tambah fasilitas..."
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 font-body"
                        />
                        <button
                          type="button"
                          onClick={handleAddFasilitas}
                          disabled={savingFasilitas || !newFasilitas.trim()}
                          className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium font-body disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                          {savingFasilitas ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {fasilitasList.map((fasilitas) => (
                          <span key={fasilitas.id} className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-body">
                            {fasilitas.nama}
                            <button type="button" onClick={() => handleDeleteFasilitas(fasilitas.id)} className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

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
                      ) : editingPenginapan ? (
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
        title="Konfirmasi Hapus Penginapan"
        message="Apakah Anda yakin ingin menghapus penginapan ini?"
        itemName={deleteModal.name}
        isLoading={!!deleting}
      />
    </div>
  );
}
