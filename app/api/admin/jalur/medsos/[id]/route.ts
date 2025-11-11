import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { isAdmin } from '@/utils/supabase/admin'

// PUT - Update medsos
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    const adminCheck = await isAdmin()
    if (!adminCheck) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Handle Next.js 16 params (can be Promise)
    const resolvedParams = params instanceof Promise ? await params : params
    const medsosId = resolvedParams.id

    if (!medsosId) {
      return NextResponse.json({ error: 'Missing medsos id' }, { status: 400 })
    }

    const supabase = await createClient()

    const body = await request.json()
    const { media, link } = body

    if (!media || !link) {
      return NextResponse.json({ error: 'Missing required fields: media, link' }, { status: 400 })
    }

    const validMedia = ['FACEBOOK', 'INSTAGRAM', 'TWITTER', 'TIKTOK', 'YOUTUBE']
    if (!validMedia.includes(media)) {
      return NextResponse.json({ error: 'Invalid media type' }, { status: 400 })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from('medsos')
      .update({
        media,
        link,
      })
      .eq('id', medsosId)
      .select()
      .single()

    if (error) {
      console.error('Error updating medsos:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('Error in PUT /api/admin/jalur/medsos/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - Delete medsos
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    const adminCheck = await isAdmin()
    if (!adminCheck) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Handle Next.js 16 params (can be Promise)
    const resolvedParams = params instanceof Promise ? await params : params
    const medsosId = resolvedParams.id

    if (!medsosId) {
      return NextResponse.json({ error: 'Missing medsos id' }, { status: 400 })
    }

    const supabase = await createClient()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from('medsos')
      .delete()
      .eq('id', medsosId)

    if (error) {
      console.error('Error deleting medsos:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Medsos deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error in DELETE /api/admin/jalur/medsos/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

