"use client"

import { notFound, useParams, useSelectedLayoutSegment } from "next/navigation";
import styles from "./searchSideBar.module.scss"
import Form from "./Form/Form";

export default function SearchSideBar({genres}) {
    const segment = useSelectedLayoutSegment(); 
    const {id} = useParams();

    const getSideBarTitle = () => {
        if (!segment) {
            return "Film"
        }

        const genre = genres.find((g) => g.id == Number(id));
        if (!genre) {
            return notFound();
        }

        return genre.name;
    }
    const title = getSideBarTitle();

    return (
        <div className={styles.sideBar}>
            <h1>Tous les &quot;{title}&quot;</h1>
            <Form />
        </div>
    );
}