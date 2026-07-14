import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { id, email, role } = await req.json();

    // Upsert the user so it doesn't fail if they already exist
    const user = await prisma.user.upsert({
      where: { id },
      update: { email },
      create: {
        id,
        email,
        role: role || "VENDOR",
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Error syncing user:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
