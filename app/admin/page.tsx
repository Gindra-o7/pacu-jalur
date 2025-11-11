import { createClient } from "@/utils/supabase/server";
import { Ship, Hotel, Calendar, Users } from "lucide-react";

async function getStats() {
  const supabase = await createClient();

  const [jalurResult, penginapanResult, acaraResult, usersResult] = await Promise.all([
    // @ts-expect-error - Database types belum di-generate dari Supabase
    supabase.from("jalur").select("id", { count: "exact", head: true }),
    // @ts-expect-error - Database types belum di-generate dari Supabase
    supabase.from("penginapan").select("id", { count: "exact", head: true }),
    // @ts-expect-error - Database types belum di-generate dari Supabase
    supabase.from("acara").select("id", { count: "exact", head: true }),
    // @ts-expect-error - Database types belum di-generate dari Supabase
    supabase.from("users").select("id", { count: "exact", head: true }),
  ]);

  return {
    jalur: jalurResult.count || 0,
    penginapan: penginapanResult.count || 0,
    acara: acaraResult.count || 0,
    users: usersResult.count || 0,
  };
}

export default async function AdminPage() {
  const stats = await getStats();

  const statCards = [
    {
      title: "Total Jalur",
      value: stats.jalur,
      icon: Ship,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Total Penginapan",
      value: stats.penginapan,
      icon: Hotel,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Total Acara",
      value: stats.acara,
      icon: Calendar,
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Total Users",
      value: stats.users,
      icon: Users,
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-heading">Dashboard</h1>
        <p className="text-gray-600 mt-2 font-body">Selamat datang di panel administrasi Pacu Jalur</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-sm text-gray-600 font-body mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900 font-heading">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4 font-heading">Aksi Cepat</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/admin/jalur" className="p-4 border border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all duration-300 group">
            <Ship className="w-6 h-6 text-gray-600 group-hover:text-orange-600 mb-2" />
            <h3 className="font-semibold text-gray-900 font-heading">Tambah Jalur</h3>
            <p className="text-sm text-gray-600 font-body">Tambah jalur baru ke database</p>
          </a>
          <a href="/admin/penginapan" className="p-4 border border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all duration-300 group">
            <Hotel className="w-6 h-6 text-gray-600 group-hover:text-orange-600 mb-2" />
            <h3 className="font-semibold text-gray-900 font-heading">Tambah Penginapan</h3>
            <p className="text-sm text-gray-600 font-body">Tambah penginapan baru</p>
          </a>
          <a href="/admin/acara" className="p-4 border border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all duration-300 group">
            <Calendar className="w-6 h-6 text-gray-600 group-hover:text-orange-600 mb-2" />
            <h3 className="font-semibold text-gray-900 font-heading">Tambah Acara</h3>
            <p className="text-sm text-gray-600 font-body">Buat acara baru</p>
          </a>
        </div>
      </div>
    </div>
  );
}
