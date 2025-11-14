"use client";

import { useState, useEffect } from "react";
import { Calendar, MapPin, Ticket, Users, Clock, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

type Tribun = {
  id: string;
  nama_tribun: string;
  kategori: "REGULER" | "VIP";
  harga_per_orang: number;
  total_kursi: number;
  kursi_terjual: number;
};

type Acara = {
  id: string;
  nama: string;
  lokasi: string;
  image_url: string | null;
  deskripsi: string | null;
  tgl_mulai: string;
  tgl_selesai: string;
  tribun: Tribun[];
};

type FestivalInfoProps = {
  upcomingEvent?: Acara;
  allEvents: Acara[];
};

export default function FestivalInfo({ upcomingEvent, allEvents }: FestivalInfoProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!upcomingEvent) return;

    const targetDate = new Date(upcomingEvent.tgl_mulai).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [upcomingEvent]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  };

  const formatDateShort = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  };

  // Calculate total tickets and availability
  const calculateTicketStats = (tribun: Tribun[]) => {
    const totalKursi = tribun.reduce((sum, t) => sum + t.total_kursi, 0);
    const terjual = tribun.reduce((sum, t) => sum + t.kursi_terjual, 0);
    const tersedia = totalKursi - terjual;
    const percentage = totalKursi > 0 ? (terjual / totalKursi) * 100 : 0;
    return { totalKursi, terjual, tersedia, percentage };
  };

  const upcomingEvents = allEvents.filter((event) => new Date(event.tgl_selesai) >= new Date());

  if (!upcomingEvent && upcomingEvents.length === 0) {
    return (
      <section id="festival" className="py-20 bg-linear-to-br from-orange-50 to-red-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading">Festival Pacu Jalur</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-body">Belum ada acara yang dijadwalkan. Pantau terus untuk informasi festival selanjutnya!</p>
          </div>
        </div>
      </section>
    );
  }

  const mainEvent = upcomingEvent || upcomingEvents[0];
  const ticketStats = mainEvent ? calculateTicketStats(mainEvent.tribun) : null;

  return (
    <section id="festival" className="py-20 bg-linear-to-br from-orange-50 via-red-50 to-orange-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading">{mainEvent.nama}</h2>
          <div className="w-24 h-1 bg-linear-to-r from-orange-500 to-red-500 mx-auto mb-8"></div>
          {mainEvent.deskripsi && <p className="text-xl text-gray-700 max-w-3xl mx-auto font-body">{mainEvent.deskripsi}</p>}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Countdown Timer */}
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl p-8 shadow-xl border border-orange-100">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Clock className="w-6 h-6 text-orange-500" />
              <h3 className="text-2xl font-bold text-gray-900 font-heading">Countdown Festival</h3>
            </div>

            <div className="grid grid-cols-4 gap-3 mb-6">
              {[
                { value: timeLeft.days, label: "Hari", color: "from-orange-500 to-orange-600" },
                { value: timeLeft.hours, label: "Jam", color: "from-blue-500 to-blue-600" },
                { value: timeLeft.minutes, label: "Menit", color: "from-green-500 to-green-600" },
                { value: timeLeft.seconds, label: "Detik", color: "from-red-500 to-red-600" },
              ].map((item, index) => (
                <motion.div key={item.label} initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="text-center">
                  <div className={`bg-linear-to-br ${item.color} text-white text-3xl md:text-4xl font-bold py-4 md:py-6 rounded-xl shadow-lg`}>{String(item.value).padStart(2, "0")}</div>
                  <div className="text-sm text-gray-600 mt-2 font-medium font-body">{item.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/jadwal"
                className="inline-block bg-linear-to-r from-orange-500 via-red-500 to-orange-600 hover:from-orange-600 hover:via-red-600 hover:to-orange-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-body"
              >
                Lihat Jadwal Lengkap
              </Link>
            </div>
          </motion.div>

          {/* Event Info */}
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4">
            {/* Main Info Card */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-100">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-orange-500" />
                <h3 className="text-xl font-bold text-gray-900 font-heading">Informasi Festival</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900 font-body block">Tanggal:</span>
                    <span className="text-gray-700 font-body">
                      {formatDate(mainEvent.tgl_mulai)} - {formatDate(mainEvent.tgl_selesai)}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900 font-body block">Lokasi:</span>
                    <span className="text-gray-700 font-body">{mainEvent.lokasi}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Stats */}
            {ticketStats && ticketStats.totalKursi > 0 && (
              <div className="bg-linear-to-br from-orange-500 to-red-600 rounded-xl p-6 shadow-lg text-white">
                <div className="flex items-center gap-2 mb-4">
                  <Ticket className="w-5 h-5" />
                  <h3 className="text-xl font-bold font-heading">Ketersediaan Tiket</h3>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold font-heading">{ticketStats.totalKursi}</div>
                      <div className="text-sm opacity-90 font-body">Total Kursi</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold font-heading">{ticketStats.terjual}</div>
                      <div className="text-sm opacity-90 font-body">Terjual</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold font-heading">{ticketStats.tersedia}</div>
                      <div className="text-sm opacity-90 font-body">Tersedia</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium font-body">Tingkat Penjualan</span>
                      <span className="text-sm font-bold font-body">{ticketStats.percentage.toFixed(0)}%</span>
                    </div>
                    <div className="h-3 bg-white/30 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${ticketStats.percentage}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }} className="h-full bg-white rounded-full" />
                    </div>
                  </div>

                  {/* Tribun Types */}
                  <div className="grid grid-cols-2 gap-2">
                    {mainEvent.tribun.slice(0, 4).map((tribun) => (
                      <div key={tribun.id} className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium font-body truncate">{tribun.nama_tribun}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${tribun.kategori === "VIP" ? "bg-purple-500" : "bg-blue-500"}`}>{tribun.kategori}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {mainEvent.tribun.length > 4 && <div className="text-center text-sm opacity-90 font-body">+{mainEvent.tribun.length - 4} tribun lainnya</div>}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Other Upcoming Events */}
        {upcomingEvents.length > 1 && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12">
            <div className="flex items-center justify-center gap-2 mb-6">
              <TrendingUp className="w-6 h-6 text-orange-500" />
              <h3 className="text-2xl font-bold text-gray-900 font-heading">Acara Mendatang Lainnya</h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.slice(1, 4).map((event, index) => {
                const eventStats = calculateTicketStats(event.tribun);
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <h4 className="text-lg font-bold text-gray-900 mb-3 font-heading line-clamp-1">{event.nama}</h4>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 text-orange-500" />
                        <span className="font-body">
                          {formatDateShort(event.tgl_mulai)} - {formatDateShort(event.tgl_selesai)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        <span className="font-body truncate">{event.lokasi}</span>
                      </div>
                      {eventStats.totalKursi > 0 && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="w-4 h-4 text-green-500" />
                          <span className="font-body">{eventStats.tersedia} kursi tersedia</span>
                        </div>
                      )}
                    </div>

                    {eventStats.totalKursi > 0 && (
                      <div className="pt-3 border-t border-gray-100">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-linear-to-r from-orange-500 to-red-500 rounded-full" style={{ width: `${eventStats.percentage}%` }} />
                        </div>
                        <div className="text-xs text-gray-500 mt-1 text-center font-body">{eventStats.percentage.toFixed(0)}% terjual</div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {upcomingEvents.length > 4 && (
              <div className="text-center mt-8">
                <Link href="/jadwal" className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold transition-colors font-body">
                  <span>Lihat Semua Acara</span>
                  <TrendingUp className="w-4 h-4" />
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
