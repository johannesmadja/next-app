import { Suspense } from "react";
import SearchResult from "@/components/media/searchResult/SearchResult";
import Loading from "@/components/ui/loading/Loading";

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
