import { getMovieByToken } from "@/utils/movieClient";
import styles from "./Genre.module.scss";
import Link from "next/link";
import { lang as getLang } from "next/root-params";

export default async function Genres() {
  const lang = await getLang();
  const { genres } = await getMovieByToken("/genre/movie/list", [], lang);

  return (
    <div>
      <h2>Parcourir les genres</h2>
      <div className={styles.container}>
        {genres.map((genre) => (
          <div key={genre.id} className={styles.genre}>
            <Link href={`/movies/genres/${genre.id}`}> {genre.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
