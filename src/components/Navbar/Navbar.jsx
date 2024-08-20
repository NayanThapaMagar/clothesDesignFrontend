import styles from "./Navbar.module.css";
import { getImageUrl } from "../../utils";
import { Menu } from "./Menu";
import { Account } from "./Account";
import { useState } from "react";

export const Navbar = () => {
    const [menu, setMenu] = useState(false)
    const [account, setAccount] = useState(false)


    return (
        <nav className={styles.Navbar}>
            <div className={styles.icons}>
                <div className={styles.menuIcon} onClick={() => {
                    setMenu(!menu)
                    setAccount(false)
                }}>
                    {
                        !menu ? <img src={getImageUrl("nav/menuIcon.png")} alt="menuIcon" /> : <img src={getImageUrl("nav/closeIcon.png")} alt="closeIcon" />
                    }

                </div>
            </div>
            {
                menu ? <Menu setMenu={setMenu} /> : null
            }
            {
                account ? <Account /> : null
            }
        </nav>
    )
}


