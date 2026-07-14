import { prisma } from "@/lib/prisma";
import SearchClient from "./SearchClient";

// Optional: you can force dynamic rendering if you want real-time updates
export const dynamic = "force-dynamic";

export default async function SearchPage() {
  // Fetch real companies from PostgreSQL
  const companies = await prisma.company.findMany({
    include: {
      capabilities: true,
      projects: true,
      compliance: true,
      capacity: true,
      score: true,
    },
  });

  // Map database model to the props expected by the frontend UI
  const formattedVendors = companies.map((c) => {
    // Determine if any project has GMP experience
    const hasGmp = c.projects.some((p) => p.gmpExperience);
    
    // Extract capabilities from the relational table into a flat array of strings
    const capabilitiesList = [];
    if (c.capabilities) {
      if (c.capabilities.csa.length > 0) capabilitiesList.push("CSA");
      if (c.capabilities.hvac.length > 0) capabilitiesList.push("HVAC");
      if (c.capabilities.mechanical.length > 0) capabilitiesList.push("Mechanical Piping");
      if (c.capabilities.electrical.length > 0) capabilitiesList.push("Electrical");
      if (c.capabilities.automation.length > 0) capabilitiesList.push("Automation & Controls");
      if (c.capabilities.cleanroom.length > 0) capabilitiesList.push("Cleanroom Construction");
    }

    return {
      id: c.id,
      name: c.companyName,
      location: c.country,
      score: c.score?.overallScore || 0,
      capabilities: capabilitiesList,
      gmp: hasGmp,
    };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black">Vendor Search</h1>
        <p className="mt-2 text-black">Discover and compare prequalified vendors for your projects.</p>
      </div>

      <SearchClient vendors={formattedVendors} />
    </div>
  );
}
