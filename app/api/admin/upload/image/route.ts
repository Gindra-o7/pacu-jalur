import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { isAdmin } from '@/utils/supabase/admin'
import sharp from 'sharp'

// POST - Upload image with compression
export async function POST(request: Request) {
  try {
    const adminCheck = await isAdmin()
    if (!adminCheck) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = (formData.get('folder') as string) || 'jalur' // Default to jalur for backward compatibility

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate folder parameter
    const validFolders = ['jalur', 'penginapan', 'acara']
    if (!validFolders.includes(folder)) {
      return NextResponse.json({ error: 'Invalid folder parameter' }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 })
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File size must be less than 10MB' }, { status: 400 })
    }

    const supabase = await createClient()
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Generate unique filename with folder prefix
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split('.').pop() || 'jpg'
    const originalFileName = `${folder}/${timestamp}-${randomString}.${fileExtension}`
    const compressedFileName = `${folder}/${timestamp}-${randomString}-compressed.${fileExtension}`

    // Upload original image
    const { data: originalData, error: originalError } = await supabase.storage
      .from('jalur-images')
      .upload(originalFileName, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (originalError) {
      console.error('Error uploading original image:', originalError)
      return NextResponse.json({ error: originalError.message }, { status: 500 })
    }

    // Compress image
    const compressedBuffer = await sharp(buffer)
      .resize(1920, 1920, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({ quality: 85, progressive: true })
      .toBuffer()

    // Upload compressed image
    const { data: compressedData, error: compressedError } = await supabase.storage
      .from('jalur-images')
      .upload(compressedFileName, compressedBuffer, {
        contentType: 'image/jpeg',
        upsert: false,
      })

    if (compressedError) {
      console.error('Error uploading compressed image:', compressedError)
      // Try to delete original if compressed upload fails
      await supabase.storage.from('jalur-images').remove([originalFileName])
      return NextResponse.json({ error: compressedError.message }, { status: 500 })
    }

    // Get public URLs
    const {
      data: { publicUrl: originalUrl },
    } = supabase.storage.from('jalur-images').getPublicUrl(originalFileName)

    const {
      data: { publicUrl: compressedUrl },
    } = supabase.storage.from('jalur-images').getPublicUrl(compressedFileName)

    return NextResponse.json(
      {
        original_url: originalUrl,
        compressed_url: compressedUrl,
        original_path: originalFileName,
        compressed_path: compressedFileName,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in POST /api/admin/upload/image:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

