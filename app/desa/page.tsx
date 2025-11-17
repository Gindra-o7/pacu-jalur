"use client";

import { useState, useEffect } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/landing/Footer";
import DesaCard from "@/components/desa/DesaCard";
import DesaHero from "@/components/desa/DesaHero";
import DesaSearchFilter from "@/components/desa/DesaSearchFilter";
import { MapPinX } from "lucide-react";

type Galeri = {
  id: string;
  image_url: string;
  judul: string | null;
  caption: string | null;
  jalur_id: string;
};

type Medsos = {
  id: string;
  media: string;
  link: string;
  jalur_id: string;
};

type Jalur = {
  id: string;
  nama: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  deskripsi: string | null;
  galeri: Galeri[];
  medsos: Medsos[];
};

type DesaData = {
  desa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  jalur: Jalur[];
};

async function getDesaData(): Promise<DesaData[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/desa`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!res.ok) {
      console.error("Failed to fetch desa data");
      return [];
    }

    const { data } = await res.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching desa:", error);
    return [];
  }
}

export default function DesaPage() {
  const [desaList, setDesaList] = useState<DesaData[]>([]);
  const [filteredDesaList, setFilteredDesaList] = useState<DesaData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getDesaData();
      setDesaList(data);
      setFilteredDesaList(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-linear-to-br from-orange-50 via-white to-red-50">
      <Header />
      <div className="pt-24 pb-20">
        {/* Hero Section */}
        <DesaHero />

        {/* Search & Filter Section */}
        <section className="max-w-7xl mx-auto px-4 py-8">{!isLoading && <DesaSearchFilter desaList={desaList} onFilteredChange={setFilteredDesaList} />}</section>

        {/* Desa List Section */}
        <section className="max-w-7xl mx-auto px-4 pb-16">
          {isLoading ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-lg">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
              <p className="mt-4 text-gray-600 font-body">Memuat data...</p>
            </div>
          ) : filteredDesaList.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-lg">
              <MapPinX className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 font-body mb-2">{desaList.length === 0 ? "Belum ada data desa yang berpartisipasi." : "Tidak ada desa yang sesuai dengan filter."}</p>
              {desaList.length > 0 && <p className="text-sm text-gray-500 font-body">Coba ubah kata kunci atau filter pencarian</p>}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDesaList.map((desaData, index) => (
                <DesaCard key={`${desaData.desa}-${desaData.kecamatan}`} desaData={desaData} index={index} />
              ))}
            </div>
          )}
        </section>
      </div>
      <Footer />
    </main>
  );
}
