import Link from "next/link";
import styles from "./Header.module.scss";
import { User } from "lucide-react";
import MovieSearch from "@/components/media/movieSearch/MovieSearch";
import LanguageSelector from "@/components/layout/languageSelector/LanguageSelector";
import { lang as getLang } from "next/root-params";

async function Header() {
  const lang = await getLang();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <p>
          <Link href={`/${lang}`}> MyMovieApp </Link>
        </p>
      </div>
      <div className={styles.navigation}>
        <nav>
          <ul>
            <li>
              <Link href={`/${lang}/series`}>Séries</Link>
            </li>
            <li>
              <Link href={`/${lang}/movies`}>Films</Link>
            </li>
            <li>
              <Link href={`/${lang}/signup`}>Inscription</Link>
            </li>
          </ul>
        </nav>
        <MovieSearch />
        <div className={styles.user}>
          <Link href={`/${lang}/user/profile`}>
            <User size={22} />
          </Link>
        </div>
        <LanguageSelector currentLanguage={lang} />
      </div>
    </header>
  );
}

export default Header;
