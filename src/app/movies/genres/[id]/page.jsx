import Loading from "@/components/layout/loading/loading";
import { Suspense } from "react";

export default function GenreDetails({ params }) {
  return (
    <Suspense fallback={<Loading />}>
      <GenreDetailsContent params={params} />
    </Suspense>
  );
}

async function GenreDetailsContent({ params }) {
  const { id } = await params;

  return (
    <div>
      <h2>GenreDetails {id}</h2>
    </div>
  );
}
