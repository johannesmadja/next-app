import { Suspense } from "react";
import LogoutButton from "@/components/auth/logoutButton/LogoutButton";
import LikedMovies from "@/components/media/likes/LikedMovies";
import Loading from "@/components/ui/loading/Loading";
import styles from "./page.module.scss";

const ProfilePage = () => {
  return (
    <div className={styles.profile}>
      <h1>Vous êtes connecté</h1>
      <LogoutButton />
      <Suspense fallback={<Loading />}>
        <LikedMovies />
      </Suspense>
    </div>
  );
};

export default ProfilePage;
