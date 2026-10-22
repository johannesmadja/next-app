import MediaCard from "@/components/layout/card/MediaCard";
import styles from "./page.module.scss";
import Popular from "@/components/ui/Popular";

export default function Home() {
  return (
    <div className={styles.main}>
      <Popular />
    </div>
  );
}
