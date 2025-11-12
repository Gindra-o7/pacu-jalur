"use client";

import { motion } from "framer-motion";
import Header from "@/components/common/Header";
import Footer from "@/components/landing/Footer";
import SidebarNav from "@/components/common/SidebarNav";
import {
  Construction,
  Hammer,
  Wrench,
  ArrowLeft,
  Clock,
  Zap,
  Waves,
  MapPin,
  Trees,
  Shirt,
  Ship,
  Palette,
  Hotel,
  Bus,
  Car,
  Map,
  Calendar,
  Video,
  Star,
  Image as ImageIcon,
  BookOpen,
  Award,
  Phone,
  HelpCircle,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

type IconName = "construction" | "waves" | "mapPin" | "trees" | "shirt" | "ship" | "palette" | "hotel" | "bus" | "car" | "map" | "calendar" | "video" | "star" | "image" | "bookOpen" | "award" | "phone" | "helpCircle" | "messageSquare";

interface UnderConstructionProps {
  title: string;
  description?: string;
  icon?: IconName;
  color?: string;
}

const iconMap: Record<IconName, React.ComponentType<{ className?: string }>> = {
  construction: Construction,
  waves: Waves,
  mapPin: MapPin,
  trees: Trees,
  shirt: Shirt,
  ship: Ship,
  palette: Palette,
  hotel: Hotel,
  bus: Bus,
  car: Car,
  map: Map,
  calendar: Calendar,
  video: Video,
  star: Star,
  image: ImageIcon,
  bookOpen: BookOpen,
  award: Award,
  phone: Phone,
  helpCircle: HelpCircle,
  messageSquare: MessageSquare,
};

const NAV_SECTIONS = [{ id: "hero", label: "Beranda" }];

const UnderConstruction = ({
  title,
  description = "Halaman ini sedang dalam tahap pengembangan. Kami sedang bekerja keras untuk menyajikan konten terbaik untuk Anda.",
  icon = "construction",
  color = "from-orange-500 to-red-500",
}: UnderConstructionProps) => {
  const tools = [Hammer, Wrench, Construction, Zap];
  const Icon = iconMap[icon] || Construction;

  const floatingElements = [
    { x: -50, duration: 3.5, delay: 0, left: 10, top: 20 },
    { x: 30, duration: 4.2, delay: 0.5, left: 80, top: 15 },
    { x: -80, duration: 3.8, delay: 1, left: 20, top: 60 },
    { x: 60, duration: 4.5, delay: 1.5, left: 70, top: 70 },
    { x: -30, duration: 3.2, delay: 0.8, left: 50, top: 40 },
    { x: 40, duration: 4.0, delay: 1.2, left: 90, top: 50 },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <SidebarNav sections={NAV_SECTIONS} />

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 bg-linear-to-br from-orange-50 via-white to-blue-50 overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>

        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-orange-500/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-red-500/20 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />

        <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center max-w-4xl mx-auto">
            {/* Icon Container */}
            <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 0.8, type: "spring", stiffness: 200 }} className="mb-8 flex justify-center">
              <div className={`relative w-32 h-32 rounded-full bg-linear-to-br ${color} flex items-center justify-center shadow-2xl`}>
                <Icon className="w-16 h-16 text-white" />
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border-4 border-white/30 border-t-transparent" />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-heading">
              {title}
            </motion.h1>

            {/* Divider */}
            <motion.div initial={{ width: 0 }} animate={{ width: "6rem" }} transition={{ delay: 0.4, duration: 0.6 }} className={`h-1 bg-linear-to-r ${color} mx-auto mb-8`} />

            {/* Description */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="text-xl md:text-2xl text-gray-700 leading-relaxed font-body mb-12 max-w-2xl mx-auto">
              {description}
            </motion.p>

            {/* Animated Tools */}
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
              className="flex justify-center gap-6 mb-12 flex-wrap"
            >
              {tools.map((Tool, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20, rotate: -10 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      rotate: 0,
                      transition: {
                        type: "spring",
                        stiffness: 200,
                      },
                    },
                  }}
                  whileHover={{
                    scale: 1.2,
                    rotate: [0, -10, 10, -10, 0],
                    transition: { duration: 0.5 },
                  }}
                  className="w-16 h-16 rounded-xl bg-white shadow-lg flex items-center justify-center border border-gray-100"
                >
                  <Tool className="w-8 h-8 text-orange-500" />
                </motion.div>
              ))}
            </motion.div>

            {/* Progress Indicator */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-orange-500" />
                <span className="text-gray-600 font-body font-medium">Sedang Dikerjakan</span>
              </div>
              <div className="w-full max-w-md mx-auto h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: "65%" }} transition={{ duration: 2, ease: "easeOut" }} className={`h-full bg-linear-to-r ${color} rounded-full relative`}>
                  <motion.div
                    animate={{ x: ["0%", "100%"] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 bg-white/30"
                    style={{ width: "30%" }}
                  />
                </motion.div>
              </div>
              <p className="text-sm text-gray-500 mt-2 font-body">65% Selesai</p>
            </motion.div>

            {/* Back Button */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-orange-500 to-red-500 text-white font-medium font-body hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <ArrowLeft className="w-5 h-5" />
                Kembali ke Beranda
              </Link>
            </motion.div>

            {/* Floating Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {floatingElements.map((element, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    y: [0, -100],
                    x: [0, element.x],
                  }}
                  transition={{
                    duration: element.duration,
                    repeat: Infinity,
                    delay: element.delay,
                  }}
                  className="absolute w-2 h-2 rounded-full bg-orange-500/50"
                  style={{
                    left: `${element.left}%`,
                    top: `${element.top}%`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default UnderConstruction;
