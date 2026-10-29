import Loading from "@/components/ui/loading/Loading";
import { Suspense } from "react";
import SearchResult from "@/components/media/searchResult/SearchResult";

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
