// Data/content untuk Perahu Baganduang
// Business logic terpisah dari UI components

import { getStorageImageUrl } from "@/utils/supabase/storage";

export const perahuBaganduangData = {
  title: "Perahu Baganduang",
  location: "Lubuk Jambi, Kecamatan Kuantan Mudik, Kabupaten Kuantan Singingi, Riau",

  overview: {
    title: "Gambaran Tradisi",
    description: "Perahu Baganduang adalah tradisi adat unik di Kecamatan Kuantan Mudik, Kuantan Singingi, Riau, khususnya di Lubuk Jambi, berupa parade perahu gabungan (2–3 perahu panjang yang digandeng dengan bambu). Tradisi ini telah dilestarikan selama lebih dari satu abad dan kini menjadi bagian agenda festival budaya tahunan selama Lebaran.",
  },

  history: {
    title: "Sejarah dan Filosofi",
    description: "Pada masa lalu, perahu baganduang dipakai sebagai transportasi air utama untuk raja atau masyarakat dalam acara Majompuik Limau (menjemput jeruk), pengangkutan hasil bumi, dan silaturahmi ke rumah pemangku adat pada hari raya. Seiring waktu, parade perahu ini dikembangkan menjadi festival publik sejak tahun 1996, melibatkan gotong-royong para muda-mudi dan tua-muda sebagai bentuk ekspresi kegembiraan dan persatuan.",
  },

  festival: {
    title: "Tradisi Festival & Kreasi Ornamen",
    description: "Setiap perahu peserta dihias dengan janur kuning, kain panjang, simbol-simbol adat (kerbau, cangkul, hasil pertanian, dll), dan berparade di Sungai Kuantan. Festival diwarnai lomba hias, musik, serta prosesi adat oleh bujang gadis masyarakat Lubuk Jambi. Parade perahu baganduang biasanya diikuti oleh banyak kelompok kerja desa (\"batobo\") dan ditonton ribuan warga serta wisatawan lokal maupun luar daerah.",
  },

  attractions: {
    title: "Daya Tarik Wisata",
    description: "Keindahan ornamen dan filosofi adat, parade perahu bergandeng yang penuh warna dan simbol lokal menjadi daya tarik visual utama.\n\nFestival membangkitkan semangat gotong-royong dan kerukunan warga, serta menghadirkan pengalaman budaya khas Kuantan Mudik.\n\nWisatawan dapat menikmati kehangatan masyarakat, sejarah unik, dan tradisi yang masih lestari.",
  },

  eventInfo: {
    title: "Waktu dan Tempat Event",
    description: "Festival Perahu Baganduang digelar setahun sekali pada hari raya Idul Fitri di Tepian Muko Lobuah Lubuk Jambi, dan menjadi salah satu rangkaian acara wisata budaya terbesar di Kuantan Mudik.",
  },

  tips: {
    title: "Panduan Wisatawan",
    items: [
      "Cek jadwal festival jauh hari, karena ribuan penonton memadati tepian sungai",
      "Datang lebih awal untuk menikmati proses hias perahu dan ritual adat",
      "Ikuti aturan kebersihan dan hormati adat setempat",
      "Bawa kamera untuk mengabadikan momen parade dan ornamen perahu",
    ],
  },

  gallery: {
    title: "Galeri Foto",
    description: "Deretan foto parade, penampakan ornamen, suasana festival dan keramaian penonton",
    images: [
      {
        url: getStorageImageUrl("public/perahu-baganduang-1.jpg"),
        alt: "Parade Perahu Baganduang",
        title: "Parade Perahu Baganduang",
      },
      {
        url: getStorageImageUrl("public/perahu-baganduang-2.jpg"),
        alt: "Ornamen dan Hiasan Perahu",
        title: "Ornamen dan Hiasan Perahu",
      },
      {
        url: getStorageImageUrl("public/perahu-baganduang-3.jpg"),
        alt: "Suasana Festival dan Keramaian Penonton",
        title: "Suasana Festival",
      },
    ],
  },
};

