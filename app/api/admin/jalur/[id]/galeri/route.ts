import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { isAdmin } from '@/utils/supabase/admin'

// GET - Get all galeri for a jalur
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    const adminCheck = await isAdmin()
    if (!adminCheck) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Handle Next.js 16 params (can be Promise)
    const resolvedParams = params instanceof Promise ? await params : params
    const jalurId = resolvedParams.id

    if (!jalurId) {
      return NextResponse.json({ error: 'Missing jalur_id' }, { status: 400 })
    }

    const supabase = await createClient()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from('galeri')
      .select('*')
      .eq('jalur_id', jalurId)
      .order('id', { ascending: false })

    if (error) {
      console.error('Error fetching galeri:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('Error in GET /api/admin/jalur/[id]/galeri:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Add new galeri
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    const adminCheck = await isAdmin()
    if (!adminCheck) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Handle Next.js 16 params (can be Promise)
    const resolvedParams = params instanceof Promise ? await params : params
    const jalurId = resolvedParams.id

    if (!jalurId) {
      return NextResponse.json({ error: 'Missing jalur_id' }, { status: 400 })
    }

    const supabase = await createClient()

    const body = await request.json()
    const { image_url, judul, caption } = body

    if (!image_url) {
      return NextResponse.json({ error: 'Missing required field: image_url' }, { status: 400 })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from('galeri')
      .insert([{
        image_url,
        judul: judul || null,
        caption: caption || null,
        jalur_id: jalurId,
      }])
      .select()
      .single()

    if (error) {
      console.error('Error creating galeri:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/admin/jalur/[id]/galeri:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

