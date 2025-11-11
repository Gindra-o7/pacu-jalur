import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { createOrUpdateUserProfile } from '@/utils/supabase/user'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  const errorDescription = requestUrl.searchParams.get('error_description')
  const origin = requestUrl.origin

  // Handle OAuth errors
  if (error) {
    console.error('OAuth error:', error, errorDescription)
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(errorDescription || error)}`)
  }

  if (code) {
    const supabase = await createClient()
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

    if (exchangeError) {
      console.error('Error exchanging code for session:', exchangeError)
      return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(exchangeError.message)}`)
    }

    // Jika user berhasil login, buat atau update profile
    if (data.user) {
      try {
        await createOrUpdateUserProfile(data.user)
      } catch (profileError) {
        console.error('Error creating/updating user profile:', profileError)
        // Jangan block login jika profile creation gagal
      }
    }
  }

  return NextResponse.redirect(`${origin}/`)
}