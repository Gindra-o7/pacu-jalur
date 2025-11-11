import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { isAdmin } from '@/utils/supabase/admin'

// GET - Get all penginapan
export async function GET() {
  try {
    const adminCheck = await isAdmin()
    if (!adminCheck) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const supabase = await createClient()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from('penginapan')
      .select('*')
      .order('nama')

    if (error) {
      console.error('Error fetching penginapan:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('Error in GET /api/admin/penginapan:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Create new penginapan
export async function POST(request: Request) {
  try {
    const adminCheck = await isAdmin()
    if (!adminCheck) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const supabase = await createClient()

    const body = await request.json()
    const { nama, tipe, harga, image_url, deskripsi, rating, maps_url } = body

    if (!nama || !tipe) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from('penginapan')
      .insert([{
        nama,
        tipe,
        harga: harga || null,
        image_url: image_url || null,
        deskripsi: deskripsi || null,
        rating: rating || null,
        maps_url: maps_url || null,
      }])
      .select()
      .single()

    if (error) {
      console.error('Error creating penginapan:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/admin/penginapan:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

