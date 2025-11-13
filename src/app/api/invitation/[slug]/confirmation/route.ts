import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;
  const data = await req.json();
  console.log("DATA :", data);

  const invitation = await prisma.invitation.update({
    where: { slug: slug },
    data: {
      confirmed: data.confirmed,
      confirmedPasses: data.confirmedPasses ?? null,
    },
  });

  return NextResponse.json(invitation);
}
