export default function IntroSection() {
  return (
    <section id="intro" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading">Warisan Budaya yang Mendunia</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-body">
              <strong className="text-green-700">Pacu Jalur</strong> adalah festival perahu tradisional unik dari Kuantan Singingi, Riau, yang telah menjadi warisan budaya mendunia. Tradisi ini menampilkan lomba perahu panjang dengan
              <strong className="text-orange-600"> penari anak Togak Luan</strong> yang memukau penonton.
            </p>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-body">
              Festival ini telah menarik lebih dari <strong className="text-blue-600">50.000 pengunjung</strong> setiap tahunnya dan telah berlangsung selama <strong className="text-brown-600">lebih dari 100 tahun</strong>, menjadikannya
              salah satu tradisi budaya tertua di Indonesia.
            </p>

            <div className="flex flex-wrap gap-6 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">100+</div>
                <div className="text-sm text-gray-600">Tahun Tradisi</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500">50K+</div>
                <div className="text-sm text-gray-600">Pengunjung/Tahun</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500">UNESCO</div>
                <div className="text-sm text-gray-600">Warisan Budaya</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <img src="/pacu-jalur/pacu-jalur-2.png" alt="Pacu Jalur Festival" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
              <div className="text-sm text-gray-600">Festival Pacu Jalur 2024</div>
              <div className="font-semibold text-gray-900">Kuantan Singingi, Riau</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
