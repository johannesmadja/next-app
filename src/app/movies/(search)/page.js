import { Suspense } from "react";
import SearchResult from "./searchResult";
import Loading from "@/components/layout/loading/loading";

function MoviesPage({searchParams}) {
    return (
    <Suspense fallback={<Loading />}>
      <MoviePageContent searchParams={searchParams} />
    </Suspense>
  );
}

async function MoviePageContent({searchParams}) {
  const search = await searchParams; 

  return (<SearchResult searchParams={searchParams}/>)
}

export default MoviesPage;
