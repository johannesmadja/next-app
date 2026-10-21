import Link from "next/link";
import styles from "./Header.module.scss";
import { User } from "lucide-react";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <p><Link href="/"> MyMovieApp </Link></p>
      </div>
      <div className={styles.navigation}>
        <nav>
          <ul>
            <li><Link href="/series">Séries</Link></li>
             <li><Link href="/movies">Films</Link></li>
          </ul>
        </nav>
        <input type="text" placeholder="Rechercher un titre ..." />
        <div>
          <User size={22} />
        </div>
      </div>
    </header>
  );
}

export default Header;
