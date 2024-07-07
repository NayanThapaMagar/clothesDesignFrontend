/* eslint-disable react/prop-types */
import { useRef } from "react";
import styles from "./modal.module.css"
import { X } from 'lucide-react';

function Modal({ name, email, onClose }) {
    const modelRef = useRef();

    const closeModal = (e) => {
        if (modelRef.current === e.target) {
            onClose();
        }
    }
    console.log(email);
    return (
        <div ref={modelRef} onClick={closeModal} className={styles.root}>
            <div className={styles.modalContainer}>
                <div className={styles.closeBtn}>
                    <button onClick={onClose}><X size={20} /></button>
                </div>
                <div>
                    <form
                        // onSubmit={handleSubmit}
                        className={styles.fromContainer}
                    >
                        <h2>{name}</h2>
                        <label htmlFor="description">Enter description:</label><br />
                        <textarea
                            id="description"
                            name="description"
                            rows="5"
                            cols="50"
                        // value={description}
                        // onChange={handleChange}
                        ></textarea><br />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Modal