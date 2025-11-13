import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const ADMIN_KEY = process.env.ADMIN_KEY;

export async function GET(req: Request) {
  const key = new URL(req.url).searchParams.get("key");
  if (key !== ADMIN_KEY)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const invitations = await prisma.invitation.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(invitations);
}

export async function POST(req: Request) {
  const key = new URL(req.url).searchParams.get("key");
  if (key !== ADMIN_KEY)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  const newInvitation = await prisma.invitation.create({
    data: {
      guest: data.guest,
      slug: data.slug,
      email: data.email,
      totalPasses: data.totalPasses ?? 2,
    },
  });

  return NextResponse.json(newInvitation);
}
