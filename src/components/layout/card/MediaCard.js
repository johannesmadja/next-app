import Link from "next/link";
import styles from "./MediaCard.module.scss";
import Image from "next/image";

function MediaCard({ mediaId }) {
  return (
    <div className={`${styles.card}`}>
      <Link href={`/movies/${mediaId}`}>
        <div className={`${styles.image}`}>
          <Image
            src="https://image.tmdb.org/t/p/w500/hYQs5RPHiWctoYqvI8baHiIqdd8.jpg"
            alt="media title"
            fill
          />
        </div>
        <div className={`${styles.content}`}>
          <h1> Creed III</h1>
          <p>Le 01/03/2023</p>
        </div>
      </Link>
    </div>
  );
}

export default MediaCard;
