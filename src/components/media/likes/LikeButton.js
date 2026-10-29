"use client";

import { Heart } from "lucide-react";
import { signIn } from "next-auth/react";
import { useLikes } from "./LikesProvider";
import styles from "./LikeButton.module.scss";

const LikeButton = ({ movieId }) => {
  const { likedIds, toggleLike, isAuthenticated } = useLikes();
  const isLiked = likedIds.has(String(movieId));

  const handleClick = () => {
    if (!isAuthenticated) {
      signIn();
      return;
    }
    toggleLike(movieId);
  };

  return (
    <button
      type="button"
      className={`${styles.likeButton} ${isLiked ? styles.liked : ""}`}
      onClick={handleClick}
      aria-pressed={isLiked}
      aria-label={isLiked ? "Retirer des films aimés" : "Aimer ce film"}
    >
      <Heart size={20} />
    </button>
  );
};

export default LikeButton;
