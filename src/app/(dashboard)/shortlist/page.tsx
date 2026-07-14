import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { CheckCircle, MapPin } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ShortlistPage() {
  const shortlist = await prisma.company.findMany({
    where: {
      score: {
        overallScore: {
          gt: 60 // Mock logic: Shortlist vendors with score > 60
        }
      }
    },
    include: {
      score: true,
      projects: true,
    },
    orderBy: {
      score: {
        overallScore: 'desc'
      }
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black">Your Shortlist</h1>
        <p className="mt-2 text-black">Vendors you have saved for final evaluation (currently auto-generated for VQI &gt; 60).</p>
      </div>

      {shortlist.length === 0 ? (
        <div className="text-center py-12 bg-white border rounded-lg">
          <p className="text-black">No vendors in your shortlist yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {shortlist.map((vendor) => {
            const hasGmp = vendor.projects.some(p => p.gmpExperience);
            
            return (
              <div key={vendor.id} className="bg-white border rounded-lg shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:border-blue-300 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center justify-between sm:justify-start sm:space-x-4 mb-2">
                    <h2 className="text-lg font-bold text-black">{vendor.companyName}</h2>
                    {hasGmp && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" /> GMP Ready
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center text-sm text-black mb-4">
                    <MapPin className="w-4 h-4 mr-1" /> {vendor.country}
                  </div>
                </div>

                <div className="mt-4 sm:mt-0 sm:ml-6 flex flex-col items-end border-t sm:border-t-0 sm:border-l pt-4 sm:pt-0 sm:pl-6">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full border-4 border-blue-500 relative mb-3">
                    <span className="text-xl font-bold text-blue-700">{vendor.score?.overallScore?.toString() || '0'}</span>
                    <span className="absolute -top-2 bg-white px-1 text-[10px] font-bold text-black">VQI</span>
                  </div>
                  <div className="flex space-x-2 w-full sm:w-auto">
                    <Link href={`/vendors/${vendor.id}`} className="flex-1 sm:flex-none px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 text-center">
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
