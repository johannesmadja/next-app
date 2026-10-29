import styles from "./page.module.scss";
import Popular from "@/components/media/popular/Popular";
import Genres from "@/components/media/genres/Genres";
import { cacheLife } from "next/cache";

export default async function Home() {
  "use cache";
  cacheLife("days");

  return (
    <div className={styles.main}>
      <Popular />
      <Genres />
    </div>
  );
}
