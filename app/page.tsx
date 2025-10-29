import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import IntroSection from '../components/IntroSection';
import VideoSection from '../components/VideoSection';
import FestivalInfo from '../components/FestivalInfo';
import QuickLinks from '../components/QuickLinks';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import NewsSection from '../components/NewsSection';
import PartnersSection from '../components/PartnersSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
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