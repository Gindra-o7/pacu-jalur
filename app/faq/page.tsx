"use client";

import { motion } from "framer-motion";
import Header from "@/components/common/Header";
import Footer from "@/components/landing/Footer";
import SidebarNav from "@/components/common/SidebarNav";
import { HelpCircle, Calendar, MapPin, Hotel, ChevronDown, Phone } from "lucide-react";
import { useState } from "react";

const NAV_SECTIONS = [
  { id: "jadwal", label: "Jadwal Pacu Jalur" },
  { id: "jalur-desa", label: "Jalur Desa" },
  { id: "penginapan", label: "Penginapan" },
  { id: "umum", label: "Pertanyaan Umum" },
];

type FAQItem = {
  question: string;
  answer: string;
  icon?: React.ReactNode;
};

const faqData = {
  jadwal: {
    title: "Jadwal Pacu Jalur",
    icon: Calendar,
    items: [
      {
        question: "Kapan biasanya festival Pacu Jalur digelar?",
        answer: "Festival Pacu Jalur biasanya digelar setiap tahun pada bulan Agustus, bertepatan dengan peringatan Hari Kemerdekaan Republik Indonesia. Tanggal pastinya dapat dilihat di halaman Jadwal & Countdown di website ini.",
      },
      {
        question: "Berapa lama durasi festival Pacu Jalur?",
        answer: "Festival Pacu Jalur biasanya berlangsung selama 3-5 hari, dengan hari utama perlombaan biasanya pada hari terakhir. Selama festival, terdapat berbagai kegiatan pendukung seperti pawai, pentas seni, dan bazar.",
      },
      {
        question: "Jam berapa perlombaan dimulai?",
        answer: "Perlombaan biasanya dimulai pada pagi hari sekitar pukul 08:00 WIB dan berlangsung hingga sore hari sekitar pukul 17:00 WIB. Disarankan untuk datang lebih awal untuk mendapatkan posisi menonton yang baik.",
      },
      {
        question: "Apakah ada tiket masuk untuk menonton Pacu Jalur?",
        answer: "Ya, terdapat tiket masuk dengan berbagai kategori seperti Reguler dan VIP. Harga tiket bervariasi tergantung kategori tribun. Informasi lengkap tentang harga tiket dapat dilihat di halaman Jadwal & Countdown.",
      },
      {
        question: "Bagaimana cara membeli tiket Pacu Jalur?",
        answer: "Tiket dapat dibeli secara online melalui website ini atau langsung di lokasi acara. Disarankan untuk membeli tiket jauh hari sebelum acara karena tiket biasanya cepat habis, terutama untuk kategori VIP.",
      },
      {
        question: "Apakah ada jadwal khusus untuk setiap desa yang berlomba?",
        answer: "Ya, setiap desa memiliki jadwal pertandingan tersendiri. Jadwal lengkap dapat dilihat di halaman Jadwal & Countdown. Biasanya jadwal diumumkan beberapa minggu sebelum acara dimulai.",
      },
    ],
  },
  jalurDesa: {
    title: "Informasi Jalur Setiap Desa",
    icon: MapPin,
    items: [
      {
        question: "Desa-desa mana saja yang biasanya ikut berlomba?",
        answer: "Banyak desa di Kuantan Singingi yang ikut serta dalam Pacu Jalur, termasuk desa-desa di sepanjang Sungai Kuantan. Informasi lengkap tentang desa peserta dapat dilihat di halaman Desa Berlomba di website ini.",
      },
      {
        question: "Bagaimana cara mengetahui informasi jalur setiap desa?",
        answer: "Informasi lengkap tentang jalur setiap desa, termasuk sejarah, prestasi, dan profil desa dapat dilihat di halaman khusus Desa Berlomba. Setiap desa memiliki halaman profil tersendiri dengan informasi detail.",
      },
      {
        question: "Apakah ada jalur favorit yang sering menang?",
        answer: "Beberapa desa memang memiliki tradisi kuat dalam Pacu Jalur dan sering meraih prestasi. Namun, setiap tahun kompetisi selalu sengit dan hasilnya tidak bisa diprediksi. Semua desa memiliki peluang yang sama.",
      },
      {
        question: "Bagaimana cara mendukung jalur desa favorit?",
        answer:
          "Anda dapat mendukung jalur desa favorit dengan menonton pertandingan mereka, menggunakan atribut atau merchandise desa tersebut, dan memberikan dukungan moral. Informasi tentang merchandise dapat ditemukan di bazar festival.",
      },
      {
        question: "Apakah setiap desa memiliki ciri khas jalur mereka?",
        answer: "Ya, setiap desa biasanya memiliki ciri khas dalam desain dan ornamen jalur mereka, termasuk warna, motif, dan simbol-simbol adat yang berbeda. Ini menjadi bagian dari identitas dan kebanggaan desa masing-masing.",
      },
      {
        question: "Di mana lokasi start dan finish perlombaan?",
        answer: "Lokasi start dan finish biasanya di Tepian Narosa, Teluk Kuantan. Lokasi ini merupakan area utama festival dan dilengkapi dengan tribun penonton, area parkir, dan berbagai fasilitas pendukung.",
      },
    ],
  },
  penginapan: {
    title: "Penginapan Terdekat",
    icon: Hotel,
    items: [
      {
        question: "Di mana lokasi penginapan terdekat dari lokasi Pacu Jalur?",
        answer: "Penginapan terdekat tersedia di sekitar Teluk Kuantan dan Kuantan Mudik. Informasi lengkap tentang hotel, losmen, dan penginapan dapat dilihat di halaman Penginapan di website ini, termasuk lokasi, harga, dan fasilitas.",
      },
      {
        question: "Kapan sebaiknya memesan penginapan?",
        answer:
          "Sangat disarankan untuk memesan penginapan jauh hari sebelum festival, minimal 1-2 bulan sebelumnya. Selama festival, penginapan biasanya penuh dan harga bisa naik. Booking lebih awal juga memberikan pilihan yang lebih baik.",
      },
      {
        question: "Berapa kisaran harga penginapan selama festival?",
        answer:
          "Harga penginapan bervariasi tergantung jenis dan lokasi. Losmen atau homestay biasanya lebih terjangkau (Rp 200.000 - Rp 500.000/malam), sedangkan hotel bisa lebih mahal (Rp 500.000 - Rp 2.000.000/malam). Harga bisa naik selama festival.",
      },
      {
        question: "Apakah ada penginapan dengan akses mudah ke lokasi festival?",
        answer: "Ya, beberapa penginapan di Teluk Kuantan memiliki akses yang sangat mudah ke Tepian Narosa, baik dengan berjalan kaki maupun kendaraan. Informasi tentang jarak dan akses dapat dilihat di detail setiap penginapan.",
      },
      {
        question: "Apakah penginapan menyediakan fasilitas parkir?",
        answer: "Sebagian besar penginapan menyediakan area parkir untuk tamu. Namun, selama festival, area parkir bisa terbatas. Disarankan untuk menanyakan ketersediaan parkir saat melakukan reservasi.",
      },
      {
        question: "Apakah ada opsi penginapan yang lebih terjangkau?",
        answer:
          "Ya, tersedia berbagai opsi mulai dari homestay, losmen, hingga rumah sewa yang lebih terjangkau. Beberapa warga lokal juga menyewakan kamar atau rumah mereka selama festival. Informasi lengkap dapat dilihat di halaman Penginapan.",
      },
      {
        question: "Bagaimana cara menghubungi penginapan untuk reservasi?",
        answer: "Informasi kontak setiap penginapan tersedia di halaman Penginapan. Anda dapat menghubungi langsung melalui telepon atau WhatsApp. Disarankan untuk melakukan reservasi dan konfirmasi sebelum datang.",
      },
    ],
  },
  umum: {
    title: "Pertanyaan Umum",
    icon: HelpCircle,
    items: [
      {
        question: "Bagaimana cara menuju lokasi Pacu Jalur?",
        answer:
          "Lokasi utama Pacu Jalur berada di Tepian Narosa, Teluk Kuantan. Dari Pekanbaru, perjalanan memakan waktu sekitar 4-5 jam dengan kendaraan pribadi atau travel. Informasi lengkap tentang transportasi dapat dilihat di halaman Transportasi.",
      },
      {
        question: "Apa yang harus dibawa saat menonton Pacu Jalur?",
        answer: "Disarankan membawa: alas duduk, payung/topi, kacamata hitam, tabir surya, air mineral, uang tunai, kamera, dan pakaian yang nyaman. Jangan lupa membawa tiket dan identitas diri.",
      },
      {
        question: "Apakah ada area parkir di lokasi festival?",
        answer: "Ya, tersedia area parkir di sekitar lokasi festival. Namun, selama festival area parkir bisa penuh, jadi disarankan datang lebih awal atau menggunakan transportasi umum jika memungkinkan.",
      },
      {
        question: "Apakah festival aman untuk anak-anak?",
        answer:
          "Ya, festival Pacu Jalur aman untuk keluarga termasuk anak-anak. Namun, disarankan untuk selalu mengawasi anak-anak karena lokasi di tepi sungai dan kerumunan yang ramai. Pastikan anak-anak tidak terlalu dekat dengan area sungai.",
      },
      {
        question: "Apakah ada makanan dan minuman yang dijual di lokasi?",
        answer:
          "Ya, tersedia banyak penjual makanan dan minuman di bazar festival. Anda dapat menemukan berbagai makanan tradisional, minuman, dan snack. Disarankan membawa uang tunai karena tidak semua penjual menerima pembayaran digital.",
      },
      {
        question: "Bagaimana jika cuaca buruk saat festival?",
        answer:
          "Festival biasanya tetap berlangsung meskipun hujan ringan. Namun, jika cuaca sangat buruk atau berbahaya, panitia akan mengumumkan perubahan jadwal atau penundaan. Pantau informasi terbaru melalui website atau media sosial resmi.",
      },
      {
        question: "Apakah ada kontak darurat yang bisa dihubungi?",
        answer: "Ya, informasi kontak darurat tersedia di halaman Bantuan Darurat. Tim keamanan dan medis selalu siap di lokasi festival untuk membantu jika terjadi keadaan darurat.",
      },
    ],
  },
};


