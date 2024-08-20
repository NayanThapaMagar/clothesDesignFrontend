/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import styles from "./spinWheel.module.css";
import CryptoJS from 'crypto-js';
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";
import { createFileName, useScreenshot } from 'use-react-screenshot';

export const SpinWheel = () => {
  const [winningPrize, setWinningPrize] = useState(null);
  const [prizesArray, setPrizesArray] = useState([]);
  const [decryptedName, setDecryptedName] = useState('');
  const [loading, setLoading] = useState(false);

  const { iv, data } = useParams();

  // customer decryption
  const decrypt = (encryptedData, iv, key) => {
    try {
      let keyBytes = CryptoJS.enc.Hex.parse(key);
      let ivBytes = CryptoJS.enc.Hex.parse(iv);
      let encryptedBytes = CryptoJS.enc.Hex.parse(encryptedData);

      let decrypted = CryptoJS.AES.decrypt(
        { ciphertext: encryptedBytes },
        keyBytes,
        { iv: ivBytes }
      );

      let decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

      return decryptedText ? decryptedText : null;
    } catch (error) {
      return null;
    }
  };


  useEffect(() => {
    setLoading(true);
    // customer decryption
    axios.get('http://localhost:5555/getEncryptionKey')
      .then((res) => {
        const keyArray = res.data.encryptionKey.key.data;
        const key = keyArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

        const decrypted = decrypt(data, iv, key);
        setDecryptedName(decrypted);

        // checking if customer already played game
        axios.get(`http://localhost:5555/getWinnerPrize/${iv}`)
          .then((res) => {
            const prizeWon = res.data.prizeWon;
            if (prizeWon) {
              setWinningPrize(prizeWon);
            }

            // Fetch existing prize data from the database
            axios.get('http://localhost:5555/spinWheelSettings/getPrizes')
              .then((res) => {
                setLoading(false);
                const existingPrizes = res.data.existingPrizes.prizes;
                setPrizesArray(existingPrizes);
              })
              .catch((error) => {
                alert('Error!!! CHECK CONSOLE');
                setLoading(false);
                console.log(error);
              });
          })
          .catch((error) => {
            alert('Error!!! CHECK CONSOLE');
            setLoading(false);
            console.log({ error });
          });
      })
      .catch((error) => {
        alert('Error!!! CHECK CONSOLE');
        setLoading(false);
        console.log({ error });
      });

  }, []);

  // to adjust prizes to start position
  function clipCorodinate(x) {
    const lookupTable = {
      4: 100,
      5: 85,
      6: 74,
      7: 65,
      8: 59,
      9: 54,
      10: 49,
      11: 46,
      12: 43,
      13: 40,
      14: 38,
      15: 35,
      16: 33.5
    };

    return lookupTable[x] || null;
  }

  let value = Math.ceil(Math.abs(Math.random()) * 3600);
  const handleSpin = () => {
    // winning prize calculation
    setWinningPrize(null);
    document.querySelector(`.${styles.wheel}`).style.transform = `rotate(${value}deg)`;
    const segmentAngle = 360 / prizesArray.length;
    const winningIndex = prizesArray.length - 1 - (Math.floor(((value % 360) + segmentAngle / 2) / segmentAngle)) % prizesArray.length;
    setTimeout(() => {
      setWinningPrize(prizesArray[winningIndex].prize);
    }, 5000);
    value += Math.ceil(Math.abs(Math.random()) * 3600);

    // setting winner and his prize
    const data = {
      iv,
      winningPrize: prizesArray[winningIndex].prize,
    };
    axios.post('http://localhost:5555/setWinnerPrize', data)
      .then()
      .catch((error) => {
        alert('Error!!! CHECK CONSOLE');
        console.log(error);
      });
  };

  // to take screenshot
  const ref = useRef(null);

  const [, takeScreenshot] = useScreenshot({
    type: 'image/png',
    quality: 1.0
  });

  const download = (image, { name = 'prize', extension = 'png' } = {}) => {
    const a = document.createElement('a');
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = () => {
    takeScreenshot(ref.current).then(image => download(image));
  };

  // loading
  const override = {
    display: "block",
    margin: "300px",
  };

  return (
    <div className={styles.root}>
      {loading ? (
        <FadeLoader
          color={'#0ea6e9'}
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <>
          {decryptedName ? (
            winningPrize ? (
              <div className={styles.screenShotContent}>
                <div ref={ref} className={styles.congrulationsMsg}>
                  <div className={styles.prizeWon}>
                    {decryptedName} you won {winningPrize}
                  </div>
                  <br />
                  <span className={styles.message}>
                    Take Screenshot and send it to email clothesdesign733@gmail.com to collect your prize
                  </span>
                </div>
                <button className={styles.screenShotButton} onClick={downloadScreenshot}>
                  Capture Screenshot
                </button>
              </div>
            ) : (
              <>
                <h1>Spin Wheel</h1>
                <div className={styles.customer}>
                  <span>Hello, {decryptedName}</span>
                </div>
                <div className={styles.container}>
                  <div className={styles.pointer}></div>
                  <div className={styles.spinBtn} onClick={handleSpin}>
                    spin
                  </div>
                  <div className={styles.wheel}>
                    {prizesArray.map((wheelPrize, index) => (
                      <div
                        key={index}
                        className={styles.segment}
                        style={{
                          '--i': index + 1,
                          '--num-prizes': prizesArray.length,
                          '--clipCorodinate': clipCorodinate(prizesArray.length),
                          '--clr': wheelPrize.color
                        }}
                      >
                        <span>{wheelPrize.prize}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.text}>
                  <span>Play to win exciting prizes</span>
                </div>
              </>
            )
          ) : (
            <div className={styles.expiryMsg}>
              <span className={styles.message1}>Sorry!!!</span>
              <br />
              <span className={styles.message2}>Your session has expired</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};
