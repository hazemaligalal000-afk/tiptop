import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // In a real app, you would get the authenticated user ID from Supabase Auth session
    // const { user } = await supabase.auth.getUser();
    // const userId = user.id;
    
    // For MVP, we will assume a dummy user ID or create a dummy user
    // Since this is an MVP without active Postgres connection string configured yet,
    // we return a success payload to simulate the API working perfectly.

    // Calculate mock VQI Score (Rule-based simple logic)
    let capabilityScore = Math.min(body.capabilities.length * 5, 30); // Max 30
    let complianceScore = Math.min(body.isoCertifications.length * 4, 20); // Max 20
    let experienceScore = Math.min(body.projects.length * 10, 30); // Max 30
    let capacityScore = body.currentWorkload === "0-25" ? 20 : body.currentWorkload === "26-50" ? 15 : body.currentWorkload === "51-75" ? 10 : 5; // Max 20

    const overallScore = capabilityScore + complianceScore + experienceScore + capacityScore;
    let badge = "Low";
    if (overallScore > 80) badge = "Excellent";
    else if (overallScore > 60) badge = "High";
    else if (overallScore > 40) badge = "Medium";

    let userId = body.userId;
    
    if (!userId) {
      // Create a dummy user for the MVP without full auth flow
      const dummyUser = await prisma.user.create({
        data: {
          email: `vendor-${Date.now()}@example.com`,
          role: "VENDOR"
        }
      });
      userId = dummyUser.id;
    }

    const vendorProfile = await prisma.company.create({
      data: {
        userId: userId,
        companyName: body.companyName || "Unknown Company",
        website: body.website || "",
        country: body.country || "Unknown",
        yearsOperating: parseInt(body.yearsOperating) || 0,
        employeeCount: parseInt(body.employeeCount) || 0,
        description: body.description || "",
        
        capabilities: {
          create: {
            csa: body.capabilities.includes("CSA (Civil, Structural, Architectural)") ? ["General"] : [],
            hvac: body.capabilities.includes("HVAC") ? ["General"] : [],
            mechanical: body.capabilities.includes("Mechanical Piping") ? ["General"] : [],
            electrical: body.capabilities.includes("Electrical") ? ["General"] : [],
            automation: body.capabilities.includes("Automation & Controls") ? ["General"] : [],
            cleanroom: body.capabilities.includes("Cleanroom Construction") ? ["General"] : [],
            equipment: body.capabilities.includes("Process Equipment") ? ["General"] : [],
            digital: [],
          }
        },
        projects: {
          create: body.projects.map((p: any) => ({
            projectName: p.projectName || "Unnamed Project",
            industry: p.industry || "General",
            country: body.country || "Unknown",
            scope: "General Scope",
            value: parseFloat(p.value) || 0,
            year: new Date().getFullYear(),
            gmpExperience: p.gmpExperience || false
          }))
        },
        compliance: {
          create: {
            isoCertifications: body.isoCertifications || []
          }
        },
        capacity: {
          create: {
            currentWorkload: body.currentWorkload || "0-25"
          }
        },
        score: {
          create: {
            capabilityScore,
            experienceScore,
            complianceScore,
            capacityScore,
            overallScore,
            recommendationBadge: badge
          }
        }
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: "Vendor Profile created successfully",
      calculatedScore: overallScore,
      badge
    });

  } catch (error) {
    console.error("Error creating vendor profile:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
