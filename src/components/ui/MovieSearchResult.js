"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./MovieSearchResult.module.scss";

function MovieSearchResult({ searchResult }) {
  return (
    <div className={styles.container} onMouseDown={(e) => e.preventDefault()}>
      {searchResult.map((movie) => (
        <Link key={movie.id} href={`/movies/${movie.id}`}>
          <Image
            width={90}
            height={50}
            src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}${movie.backdrop_path}`}
            alt={movie.title}
          />
          <p>{movie.title}</p>
        </Link>
      ))}
    </div>
  );
}

export default MovieSearchResult;
