import Link from "next/link";
import styles from "./Header.module.scss";
import { User } from "lucide-react";
import MovieSearch from "@/components/media/movieSearch/MovieSearch";
import LanguageSelector from "../languageSelector/languageSelector";
import { lang as getLang } from "next/root-params";

async function Header() {
  const lang = await getLang();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <p>
          <Link href="/"> MyMovieApp </Link>
        </p>
      </div>
      <div className={styles.navigation}>
        <nav>
          <ul>
            <li>
              <Link href="/series">Séries</Link>
            </li>
            <li>
              <Link href="/movies">Films</Link>
            </li>
          </ul>
        </nav>
        <MovieSearch />
        <div className={styles.user}>
          <User size={22} />
        </div>
        <LanguageSelector currentLanguage={lang} />
      </div>
    </header>
  );
}

export default Header;
