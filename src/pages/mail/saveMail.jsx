/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react"
import styles from "./saveMail.module.css"

import axios from "axios"
import { useNavigate } from "react-router-dom"
import FadeLoader from "react-spinners/FadeLoader";

export const SaveMail = () => {
    const [subject, setSubject] = useState('');
    const [title, setTitle] = useState('');
    const [compalyName, setCompalyName] = useState('');
    const [body, setBody] = useState('');
    const [remarks, setRemarks] = useState('');
    const [image, setImage] = useState();
    const [loading, setLoading] = useState(false);

    function getImage(image) {
        var label = document.getElementById('uploadImageLabel');
        label.textContent = image.name;
    }

    const navigate = useNavigate();

    const handleSaveMail = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('subject', subject);
        formData.append('title', title);
        formData.append('compalyName', compalyName);
        formData.append('body', body);
        formData.append('remarks', remarks);

        setLoading(true)
        axios.post('http://localhost:5555/saveMail', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(() => {
                setLoading(false);
                navigate('/');
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
                    <h1>Mail Content</h1>
                    <form onSubmit={handleSaveMail} className={styles.fromContainer}>

                        <label htmlFor="subject">Subject</label>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                        />

                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />

                        <label htmlFor="compalyName">Compaly Name</label>
                        <input
                            type="text"
                            value={compalyName}
                            onChange={(e) => setCompalyName(e.target.value)}
                            required
                        />

                        <label htmlFor="body">Body</label>
                        <input
                            type="text"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            required
                        />

                        <label htmlFor="remarks">Remarks</label>
                        <input
                            type="text"
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            required
                        />

                        <label htmlFor="image">Image</label>
                        <input
                            type='file'
                            onChange={(e) => {
                                setImage(e.target.files[0]);
                                getImage(e.target.files[0]);
                            }}
                            required
                            name="image"
                            accept="image/*"
                            id="imgUpload"
                        />
                        <label htmlFor="imgUpload" className={styles.imageInput} id="uploadImageLabel">Choose a Photo</label>

                        <button type="submit">Submit</button>
                    </form>
                </>
            }
        </div >
    )
}
