import styles from "./settings.module.css";

export const Settings = () => {

    const baseImgUrl = "https://res.cloudinary.com/dkkgmzpqd/image/upload/v1545217305/T-shirt%20Images/"
    return (
        <section>
            <h2>Settings</h2>
            <div className={styles.settingsContainer}>
                <div className={styles.colorOptions}>
                    <img
                        className={styles.colorOption}
                        src={`${baseImgUrl}blue`}
                        alt="img Tshirt"
                    />
                    <img
                        className={styles.colorOption}
                        src={`${baseImgUrl}black`}
                        alt="img Tshirt"
                    />
                    <img
                        className={styles.colorOption}
                        src={`${baseImgUrl}red`}
                        alt="img Tshirt"
                    />
                    <img
                        className={styles.colorOption}
                        src={`${baseImgUrl}white`}
                        alt="img Tshirt"
                    />
                </div>
            </div>
        </section>
    )
}


