import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { lang as getLang } from "next/root-params";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getMovieByToken } from "@/lib/movieClient";
import { getDictionary } from "@/lib/dictionaries";
import MediaCard from "@/components/media/mediaCard/MediaCard";
import styles from "./LikedMovies.module.scss";

async function LikedMovies() {
  const lang = await getLang();
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/api/auth/signin");

  const i18n = await getDictionary(lang);
  const likes = await prisma.movieLike.findMany({
    where: { userId: Number(session.user.id) },
    orderBy: { id: "desc" },
  });

  // Récupère le détail de chaque film aimé auprès de TMDB, dans la langue de la page
  const movies = await Promise.all(
    likes.map((like) => getMovieByToken(`/movie/${like.movieId}`, [], lang).catch(() => null))
  );

  return (
    <section>
      <h2>{i18n.profile.likedMovies}</h2>
      {movies.filter(Boolean).length === 0 ? (
        <p>{i18n.profile.noLikedMovies}</p>
      ) : (
        <div className={styles.list}>
          {movies.filter(Boolean).map((movie) => (
            <MediaCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
}

export default LikedMovies;
