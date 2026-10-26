import Link from "next/link";
import styles from "./MediaCard.module.scss";
import Image from "next/image";

function MediaCard({ movie }) {
  return (
    <div className={`${styles.card}`}>
      <Link href={`/movies/${movie.id}`}>
        <div className={`${styles.image}`}>
          <Image
            src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}/w500${movie.poster_path}`}
            alt={`${movie.title}`}
            fill
            sizes="200px"
          />
        </div>
        <div className={`${styles.content}`}>
          <p className={styles.vote}>{movie.vote_average}</p>
          <h3> {movie.title}</h3>
          <p>Le {new Date(movie.release_date).toLocaleDateString("fr-FR")}</p>
        </div>
      </Link>
    </div>
  );
}

export default MediaCard;
