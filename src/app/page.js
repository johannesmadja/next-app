import MediaCard from "@/components/media/mediaCard/MediaCard";
import styles from "./page.module.scss";
import Popular from "@/components/media/popular/Popular";
import Genres from "@/components/media/genre/Genres";

export default function Home() {
  return (
    <div className={styles.main}>
      <Popular />
      <Genres />
    </div>
  );
}
