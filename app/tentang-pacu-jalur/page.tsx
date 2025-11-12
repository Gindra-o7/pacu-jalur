"use client";

import { motion } from "framer-motion";
import Header from "@/components/common/Header";
import Footer from "@/components/landing/Footer";
import SidebarNav from "@/components/common/SidebarNav";
import { Calendar, Award, Users, Waves, Heart, Sparkles, BookOpen, Flag } from "lucide-react";

const NAV_SECTIONS = [
  { id: "sejarah", label: "Sejarah" },
  { id: "filosofi", label: "Filosofi" },
  { id: "warisan", label: "Warisan" },
];

const timelineData = [
  {
    period: "Abad ke-17",
    title: "Asal Usul dan Masa Awal",
    icon: Waves,
    color: "from-blue-500 to-cyan-500",
    content: [
      "Referensi tertulis paling awal mengenai pacu jalur secara spesifik disebutkan pada abad ke-17. Pada masa itu, jalur atau perahu panjang yang dibuat dari satu batang kayu gelondongan utuh berfungsi sebagai alat transportasi utama masyarakat di wilayah Rantau Kuantan.",
      "Karena akses darat belum begitu berkembang, perahu ini digunakan untuk mengangkut hasil bumi seperti pisang, tebu, dan buah-buahan lokal dari hulu Kuantan hingga ke hilir sungai.",
      "Sebelum menebang pohon untuk membuat jalur, masyarakat setempat melakukan ritual untuk meminta izin kepada hutan, menunjukkan hubungan spiritual yang mendalam dengan alam. Seiring waktu, jalur mulai dihias dengan berbagai ornamen budaya setempat, seperti ukiran kepala ular, buaya, dan harimau di bagian lambung dan selembayung, serta perlengkapan tradisional seperti payung dan selendang.",
    ],
  },
  {
    period: "Sekitar Abad ke-18",
    title: "Periode Perlombaan Awal",
    icon: Calendar,
    color: "from-green-500 to-emerald-500",
    content: [
      "Sekitar satu abad setelah jalur menjadi transportasi utama, tradisi ini mulai diperlombakan. Perlombaan dayung ini pertama kali digelar sebagai bagian dari perayaan hari-hari besar Islam, seperti Maulid Nabi dan Idul Fitri.",
      "Awalnya, pemenang perlombaan tidak menerima hadiah uang, tetapi acara diakhiri dengan makan bersama menggunakan makanan khas setempat, atau di beberapa kampung diberi hadiah berupa merewa (penghargaan dari para penghulu adat).",
    ],
  },
  {
    period: "1890-1905",
    title: "Era Penjajahan Belanda",
    icon: Flag,
    color: "from-orange-500 to-red-500",
    content: [
      "Ketika Belanda masuk ke wilayah Rantau Kuantan sekitar tahun 1893, penggunaan pacu jalur mengalami transformasi signifikan. Pada tahun 1905, Belanda secara resmi menduduki Teluk Kuantan dan mengubah tujuan penyelenggaraan pacu jalur.",
      "Mulai saat itu, tradisi ini digunakan untuk merayakan ulang tahun Ratu Wilhelmina setiap tanggal 31 Agustus, menggeser fungsinya dari perayaan keagamaan menjadi perayaan kolonial. Festival biasanya berlangsung hingga tanggal 1 atau 2 September.",
      "Pada periode ini, Belanda juga mengubah sistem pemberian hadiah, dari merewa menjadi tonggol (merewa yang dihias dan diberi nomor pemenang). Jenis jalur yang dihias secara khusus juga mulai dikembangkan pada masa ini.",
    ],
  },
  {
    period: "1930-1950-an",
    title: "Masa Stagnasi dan Pemulihan",
    icon: Heart,
    color: "from-purple-500 to-pink-500",
    content: [
      "Masa pendudukan Jepang dan periode agresi militer setelah proklamasi kemerdekaan menyebabkan krisis ekonomi dan situasi keamanan yang tidak stabil, sehingga tradisi pacu jalur sempat terhenti.",
      "Namun, setelah tahun 1950, ketika keadaan ekonomi masyarakat berangsur pulih dan harga karet alam meningkat, tradisi pacu jalur kembali dihidupkan. Perahu-perahu dengan berbagai kapasitas mulai bermunculan kembali, dari perahu berkapasitas 7-15 orang, hingga 25 orang, dan jalur besar seperti sebelumnya.",
    ],
  },
  {
    period: "Awal 1950-an - Sekarang",
    title: "Integrasi dengan Nasionalisme",
    icon: Award,
    color: "from-yellow-500 to-orange-500",
    content: [
      "Awal tahun 1950-an menandai titik balik penting ketika tradisi pacu jalur mulai menjadi bagian dari perayaan Hari Kemerdekaan Republik Indonesia. Sejak saat itu, perlombaan ini mendapatkan tempat istimewa sebagai bagian dari perayaan nasional, terutama di wilayah Riau.",
      "Hadiah berevolusi dari merewa dan tonggol menjadi hewan ternak serta piala bergilir.",
      "Perkembangan modern dimulai ketika pada tahun 2002, lomba pacu jalur di Teluk Kuantan diikuti oleh 117 tim dari berbagai daerah di Riau, provinsi lain di Indonesia, bahkan beberapa negara tetangga. Tradisi ini kemudian dimasukkan ke dalam agenda budaya nasional dan diupayakan untuk menjadi bagian dari kalender pariwisata tingkat internasional.",
    ],
  },
  {
    period: "2014 - Sekarang",
    title: "Pengakuan Resmi dan Status Saat Ini",
    icon: Sparkles,
    color: "from-indigo-500 to-purple-500",
    content: [
      "Sejak tahun 2014, pacu jalur secara resmi diakui dan ditetapkan oleh Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi Republik Indonesia sebagai bagian integral dari Warisan Budaya Nasional Takbenda.",
      "Festival ini diadakan setiap tahun sekitar tanggal 23-26 Agustus di Sungai Batang Kuantan, menjadi festival tahunan terbesar bagi masyarakat setempat.",
      "Pengakuan global ditunjukkan melalui berbagai prestasi, termasuk dipilihnya gambar pacu jalur sebagai Google Doodle pada tahun 2022 untuk memperingati Hari Kemerdekaan Indonesia. Tim pemenang pacu jalur juga berkesempatan menjadi atlet nasional Indonesia untuk mewakili negara di ajang balap perahu internasional.",
    ],
  },
];

