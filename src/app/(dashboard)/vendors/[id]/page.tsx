import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { MapPin, Building, Activity, ShieldCheck, Briefcase } from "lucide-react";
import Link from "next/link";

export default async function VendorDetailsPage({ params }: { params: { id: string } }) {
  const vendor = await prisma.company.findUnique({
    where: { id: params.id },
    include: {
      capabilities: true,
      projects: true,
      compliance: true,
      capacity: true,
      score: true,
    }
  });

  if (!vendor) return notFound();

  const capabilities = vendor.capabilities ? [
    ...vendor.capabilities.csa.map(c => `CSA: ${c}`),
    ...vendor.capabilities.hvac.map(c => `HVAC: ${c}`),
    ...vendor.capabilities.mechanical.map(c => `Mechanical: ${c}`),
    ...vendor.capabilities.electrical.map(c => `Electrical: ${c}`),
    ...vendor.capabilities.automation.map(c => `Automation: ${c}`),
    ...vendor.capabilities.cleanroom.map(c => `Cleanroom: ${c}`),
  ] : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-white shadow rounded-lg border border-slate-200 overflow-hidden mb-8">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-black">{vendor.companyName}</h1>
            <p className="mt-1 flex items-center text-black">
              <MapPin className="w-4 h-4 mr-1" /> {vendor.country}
            </p>
            {vendor.website && (
              <a href={vendor.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline mt-2 inline-block">
                {vendor.website}
              </a>
            )}
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-4 border-blue-500">
              <span className="text-2xl font-bold text-blue-700">{vendor.score?.overallScore || 'N/A'}</span>
            </div>
            <p className="text-xs font-bold mt-1 text-black uppercase tracking-wide">VQI Score</p>
          </div>
        </div>
        <div className="border-t border-slate-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-black">Years Operating</dt>
              <dd className="mt-1 text-sm text-black">{vendor.yearsOperating}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-black">Employee Count</dt>
              <dd className="mt-1 text-sm text-black">{vendor.employeeCount}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-black">Current Workload</dt>
              <dd className="mt-1 text-sm text-black">{vendor.capacity?.currentWorkload || 'Unknown'}</dd>
            </div>
            <div className="sm:col-span-3">
              <dt className="text-sm font-medium text-black">About</dt>
              <dd className="mt-1 text-sm text-black">{vendor.description}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Capabilities */}
        <div className="bg-white shadow rounded-lg border border-slate-200">
          <div className="px-4 py-5 sm:px-6 border-b border-slate-200 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-indigo-500" />
            <h3 className="text-lg font-medium text-black">Technical Capabilities</h3>
          </div>
          <div className="p-6">
            <div className="flex flex-wrap gap-2">
              {capabilities.map(cap => (
                <span key={cap} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-800 border border-indigo-100">
                  {cap}
                </span>
              ))}
              {capabilities.length === 0 && <span className="text-black text-sm">No capabilities listed.</span>}
            </div>
          </div>
        </div>

        {/* Compliance */}
        <div className="bg-white shadow rounded-lg border border-slate-200">
          <div className="px-4 py-5 sm:px-6 border-b border-slate-200 flex items-center">
            <ShieldCheck className="w-5 h-5 mr-2 text-green-500" />
            <h3 className="text-lg font-medium text-black">Quality & Compliance</h3>
          </div>
          <div className="p-6">
            <ul className="list-disc pl-5 space-y-2">
              {vendor.compliance?.isoCertifications.map(cert => (
                <li key={cert} className="text-black text-sm">{cert}</li>
              ))}
              {(!vendor.compliance || vendor.compliance.isoCertifications.length === 0) && (
                <li className="text-black text-sm list-none -ml-5">No certifications listed.</li>
              )}
            </ul>
          </div>
        </div>

        {/* Projects */}
        <div className="bg-white shadow rounded-lg border border-slate-200 lg:col-span-2">
          <div className="px-4 py-5 sm:px-6 border-b border-slate-200 flex items-center">
            <Briefcase className="w-5 h-5 mr-2 text-blue-500" />
            <h3 className="text-lg font-medium text-black">Project Experience</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Project Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Industry</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Value (EUR)</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">GMP</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {vendor.projects.map(p => (
                  <tr key={p.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">{p.projectName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{p.industry}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{p.value.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                      {p.gmpExperience ? <span className="text-green-600 font-bold">Yes</span> : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <Link href="/search" className="text-blue-600 hover:underline">
          &larr; Back to Search
        </Link>
      </div>
    </div>
  );
}
