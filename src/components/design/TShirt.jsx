import styles from "./TShirt.module.css";
import { Settings } from "./settings";

export const TShirt = () => {

    return (
        <section>
            <h1>PUNK</h1>
            <div className={styles.card}>
                <div className={styles.imgTshirt}>
                    <img
                        className={styles.img_responsive}
                        src="https://res.cloudinary.com/dkkgmzpqd/image/upload/v1545217305/T-shirt%20Images/black.png"
                        alt="img Tshirt"
                    />
                </div>
                <div className={styles.memeText}>
                    <p>
                        LOGO
                    </p>
                </div>
            </div>
            <Settings />
        </section>
    )
}


