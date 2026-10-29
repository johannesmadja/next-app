import SearchSideBar from "@/components/layout/searchSideBar/SearchSideBar";
import styles from "./layout.module.scss";
import { getMovieByToken } from "@/lib/movieClient";

export default async function MovieSearchLayout({ children }) {
  const { genres } = await getMovieByToken("/genre/movie/list");

  return (
    <div className={styles.searchContainer}>
      <SearchSideBar genres={genres} />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
