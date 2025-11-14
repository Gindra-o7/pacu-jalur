import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

// GET - Get all penginapan for public (no auth required)
export async function GET() {
  try {
    const supabase = await createClient()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from('penginapan')
      .select(`
        *,
        fasilitas:fasilitas(
          id,
          nama
        )
      `)
      .order('nama', { ascending: true })

    if (error) {
      console.error('Error fetching penginapan:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('Error in GET /api/penginapan:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

