import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { isAdmin } from '@/utils/supabase/admin'

// PUT - Update acara
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    const adminCheck = await isAdmin()
    if (!adminCheck) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Handle Next.js 16 params (can be Promise)
    const resolvedParams = params instanceof Promise ? await params : params
    const acaraId = resolvedParams.id

    if (!acaraId) {
      return NextResponse.json({ error: 'Missing acara id' }, { status: 400 })
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
      .update({
        nama,
        lokasi,
        image_url: image_url || null,
        deskripsi: deskripsi || null,
        tgl_mulai,
        tgl_selesai,
      })
      .eq('id', acaraId)
      .select()
      .single()

    if (error) {
      console.error('Error updating acara:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('Error in PUT /api/admin/acara/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - Delete acara
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    const adminCheck = await isAdmin()
    if (!adminCheck) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Handle Next.js 16 params (can be Promise)
    const resolvedParams = params instanceof Promise ? await params : params
    const acaraId = resolvedParams.id

    if (!acaraId) {
      return NextResponse.json({ error: 'Missing acara id' }, { status: 400 })
    }

    const supabase = await createClient()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from('acara')
      .delete()
      .eq('id', acaraId)

    if (error) {
      console.error('Error deleting acara:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Acara deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error in DELETE /api/admin/acara/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

