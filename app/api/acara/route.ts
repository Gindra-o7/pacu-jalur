import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

// GET - Get all acara for public (no auth required)
export async function GET() {
  try {
    const supabase = await createClient()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from('acara')
      .select(`
        *,
        tribun:tribun(
          id,
          nama_tribun,
          nama_penyedia,
          kontak_penyedia,
          deskripsi,
          kategori,
          harga_per_orang,
          total_kursi,
          kursi_terjual
        )
      `)
      .order('tgl_mulai', { ascending: true })

    if (error) {
      console.error('Error fetching acara:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('Error in GET /api/acara:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

