"use client";

import Header from "@/components/common/Header";
import Footer from "@/components/landing/Footer";
import SidebarNav from "@/components/common/SidebarNav";
import HeroSection from "@/components/guruh-gemurai/HeroSection";
import OverviewSection from "@/components/guruh-gemurai/OverviewSection";
import AttractionsSection from "@/components/guruh-gemurai/AttractionsSection";
import FacilitiesSection from "@/components/guruh-gemurai/FacilitiesSection";
import AccessSection from "@/components/guruh-gemurai/AccessSection";
import OperatingHoursSection from "@/components/guruh-gemurai/OperatingHoursSection";
import TipsSection from "@/components/guruh-gemurai/TipsSection";
import GallerySection from "@/components/guruh-gemurai/GallerySection";
import MapSection from "@/components/guruh-gemurai/MapSection";
import { guruhGemuraiData } from "./data";

const NAV_SECTIONS = [
  { id: "gambaran-umum", label: "Gambaran Umum" },
  { id: "daya-tarik", label: "Daya Tarik" },
  { id: "fasilitas", label: "Fasilitas" },
  { id: "akses", label: "Akses" },
  { id: "jam-operasional", label: "Jam Operasional" },
  { id: "tips", label: "Tips" },
  { id: "galeri", label: "Galeri" },
  { id: "peta-kontak", label: "Peta & Kontak" },
];

export default function GuruhGemuraiPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <SidebarNav sections={NAV_SECTIONS} />

      <HeroSection title={guruhGemuraiData.title} location={guruhGemuraiData.location} backgroundImage={guruhGemuraiData.gallery.images[0]?.url} />

      <OverviewSection title={guruhGemuraiData.overview.title} description={guruhGemuraiData.overview.description} />

      <AttractionsSection title={guruhGemuraiData.attractions.title} description={guruhGemuraiData.attractions.description} />

      <FacilitiesSection title={guruhGemuraiData.facilities.title} items={guruhGemuraiData.facilities.items} />

      <AccessSection title={guruhGemuraiData.access.title} description={guruhGemuraiData.access.description} />

      <OperatingHoursSection title={guruhGemuraiData.operatingHours.title} description={guruhGemuraiData.operatingHours.description} />

      <TipsSection title={guruhGemuraiData.tips.title} items={guruhGemuraiData.tips.items} />

      <GallerySection title={guruhGemuraiData.gallery.title} description={guruhGemuraiData.gallery.description} images={guruhGemuraiData.gallery.images} />

      <MapSection title={guruhGemuraiData.map.title} description={guruhGemuraiData.map.description} contact={guruhGemuraiData.map.contact} />

      <Footer />
    </main>
  );
}
