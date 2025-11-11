export default function QuickLinks() {
  const links = [
    {
      title: 'Festival',
      description: 'Jadwal & Info Festival',
      icon: '🎭',
      color: 'from-orange-400 to-red-500',
      href: '/festival'
    },
    {
      title: 'Destinasi Wisata',
      description: 'Tempat Menarik Sekitar',
      icon: '🏞️',
      color: 'from-green-400 to-blue-500',
      href: '/destinasi'
    },
    {
      title: 'Kuliner',
      description: 'Makanan Khas Daerah',
      icon: '🍽️',
      color: 'from-yellow-400 to-orange-500',
      href: '/kuliner'
    },
    {
      title: 'Akomodasi',
      description: 'Penginapan & Hotel',
      icon: '🏨',
      color: 'from-blue-400 to-purple-500',
      href: '/akomodasi'
    },
    {
      title: 'Kerajinan',
      description: 'Souvenir & Handicraft',
      icon: '🎨',
      color: 'from-purple-400 to-pink-500',
      href: '/kerajinan'
    },
    {
      title: 'Sejarah Budaya',
      description: 'Warisan & Tradisi',
      icon: '📚',
      color: 'from-brown-400 to-orange-500',
      href: '/sejarah'
    }
  ];

  return (
    <section id="destinasi" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading">
            Jelajahi Pacu Jalur
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-body">
            Temukan semua yang perlu Anda ketahui tentang Pacu Jalur dan Kuantan Singingi
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="group block bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className={`w-16 h-16 bg-linear-to-r ${link.color} rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {link.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300 font-heading">
                {link.title}
              </h3>
              <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300 font-body">
                {link.description}
              </p>
              <div className="mt-4 flex items-center text-orange-500 font-semibold group-hover:text-orange-600 transition-colors duration-300 font-body">
                Jelajahi
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
