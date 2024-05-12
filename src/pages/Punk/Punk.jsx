// import { useState } from 'react'
import { Link } from "react-router-dom";
import styles from "./Punk.module.css";

export const Punk = () => {

    return (
        <section className={styles.root}>
            <div className={styles.title}>
                <Link to="/">
                    <h1>
                        PUNK
                    </h1>
                </Link>
            </div>
            <div className={styles.buttons}>
                <Link to="/Design1" className={styles.button1}>
                    Create T-Shirt
                </Link>
                <Link to="/Design2" className={styles.button2}>
                    Sports Ware
                </Link>
                <Link to="/Design3" className={styles.button3}>
                    Punk Clothings
                </Link>
            </div>
        </section>
    )
}


