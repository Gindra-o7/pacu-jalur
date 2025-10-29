export default function PartnersSection() {
  const partners = [
    {
      name: 'Kementerian Pariwisata',
      logo: '🏛️',
      description: 'Kementerian Pariwisata dan Ekonomi Kreatif RI'
    },
    {
      name: 'UNESCO',
      logo: '🌍',
      description: 'United Nations Educational, Scientific and Cultural Organization'
    },
    {
      name: 'Pemprov Riau',
      logo: '🏛️',
      description: 'Pemerintah Provinsi Riau'
    },
    {
      name: 'Disparbud Kuantan Singingi',
      logo: '🎭',
      description: 'Dinas Pariwisata dan Kebudayaan Kabupaten Kuantan Singingi'
    },
    {
      name: 'Wonderful Indonesia',
      logo: '🇮🇩',
      description: 'Brand Pariwisata Indonesia'
    },
    {
      name: 'Visit Riau',
      logo: '🏞️',
      description: 'Dinas Pariwisata Provinsi Riau'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading">
            Partner & Pengakuan
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-body">
            Didukung oleh berbagai institusi pemerintah dan organisasi internasional
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center group"
            >
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {partner.logo}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300 font-heading">
                {partner.name}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed font-body">
                {partner.description}
              </p>
            </div>
          ))}
        </div>

        {/* Awards & Recognition */}
        <div className="mt-16 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center font-heading">
            Penghargaan & Pengakuan
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2">🏆</div>
              <div className="font-semibold text-gray-900 font-heading">UNESCO</div>
              <div className="text-sm text-gray-600">World Heritage Nominee</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🌟</div>
              <div className="font-semibold text-gray-900 font-heading">Wonderful Indonesia</div>
              <div className="text-sm text-gray-600">Featured Destination</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🎖️</div>
              <div className="font-semibold text-gray-900 font-heading">Kemenparekraf</div>
              <div className="text-sm text-gray-600">Cultural Heritage</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">📱</div>
              <div className="font-semibold text-gray-900 font-heading">Social Media</div>
              <div className="text-sm text-gray-600">Viral Global</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
