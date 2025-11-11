import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: userProfile, error } = await (supabase as any)
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (error || !userProfile) {
      return NextResponse.json({ role: 'CUSTOMER' }, { status: 200 })
    }

    return NextResponse.json({ role: userProfile.role }, { status: 200 })
  } catch (error) {
    console.error('Error in get-user-role API:', error)
    return NextResponse.json({ role: 'CUSTOMER' }, { status: 200 })
  }
}

