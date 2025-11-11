import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { isAdmin } from '@/utils/supabase/admin'

// PUT - Update jalur
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    const adminCheck = await isAdmin()
    if (!adminCheck) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Handle Next.js 16 params (can be Promise)
    const resolvedParams = params instanceof Promise ? await params : params
    const jalurId = resolvedParams.id

    if (!jalurId) {
      return NextResponse.json({ error: 'Missing jalur id' }, { status: 400 })
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
      .update({ nama, desa, kecamatan, kabupaten, provinsi, deskripsi: deskripsi || null })
      .eq('id', jalurId)
      .select()
      .single()

    if (error) {
      console.error('Error updating jalur:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('Error in PUT /api/admin/jalur/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - Delete jalur
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    const adminCheck = await isAdmin()
    if (!adminCheck) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Handle Next.js 16 params (can be Promise)
    const resolvedParams = params instanceof Promise ? await params : params
    const jalurId = resolvedParams.id

    if (!jalurId) {
      return NextResponse.json({ error: 'Missing jalur id' }, { status: 400 })
    }

    const supabase = await createClient()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from('jalur')
      .delete()
      .eq('id', jalurId)

    if (error) {
      console.error('Error deleting jalur:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Jalur deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error in DELETE /api/admin/jalur/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

