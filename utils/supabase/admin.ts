import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

/**
 * Check if user is admin
 */
export async function isAdmin(): Promise<boolean> {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return false
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: userProfile, error } = await (supabase as any)
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  if (error || !userProfile) {
    return false
  }

  return userProfile.role === 'ADMIN'
}

/**
 * Require admin access, redirect if not admin
 */
export async function requireAdmin() {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/login')
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: userProfile, error } = await (supabase as any)
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  if (error || !userProfile || userProfile.role !== 'ADMIN') {
    redirect('/unauthorized')
  }

  return { user, userProfile }
}

