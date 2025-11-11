import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { isAdmin } from '@/utils/supabase/admin'

// GET - Get all fasilitas for a penginapan
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    const adminCheck = await isAdmin()
    if (!adminCheck) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Handle Next.js 16 params (can be Promise)
    const resolvedParams = params instanceof Promise ? await params : params
    const penginapanId = resolvedParams.id

    if (!penginapanId) {
      return NextResponse.json({ error: 'Missing penginapan id' }, { status: 400 })
    }

    const supabase = await createClient()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from('fasilitas')
      .select('*')
      .eq('penginapan_id', penginapanId)

    if (error) {
      console.error('Error fetching fasilitas:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('Error in GET /api/admin/penginapan/[id]/fasilitas:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Add new fasilitas
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    const adminCheck = await isAdmin()
    if (!adminCheck) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Handle Next.js 16 params (can be Promise)
    const resolvedParams = params instanceof Promise ? await params : params
    const penginapanId = resolvedParams.id

    if (!penginapanId) {
      return NextResponse.json({ error: 'Missing penginapan id' }, { status: 400 })
    }

    const supabase = await createClient()

    const body = await request.json()
    const { nama } = body

    if (!nama) {
      return NextResponse.json({ error: 'Missing required field: nama' }, { status: 400 })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from('fasilitas')
      .insert([{ nama, penginapan_id: penginapanId }])
      .select()
      .single()

    if (error) {
      console.error('Error creating fasilitas:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/admin/penginapan/[id]/fasilitas:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

