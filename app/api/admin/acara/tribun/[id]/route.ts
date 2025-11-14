import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { isAdmin } from '@/utils/supabase/admin';

// PUT - Update tribun
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    const adminCheck = await isAdmin();
    if (!adminCheck) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Handle Next.js 16 params (can be Promise)
    const resolvedParams = params instanceof Promise ? await params : params;
    const tribunId = resolvedParams.id;

    if (!tribunId) {
      return NextResponse.json({ error: 'Missing tribun id' }, { status: 400 });
    }

    const supabase = await createClient();

    const body = await request.json();
    const { nama_penyedia, kontak_penyedia, nama_tribun, kategori, harga_per_orang, total_kursi, deskripsi } = body;

    if (!nama_penyedia || !nama_tribun || !kategori || !harga_per_orang || !total_kursi) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from('tribun')
      .update({
        nama_penyedia,
        kontak_penyedia: kontak_penyedia || null,
        nama_tribun,
        kategori,
        harga_per_orang: parseInt(harga_per_orang),
        total_kursi: parseInt(total_kursi),
        deskripsi: deskripsi || null,
      })
      .eq('id', tribunId)
      .select()
      .single();

    if (error) {
      console.error('Error updating tribun:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Error in PUT /api/admin/acara/tribun/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete tribun
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    const adminCheck = await isAdmin();
    if (!adminCheck) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Handle Next.js 16 params (can be Promise)
    const resolvedParams = params instanceof Promise ? await params : params;
    const tribunId = resolvedParams.id;

    if (!tribunId) {
      return NextResponse.json({ error: 'Missing tribun id' }, { status: 400 });
    }

    const supabase = await createClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from('tribun')
      .delete()
      .eq('id', tribunId);

    if (error) {
      console.error('Error deleting tribun:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Tribun deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error in DELETE /api/admin/acara/tribun/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

