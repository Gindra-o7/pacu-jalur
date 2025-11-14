import { requireAdmin } from "@/utils/supabase/admin";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="min-h-screen lg:ml-[280px]">
        <div className="p-4 lg:p-8 pt-16 lg:pt-8">{children}</div>
      </main>
    </div>
  );
}

