import Header from "@/components/common/Header";
import Footer from "@/components/landing/Footer";
import PenginapanList from "@/components/penginapan/PenginapanList";

type Fasilitas = {
  id: string;
  nama: string;
};

type Penginapan = {
  id: string;
  nama: string;
  tipe: string;
  harga: string | null;
  image_url: string | null;
  deskripsi: string | null;
  rating: string | null;
  maps_url: string | null;
  fasilitas: Fasilitas[];
};

async function getPenginapanData(): Promise<Penginapan[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/penginapan`, {
      cache: "no-store", // Always get fresh data
    });

    if (!res.ok) {
      console.error("Failed to fetch penginapan data");
      return [];
    }

    const { data } = await res.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching penginapan:", error);
    return [];
  }
}

export default async function PenginapanPage() {
  const penginapanList = await getPenginapanData();

  // Extract unique tipe for filter
  const tipeList = Array.from(new Set(penginapanList.map((p) => p.tipe))).sort();

  return (
    <main className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <div className="pt-20">
        <PenginapanList penginapanList={penginapanList} tipeList={tipeList} />
      </div>
      <Footer />
    </main>
  );
}
