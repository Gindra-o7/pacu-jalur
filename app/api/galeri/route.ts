import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

// GET - Get all galeri for public (no auth required)
export async function GET() {
  try {
    const supabase = await createClient()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from('galeri')
      .select(`
        *,
        jalur:jalur(
          id,
          nama,
          desa,
          kecamatan
        )
      `)
      .order('id', { ascending: false })

    if (error) {
      console.error('Error fetching galeri:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('Error in GET /api/galeri:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

