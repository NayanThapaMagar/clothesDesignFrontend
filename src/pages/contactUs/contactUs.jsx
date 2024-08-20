// import React from 'react'
import { useState } from "react"
import styles from "./contactUs.module.css"

import axios from "axios"
import { useNavigate } from "react-router-dom"
import FadeLoader from "react-spinners/FadeLoader";

export const ContactUs = () => {
    const [name, setName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [email, setEmail] = useState('');
    const [design, setDesign] = useState('Design1');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSaveContactUs = (event) => {
        event.preventDefault();
        const data = {
            name,
            phoneNo,
            email,
            design,
        };
        setLoading(true)
        axios.post('http://localhost:5555/contactUs', data)
            .then(() => {
                setLoading(false);
                navigate('/contacts');
            })
            .catch((error) => {
                setLoading(false);
                alert('Error!!! CHECK CONSOLE');
                console.log(error);
            })
    }

    const override = {
        display: "block",
        margin: "300px",
    };

    return (
        <div className={styles.root}>
            {
                loading ? <FadeLoader
                    color={'#0ea6e9'}
                    loading={loading}
                    cssOverride={override}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                /> : <>
                    <h1>Contact Us</h1>
                    <form onSubmit={handleSaveContactUs} className={styles.fromContainer}>

                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <label htmlFor="phoneNo">Phone No.</label>
                        <input
                            type="number"
                            value={phoneNo}
                            onChange={(e) => setPhoneNo(e.target.value)}
                            required
                        />

                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <label htmlFor="design">Select a Design</label>
                        <select
                            value={design}
                            onChange={(e) => setDesign(e.target.value)}
                            required
                        >
                            <option value="Design1">Design1</option>
                            <option value="Design2">Design2</option>
                            <option value="Design3">Design3</option>
                        </select>

                        <button type="submit">Submit</button>
                    </form>
                </>
            }
        </div >
    )
}
