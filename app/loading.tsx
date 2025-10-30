"use client";

import Image from "next/image";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full blur-3xl opacity-30 bg-orange-500 animate-glow" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-20 bg-red-600 animate-glow" />

      <div className="relative flex flex-col items-center gap-6 px-6">
        <div className="relative">
          <div className="absolute inset-0 -z-10 animate-[pulse_2.2s_ease-in-out_infinite] rounded-full bg-orange-500/20 blur-2xl" />
          <div className="relative w-28 h-28 rounded-full bg-white/10 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-[0_25px_60px_rgba(0,0,0,0.35)]">
            <Image src="/sampan.png" alt="Sampan Pacu Jalur" width={64} height={64} className="animate-float drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)]" priority />
          </div>
          <div className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 w-44 h-8 opacity-70">
            <svg viewBox="0 0 200 40" className="w-full h-full">
              <path d="M0 20 C 30 0, 70 40, 100 20 S 170 0, 200 20" fill="none" stroke="#fb923c" strokeWidth="3" className="animate-[dash_2.8s_ease-in-out_infinite]" />
              <style>{`@keyframes dash { 0% { stroke-dasharray: 0 200; } 50% { stroke-dasharray: 120 200; } 100% { stroke-dasharray: 0 200; } }`}</style>
            </svg>
          </div>
        </div>

        <div className="text-center">
          <div className="text-sm tracking-widest uppercase text-white/70">Memuat</div>
          <h1 className="mt-1 font-heading text-3xl sm:text-4xl font-extrabold">
            <span className="bg-gradient-to-r from-orange-400 via-red-400 to-orange-600 bg-clip-text text-transparent animate-gradient">Pacu Jalur</span>
          </h1>
        </div>

        <div className="w-64 max-w-[80vw]">
          <div className="h-2.5 w-full rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-orange-500 animate-[loading_1.4s_ease-in-out_infinite] rounded-full" />
          </div>
          <style>{`@keyframes loading { 0% { width: 0% } 50% { width: 85% } 100% { width: 0% } }`}</style>
        </div>

        <p className="text-xs text-white/60 mt-1" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
          Menyiapkan pengalaman budaya Kuantan Singingi…
        </p>
      </div>
    </div>
  );
}

export default Loading;