import { getMovieByToken } from "@/utils/movieClient";
import styles from "./Genre.module.scss";
import Link from "next/link";

export default async function Genres() {
  const { genres } = await getMovieByToken("/genre/movie/list");

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
