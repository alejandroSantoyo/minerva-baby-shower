import styles from "../page.module.css";
import "../globals.css";
import Invitation from "@/components/Landing/Invitation";
import Details from "@/components/Landing/Details";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export interface Invitation {
  id: string;
  guest: string;
  slug: string;
  totalPasses: number;
  confirmedPasses?: number;
  confirmed: boolean;
}

export default async function Home({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const invitation = (await prisma.invitation.findUnique({
    where: { slug: decodeURIComponent(slug) },
  })) as Invitation;

  if (!invitation) {
    return notFound();
  }

  return (
    <div className={styles.page}>
      <Invitation guest={invitation.guest} />
      <Details invitation={invitation} />
    </div>
  );
}
