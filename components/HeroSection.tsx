'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';

const dynamicTexts = [
  "Warisan Budaya Mendunia",
  "Festival Perahu Tradisional", 
  "Togak Luan yang Memukau",
  "Kuantan Singingi, Riau"
];

const destinationImages = [
  { src: '/pacu-jalur/pacu-jalur-1.webp', title: 'Festival Pacu Jalur', location: 'Kuantan Singingi, Riau', rating: 5 },
  { src: '/pacu-jalur/pacu-jalur-2.png', title: 'Perahu Tradisional', location: 'Teluk Kuantan, Riau', rating: 5 },
  { src: '/pacu-jalur/pacu-jalur-3.jpeg', title: 'Togak Luan', location: 'Kuantan Singingi, Riau', rating: 5 },
  { src: '/pacu-jalur/pacu-jalur-4.jpeg', title: 'Budaya Melayu', location: 'Riau, Indonesia', rating: 5 },
  { src: '/pacu-jalur/pacu-jalur-5.jpeg', title: 'Festival Air', location: 'Kuantan Singingi, Riau', rating: 5 }
];

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentText, setCurrentText] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSwitching, setIsSwitching] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % dynamicTexts.length);
    }, 3000);

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  const nextImage = () => {
    setIsSwitching(true);
    setCurrentImageIndex((prev) => (prev + 1) % destinationImages.length);
    setTimeout(() => setIsSwitching(false), 50);
  };

  const prevImage = () => {
    setIsSwitching(true);
    setCurrentImageIndex((prev) => (prev - 1 + destinationImages.length) % destinationImages.length);
    setTimeout(() => setIsSwitching(false), 50);
  };

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-gray-900">
      {/* Background Image with Parallax + Crossfade */}
      <div className="absolute inset-0 z-0">
        {destinationImages.map((img, index) => (
          <div key={index} className="absolute inset-0">
            <Image
              src={img.src}
              alt={img.title}
              fill
              className={`object-cover transition-opacity duration-1000 will-change-transform ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px) scale(${index === currentImageIndex ? 1.06 : 1.04})`,
                filter: 'contrast(1.05) saturate(1.15) brightness(0.95)'
              }}
              priority={index === 0}
            />
          </div>
        ))}
        {/* Vignette + gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-black/70"></div>
        <div className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
          isSwitching ? 'opacity-80' : 'opacity-0'
        }`} style={{
          background:
            'radial-gradient(1200px 600px at 50% 70%, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.65) 100%)'
        }}></div>
      </div>

      {/* Social Media Icons */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-20 flex flex-col space-y-4">
        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
          </svg>
        </div>
        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
          </svg>
        </div>
        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </div>
      </div>

      {/* Main Content Container */}
      <div className={`relative z-10 flex items-center min-h-screen transition-all duration-1000 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="text-white space-y-8">
              <div className="space-y-4">
                <p className="text-sm font-medium tracking-wider uppercase">Temukan</p>
                <h1 className="font-heading text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="block bg-gradient-to-r from-orange-400 via-red-400 to-orange-600 bg-clip-text text-transparent">
                    PACU JALUR
                  </span>
                </h1>
                <div className="h-16 flex items-center">
                  <span className="text-xl lg:text-3xl font-medium animate-fade-in-up">
                    {dynamicTexts[currentText]}
                  </span>
                </div>
              </div>
              
              <p className="text-lg lg:text-xl text-gray-200 leading-relaxed max-w-lg">
                Dari festival perahu tradisional yang memukau hingga keindahan budaya Melayu — 
                rasakan keindahan Pacu Jalur melalui perjalanan yang dirancang khusus untuk Anda. 
                Nikmati pertunjukan Togak Luan yang viral dan jelajahi keajaiban budaya Riau 
                dengan paket wisata keluarga yang menarik.
              </p>
              
              <button className="group bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg flex items-center">
                <span className="flex items-center">
                  Jelajahi Lebih Lanjut
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Right Content - Destination Cards */}
            <div className="relative">
              <div className="flex space-x-4 overflow-x-auto pb-4">
                {destinationImages.map((destination, index) => (
                  <div 
                    key={index}
                    className={`flex-shrink-0 w-64 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 cursor-pointer transition-all duration-300 ${
                      index === currentImageIndex ? 'ring-2 ring-orange-400 scale-105' : 'hover:scale-105'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <div className="relative h-48 rounded-xl overflow-hidden mb-3">
                      <Image
                        src={destination.src}
                        alt={destination.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-white">
                      <p className="text-sm text-gray-300">{destination.location}</p>
                      <h3 className="font-heading text-lg font-bold mb-2">{destination.title}</h3>
                      <div className="flex items-center">
                        {[...Array(destination.rating)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Navigation Arrows */}
              <div className="flex justify-center space-x-4 mt-6">
                <button 
                  onClick={prevImage}
                  className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={nextImage}
                  className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
}