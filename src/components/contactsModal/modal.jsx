/* eslint-disable react/prop-types */
import { useRef } from "react";
import styles from "./modal.module.css"
import { X } from 'lucide-react';

import { useState } from "react"

import FadeLoader from "react-spinners/FadeLoader";

import axios from "axios";
import { useNavigate } from "react-router-dom"

function Modal({ name, email, onClose }) {
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const modelRef = useRef();

    const closeModal = (e) => {
        if (modelRef.current === e.target) {
            onClose();
        }
    }
    // console.log(email);

    const handleChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('Description submitted:', description);
        setLoading(true);
        const data = {
            name,
            email,
            description
        };
        axios.post('http://localhost:5555/saveCustomerDescription', data)
            .then(() => {
                setLoading(false);
                onClose();
                navigate('/contacts');
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                alert('Error! Look console')
            })
    };

    const override = {
        display: "block",
        margin: "300px",
    };

    return (
        <div ref={modelRef} onClick={closeModal} className={styles.root}>
            {
                loading ? <FadeLoader
                    color={'#0ea6e9'}
                    loading={loading}
                    cssOverride={override}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                /> : <>
                    <div className={styles.modalContainer}>
                        <div className={styles.closeBtn}>
                            <button onClick={onClose}><X size={20} /></button>
                        </div>
                        <div>
                            <form
                                onSubmit={handleSubmit}
                                className={styles.fromContainer}
                            >
                                <h2>{name}</h2>
                                <label htmlFor="description">Enter description:</label><br />
                                <textarea
                                    id="description"
                                    name="description"
                                    rows="5"
                                    cols="50"
                                    required
                                    value={description}
                                    onChange={handleChange}
                                ></textarea><br />
                                <button type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default Modal