function FAQAccordion({ item, index }: { item: FAQItem; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="bg-white rounded-2xl border border-orange-100 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <button onClick={() => setIsOpen(!isOpen)} className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-orange-50 transition-colors duration-300">
        <div className="flex-1 pr-4">
          <h3 className="text-lg font-bold text-gray-900 font-heading mb-1">{item.question}</h3>
        </div>
        <motion.div 
          animate={{ rotate: isOpen ? 180 : 0 }} 
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }} 
          className="shrink-0 w-8 h-8 bg-linear-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center"
        >
          <ChevronDown className="w-5 h-5 text-white" />
        </motion.div>
      </button>
      <motion.div 
        initial={false} 
        animate={{ 
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0
        }} 
        transition={{ 
          height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
          opacity: { duration: 0.3, ease: "easeInOut" }
        }} 
        className="overflow-hidden"
      >
        <motion.div 
          initial={false}
          animate={{ 
            y: isOpen ? 0 : -10
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="px-6 pb-5"
        >
          <div className="pt-2 border-t border-orange-100">
            <p className="text-gray-700 leading-relaxed font-body mt-3">{item.answer}</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function FAQSection({ id, title, icon: Icon, items }: { id: string; title: string; icon: React.ComponentType<{ className?: string }>; items: FAQItem[] }) {
  return (
    <section id={id} className="py-16">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-linear-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-heading">{title}</h2>
        </div>
        <div className="w-24 h-1 bg-linear-to-r from-orange-500 via-red-500 to-orange-600 rounded-full"></div>
      </motion.div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <FAQAccordion key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <SidebarNav sections={NAV_SECTIONS} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-linear-to-br from-orange-600 via-red-500 to-orange-700 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-md rounded-full mb-8 border border-white/30 shadow-lg">
              <HelpCircle className="w-5 h-5 text-white" />
              <span className="text-white font-semibold font-body text-sm md:text-base">Pertanyaan yang Sering Diajukan</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-heading drop-shadow-2xl">FAQ</h1>
            <p className="text-xl md:text-2xl text-white/90 font-body leading-relaxed">Temukan jawaban untuk pertanyaan Anda tentang Pacu Jalur, jadwal, jalur desa, dan penginapan</p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 bg-linear-to-b from-white via-orange-50/30 to-white">
        <div className="max-w-5xl mx-auto px-4">
          <FAQSection id="jadwal" title={faqData.jadwal.title} icon={faqData.jadwal.icon} items={faqData.jadwal.items} />
          <FAQSection id="jalur-desa" title={faqData.jalurDesa.title} icon={faqData.jalurDesa.icon} items={faqData.jalurDesa.items} />
          <FAQSection id="penginapan" title={faqData.penginapan.title} icon={faqData.penginapan.icon} items={faqData.penginapan.items} />
          <FAQSection id="umum" title={faqData.umum.title} icon={faqData.umum.icon} items={faqData.umum.items} />
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-linear-to-br from-orange-600 via-red-500 to-orange-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6 border border-white/30">
              <Phone className="w-5 h-5 text-white" />
              <span className="text-white font-semibold font-body text-sm">Butuh Bantuan Lebih Lanjut?</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-heading drop-shadow-lg">Masih Ada Pertanyaan?</h2>
            <p className="text-lg md:text-xl text-white/90 font-body mb-8 leading-relaxed">Jika pertanyaan Anda belum terjawab, jangan ragu untuk menghubungi kami. Tim kami siap membantu Anda.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/bantuan-darurat"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-orange-600 rounded-full font-semibold font-body shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                Kontak Darurat
              </motion.a>
              <motion.a
                href="/tips"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md text-white border-2 border-white/30 rounded-full font-semibold font-body hover:bg-white/20 transition-all duration-300"
              >
                <HelpCircle className="w-5 h-5" />
                Tips & Panduan
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
