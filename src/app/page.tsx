import styles from "./page.module.css";
import "./globals.css";
import Invitation from "@/components/Landing/Invitation";

export default function Home() {
  return (
    <div className={styles.page}>
      <Invitation guest="Familia Santoyo" />
      {/* <Details /> */}
    </div>
  );
}
