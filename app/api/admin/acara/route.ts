import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { isAdmin } from '@/utils/supabase/admin'

// GET - Get all acara
export async function GET() {
  try {
    const adminCheck = await isAdmin()
    if (!adminCheck) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const supabase = await createClient()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from('acara')
      .select('*')
      .order('tgl_mulai', { ascending: false })

    if (error) {
      console.error('Error fetching acara:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('Error in GET /api/admin/acara:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Create new acara
export async function POST(request: Request) {
  try {
    const adminCheck = await isAdmin()
    if (!adminCheck) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const supabase = await createClient()

    const body = await request.json()
    const { nama, lokasi, image_url, deskripsi, tgl_mulai, tgl_selesai } = body

    if (!nama || !lokasi || !tgl_mulai || !tgl_selesai) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from('acara')
      .insert([{
        nama,
        lokasi,
        image_url: image_url || null,
        deskripsi: deskripsi || null,
        tgl_mulai,
        tgl_selesai,
      }])
      .select()
      .single()

    if (error) {
      console.error('Error creating acara:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/admin/acara:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

