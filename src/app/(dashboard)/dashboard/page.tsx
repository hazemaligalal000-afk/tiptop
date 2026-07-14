import { prisma } from "@/lib/prisma";
import { Users, ShieldCheck, Activity, MapPin } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const vendors = await prisma.company.findMany({
    include: {
      score: true,
      projects: true,
    }
  });

  const totalVendors = vendors.length;
  const averageScore = totalVendors > 0 
    ? Math.round(vendors.reduce((acc, v) => acc + Number(v.score?.overallScore || 0), 0) / totalVendors)
    : 0;
  const totalProjects = vendors.reduce((acc, v) => acc + v.projects.length, 0);
  
  const highTierVendors = vendors.filter(v => Number(v.score?.overallScore || 0) > 80).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black">Platform Dashboard</h1>
        <p className="mt-2 text-black">Overview of your vendor intelligence ecosystem.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg border border-slate-200">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-black truncate">Total Vendors</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-black">{totalVendors}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg border border-slate-200">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ShieldCheck className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-black truncate">Avg VQI Score</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-black">{averageScore}/100</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg border border-slate-200">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Activity className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-black truncate">High Tier Vendors</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-black">{highTierVendors}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg border border-slate-200">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MapPin className="h-6 w-6 text-red-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-black truncate">Total Projects Logged</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-black">{totalProjects}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg border border-slate-200">
        <div className="px-4 py-5 sm:px-6 border-b border-slate-200 flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-black">Recently Registered Vendors</h3>
          <Link href="/search" className="text-sm text-blue-600 hover:text-blue-800 font-medium">View all</Link>
        </div>
        <div className="px-4 py-5 sm:p-0">
          <ul className="divide-y divide-slate-200">
            {vendors.slice(0, 5).map((vendor) => (
              <li key={vendor.id} className="py-4 px-6 hover:bg-slate-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-black truncate">{vendor.companyName}</p>
                    <p className="text-sm text-black truncate">{vendor.country}</p>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      VQI: {vendor.score?.overallScore?.toString() || 'N/A'}
                    </span>
                  </div>
                </div>
              </li>
            ))}
            {vendors.length === 0 && (
              <li className="py-8 text-center text-black">No vendors registered yet.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
