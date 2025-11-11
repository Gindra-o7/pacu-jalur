import { createClient } from '@/utils/supabase/server'
import { User } from '@supabase/supabase-js'

/**
 * Membuat atau update user profile di public.users
 */
export async function createOrUpdateUserProfile(user: User) {
  const supabase = await createClient()

  const profileData = {
    id: user.id,
    email: user.email!,
    full_name: user.user_metadata?.full_name || user.user_metadata?.name || '',
    role: user.user_metadata?.role || 'CUSTOMER',
    phone: user.user_metadata?.phone || null,
    updated_at: new Date().toISOString(),
  }

  // Cek apakah user sudah ada
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: existingUser } = await (supabase as any)
    .from('users')
    .select('id')
    .eq('id', user.id)
    .single()

  if (existingUser) {
    // Update existing user
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from('users')
      .update(profileData)
      .eq('id', user.id)

    if (error) {
      console.error('Error updating user profile:', error)
      throw error
    }
  } else {
    // Create new user profile
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from('users')
      .insert({
        ...profileData,
        created_at: new Date().toISOString(),
      })

    if (error) {
      console.error('Error creating user profile:', error)
      throw error
    }
  }

  return profileData
}

/**
 * Get user profile dari public.users
 */
export async function getUserProfile(userId: string) {
  const supabase = await createClient()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching user profile:', error)
    return null
  }

  return data
}

