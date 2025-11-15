"use client";

import Header from "@/components/common/Header";
import Footer from "@/components/landing/Footer";
import SidebarNav from "@/components/common/SidebarNav";
import HeroSection from "@/components/perahu-baganduang/HeroSection";
import OverviewSection from "@/components/perahu-baganduang/OverviewSection";
import HistorySection from "@/components/perahu-baganduang/HistorySection";
import FestivalSection from "@/components/perahu-baganduang/FestivalSection";
import AttractionsSection from "@/components/perahu-baganduang/AttractionsSection";
import EventSection from "@/components/perahu-baganduang/EventSection";
import TipsSection from "@/components/perahu-baganduang/TipsSection";
import { perahuBaganduangData } from "./data";

const NAV_SECTIONS = [
  { id: "gambaran-tradisi", label: "Gambaran Tradisi" },
  { id: "sejarah-filosofi", label: "Sejarah & Filosofi" },
  { id: "tradisi-festival", label: "Tradisi Festival" },
  { id: "daya-tarik", label: "Daya Tarik" },
  { id: "waktu-tempat", label: "Waktu & Tempat" },
  { id: "tips", label: "Tips" },
];

export default function PerahuBaganduangPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <SidebarNav sections={NAV_SECTIONS} />

      <HeroSection title={perahuBaganduangData.title} location={perahuBaganduangData.location} backgroundImage={perahuBaganduangData.gallery.images[0]?.url} />

      <OverviewSection title={perahuBaganduangData.overview.title} description={perahuBaganduangData.overview.description} image={perahuBaganduangData.gallery.images[0]} />

      <HistorySection title={perahuBaganduangData.history.title} description={perahuBaganduangData.history.description} image={perahuBaganduangData.gallery.images[1]} />

      <FestivalSection title={perahuBaganduangData.festival.title} description={perahuBaganduangData.festival.description} image={perahuBaganduangData.gallery.images[2]} />

      <AttractionsSection title={perahuBaganduangData.attractions.title} description={perahuBaganduangData.attractions.description} image={perahuBaganduangData.gallery.images[0]} />

      <EventSection title={perahuBaganduangData.eventInfo.title} description={perahuBaganduangData.eventInfo.description} />

      <TipsSection title={perahuBaganduangData.tips.title} items={perahuBaganduangData.tips.items} />

      <Footer />
    </main>
  );
}
