import styles from "./page.module.css";
import "./globals.css";
import Invitation from "@/components/Landing/Invitation";
import Details from "@/components/Landing/Details";

export default function Home() {
  return (
    <div className={styles.page}>
      <Invitation guest="Familia Santoyo" />
      <Details passes={10} />
    </div>
  );
}
