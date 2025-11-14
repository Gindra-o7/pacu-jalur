"use client";

import { BLUR_DATA_URL } from "@/utils/supabase/storage";
import Image from "next/image";
import Link from "next/link";

type Jalur = {
  id: string;
  nama: string;
  desa: string;
  kecamatan: string;
};

type Galeri = {
  id: string;
  image_url: string;
  judul: string | null;
  caption: string | null;
  jalur_id: string;
  jalur: Jalur | null;
};

type GalleryProps = {
  galleryImages: Galeri[];
};

export default function Gallery({ galleryImages }: GalleryProps) {
  // Take only first 8 images for landing page
  const displayImages = galleryImages.slice(0, 8);

  return (
    <section id="gallery" className="py-20 bg-linear-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading">Galeri Foto Highlight</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-body">Kumpulan momen terbaik dari festival Pacu Jalur dan keindahan Kuantan Singingi</p>
        </div>

        {displayImages.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-gray-600 font-body">Belum ada foto dalam galeri.</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayImages.map((image) => (
                <div key={image.id} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="aspect-square relative">
                    <Image
                      src={image.image_url}
                      alt={image.judul || image.jalur?.nama || "Galeri Pacu Jalur"}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      fill
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                      <h3 className="font-bold text-lg mb-1 font-heading">{image.judul || image.jalur?.nama || "Pacu Jalur"}</h3>
                      {image.jalur && (
                        <span className="text-sm bg-orange-500 px-2 py-1 rounded-full">
                          {image.jalur.desa}, {image.jalur.kecamatan}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/galeri" className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg font-body">
                Lihat Galeri Lengkap
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
