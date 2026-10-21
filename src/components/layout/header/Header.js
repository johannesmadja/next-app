import styles from "./Header.module.scss";
import { User } from "lucide-react";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <p>MyMovieApp</p>
      </div>
      <div className={styles.navigation}>
        <nav>
          <ul>
            <li>Séries</li>
            <li>Films</li>
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
