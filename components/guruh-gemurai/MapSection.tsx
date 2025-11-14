"use client";

import { motion } from "framer-motion";
import { MapPin, ExternalLink, Navigation, Phone, Mail } from "lucide-react";

type MapSectionProps = {
  title: string;
  description: string;
  contact?: {
    phone: string | null;
    email: string | null;
  };
};

export default function MapSection({ title, description, contact }: MapSectionProps) {
  const location = "Air Terjun Guruh Gemurai, Desa Kasang, Kecamatan Kuantan Mudik, Kabupaten Kuantan Singingi";
  const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(location)}`;

  return (
    <section id="peta-kontak" className="py-24 bg-linear-to-br from-gray-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span className="text-blue-700 font-semibold font-body text-sm">Informasi Lokasi</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-heading">{title}</h2>
          <div className="w-32 h-1 bg-linear-to-r from-blue-500 via-cyan-500 to-teal-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-body">{description}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Location Card */}
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
            <div className="relative bg-white rounded-3xl p-8 md:p-10 shadow-2xl border border-gray-100 overflow-hidden">
              {/* Gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-blue-500 via-cyan-500 to-teal-500"></div>

              {/* Decorative background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-32 -mt-32"></div>

              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-linear-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg">
                    <Navigation className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 font-heading mb-1">Lokasi Tepat</h3>
                    <p className="text-gray-600 font-body text-sm">Desa Kasang, Kuantan Mudik</p>
                  </div>
                </div>

                <div className="h-px bg-linear-to-r from-transparent via-gray-200 to-transparent"></div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                    <div className="flex-1">
                      <p className="text-gray-900 font-semibold font-body mb-1">Alamat Lengkap</p>
                      <p className="text-gray-700 font-body text-sm leading-relaxed">{location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <Navigation className="w-5 h-5 text-cyan-600 shrink-0 mt-1" />
                    <div className="flex-1">
                      <p className="text-gray-900 font-semibold font-body mb-1">Akses</p>
                      <p className="text-gray-700 font-body text-sm leading-relaxed">Hanya 3 km dari jalan lintas Kuansing-Kiliran Jao, akses jalan aspal permanen hingga ke area wisata.</p>
                    </div>
                  </div>
                </div>

                {/* Google Maps Button */}
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="block w-full">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-3 px-6 py-4 bg-linear-to-r from-blue-500 via-cyan-500 to-teal-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 font-body"
                  >
                    <MapPin className="w-5 h-5" />
                    <span>Buka di Google Maps</span>
                    <ExternalLink className="w-4 h-4" />
                  </motion.div>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Info */}
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }} className="space-y-6">
            {/* Contact Card */}
            {(contact?.phone || contact?.email) && (
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl border border-gray-100 overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-cyan-500 via-teal-500 to-green-500"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 font-heading">Kontak Pengelola</h3>
                  <div className="space-y-4">
                    {contact.phone && (
                      <div className="flex items-center gap-4 p-4 bg-cyan-50 rounded-xl border border-cyan-100">
                        <div className="p-3 bg-cyan-500 rounded-xl">
                          <Phone className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 font-body mb-1">Telepon</p>
                          <p className="text-lg font-semibold text-gray-900 font-body">{contact.phone}</p>
                        </div>
                      </div>
                    )}
                    {contact.email && (
                      <div className="flex items-center gap-4 p-4 bg-teal-50 rounded-xl border border-teal-100">
                        <div className="p-3 bg-teal-500 rounded-xl">
                          <Mail className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 font-body mb-1">Email</p>
                          <p className="text-lg font-semibold text-gray-900 font-body">{contact.email}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Info Card */}
            <div className="bg-linear-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-3xl p-8 md:p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold font-heading">Kunjungi Sekarang</h3>
                </div>
                <p className="text-white/95 font-body leading-relaxed mb-6">Air Terjun Guruh Gemurai siap menyambut kedatangan Anda. Dapatkan pengalaman wisata alam yang tak terlupakan di Kabupaten Kuantan Singingi.</p>
                <div className="flex flex-wrap gap-2">
                  {["Akses Mudah", "Fasilitas Lengkap", "Aman & Nyaman", "Ramah Keluarga"].map((badge, index) => (
                    <span key={index} className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-sm font-medium font-body">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
