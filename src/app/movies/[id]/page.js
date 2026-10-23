import Loading from "@/components/layout/loading/loading";
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
  return <h1> Movie page of movie : {id}</h1>;
}
