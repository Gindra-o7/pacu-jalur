"use client";

import { motion } from "framer-motion";
import Header from "@/components/common/Header";
import Footer from "@/components/landing/Footer";
import SidebarNav from "@/components/common/SidebarNav";
import { Sun, Hotel, DollarSign, Calendar, Heart, ShoppingBag, MapPin, Camera, AlertTriangle, CheckCircle2, XCircle, Waves, Users, Sparkles } from "lucide-react";

const NAV_SECTIONS = [
  { id: "tips-wisata", label: "Tips Wisata" },
  { id: "dos", label: "Do&apos;s" },
  { id: "donts", label: "Don&apos;ts" },
];

const tipsWisata = [
  {
    icon: MapPin,
    title: "Datang Lebih Awal",
    description: "Datanglah lebih awal ke lokasi utama seperti Tepian Narosa Teluk Kuantan agar mendapatkan posisi terbaik untuk menonton perlombaan.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Sun,
    title: "Siapkan Perlengkapan Anti Panas",
    description: "Bawa alas duduk, payung atau topi, kacamata hitam, tabir surya, dan air mineral karena festival berlangsung berjam-jam di bawah terik matahari.",
    color: "from-orange-500 to-yellow-500",
  },
  {
    icon: Hotel,
    title: "Pesan Penginapan Jauh Hari",
    description: "Pesan penginapan jauh hari sebelum festival karena kamar hotel, losmen, dan rumah sewa cepat penuh mendekati hari H.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: DollarSign,
    title: "Bawa Uang Tunai",
    description: "Bawa uang tunai secukupnya untuk berbelanja di bazar UMKM dan festival makanan tradisional yang biasanya ramai selama event.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Calendar,
    title: "Ikuti Kegiatan Festival",
    description: "Jika ingin pengalaman terbaik, ikuti kegiatan festival budaya lain seperti pawai, pentas seni, begulang, dan bazar lokal.",
    color: "from-red-500 to-orange-500",
  },
  {
    icon: Heart,
    title: "Hormati Prosesi Adat",
    description: "Hormati prosesi adat, terutama saat pembukaan dan penutupan acara. Tunjukkan sikap sopan dan ikut menjaga suasana budaya.",
    color: "from-indigo-500 to-purple-500",
  },
];

const dosList = [
  {
    icon: Users,
    text: "Kenakan pakaian yang sopan dan nyaman serta sesuai dengan nuansa budaya lokal.",
  },
  {
    icon: Sparkles,
    text: "Ikut merasakan meriahnya festival dengan mengikuti antusiasme penonton namun tetap tertib.",
  },
  {
    icon: ShoppingBag,
    text: "Dukung perekonomian lokal dengan membeli produk UMKM, makanan, atau cinderamata di area festival.",
  },
  {
    icon: MapPin,
    text: "Perhatikan jadwal acara dan rute transportasi agar tidak kesulitan mencapai lokasi sungai saat festival berlangsung.",
  },
  {
    icon: Waves,
    text: "Manfaatkan fasilitas umum yang tersedia, serta pedomani arahan petugas dan panitia.",
  },
  {
    icon: Camera,
    text: "Abadikan momen penting dengan foto atau video, tapi tetap perhatikan privasi peserta dan masyarakat sekitar.",
  },
];

const dontsList = [
  {
    icon: AlertTriangle,
    text: "Jangan berdiri atau terlalu dekat ke bibir sungai/arena lomba, agar tidak mengganggu jalannya perlombaan dan menjaga keselamatan.",
  },
  {
    icon: XCircle,
    text: "Hindari membuang sampah sembarangan karena area festival dijaga kebersihannya sebagai bentuk penghormatan kepada budaya setempat.",
  },
  {
    icon: AlertTriangle,
    text: "Jangan berkata atau bertindak tidak sopan saat prosesi adat atau selama festival berlangsung.",
  },
  {
    icon: XCircle,
    text: "Sebaiknya tidak membawa barang berharga berlebihan; fokuslah menikmati festival tanpa risiko kehilangan.",
  },
  {
    icon: AlertTriangle,
    text: "Jangan mengganggu tukang tari atau peserta jalur yang sedang bertanding; semua aksi di sungai dan perahu adalah bagian sakral dari tradisi.",
  },
  {
    icon: XCircle,
    text: "Hindari menyeberang sungai tanpa izin atau mengakses area terlarang yang telah ditandai oleh panitia.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

export default function TipsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <SidebarNav sections={NAV_SECTIONS} />

      {/* Hero Section */}
      <section id="tips-wisata" className="relative pt-32 pb-20 bg-linear-to-br from-orange-50 via-white to-blue-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-6">
              <Sparkles className="w-5 h-5 text-orange-600" />
              <span className="text-orange-700 font-semibold font-body">Panduan Wisatawan</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-heading">
              Tips Wisata <span className="bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Pacu Jalur</span>
            </h1>
            <div className="w-24 h-1 bg-linear-to-r from-orange-500 to-red-500 mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-body">Panduan lengkap untuk pengalaman terbaik menikmati festival budaya Pacu Jalur</p>
          </motion.div>
        </div>
      </section>

      {/* Tips Wisata Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-heading">Tips</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-body">Persiapan yang tepat akan membuat pengalaman Anda lebih menyenangkan dan berkesan</p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tipsWisata.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <motion.div key={index} variants={itemVariants} whileHover={{ scale: 1.05, y: -5 }} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300">
                  <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${tip.color} flex items-center justify-center mb-6 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">{tip.title}</h3>
                  <p className="text-gray-700 leading-relaxed font-body">{tip.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Do's Section */}
      <section id="dos" className="py-20 bg-linear-to-br from-green-50 via-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 font-heading">Do&apos;s: Hal-Hal yang Dianjurkan</h2>
            </div>
            <div className="w-24 h-1 bg-green-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-body">Lakukan hal-hal berikut untuk pengalaman yang lebih baik dan menghormati budaya setempat</p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 gap-6">
            {dosList.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div key={index} variants={itemVariants} whileHover={{ scale: 1.02, x: 5 }} className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-500 hover:shadow-lg transition-all duration-300 flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-gray-700 leading-relaxed font-body flex-1">{item.text}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Don'ts Section */}
      <section id="donts" className="py-20 bg-linear-to-br from-red-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <XCircle className="w-8 h-8 text-red-600" />
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 font-heading">Don&apos;ts: Hal-Hal yang Dilarang</h2>
            </div>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-body">Hindari hal-hal berikut untuk menjaga keselamatan dan menghormati tradisi budaya</p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 gap-6">
            {dontsList.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div key={index} variants={itemVariants} whileHover={{ scale: 1.02, x: 5 }} className="bg-white rounded-xl p-6 shadow-md border-l-4 border-red-500 hover:shadow-lg transition-all duration-300 flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-red-600" />
                  </div>
                  <p className="text-gray-700 leading-relaxed font-body flex-1">{item.text}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Closing CTA Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-linear-to-br from-orange-500 to-red-600 rounded-2xl p-8 md:p-10 text-white text-center shadow-xl"
          >
            <Heart className="w-12 h-12 mx-auto mb-4 text-white/90" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4 font-heading">Nikmati Festival dengan Penuh Hormat</h2>
            <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-body text-white/95">
              Dengan mengikuti panduan ini, Anda tidak hanya akan mendapatkan pengalaman terbaik, tetapi juga turut menjaga dan menghormati warisan budaya yang telah hidup selama berabad-abad. Selamat menikmati festival Pacu Jalur!
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
