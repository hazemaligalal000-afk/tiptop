import Link from "next/link";
import { LayoutDashboard, Users, FileText, CheckSquare, Settings, BarChart2, Search } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Search Vendors", href: "/search", icon: Search },
  { name: "Prequalification", href: "/pqq/wizard", icon: FileText },
  { name: "Comparisons", href: "/comparisons", icon: BarChart2 },
  { name: "Shortlist", href: "/shortlist", icon: CheckSquare },
];

export default function Sidebar() {
  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-slate-900">
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center h-16 flex-shrink-0 px-4 bg-slate-950">
          <span className="text-white text-xl font-bold tracking-wider text-blue-400">Tip<span className="text-white">Top</span></span>
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-slate-300 hover:bg-slate-800 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors"
                >
                  <Icon className="text-slate-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-5 w-5" aria-hidden="true" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-slate-800 p-4">
          <Link href="/settings" className="flex-shrink-0 w-full group block">
            <div className="flex items-center">
              <div>
                <Settings className="inline-block h-5 w-5 rounded-full text-slate-400 group-hover:text-white" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-slate-300 group-hover:text-white">Settings</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
