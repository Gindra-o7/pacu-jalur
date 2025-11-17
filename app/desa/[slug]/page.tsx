import Header from "@/components/common/Header";
import Footer from "@/components/landing/Footer";
import DesaDetailContent from "@/components/desa/DesaDetailContent";
import { notFound } from "next/navigation";

type DesaData = {
  desa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  jalur: {
    id: string;
    nama: string;
    desa: string;
    kecamatan: string;
    kabupaten: string;
    provinsi: string;
    deskripsi: string | null;
    galeri: {
      id: string;
      image_url: string;
      judul: string | null;
      caption: string | null;
      jalur_id: string;
    }[];
    medsos: {
      id: string;
      media: string;
      link: string;
      jalur_id: string;
    }[];
  }[];
};

async function getDesaBySlug(slug: string): Promise<DesaData | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/desa/${slug}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      console.error("Failed to fetch desa data");
      return null;
    }

    const { data } = await res.json();
    return data || null;
  } catch (error) {
    console.error("Error fetching desa:", error);
    return null;
  }
}

export default async function DesaDetailPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const slug = resolvedParams.slug;

  const desaData = await getDesaBySlug(slug);

  if (!desaData) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-orange-50 via-white to-red-50">
      <Header />
      <div className="pt-24 pb-20">
        <DesaDetailContent desaData={desaData} />
      </div>
      <Footer />
    </main>
  );
}

