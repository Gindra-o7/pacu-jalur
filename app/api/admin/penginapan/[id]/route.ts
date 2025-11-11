import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { isAdmin } from '@/utils/supabase/admin'

// PUT - Update penginapan
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> | { id: string } }) {
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
    const { nama, tipe, harga, image_url, deskripsi, rating, maps_url } = body

    if (!nama || !tipe) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from('penginapan')
      .update({
        nama,
        tipe,
        harga: harga || null,
        image_url: image_url || null,
        deskripsi: deskripsi || null,
        rating: rating || null,
        maps_url: maps_url || null,
      })
      .eq('id', penginapanId)
      .select()
      .single()

    if (error) {
      console.error('Error updating penginapan:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('Error in PUT /api/admin/penginapan/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - Delete penginapan
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> | { id: string } }) {
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
    const { error } = await (supabase as any)
      .from('penginapan')
      .delete()
      .eq('id', penginapanId)

    if (error) {
      console.error('Error deleting penginapan:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Penginapan deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error in DELETE /api/admin/penginapan/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

