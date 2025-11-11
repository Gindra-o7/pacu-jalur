import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { isAdmin } from '@/utils/supabase/admin'

// DELETE - Delete fasilitas
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    const adminCheck = await isAdmin()
    if (!adminCheck) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Handle Next.js 16 params (can be Promise)
    const resolvedParams = params instanceof Promise ? await params : params
    const fasilitasId = resolvedParams.id

    if (!fasilitasId) {
      return NextResponse.json({ error: 'Missing fasilitas id' }, { status: 400 })
    }

    const supabase = await createClient()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from('fasilitas')
      .delete()
      .eq('id', fasilitasId)

    if (error) {
      console.error('Error deleting fasilitas:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Fasilitas deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error in DELETE /api/admin/penginapan/fasilitas/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

