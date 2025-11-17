import Header from "../components/common/Header";
import HeroSection from "../components/landing/HeroSection";
import IntroSection from "../components/landing/IntroSection";
import VideoSection from "../components/landing/VideoSection";
import FestivalInfo from "../components/landing/FestivalInfo";
import QuickLinks from "../components/landing/QuickLinks";
import Gallery from "../components/landing/Gallery";
import DesaBerlomba from "../components/landing/DesaBerlomba";
import PartnersSection from "../components/landing/PartnersSection";
import Footer from "../components/landing/Footer";
import SidebarNav from "@/components/common/SidebarNav";

const NAV_SECTIONS = [
  { id: "home", label: "Home" },
  { id: "intro", label: "Intro" },
  { id: "video", label: "Video" },
  { id: "festival", label: "Festival" },
  { id: "destinasi", label: "Destinasi" },
  { id: "gallery", label: "Galeri" },
  { id: "desa-berlomba", label: "Desa Berlomba" },
  { id: "partners", label: "Partner" },
];

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

async function getAcaraData(): Promise<Acara[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/acara`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!res.ok) {
      console.error("Failed to fetch acara data");
      return [];
    }

    const { data } = await res.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching acara:", error);
    return [];
  }
}

type Jalur = {
  id: string;
  nama: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  deskripsi: string | null;
};

type JalurData = {
  id: string;
  nama: string;
  desa: string;
  kecamatan: string;
};

type Galeri = {
  id: string;
  image_url: string;
  judul: string | null;
  caption: string | null;
  jalur_id: string;
  jalur: JalurData | null;
};

async function getJalurData(): Promise<Jalur[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/jalur`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!res.ok) {
      console.error("Failed to fetch jalur data");
      return [];
    }

    const { data } = await res.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching jalur:", error);
    return [];
  }
}

async function getGaleriData(): Promise<Galeri[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/galeri`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!res.ok) {
      console.error("Failed to fetch galeri data");
      return [];
    }

    const { data } = await res.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching galeri:", error);
    return [];
  }
}

export default async function Home() {
  // Fetch all data in parallel
  const [acaraList, jalurList, galleryImages] = await Promise.all([getAcaraData(), getJalurData(), getGaleriData()]);

  // Find upcoming event (event that hasn't ended yet)
  const now = new Date();
  const upcomingEvent = acaraList.find((acara) => new Date(acara.tgl_selesai) >= now);

  return (
    <main className="min-h-screen overflow-hidden">
      <Header />
      <SidebarNav sections={NAV_SECTIONS} />
      <HeroSection />
      <IntroSection />
      <VideoSection />
      <FestivalInfo upcomingEvent={upcomingEvent} allEvents={acaraList} />
      <QuickLinks />
      <Gallery galleryImages={galleryImages} />
      <DesaBerlomba jalurList={jalurList} galleryImages={galleryImages} />
      <PartnersSection />
      <Footer />
    </main>
  );
}
