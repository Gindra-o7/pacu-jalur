export default function NewsSection() {
  const news = [
    {
      title: 'Pacu Jalur Masuk Nominasi UNESCO World Heritage',
      excerpt: 'Festival Pacu Jalur dari Kuantan Singingi resmi masuk nominasi UNESCO World Heritage List 2024...',
      date: '15 Jan 2024',
      category: 'Berita',
      image: '/pacu-jalur/pacu-jalur-11.jpeg',
      readTime: '3 min read'
    },
    {
      title: 'Video Togak Luan Viral di TikTok, Raih 10M Views',
      excerpt: 'Video penari anak Togak Luan dalam festival Pacu Jalur menjadi viral di platform TikTok dengan 10 juta views...',
      date: '8 Jan 2024',
      category: 'Viral',
      image: '/pacu-jalur/pacu-jalur-12.jpg',
      readTime: '2 min read'
    },
    {
      title: 'Festival Pacu Jalur 2024: Jadwal dan Informasi Lengkap',
      excerpt: 'Pemerintah Kuantan Singingi mengumumkan jadwal lengkap Festival Pacu Jalur 2024 yang akan digelar Agustus mendatang...',
      date: '2 Jan 2024',
      category: 'Update',
      image: '/pacu-jalur/pacu-jalur-13.jpg',
      readTime: '4 min read'
    }
  ];

  return (
    <section id="news" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading">
            Berita & Update Terbaru
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-body">
            Dapatkan informasi terkini tentang Pacu Jalur dan perkembangan festival budaya terbesar di Riau
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {news.map((article, index) => (
            <article
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    article.category === 'Berita' ? 'bg-blue-500 text-white' :
                    article.category === 'Viral' ? 'bg-red-500 text-white' :
                    'bg-green-500 text-white'
                  }`}>
                    {article.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>{article.date}</span>
                  <span className="mx-2">•</span>
                  <span>{article.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300 font-heading">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed font-body">
                  {article.excerpt}
                </p>
                
                <a
                  href="#"
                  className="inline-flex items-center text-orange-500 font-semibold hover:text-orange-600 transition-colors duration-300 font-body"
                >
                  Baca Selengkapnya
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg font-body">
            Lihat Semua Berita
          </button>
        </div>
      </div>
    </section>
  );
}
