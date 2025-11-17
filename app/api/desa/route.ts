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

// GET - Get all desa with jalur, galeri, and medsos
export async function GET() {
  try {
    const supabase = await createClient()

    // Fetch all jalur
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: jalurData, error: jalurError } = await (supabase as any)
      .from('jalur')
      .select('*')
      .order('desa', { ascending: true })
      .order('nama', { ascending: true })

    if (jalurError) {
      console.error('Error fetching jalur:', jalurError)
      return NextResponse.json({ error: jalurError.message }, { status: 500 })
    }

    if (!jalurData || jalurData.length === 0) {
      return NextResponse.json({ data: [] }, { status: 200 })
    }

    // Fetch all galeri
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: galeriData, error: galeriError } = await (supabase as any)
      .from('galeri')
      .select('*')
      .order('id', { ascending: false })

    if (galeriError) {
      console.error('Error fetching galeri:', galeriError)
      // Continue without galeri data
    }

    // Fetch all medsos
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: medsosData, error: medsosError } = await (supabase as any)
      .from('medsos')
      .select('*')
      .order('id', { ascending: false })

    if (medsosError) {
      console.error('Error fetching medsos:', medsosError)
      // Continue without medsos data
    }

    // Group jalur by desa
    const desaMap = new Map<string, DesaData>()

    jalurData.forEach((jalur: Jalur) => {
      const key = `${jalur.desa}-${jalur.kecamatan}`
      
      if (!desaMap.has(key)) {
        desaMap.set(key, {
          desa: jalur.desa,
          kecamatan: jalur.kecamatan,
          kabupaten: jalur.kabupaten,
          provinsi: jalur.provinsi,
          jalur: [],
        })
      }

      const desa = desaMap.get(key)!
      
      // Get galeri for this jalur
      const galeri = (galeriData || []).filter((g: Galeri) => g.jalur_id === jalur.id)
      
      // Get medsos for this jalur
      const medsos = (medsosData || []).filter((m: Medsos) => m.jalur_id === jalur.id)

      desa.jalur.push({
        ...jalur,
        galeri,
        medsos,
      })
    })

    // Convert map to array
    const desaList = Array.from(desaMap.values())

    return NextResponse.json({ data: desaList }, { status: 200 })
  } catch (error) {
    console.error('Error in GET /api/desa:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

