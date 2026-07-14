"use client";

import { useState } from "react";
import { Search, Filter, Star, CheckCircle, MapPin } from "lucide-react";
import Link from "next/link";

export default function SearchClient({ vendors }: { vendors: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVendors = vendors.filter((v) =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Filters */}
      <div className="w-full lg:w-64 flex-shrink-0 space-y-6">
        <div className="bg-white p-5 rounded-lg border shadow-sm">
          <h3 className="font-semibold text-black mb-4 flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-black uppercase tracking-wider">Discipline</label>
              <div className="mt-2 space-y-2">
                {["HVAC", "CSA", "Electrical", "Cleanroom"].map((cap) => (
                  <label key={cap} className="flex items-center">
                    <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-black">{cap}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-black uppercase tracking-wider">Compliance</label>
              <div className="mt-2 space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-black">GMP Experience</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-black">ISO 9001</span>
                </label>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-black uppercase tracking-wider">VQI Score</label>
              <input type="range" min="0" max="100" defaultValue="50" className="w-full mt-2 accent-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search & Results Area */}
      <div className="flex-1">
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none text-black"
            placeholder="Search vendors by name, capability, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredVendors.length === 0 ? (
          <div className="text-center py-12 bg-white border rounded-lg">
            <p className="text-black">No vendors found matching your search.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredVendors.map((vendor) => (
              <div key={vendor.id} className="bg-white border rounded-lg shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:border-blue-300 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center justify-between sm:justify-start sm:space-x-4 mb-2">
                    <h2 className="text-lg font-bold text-black">{vendor.name}</h2>
                    {vendor.gmp && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" /> GMP Ready
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center text-sm text-black mb-4">
                    <MapPin className="w-4 h-4 mr-1" /> {vendor.location}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {vendor.capabilities.map((cap: string) => (
                      <span key={cap} className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200">
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 sm:mt-0 sm:ml-6 flex flex-col items-end border-t sm:border-t-0 sm:border-l pt-4 sm:pt-0 sm:pl-6">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full border-4 border-blue-500 relative mb-3">
                    <span className="text-xl font-bold text-blue-700">{vendor.score}</span>
                    <span className="absolute -top-2 bg-white px-1 text-[10px] font-bold text-slate-400">VQI</span>
                  </div>
                  <div className="flex space-x-2 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none px-4 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-black bg-white hover:bg-slate-50">
                      Compare
                    </button>
                    <Link href={`/vendors/${vendor.id}`} className="flex-1 sm:flex-none px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 text-center">
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
