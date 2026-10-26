import Loading from "@/components/layout/loading/loading";
import MovieDetail from "@/components/media/mediaDetail/MovieDetail";
import SimilarMovies from "@/components/media/similarMovie/SimilarMovie";
import { getMovieByToken } from "@/utils/movieClient";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function MoviePage({ params }) {
  return (
    <Suspense fallback={<Loading />}>
      <MoviePageContent params={params} />
    </Suspense>
  );
}

async function MoviePageContent({ params }) {
  const { id } = await params;

  const movie = await getMovieByToken(`/movie/${id}`);
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
