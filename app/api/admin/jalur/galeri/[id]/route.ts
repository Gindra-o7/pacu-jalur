import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { isAdmin } from '@/utils/supabase/admin'

// Helper function to extract storage path from public URL
function extractStoragePath(imageUrl: string): string | null {
  try {
    const url = new URL(imageUrl)
    const pathParts = url.pathname.split('/')
    const jalurImagesIndex = pathParts.indexOf('jalur-images')
    
    if (jalurImagesIndex === -1) {
      return null
    }
    
    return pathParts.slice(jalurImagesIndex + 1).join('/')
  } catch {
    return null
  }
}

// Helper function to get both original and compressed paths
function getFilePaths(storagePath: string): { original: string; compressed: string } {
  const isCompressed = storagePath.includes('-compressed.')
  
  if (isCompressed) {
    const originalPath = storagePath.replace('-compressed.', '.')
    return { original: originalPath, compressed: storagePath }
  } else {
    const ext = storagePath.split('.').pop() || ''
    const nameWithoutExt = storagePath.replace(`.${ext}`, '')
    const compressedPath = `${nameWithoutExt}-compressed.${ext}`
    return { original: storagePath, compressed: compressedPath }
  }
}

// PUT - Update galeri
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    const adminCheck = await isAdmin()
    if (!adminCheck) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Handle Next.js 16 params (can be Promise)
    const resolvedParams = params instanceof Promise ? await params : params
    const galeriId = resolvedParams.id

    if (!galeriId) {
      return NextResponse.json({ error: 'Missing galeri id' }, { status: 400 })
    }

    const supabase = await createClient()

    // Get current galeri data to check if image_url changed
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: currentData } = await (supabase as any)
      .from('galeri')
      .select('image_url')
      .eq('id', galeriId)
      .single()

    const body = await request.json()
    const { image_url, judul, caption } = body

    if (!image_url) {
      return NextResponse.json({ error: 'Missing required field: image_url' }, { status: 400 })
    }

    // Delete old files from storage if image_url changed
    if (currentData?.image_url && currentData.image_url !== image_url) {
      try {
        const oldStoragePath = extractStoragePath(currentData.image_url)
        if (oldStoragePath) {
          const { original, compressed } = getFilePaths(oldStoragePath)
          const filesToDelete = [original, compressed].filter(Boolean)
          
          await supabase.storage
            .from('jalur-images')
            .remove(filesToDelete)
        }
      } catch (urlError) {
        console.error('Error deleting old files from storage:', urlError)
        // Continue with update even if old file deletion fails
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from('galeri')
      .update({
        image_url,
        judul: judul || null,
        caption: caption || null,
      })
      .eq('id', galeriId)
      .select()
      .single()

    if (error) {
      console.error('Error updating galeri:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('Error in PUT /api/admin/jalur/galeri/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - Delete galeri
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    const adminCheck = await isAdmin()
    if (!adminCheck) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Handle Next.js 16 params (can be Promise)
    const resolvedParams = params instanceof Promise ? await params : params
    const galeriId = resolvedParams.id

    if (!galeriId) {
      return NextResponse.json({ error: 'Missing galeri id' }, { status: 400 })
    }

    const supabase = await createClient()

    // Get galeri data first to get image_url
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: galeriData, error: fetchError } = await (supabase as any)
      .from('galeri')
      .select('image_url')
      .eq('id', galeriId)
      .single()

    if (fetchError) {
      console.error('Error fetching galeri:', fetchError)
      return NextResponse.json({ error: fetchError.message }, { status: 500 })
    }

    // Delete files from storage if image_url exists
    if (galeriData?.image_url) {
      try {
        const storagePath = extractStoragePath(galeriData.image_url)
        
        if (storagePath) {
          const { original, compressed } = getFilePaths(storagePath)
          const filesToDelete = [original, compressed].filter(Boolean)
          
          const { error: storageError } = await supabase.storage
            .from('jalur-images')
            .remove(filesToDelete)

          if (storageError) {
            console.error('Error deleting files from storage:', storageError)
            // Continue with database deletion even if storage deletion fails
          }
        }
      } catch (urlError) {
        console.error('Error parsing image URL:', urlError)
        // Continue with database deletion even if URL parsing fails
      }
    }

    // Delete from database
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from('galeri')
      .delete()
      .eq('id', galeriId)

    if (error) {
      console.error('Error deleting galeri:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Galeri deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error in DELETE /api/admin/jalur/galeri/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

