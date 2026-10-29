"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LikesContext = createContext(null);

export const LikesProvider = ({ children }) => {
  const { status } = useSession();
  const router = useRouter();
  const [likedIds, setLikedIds] = useState(() => new Set());

  // Charge une seule fois la liste des likes quand l'utilisateur est connecté
  useEffect(() => {
    if (status !== "authenticated") return;

    const controller = new AbortController();
    fetch("/api/likes", { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : { movieIds: [] }))
      .then(({ movieIds }) => setLikedIds(new Set(movieIds)))
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      });

    return () => controller.abort();
  }, [status]);

  const toggleLike = useCallback(
    async (movieId) => {
      const id = String(movieId);
      const update = (liked) =>
        setLikedIds((prev) => {
          const next = new Set(prev);
          if (liked) next.add(id);
          else next.delete(id);
          return next;
        });

      // Mise à jour immédiate de l'affichage, annulée si le serveur refuse
      const wasLiked = likedIds.has(id);
      update(!wasLiked);

      const res = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movieId: id }),
      });

      if (!res.ok) {
        update(wasLiked);
        return;
      }

      // Met à jour les composants serveur de la page (ex. la liste du profil)
      router.refresh();
    },
    [likedIds, router]
  );

  return (
    <LikesContext.Provider value={{ likedIds, toggleLike, isAuthenticated: status === "authenticated" }}>
      {children}
    </LikesContext.Provider>
  );
};

export const useLikes = () => useContext(LikesContext);
