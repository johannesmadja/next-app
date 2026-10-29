import { lang as getLang } from "next/root-params";
import { getMovieByToken } from "@/lib/movieClient";
import MediaCard from "@/components/media/mediaCard/MediaCard";
import styles from "./Popular.module.scss";
import { getDictionary } from "@/lib/dictionaries";

async function Popular() {
  const lang = await getLang();
  const i18n = await getDictionary(lang);
  const { page, results } = await getMovieByToken("/movie/popular", [], lang);
  const subResult = results.slice(0, 6);

  return (
    <>
      <h2> {i18n.popular.title}</h2>
      <div className={styles.container}>
        {subResult.map((movie) => (
          <MediaCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
}

export default Popular;
