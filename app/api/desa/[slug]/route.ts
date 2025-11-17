import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

type Jalur = {
  id: string;
  nama: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  deskripsi: string | null;
};

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

type DesaData = {
  desa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  jalur: (Jalur & {
    galeri: Galeri[];
    medsos: Medsos[];
  })[];
};

// Helper function to decode slug
// Format: desa-kecamatan (both URL encoded and joined with -)
function decodeSlug(slug: string): { desa: string; kecamatan: string } | null {
  try {
    // Try to find the pattern: desa-kecamatan
    // Since we encode both separately, we need to try different split points
    const decoded = decodeURIComponent(slug);
    
    // Get all desa and kecamatan combinations from database to match
    // For now, we'll use a simpler approach: try splitting at different points
    const parts = decoded.split('-');
    
    if (parts.length < 2) return null;
    
    // Try different split points (from end)
    for (let i = 1; i <= Math.min(3, parts.length - 1); i++) {
      const kecamatanParts = parts.slice(-i);
      const desaParts = parts.slice(0, -i);
      
      if (desaParts.length > 0) {
        return {
          desa: desaParts.join(' '),
          kecamatan: kecamatanParts.join(' ')
        };
      }
    }
    
    return null;
  } catch {
    return null;
  }
}

// GET - Get desa by slug
export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  try {
    const resolvedParams = params instanceof Promise ? await params : params
    const slug = resolvedParams.slug

    if (!slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
    }

    const supabase = await createClient()

    // First, try to get all unique desa-kecamatan combinations
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: allJalur } = await (supabase as any)
      .from('jalur')
      .select('desa, kecamatan')
      .order('desa', { ascending: true })

    // Find matching desa and kecamatan
    let matchedDesa: string | null = null;
    let matchedKecamatan: string | null = null;

    if (allJalur && allJalur.length > 0) {
      const uniqueCombos: string[] = Array.from(
        new Set(allJalur.map((j: { desa: string; kecamatan: string }) => `${j.desa}-${j.kecamatan}`))
      );

      const decoded = decodeURIComponent(slug).toLowerCase();
      
      for (const combo of uniqueCombos) {
        const [desa, kecamatan] = combo.split('-');
        const comboSlug = `${desa.toLowerCase().replace(/\s+/g, '-')}-${kecamatan.toLowerCase().replace(/\s+/g, '-')}`;
        
        if (comboSlug === decoded) {
          matchedDesa = desa;
          matchedKecamatan = kecamatan;
          break;
        }
      }
    }

    // Fallback: try decodeSlug function
    if (!matchedDesa || !matchedKecamatan) {
      const decoded = decodeSlug(slug);
      if (decoded) {
        matchedDesa = decoded.desa;
        matchedKecamatan = decoded.kecamatan;
      }
    }

    if (!matchedDesa || !matchedKecamatan) {
      return NextResponse.json({ error: 'Desa not found' }, { status: 404 });
    }

    // Fetch jalur for this desa and kecamatan
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: jalurData, error: jalurError } = await (supabase as any)
      .from('jalur')
      .select('*')
      .eq('desa', matchedDesa)
      .eq('kecamatan', matchedKecamatan)
      .order('nama', { ascending: true })

    if (jalurError) {
      console.error('Error fetching jalur:', jalurError)
      return NextResponse.json({ error: jalurError.message }, { status: 500 })
    }

    if (!jalurData || jalurData.length === 0) {
      return NextResponse.json({ error: 'Desa not found' }, { status: 404 })
    }

    // Get first jalur for desa info
    const firstJalur = jalurData[0]

    // Fetch all galeri
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: galeriData } = await (supabase as any)
      .from('galeri')
      .select('*')
      .in('jalur_id', jalurData.map((j: Jalur) => j.id))
      .order('id', { ascending: false })

    // Fetch all medsos
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: medsosData } = await (supabase as any)
      .from('medsos')
      .select('*')
      .in('jalur_id', jalurData.map((j: Jalur) => j.id))
      .order('id', { ascending: false })

    // Combine data
    const desaData: DesaData = {
      desa: firstJalur.desa,
      kecamatan: firstJalur.kecamatan,
      kabupaten: firstJalur.kabupaten,
      provinsi: firstJalur.provinsi,
      jalur: jalurData.map((jalur: Jalur) => ({
        ...jalur,
        galeri: (galeriData || []).filter((g: Galeri) => g.jalur_id === jalur.id),
        medsos: (medsosData || []).filter((m: Medsos) => m.jalur_id === jalur.id),
      })),
    }

    return NextResponse.json({ data: desaData }, { status: 200 })
  } catch (error) {
    console.error('Error in GET /api/desa/[slug]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

