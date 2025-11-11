import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // --- TAMBAHKAN INI ---
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ccfqsrvqfbigkhcbtoac.supabase.co', // Hostname dari Supabase project Anda
        port: '',
        pathname: '/storage/v1/object/public/**', // Izinkan semua path di storage
      },
    ],
  },
  // --- BATAS TAMBAHAN ---
};

export default nextConfig;
