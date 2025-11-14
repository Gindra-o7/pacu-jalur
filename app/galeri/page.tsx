import Header from "@/components/common/Header";
import Footer from "@/components/landing/Footer";
import GaleriGrid from "@/components/galeri/GaleriGrid";

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
  jalur: Jalur;
};

async function getGaleriData(): Promise<Galeri[]> {
  try {
    // Direct database access instead of API call for better performance in SSR
    const { createClient } = await import("@/utils/supabase/server");
    const supabase = await createClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from("galeri")
      .select(
        `
        *,
        jalur:jalur(
          id,
          nama,
          desa,
          kecamatan
        )
      `
      )
      .order("id", { ascending: false });

    if (error) {
      console.error("Failed to fetch galeri data:", error);
      return [];
    }

    console.log("Galeri data fetched:", data?.length || 0, "items");
    return data || [];
  } catch (error) {
    console.error("Error fetching galeri:", error);
    return [];
  }
}

export default async function GaleriPage() {
  const galeriList = await getGaleriData();

  return (
    <main className="min-h-screen bg-linear-to-br from-purple-50 via-white to-indigo-50">
      <Header />
      <div className="pt-20">
        <GaleriGrid galeriList={galeriList} />
      </div>
      <Footer />
    </main>
  );
}
