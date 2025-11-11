const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const bucketName = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET;

export const SUPABASE_STORAGE_URL = `${supabaseUrl}/storage/v1/object/public/${bucketName}`;

export const getStorageImageUrl = (path: string) => {
  const cleanPath = path.startsWith("/") ? path.substring(1) : path;

  return `${SUPABASE_STORAGE_URL}/${cleanPath}`;
};

export const BLUR_DATA_URL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=";
