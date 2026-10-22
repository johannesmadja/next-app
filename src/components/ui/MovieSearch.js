"use client";

import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import MovieSearchResult from "./MovieSearchResult";
import styles from "./MovieSearch.module.scss";

const MIN_QUERY_LENGTH = 2;

export default function MovieSearch() {
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const [hasFocus, setHasFocus] = useState(false);
  const query = useDebounce(value.trim(), 500);

  const isQueryValid = value.trim().length >= MIN_QUERY_LENGTH;

  useEffect(() => {
    if (query.length < MIN_QUERY_LENGTH) return;

    const controller = new AbortController();

    fetch(`/api/movies/search?query=${encodeURIComponent(query)}`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then(({ results }) => {
        setResults(results.filter((movie) => movie.backdrop_path));
      })
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      });

    return () => controller.abort();
  }, [query]);

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Rechercher un titre ..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => setHasFocus(false)}
        onFocus={() => setHasFocus(true)}
      />
      {isQueryValid && hasFocus && results.length > 0 && (
        <MovieSearchResult searchResult={results} />
      )}
    </div>
  );
}
