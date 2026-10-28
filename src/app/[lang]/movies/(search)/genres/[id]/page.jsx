import Loading from "@/components/layout/loading/loading";
import { Suspense } from "react";
import SearchResult from "../../searchResult";

export default function GenreDetails({ params, searchParams }) {
  return (
    <Suspense fallback={<Loading />}>
      <GenreDetailsContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function GenreDetailsContent({ params, searchParams }) {
  const { id } = await params;
  const search = await searchParams;

  return (
   <SearchResult searchParams={search} genreId={id}/>
  );
}
