import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { isAdmin } from '@/utils/supabase/admin';

// GET - Get tribun by acara_id
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    const adminCheck = await isAdmin();
    if (!adminCheck) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Handle Next.js 16 params (can be Promise)
    const resolvedParams = params instanceof Promise ? await params : params;
    const acaraId = resolvedParams.id;

    if (!acaraId) {
      return NextResponse.json({ error: 'Missing acara id' }, { status: 400 });
    }

    const supabase = await createClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from('tribun')
      .select('*')
      .eq('acara_id', acaraId)
      .order('nama_tribun');

    if (error) {
      console.error('Error fetching tribun:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/admin/acara/[id]/tribun:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create new tribun
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    const adminCheck = await isAdmin();
    if (!adminCheck) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Handle Next.js 16 params (can be Promise)
    const resolvedParams = params instanceof Promise ? await params : params;
    const acaraId = resolvedParams.id;

    if (!acaraId) {
      return NextResponse.json({ error: 'Missing acara id' }, { status: 400 });
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
      .insert([{
        nama_penyedia,
        kontak_penyedia: kontak_penyedia || null,
        nama_tribun,
        kategori,
        harga_per_orang: parseInt(harga_per_orang),
        total_kursi: parseInt(total_kursi),
        kursi_terjual: 0,
        deskripsi: deskripsi || null,
        acara_id: acaraId,
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating tribun:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/admin/acara/[id]/tribun:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

