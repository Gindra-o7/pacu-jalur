"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const dynamicTexts = ["Warisan Budaya Mendunia", "Festival Perahu Tradisional", "Togak Luan yang Memukau", "Kuantan Singingi, Riau"];

const destinationImages = [
  { src: "/pacu-jalur/pacu-jalur-1.webp", title: "Festival Pacu Jalur", location: "Kuantan Singingi, Riau" },
  { src: "/pacu-jalur/pacu-jalur-2.png", title: "Perahu Tradisional", location: "Teluk Kuantan, Riau" },
  { src: "/pacu-jalur/pacu-jalur-3.jpeg", title: "Togak Luan", location: "Kuantan Singingi, Riau" },
  { src: "/pacu-jalur/pacu-jalur-4.jpeg", title: "Budaya Melayu", location: "Riau, Indonesia" },
  { src: "/pacu-jalur/pacu-jalur-5.jpeg", title: "Festival Air", location: "Kuantan Singingi, Riau" },
];

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentText, setCurrentText] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSwitching, setIsSwitching] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100,
    });
  }, []);

  const scrollCardIntoView = useCallback((index: number, behavior: ScrollBehavior = "smooth") => {
    const container = cardsContainerRef.current;
    const card = cardRefs.current[index];
    if (container && card) {
      container.scrollTo({ left: card.offsetLeft, behavior });
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);

    const interval = setInterval(() => {
      setCurrentText((prev) => {
        const next = (prev + 1) % dynamicTexts.length;
        return next;
      });
    }, 3000);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  const nextImage = () => {
    setIsSwitching(true);
    setCurrentImageIndex((prev) => {
      const next = (prev + 1) % destinationImages.length;
      scrollCardIntoView(next);
      return next;
    });
    setTimeout(() => setIsSwitching(false), 50);
  };

  const prevImage = () => {
    setIsSwitching(true);
    setCurrentImageIndex((prev) => {
      const next = (prev - 1 + destinationImages.length) % destinationImages.length;
      scrollCardIntoView(next);
      return next;
    });
    setTimeout(() => setIsSwitching(false), 50);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        setIsSwitching(true);
        setCurrentImageIndex((prev) => {
          const next = e.key === "ArrowRight" ? (prev + 1) % destinationImages.length : (prev - 1 + destinationImages.length) % destinationImages.length;
          scrollCardIntoView(next);
          return next;
        });
        setTimeout(() => setIsSwitching(false), 50);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [scrollCardIntoView]);

  return (
    <section id="home" className="relative min-h-screen bg-gray-900 overflow-visible">
      <div className="absolute inset-0 z-0">
        {destinationImages.map((img, index) => (
          <div key={index} className="absolute inset-0">
            <Image
              src={img.src}
              alt={img.title}
              fill
              className={`object-cover transition-opacity duration-1000 will-change-transform ${index === currentImageIndex ? "opacity-100" : "opacity-0"}`}
              style={{
                transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px) scale(${index === currentImageIndex ? 1.06 : 1.04})`,
                filter: "contrast(1.05) saturate(1.15) brightness(0.95)",
              }}
              priority={index === 0}
            />
          </div>
        ))}
        <div
          className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${isSwitching ? "opacity-80" : "opacity-0"}`}
          style={{
            background: "radial-gradient(1200px 600px at 50% 70%, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.65) 100%)",
          }}
        ></div>
      </div>

      <div className={`relative z-10 flex items-stretch min-h-screen pb-8 lg:pb-10 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="w-full mx-auto px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch min-h-full">
            <div className="relative text-white space-y-6 pl-6 pr-6 lg:pl-14 lg:pr-8 self-start pt-8 lg:pt-24">
              <div
                className="pointer-events-none absolute -inset-x-6 -inset-y-8 lg:-inset-x-12 lg:-inset-y-10 -z-10"
                style={{
                  background: "radial-gradient(700px 360px at 20% 55%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.0) 100%)",
                  filter: "blur(2px)",
                }}
              ></div>
              <div className="space-y-4 max-w-lg relative z-10">
                <div className="flex items-center gap-3 animate-fade-in-left">
                  <p className="text-xs font-medium tracking-wider uppercase">Temukan</p>
                  <div className="h-px bg-white/40 flex-1"></div>
                </div>
                <h1 className="font-heading text-4xl lg:text-5xl font-bold leading-tight animate-slide-in-left" style={{ textShadow: "0 8px 28px rgba(0,0,0,0.7)" }}>
                  <span className="block bg-gradient-to-r from-orange-400 via-red-400 to-orange-600 bg-clip-text text-transparent" style={{ textShadow: "0 6px 24px rgba(0,0,0,0.6)" }}>
                    PACU JALUR
                  </span>
                </h1>
                <div className="h-10 relative overflow-hidden flex items-center">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={currentText}
                      initial={{ opacity: 0, y: 8, filter: "blur(2px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -8, filter: "blur(2px)" }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="absolute inset-0 flex items-center text-base lg:text-xl font-medium"
                      style={{ textShadow: "0 4px 14px rgba(0,0,0,0.85)" }}
                    >
                      {dynamicTexts[currentText]}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <p className="text-sm lg:text-base text-gray-200 leading-relaxed max-w-md animate-fade-in-left delay-200" style={{ textShadow: "0 3px 14px rgba(0,0,0,0.9)" }}>
                  Festival perahu tradisional kebanggaan Riau.
                </p>
              </div>
            </div>

            <div className="relative pr-0 mr-0 overflow-hidden self-end">
              <div ref={cardsContainerRef} className="flex space-x-4 overflow-x-auto overflow-y-visible pb-16 pt-2 pl-6 pr-12 scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                {destinationImages.map((destination, index) => (
                  <div
                    key={index}
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    className={`flex-shrink-0 w-64 rounded-2xl cursor-pointer transition-all duration-300 will-change-transform${
                      index === currentImageIndex ? "scale-105 ring-2 ring-orange-500 shadow-2xl" : "hover:scale-[1.02] hover:shadow-xl"
                    }`}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      scrollCardIntoView(index);
                    }}
                  >
                    <div className="relative h-36 rounded-2xl overflow-hidden shadow-lg">
                      <Image src={destination.src} alt={destination.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <p className="text-xs" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}>
                          {destination.location}
                        </p>
                        <h3 className="font-heading text-lg font-bold" style={{ textShadow: "0 3px 10px rgba(0,0,0,1)" }}>
                          {destination.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="absolute left-3 bottom-3 flex items-center gap-3 z-10">
                <button onClick={prevImage} className="w-10 h-10 bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/35 transition-colors shadow-md">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button onClick={nextImage} className="w-10 h-10 bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/35 transition-colors shadow-md">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
