"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "./Form.module.scss";

export default function Form() {
  const path = usePathname();
  const router = useRouter();

  function handleSubmint(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const searchParams = new URLSearchParams();
    searchParams.append("sort_by", formData.get("sort"));
    searchParams.append("release_date.gte", formData.get("fromDate"));
    searchParams.append("release_date.lte", formData.get("toDate"));

    router.push(`${path}?${searchParams.toString()}`);
  }

  return (
    <form className={styles.container} onSubmit={handleSubmint}>
      <h2>Filter</h2>

      <div>
        <h3>Date de sortie</h3>
        <div>
          <p>Du</p>
          <input type="date" name="fromDate" />
        </div>
        <div>
          <p>au</p>
          <input
            type="date"
            name="toDate"
            defaultValue={new Date().toISOString().substring(0, 10)}
          />
        </div>
      </div>

      <div>
        <h3>Trier par </h3>
        <select name="sort">
          <option value="popularity_desc"> Popularité </option>
          <option value="vote_average.desc"> Note </option>
          <option value="vote_count.desc"> Nombre de notes </option>
        </select>
      </div>

      <input type="submit" value="Rechercher ..." />
    </form>
  );
}
