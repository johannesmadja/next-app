async function MoviePage({ params }) {
  const { id } = await params;
  return <h1> Movie page of movie : {id}</h1>;
}

export default MoviePage;
