/* eslint-disable react/prop-types */
// import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Menu.module.css";
// import { getImageUrl } from "../../utils";


export const Menu = (props) => {
    return (
        <div className={styles.Menu}>
            <ul className={styles.MenuContent}>
                <li><Link to="/" onClick={() => props.setMenu(false)}>Home</Link></li>
                <li><Link>About Us</Link></li>
                <li><Link to="/contactUs" onClick={() => props.setMenu(false)}>Contact Us</Link></li>
                <li><Link to="/contacts" onClick={() => props.setMenu(false)}>Contacts</Link></li>
            </ul>
        </div>
    );
}

