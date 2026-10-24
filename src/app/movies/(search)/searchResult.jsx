import MediaCard from "@/components/media/mediaCard/MediaCard";
import { getMovieByToken } from "@/utils/movieClient";
import styles from "./searchResult.module.scss";

export default async function SearchResult({ searchParams, genreId }) {
  const { results } = await getMovieByToken("/discover/movie", [
    {
      key: "sort_by",
      value: searchParams.sort_by,
    },
    {
      key: "release_date.gte",
      value: searchParams["release_date.gte"],
    },
    {
      key: "release_date.lte",
      value: searchParams["release_date.lte"],
    },
    {
      key: "with_genres",
      value: genreId,
    },
  ]);

  return (
    <div className={styles.results}>
      {results
        .filter((r) => r.poster_path)
        .map((movie) => (
          <MediaCard key={movie.id} movie={movie} />
        ))}
    </div>
  );
}
