export default function Gallery() {
  const galleryImages = [
    {
      src: '/pacu-jalur/pacu-jalur-3.jpeg',
      alt: 'Lomba Pacu Jalur',
      title: 'Lomba Pacu Jalur',
      category: 'Festival'
    },
    {
      src: '/pacu-jalur/pacu-jalur-4.jpeg',
      alt: 'Penari Togak Luan',
      title: 'Togak Luan',
      category: 'Budaya'
    },
    {
      src: '/pacu-jalur/pacu-jalur-5.jpeg',
      alt: 'Pemandangan Sungai',
      title: 'Sungai Kuantan',
      category: 'Alam'
    },
    {
      src: '/pacu-jalur/pacu-jalur-6.jpeg',
      alt: 'Perahu Tradisional',
      title: 'Perahu Tradisional',
      category: 'Heritage'
    },
    {
      src: '/pacu-jalur/pacu-jalur-7.jpeg',
      alt: 'Festival Atmosphere',
      title: 'Atmosfer Festival',
      category: 'Festival'
    },
    {
      src: '/pacu-jalur/pacu-jalur-8.jpeg',
      alt: 'Culinary Delights',
      title: 'Kuliner Khas',
      category: 'Kuliner'
    },
    {
      src: '/pacu-jalur/pacu-jalur-9.jpeg',
      alt: 'Traditional Crafts',
      title: 'Kerajinan Tradisional',
      category: 'Kerajinan'
    },
    {
      src: '/pacu-jalur/pacu-jalur-10.jpeg',
      alt: 'Cultural Heritage',
      title: 'Warisan Budaya',
      category: 'Budaya'
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading">
            Galeri Foto Highlight
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-body">
            Kumpulan momen terbaik dari festival Pacu Jalur dan keindahan Kuantan Singingi
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="aspect-square relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <h3 className="font-bold text-lg mb-1 font-heading">{image.title}</h3>
                  <span className="text-sm bg-orange-500 px-2 py-1 rounded-full">{image.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg font-body">
            Lihat Galeri Lengkap
          </button>
        </div>
      </div>
    </section>
  );
}
