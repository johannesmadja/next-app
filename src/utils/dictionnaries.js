const dictionaries = {
  en: () => import("../dictionnaries/en.json").then((module) => module.default),
  fr: () => import("../dictionnaries/fr.json").then((module) => module.default),
};

export const getDictionary = async (locale) => dictionaries[locale]();
