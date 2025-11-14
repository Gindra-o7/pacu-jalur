import DesaBerlombaContent from "./DesaBerlombaContent";

type Jalur = {
  id: string;
  nama: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  deskripsi: string | null;
};

type DesaBerlombaProps = {
  jalurList: Jalur[];
};

export default function DesaBerlomba({ jalurList }: DesaBerlombaProps) {
  // Group by desa to get unique villages
  const desaMap = new Map<string, { desa: string; kecamatan: string; jalur: Jalur[] }>();

  jalurList.forEach((jalur) => {
    const key = `${jalur.desa}-${jalur.kecamatan}`;
    if (!desaMap.has(key)) {
      desaMap.set(key, { desa: jalur.desa, kecamatan: jalur.kecamatan, jalur: [] });
    }
    desaMap.get(key)?.jalur.push(jalur);
  });

  const desaList = Array.from(desaMap.values());

  return <DesaBerlombaContent desaList={desaList} totalJalur={jalurList.length} />;
}
