import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { isAdmin } from '@/utils/supabase/admin'

// GET - Get all jalur
export async function GET() {
  try {
    const adminCheck = await isAdmin()
    if (!adminCheck) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const supabase = await createClient()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from('jalur')
      .select('*')
      .order('nama')

    if (error) {
      console.error('Error fetching jalur:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('Error in GET /api/admin/jalur:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Create new jalur
export async function POST(request: Request) {
  try {
    const adminCheck = await isAdmin()
    if (!adminCheck) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const supabase = await createClient()

    const body = await request.json()
    const { nama, desa, kecamatan, kabupaten, provinsi, deskripsi } = body

    if (!nama || !desa || !kecamatan || !kabupaten || !provinsi) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from('jalur')
      .insert([{ nama, desa, kecamatan, kabupaten, provinsi, deskripsi: deskripsi || null }])
      .select()
      .single()

    if (error) {
      console.error('Error creating jalur:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/admin/jalur:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

