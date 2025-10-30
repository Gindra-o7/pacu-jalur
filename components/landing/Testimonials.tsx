export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Australia",
      avatar: "/pacu-jalur/penginapan-1.webp",
      rating: 5,
      comment: "Pengalaman yang luar biasa! Togak Luan sangat memukau dan budaya Pacu Jalur sangat autentik. Pasti akan kembali lagi tahun depan!",
      flag: "🇦🇺",
    },
    {
      name: "Ahmad Rizki",
      location: "Jakarta",
      avatar: "/pacu-jalur/penginapan-2.webp",
      rating: 5,
      comment: "Sebagai orang Indonesia, saya bangga dengan warisan budaya ini. Festival Pacu Jalur menunjukkan kekayaan budaya kita yang luar biasa.",
      flag: "🇮🇩",
    },
    {
      name: "Maria Garcia",
      location: "Spain",
      avatar: "/pacu-jalur/penginapan-3.webp",
      rating: 5,
      comment: "The traditional boat race was incredible! The children dancers (Togak Luan) were so graceful and the whole festival atmosphere was amazing.",
      flag: "🇪🇸",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-r from-blue-50 to-green-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading">Testimoni Pengunjung</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-body">Pengalaman tak terlupakan dari pengunjung yang telah merasakan keindahan Pacu Jalur</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              {/* Rating Stars */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-700 mb-6 leading-relaxed font-body">"{testimonial.comment}"</p>

              {/* User Info */}
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 font-heading">{testimonial.name}</h4>
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">{testimonial.flag}</span>
                    <span>{testimonial.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center bg-white px-6 py-3 rounded-full shadow-lg">
            <div className="flex -space-x-2 mr-4">
              {testimonials.map((_, index) => (
                <div key={index} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                  <img src={testimonials[index].avatar} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <span className="text-gray-700 font-semibold font-body">+500 pengunjung puas lainnya</span>
          </div>
        </div>
      </div>
    </section>
  );
}