const philosophyData = [
  {
    title: "Nilai Budaya Melayu",
    description: "Pacu jalur bukan sekadar perlombaan olahraga, tetapi representasi nilai-nilai budaya Melayu yang mendalam. Setiap perahu diisi 50-60 anak pacu dengan peran masing-masing.",
  },
  {
    title: "Tukang Tari (Anak Coki)",
    description:
      "Yang paling mencuri perhatian adalah tukang tari (anak coki)—anak kecil yang berdiri di ujung perahu, menari saat perahu unggul, dan sujud syukur saat mencapai garis finish. Ini adalah simbol kemenangan dan rasa syukur dalam tradisi Melayu yang hidup.",
  },
  {
    title: "Elemen Spiritual",
    description: "Tradisi ini juga mengandung elemen spiritual, di mana masyarakat setempat percaya bahwa kemenangan dalam perlombaan banyak ditentukan oleh olah batin dari pawang perahu atau dukun perahu.",
  },
  {
    title: "Ritual Magis",
    description:
      "Keseluruhan acara perlombaan diiringi oleh ritual-ritual magis sejak pemilihan kayu, pembuatan perahu, penarikan perahu, hingga acara perlombaan dimulai. Dengan demikian, pacu jalur merupakan adu tunjuk kekuatan spiritual antar dukun jalur, sambil tetap mempertahankan elemen olahraga dan kesenian.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

export default function TentangPacuJalurPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <SidebarNav sections={NAV_SECTIONS} />

      {/* Hero Section */}
      <section id="sejarah" className="relative pt-32 pb-20 bg-linear-to-br from-orange-50 via-white to-blue-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-6">
              <BookOpen className="w-5 h-5 text-orange-600" />
              <span className="text-orange-700 font-semibold font-body">Warisan Budaya Takbenda</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-heading">
              Sejarah Singkat <span className="bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Pacu Jalur</span>
            </h1>
            <div className="w-24 h-1 bg-linear-to-r from-orange-500 to-red-500 mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-body">Kuantan Singingi, Riau, Indonesia</p>
            <p className="text-lg text-gray-600 mt-4 leading-relaxed font-body max-w-3xl mx-auto">
              Pacu jalur adalah perlombaan tradisional dayung sampan yang merupakan warisan budaya takbenda masyarakat Kabupaten Kuantan Singingi, Riau, Indonesia. Tradisi ini telah menjadi ikon budaya yang diakui secara nasional dan
              internasional, mencerminkan kekayaan dan kearifan lokal masyarakat Melayu Rantau Kuantan.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-heading">Perjalanan Sejarah</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-body">Menelusuri evolusi pacu jalur dari alat transportasi hingga menjadi warisan budaya dunia</p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-linear-to-b from-blue-500 via-green-500 via-orange-500 via-purple-500 via-yellow-500 to-indigo-500 transform md:-translate-x-1/2"></div>

            <div className="space-y-16">
              {timelineData.map((item, index) => {
                const Icon = item.icon;
                const isEven = index % 2 === 0;

                return (
                  <motion.div key={index} variants={itemVariants} className={`relative flex items-center gap-8 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    {/* Timeline Dot */}
                    <div className="relative z-10 shrink-0">
                      <div className={`w-16 h-16 rounded-full bg-linear-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className={`flex-1 ${isEven ? "md:pr-8" : "md:pl-8"}`}>
                      <motion.div whileHover={{ scale: 1.02, y: -5 }} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300">
                        <div className="flex items-center gap-4 mb-4">
                          <span className={`px-4 py-1 rounded-full text-sm font-semibold bg-linear-to-r ${item.color} text-white font-body`}>{item.period}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">{item.title}</h3>
                        <div className="space-y-4">
                          {item.content.map((paragraph, pIndex) => (
                            <p key={pIndex} className="text-gray-700 leading-relaxed font-body">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="filosofi" className="py-20 bg-linear-to-br from-gray-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-heading">Filosofi dan Nilai Budaya</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-body">Makna mendalam di balik tradisi yang telah hidup selama berabad-abad</p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 gap-8">
            {philosophyData.map((item, index) => (
              <motion.div key={index} variants={itemVariants} whileHover={{ scale: 1.03, y: -5 }} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  {item.title}
                </h3>
                <p className="text-gray-700 leading-relaxed font-body">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Recognition Section */}
      <section id="warisan" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-linear-to-br from-orange-500 to-red-600 rounded-3xl p-12 md:p-16 text-white text-center shadow-2xl"
          >
            <Users className="w-16 h-16 mx-auto mb-6 text-white/90" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading">Warisan Budaya yang Dijaga</h2>
            <p className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto font-body text-white/95">
              Pacu jalur telah menjadi bagian integral dari identitas budaya masyarakat Kuantan Singingi, terus hidup dan berkembang dari generasi ke generasi, membawa pesan persatuan, semangat gotong royong, dan penghormatan terhadap alam
              yang menjadi fondasi kehidupan masyarakat Melayu Rantau Kuantan.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
