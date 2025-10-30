export default function VideoSection() {
  return (
    <section id="video" className="py-20 bg-gradient-to-r from-blue-50 to-green-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading">Fenomena Viral "Aura Farming"</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-body">Video penari anak Togak Luan dalam Pacu Jalur menjadi viral di media sosial dunia, menarik perhatian internasional terhadap keindahan budaya Indonesia.</p>
        </div>

        <div className="relative">
          <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gray-900">
            {/* Placeholder untuk video - bisa diganti dengan embed YouTube atau video asli */}
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900 to-green-900">
              <div className="text-center text-white">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2 font-heading">Video Viral Aura Farming</h3>
                <p className="text-gray-300 font-body">Togak Luan - Pacu Jalur Kuantan Singingi</p>
                <div className="mt-4 flex items-center justify-center space-x-4 text-sm">
                  <span className="bg-red-500 px-3 py-1 rounded-full">🔥 Viral</span>
                  <span className="bg-blue-500 px-3 py-1 rounded-full">🌍 Global</span>
                  <span className="bg-green-500 px-3 py-1 rounded-full">📱 10M+ Views</span>
                </div>
              </div>
            </div>
          </div>

          {/* Video Stats Overlay */}
          <div className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg">
            <div className="text-sm">📺 10.2M Views</div>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="text-3xl mb-3">🌍</div>
            <h3 className="font-bold text-gray-900 mb-2 font-heading">Global Recognition</h3>
            <p className="text-gray-600 font-body">Diakui oleh UNESCO sebagai warisan budaya dunia</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="text-3xl mb-3">📱</div>
            <h3 className="font-bold text-gray-900 mb-2 font-heading">Social Media Sensation</h3>
            <p className="text-gray-600 font-body">Menjadi trending di berbagai platform media sosial</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="text-3xl mb-3">🎭</div>
            <h3 className="font-bold text-gray-900 mb-2 font-heading">Cultural Heritage</h3>
            <p className="text-gray-600 font-body">Melestarikan tradisi budaya yang unik dan autentik</p>
          </div>
        </div>
      </div>
    </section>
  );
}
