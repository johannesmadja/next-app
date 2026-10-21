import styles from "./MediaCard.module.scss";
import Image from "next/image";

function MediaCard() {
  return (
    <div className={`${styles.card}`}>
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
    </div>
  );
}

export default MediaCard;
