import { getMovieByToken } from "@/lib/movieClient";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  const results = await getMovieByToken("/search/movie", [
    {
      key: "query",
      value: query,
    },
  ]);

  return new Response(JSON.stringify(results), { status: 200 });
}
