import { NextResponse } from 'next/server';

// Data wilayah Kuantan Singingi, Riau
// Sumber: Data kecamatan di Kabupaten Kuantan Singingi
const wilayahData = [
  // Kecamatan Kuantan Mudik
  { desa: "Baserah", kecamatan: "Kuantan Mudik", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Siberuang", kecamatan: "Kuantan Mudik", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Pulau Sarak", kecamatan: "Kuantan Mudik", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Sawah", kecamatan: "Kuantan Mudik", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Teluk Pauh", kecamatan: "Kuantan Mudik", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Lubuk Ambacang", kecamatan: "Kuantan Mudik", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Koto Lamo", kecamatan: "Kuantan Mudik", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Jake", kecamatan: "Kuantan Mudik", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  
  // Kecamatan Kuantan Tengah
  { desa: "Seberang Taluk", kecamatan: "Kuantan Tengah", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Taluk Kuantan", kecamatan: "Kuantan Tengah", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Pasar Taluk", kecamatan: "Kuantan Tengah", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Koto Taluk", kecamatan: "Kuantan Tengah", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Kampung Baru", kecamatan: "Kuantan Tengah", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Padang Mutung", kecamatan: "Kuantan Tengah", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Lubuk Mas", kecamatan: "Kuantan Tengah", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Kampung Sawah", kecamatan: "Kuantan Tengah", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  
  // Kecamatan Kuantan Hilir
  { desa: "Sungai Jering", kecamatan: "Kuantan Hilir", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Sungai Jalau", kecamatan: "Kuantan Hilir", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Koto Tuo", kecamatan: "Kuantan Hilir", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Muara Lembu", kecamatan: "Kuantan Hilir", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Sungai Pinang", kecamatan: "Kuantan Hilir", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Pasar Baru", kecamatan: "Kuantan Hilir", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Pulau Bayur", kecamatan: "Kuantan Hilir", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  
  // Kecamatan Cerenti
  { desa: "Cerenti", kecamatan: "Cerenti", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Pangkalan Indarung", kecamatan: "Cerenti", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Kasang", kecamatan: "Cerenti", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Sungai Risau", kecamatan: "Cerenti", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Pulau Tigo", kecamatan: "Cerenti", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  
  // Kecamatan Benai
  { desa: "Benai", kecamatan: "Benai", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Pulau Binjai", kecamatan: "Benai", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Cengar", kecamatan: "Benai", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Pulau Panjang", kecamatan: "Benai", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Koto Benai", kecamatan: "Benai", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  
  // Kecamatan Gunung Toar
  { desa: "Gunung Toar", kecamatan: "Gunung Toar", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Kampung Bukit", kecamatan: "Gunung Toar", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Koto Cengar", kecamatan: "Gunung Toar", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Pulau Terap", kecamatan: "Gunung Toar", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Koto Gunung", kecamatan: "Gunung Toar", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  
  // Kecamatan Singingi
  { desa: "Singingi", kecamatan: "Singingi", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Lubuk Jambi", kecamatan: "Singingi", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Sumpur", kecamatan: "Singingi", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Koto Kombu", kecamatan: "Singingi", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Kampung Padang", kecamatan: "Singingi", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  
  // Kecamatan Singingi Hilir
  { desa: "Tanjung", kecamatan: "Singingi Hilir", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Muara Sako", kecamatan: "Singingi Hilir", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Pulau Jambu", kecamatan: "Singingi Hilir", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Kampung Pinang", kecamatan: "Singingi Hilir", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Tanjung Alai", kecamatan: "Singingi Hilir", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  
  // Kecamatan Pucuk Rantau
  { desa: "Pucuk Rantau", kecamatan: "Pucuk Rantau", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Rantau Sialang", kecamatan: "Pucuk Rantau", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Koto Ranah", kecamatan: "Pucuk Rantau", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Rantau Kopar", kecamatan: "Pucuk Rantau", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  
  // Kecamatan Hulu Kuantan
  { desa: "Logas", kecamatan: "Hulu Kuantan", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Petai", kecamatan: "Hulu Kuantan", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Seberang Logas", kecamatan: "Hulu Kuantan", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Kopah", kecamatan: "Hulu Kuantan", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Kampung Pulau", kecamatan: "Hulu Kuantan", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  
  // Kecamatan Pangean
  { desa: "Pangean", kecamatan: "Pangean", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Kebun Tinggi", kecamatan: "Pangean", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Rantau Langsat", kecamatan: "Pangean", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Siberida", kecamatan: "Pangean", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  
  // Kecamatan Sentajo Raya
  { desa: "Sentajo Raya", kecamatan: "Sentajo Raya", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Pulau Padang", kecamatan: "Sentajo Raya", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Rantau Bertuah", kecamatan: "Sentajo Raya", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Kampung Medan", kecamatan: "Sentajo Raya", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Pulau Godang", kecamatan: "Sentajo Raya", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  
  // Kecamatan Inuman
  { desa: "Inuman", kecamatan: "Inuman", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Sungai Kuning", kecamatan: "Inuman", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Muara Takus", kecamatan: "Inuman", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Pongkai", kecamatan: "Inuman", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Koto Inuman", kecamatan: "Inuman", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  
  // Kecamatan Kuantan Hilir Seberang  
  { desa: "Simpang Tiga", kecamatan: "Kuantan Hilir Seberang", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Bukit Lingkar", kecamatan: "Kuantan Hilir Seberang", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Sungai Sirih", kecamatan: "Kuantan Hilir Seberang", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Petapahan", kecamatan: "Kuantan Hilir Seberang", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Rantau Panjang", kecamatan: "Kuantan Hilir Seberang", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
  { desa: "Sungai Buluh", kecamatan: "Kuantan Hilir Seberang", kabupaten: "Kuantan Singingi", provinsi: "Riau" },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase() || '';

    if (!query || query.length < 2) {
      return NextResponse.json({ data: [] }, { status: 200 });
    }

    // Filter data berdasarkan query
    const results = wilayahData.filter(
      (item) =>
        item.desa.toLowerCase().includes(query) ||
        item.kecamatan.toLowerCase().includes(query)
    );

    // Limit hasil maksimal 10
    const limitedResults = results.slice(0, 10);

    return NextResponse.json({ data: limitedResults }, { status: 200 });
  } catch (error) {
    console.error('Error in search-desa API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

