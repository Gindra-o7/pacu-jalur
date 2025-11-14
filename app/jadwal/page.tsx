import Header from "@/components/common/Header";
import Footer from "@/components/landing/Footer";
import JadwalList from "@/components/jadwal/JadwalList";

type Tribun = {
  id: string;
  nama_penyedia: string;
  kontak_penyedia: string | null;
  nama_tribun: string;
  kategori: "REGULER" | "VIP";
  harga_per_orang: number;
  total_kursi: number;
  kursi_terjual: number;
  deskripsi: string | null;
  acara_id: string;
};

type Acara = {
  id: string;
  nama: string;
  lokasi: string;
  image_url: string | null;
  deskripsi: string | null;
  tgl_mulai: string;
  tgl_selesai: string;
  tribun: Tribun[];
};

async function getAcaraData(): Promise<Acara[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/acara`, {
      cache: "no-store", // Always get fresh data for schedule page
    });

    if (!res.ok) {
      console.error("Failed to fetch acara data");
      return [];
    }

    const { data } = await res.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching acara:", error);
    return [];
  }
}

export default async function JadwalPage() {
  const acaraList = await getAcaraData();

  // Split events into upcoming and past
  const now = new Date();
  const upcomingEvents = acaraList.filter((acara) => new Date(acara.tgl_selesai) >= now).sort((a, b) => new Date(a.tgl_mulai).getTime() - new Date(b.tgl_mulai).getTime());

  const pastEvents = acaraList.filter((acara) => new Date(acara.tgl_selesai) < now).sort((a, b) => new Date(b.tgl_mulai).getTime() - new Date(a.tgl_mulai).getTime());

  return (
    <main className="min-h-screen bg-linear-to-br from-orange-50 via-white to-red-50">
      <Header />
      <div className="pt-20">
        <JadwalList upcomingEvents={upcomingEvents} pastEvents={pastEvents} />
      </div>
      <Footer />
    </main>
  );
}
