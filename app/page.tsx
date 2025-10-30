import Header from "../components/common/Header";
import HeroSection from "../components/landing/HeroSection";
import IntroSection from "../components/landing/IntroSection";
import VideoSection from "../components/landing/VideoSection";
import FestivalInfo from "../components/landing/FestivalInfo";
import QuickLinks from "../components/landing/QuickLinks";
import Gallery from "../components/landing/Gallery";
import Testimonials from "../components/landing/Testimonials";
import NewsSection from "../components/landing/NewsSection";
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
  { id: "testimonials", label: "Testimoni" },
  { id: "partners", label: "Partner" },
];

const Home = () => {
  return (
    <main className="min-h-screen overflow-hidden">
      <Header />
      <SidebarNav sections={NAV_SECTIONS} />
      <HeroSection />
      <IntroSection />
      <VideoSection />
      <FestivalInfo />
      <QuickLinks />
      <Gallery />
      <Testimonials />
      <NewsSection />
      <PartnersSection />
      <Footer />
    </main>
  );
}

export default Home;