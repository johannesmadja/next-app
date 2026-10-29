import Loading from "@/components/ui/loading/Loading";
import MovieDetail from "@/components/media/movieDetail/MovieDetail";
import SimilarMovies from "@/components/media/similarMovie/SimilarMovie";
import { getMovieByToken } from "@/lib/movieClient";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { lang as getLang } from "next/root-params";

export default async function MoviePage({ params }) {
  return (
    <Suspense fallback={<Loading />}>
      <MoviePageContent params={params} />
    </Suspense>
  );
}

async function MoviePageContent({ params }) {
  const { id } = await params;
  const lang = await getLang();

  const movie = await getMovieByToken(`/movie/${id}`, [], lang);
  if (!movie.original_title) {
    return notFound();
  }

  return (
    <div>
      <MovieDetail movie={movie} />
      <Suspense fallback={<Loading />}>
        <SimilarMovies movieId={movie.id} />
      </Suspense>
    </div>
  );
}
