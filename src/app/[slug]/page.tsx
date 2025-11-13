import styles from "../page.module.css";
import "../globals.css";
import Invitation from "@/components/Landing/Invitation";
import Details from "@/components/Landing/Details";
import { BASE_URL } from "constants/appConstants";
import { prisma } from "@/lib/prisma";

export interface Invitation {
  id: string;
  guest: string;
  slug: string;
  totalPasses: number;
  confirmedPasses?: number;
  confirmed: boolean;
}

async function getInvitation(slug: string): Promise<Invitation | null> {
  console.log("BASE_URL", BASE_URL);
  const res = await fetch(`${BASE_URL}/api/invitation/${slug}`, {
    cache: "no-store", // asegura que siempre sea fresco
  });

  console.log(res);
  if (!res.ok) return null;
  return res.json();
}

export default async function Home({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const invitation = await prisma.invitation.findUnique({
    where: { slug },
  });

  if (!invitation) {
    return <div>YOU'RE NOT INVITED</div>;
  }

  return (
    <div className={styles.page}>
      <Invitation guest={invitation.guest} />
      <Details invitation={invitation} />
    </div>
  );
}
