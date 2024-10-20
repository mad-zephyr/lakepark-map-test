import styles from "./page.module.sass";
import ThreeDMap from "@/components/threeDMap";

export default function Home() {
  return (
    <div className={styles.page}>
      <>
        <ThreeDMap />
      </>
    </div>
  );
}
