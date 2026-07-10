import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { verifyAdmin } from "@/lib/admin/guard";

export const metadata = {
  title: "Admin — DUGATE",
  description: "DUGATE Internal CMS",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Auth temporarily disabled
  // await verifyAdmin();

  return (
    <div className="flex h-full bg-canvas-bg">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-8 bg-contour bg-grain">
        <div className="max-w-[1400px] mx-auto animate-in">
          {children}
        </div>
      </main>
    </div>
  );
}
