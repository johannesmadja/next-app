import "server-only";

export const getMovieByPath = (path, language = "fr-FR") => {
  const url = new URL(`${process.env.TMDB_API_URL}${path}`);
  url.searchParams.append("api_key", process.env.TMDB_API_KEY);
  url.searchParams.append("language", language);

  return fetch(url).then((res) => res.json());
};

export const getMovieByToken = (path, params = [], language = "fr-FR") => {
  const url = new URL(`${process.env.TMDB_API_URL}${path}`);

  url.searchParams.set("language", language);
  params.filter(param => param.value).forEach((param) => {
    url.searchParams.set(param.key, param.value);
  })

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      accept: "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`TMDB API error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  });
};
