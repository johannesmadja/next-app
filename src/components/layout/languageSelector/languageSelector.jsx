"use client";
import styles from "./languageSelector.module.scss";

import { availableLocales } from "@/lib/locales";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useState } from "react";
import { ChevronDown } from "lucide-react";

const LanguageLink = ({ locale, onClick }) => {
  const pathname = usePathname();
  // Remplace le premier segment (/fr, /en) par la langue choisie
  const href = pathname.replace(/^\/[^/]+/, `/${locale}`);

  return (
    <Link href={href} onClick={onClick}>
      {locale}
    </Link>
  );
};

const LanguageSelector = ({ currentLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${styles.selector} ${isOpen ? styles.enabled : ""}`}>
      <p onClick={() => setIsOpen((currOpen) => !currOpen)}>
        {currentLanguage}
        <span>
          <ChevronDown />
        </span>
      </p>
      <ul>
        {availableLocales
          .filter((locale) => locale !== currentLanguage)
          .map((locale) => (
            <li key={locale}>
              <Suspense fallback={<Link href={`/${locale}`}>{locale}</Link>}>
                <LanguageLink locale={locale} onClick={() => setIsOpen(false)} />
              </Suspense>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default LanguageSelector;
