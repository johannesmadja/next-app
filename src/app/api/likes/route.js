import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const getUserId = async () => {
  const session = await getServerSession(authOptions);
  return session?.user?.id ? Number(session.user.id) : null;
};

// Liste des films aimés par l'utilisateur connecté
export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const likes = await prisma.movieLike.findMany({
    where: { userId },
    select: { movieId: true },
  });

  return NextResponse.json({ movieIds: likes.map((like) => like.movieId) });
}

// Ajoute le like s'il n'existe pas, le retire sinon
export async function POST(request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const { movieId } = await request.json();
  if (!movieId) return NextResponse.json({ error: "movieId manquant" }, { status: 400 });

  const where = { userId_movieId: { userId, movieId: String(movieId) } };
  const existing = await prisma.movieLike.findUnique({ where });

  if (existing) {
    await prisma.movieLike.delete({ where });
    return NextResponse.json({ liked: false });
  }

  await prisma.movieLike.create({ data: { userId, movieId: String(movieId) } });
  return NextResponse.json({ liked: true });
}
