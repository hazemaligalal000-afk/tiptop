import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - fixed width on desktop */}
      <Sidebar />
      
      {/* Main content area - dynamic width */}
      <div className="flex-1 md:pl-64 flex flex-col min-h-screen">
        <TopNav />
        <main className="flex-1 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
