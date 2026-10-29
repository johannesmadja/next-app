import { getMovieByToken } from "@/lib/movieClient";
import styles from "./MovieCredit.module.scss";
import Image from "next/image";
import { lang as getLang, lang } from "next/root-params";

const MovieCredits = async ({ movieId }) => {
  const lang = await getLang();
  const { cast } = await getMovieByToken(`/movie/${movieId}/credits`, [], lang);
  return (
    <div className={styles.credits}>
      {cast.slice(0, 4).map((person) => (
        <div key={person.id}>
          <Image
            src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}/w185${person.profile_path}`}
            alt={person.name}
            width={90}
            height={90}
          />
          <p>{person.name}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieCredits;
