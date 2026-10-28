import { defaultLocale } from "@/lib/locales";
import { useParams } from "next/navigation";

export const useCurrentLanguage = () => {
  const params = useParams();

  return params.lang || defaultLocale;
};