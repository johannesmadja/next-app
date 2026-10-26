import { getMovieByToken } from "@/utils/movieClient";
import MediaCard from "../mediaCard/MediaCard";
import styles from "./SimilarMovie.module.scss";

const SimilarMovies = async ({ movieId }) => {
  const { results } = await getMovieByToken(`/movie/${movieId}/similar`);
  return (
    <div className={styles.similar}>
      <div className={styles.list}>
        {results
          .filter((r) => r.poster_path != null)
          .slice(0, 6)
          .map((movie) => (
            <MediaCard movie={movie} key={movie.id} />
          ))}
      </div>
    </div>
  );
};

export default SimilarMovies;
