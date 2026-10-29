import styles from "./Loading.module.scss";

function Loading() {
  return (
    <div className={styles.loading} role="status" aria-label="Chargement du film">
      <div className={styles.spinner} />
    </div>
  );
}

export default Loading;
