'use client';

import { useState, useEffect } from 'react';

export default function FestivalInfo() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date - contoh: 15 Agustus 2024
    const targetDate = new Date('2024-08-15T00:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="festival" className="py-20 bg-linear-to-br from-orange-50 to-red-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading">
            Festival Pacu Jalur 2024
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-body">
            Jangan lewatkan festival budaya terbesar di Kuantan Singingi. 
            Rasakan keindahan tradisi yang telah memukau dunia.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Countdown Timer */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center font-heading">
              Countdown Festival
            </h3>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="bg-orange-500 text-white text-3xl font-bold py-4 rounded-lg">
                  {timeLeft.days}
                </div>
                <div className="text-sm text-gray-600 mt-2">Hari</div>
              </div>
              <div className="text-center">
                <div className="bg-blue-500 text-white text-3xl font-bold py-4 rounded-lg">
                  {timeLeft.hours}
                </div>
                <div className="text-sm text-gray-600 mt-2">Jam</div>
              </div>
              <div className="text-center">
                <div className="bg-green-500 text-white text-3xl font-bold py-4 rounded-lg">
                  {timeLeft.minutes}
                </div>
                <div className="text-sm text-gray-600 mt-2">Menit</div>
              </div>
              <div className="text-center">
                <div className="bg-red-500 text-white text-3xl font-bold py-4 rounded-lg">
                  {timeLeft.seconds}
                </div>
                <div className="text-sm text-gray-600 mt-2">Detik</div>
              </div>
            </div>
            <div className="text-center">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 font-body">
                Daftar Sekarang
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">📅 Informasi Festival</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-orange-500 mr-3">📅</span>
                  <span className="font-semibold">Tanggal:</span>
                  <span className="ml-2">15-17 Agustus 2024</span>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-500 mr-3">📍</span>
                  <span className="font-semibold">Lokasi:</span>
                  <span className="ml-2">Teluk Kuantan, Kuantan Singingi</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-3">🎭</span>
                  <span className="font-semibold">Highlight:</span>
                  <span className="ml-2">Lomba Perahu & Togak Luan</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">🎪 Acara Utama</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium">Pembukaan Festival</span>
                  <span className="text-orange-500 font-semibold">15 Agt</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium">Lomba Pacu Jalur</span>
                  <span className="text-orange-500 font-semibold">16 Agt</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium">Penutupan & Pesta</span>
                  <span className="text-orange-500 font-semibold">17 Agt</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
