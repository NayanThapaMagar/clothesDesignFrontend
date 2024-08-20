/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./Menu.module.css";


export const Menu = (props) => {
    return (
        <div className={styles.Menu}>
            <ul className={styles.MenuContent}>
                <li><Link to="/" onClick={() => props.setMenu(false)}>Home</Link></li>
                <li><Link>About Us</Link></li>
                <li><Link to="/contactUs" onClick={() => props.setMenu(false)}>Contact Us</Link></li>
                <li><Link to="/contacts" onClick={() => props.setMenu(false)}>Contacts</Link></li>
                <li><Link to="/mail" onClick={() => props.setMenu(false)}>Mail Content</Link></li>
                <li><Link to="/spinWheelSettings" onClick={() => props.setMenu(false)}>Spin Wheel Settings</Link></li>
                {/* <li><Link to="/spinWheel" onClick={() => props.setMenu(false)}>Spin Wheel</Link></li> */}
            </ul>
        </div>
    );
}

