import { getMovieByToken } from "@/utils/movieClient";
import MediaCard from "@/components/media/mediaCard/MediaCard";
import styles from "./Popular.module.scss";

async function Popular() {
  const { page, results } = await getMovieByToken("/movie/popular");
  const subResult = results.slice(0, 6);

  return (
    <>
      <h2> Les plus populaire</h2>
      <div className={styles.container}>
        {subResult.map((movie) => (
          <MediaCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
}

export default Popular;
