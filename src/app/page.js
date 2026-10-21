import MediaCard from "@/components/layout/card/MediaCard";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.main}>
      <MediaCard />
    </div>
  );
}
