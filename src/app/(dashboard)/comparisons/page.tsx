import { prisma } from "@/lib/prisma";
import { CheckCircle2, XCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ComparisonsPage() {
  // For MVP, just get the top 3 highest scoring vendors
  const topVendors = await prisma.company.findMany({
    include: {
      capabilities: true,
      projects: true,
      compliance: true,
      capacity: true,
      score: true,
    },
    orderBy: {
      score: {
        overallScore: 'desc'
      }
    },
    take: 3
  });

  if (topVendors.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl font-bold text-black mb-4">Vendor Comparison</h1>
        <p className="text-black bg-slate-100 p-8 rounded-lg">No vendors available to compare. Please wait for vendors to register.</p>
      </div>
    );
  }

  const features = [
    { name: "VQI Score", render: (v: any) => <span className="font-bold text-blue-600 text-lg">{v.score?.overallScore || 'N/A'}</span> },
    { name: "HQ Location", render: (v: any) => v.country },
    { name: "Years Operating", render: (v: any) => v.yearsOperating },
    { name: "Employee Count", render: (v: any) => v.employeeCount },
    { name: "GMP Experience", render: (v: any) => v.projects.some((p: any) => p.gmpExperience) ? <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /> : <XCircle className="w-5 h-5 text-red-500 mx-auto" /> },
    { name: "ISO Certifications", render: (v: any) => v.compliance?.isoCertifications.length || 0 },
    { name: "Total Logged Projects", render: (v: any) => v.projects.length },
    { name: "Current Workload", render: (v: any) => v.capacity?.currentWorkload || 'Unknown' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black">Vendor Comparison</h1>
        <p className="mt-2 text-black">Side-by-side evaluation of top matched vendors.</p>
      </div>

      <div className="bg-white shadow rounded-lg border border-slate-200 overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider w-1/4">
                Metric
              </th>
              {topVendors.map((vendor) => (
                <th key={vendor.id} scope="col" className="px-6 py-3 text-center text-sm font-bold text-black uppercase tracking-wider w-1/4">
                  {vendor.companyName}
                </th>
              ))}
              {/* Fill empty columns if less than 3 vendors */}
              {Array.from({ length: 3 - topVendors.length }).map((_, i) => (
                <th key={`empty-${i}`} scope="col" className="px-6 py-3 text-center text-sm font-medium text-black uppercase tracking-wider w-1/4">
                  -
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {features.map((feature, idx) => (
              <tr key={feature.name} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                  {feature.name}
                </td>
                {topVendors.map((vendor) => (
                  <td key={vendor.id} className="px-6 py-4 whitespace-nowrap text-sm text-black text-center">
                    {feature.render(vendor)}
                  </td>
                ))}
                {Array.from({ length: 3 - topVendors.length }).map((_, i) => (
                  <td key={`empty-cell-${i}`} className="px-6 py-4 whitespace-nowrap text-sm text-black text-center">
                    -
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
