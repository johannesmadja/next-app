"use client";
import styles from "./languageSelector.module.scss";

import { availableLocales } from "@/lib/locales";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { ChevronDown } from "lucide-react";

const LanguageLink = ({ locale, onClick }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams().toString();
  // Remplace le premier segment (/fr, /en) par la langue choisie et conserve la query
  const path = pathname.replace(/^\/[^/]+/, `/${locale}`);
  const href = searchParams ? `${path}?${searchParams}` : path;

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
