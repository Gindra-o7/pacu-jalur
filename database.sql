-- Table jalur
CREATE TABLE jalur (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nama VARCHAR(255) NOT NULL,
    desa VARCHAR(255) NOT NULL,
    kecamatan VARCHAR(255) NOT NULL,
    kabupaten VARCHAR(255) NOT NULL,
    provinsi VARCHAR(255) NOT NULL,
    deskripsi TEXT
);

-- Table penginapan
CREATE TABLE penginapan (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nama VARCHAR(255) NOT NULL,
    tipe VARCHAR(100) NOT NULL,
    harga VARCHAR(100),
    image_url VARCHAR(255),
    deskripsi TEXT,
    rating VARCHAR(50),
    maps_url VARCHAR(255)
);

-- Table fasilitas
CREATE TABLE fasilitas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nama VARCHAR(255) NOT NULL,
    penginapan_id UUID NOT NULL REFERENCES penginapan(id) ON DELETE CASCADE
);

-- Table galeri
CREATE TABLE galeri (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image_url VARCHAR(255) NOT NULL,
    judul VARCHAR(255),
    caption VARCHAR(255),
    jalur_id UUID NOT NULL REFERENCES jalur(id) ON DELETE CASCADE
);

-- Table medsos
CREATE TABLE medsos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    media VARCHAR(50) CHECK (media IN ('FACEBOOK','INSTAGRAM','TWITTER','TIKTOK','YOUTUBE')),
    link VARCHAR(255) NOT NULL,
    jalur_id UUID NOT NULL REFERENCES jalur(id) ON DELETE CASCADE
);

-- Table acara
CREATE TABLE acara (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nama VARCHAR(255) NOT NULL,
    lokasi VARCHAR(255) NOT NULL,
    image_url VARCHAR(255),
    deskripsi TEXT,
    tgl_mulai DATE NOT NULL,
    tgl_selesai DATE NOT NULL
);

-- Table tribun
CREATE TABLE tribun (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    acara_id UUID NOT NULL REFERENCES acara(id) ON DELETE CASCADE,
    nama_penyedia VARCHAR(255) NOT NULL,
    kontak_penyedia VARCHAR(255),
    nama_tribun VARCHAR(255) NOT NULL,
    kategori VARCHAR(50) CHECK (kategori IN ('REGULER','VIP')) NOT NULL,
    harga_per_orang INT NOT NULL,
    total_kursi INT NOT NULL,
    kursi_terjual INT DEFAULT 0,
    deskripsi TEXT,
    created_at TIMESTAMP DEFAULT now()
);

-- Index
CREATE INDEX idx_tribun_acara_id ON tribun(acara_id);
CREATE INDEX idx_acara_tanggal ON acara(tgl_mulai, tgl_selesai);

-- Table users di schema public
CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) CHECK (role IN ('ADMIN','CUSTOMER')) NOT NULL DEFAULT 'CUSTOMER',
    phone VARCHAR(13),
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own data
CREATE POLICY "Users can view own data"
ON public.users
FOR SELECT
USING (auth.uid() = id);

-- Policy: Users can update their own data
CREATE POLICY "Users can update own data"
ON public.users
FOR UPDATE
USING (auth.uid() = id);

-- Function to automatically create user profile when auth user is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'CUSTOMER')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile automatically
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();