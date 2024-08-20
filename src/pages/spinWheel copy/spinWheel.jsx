/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Settings } from 'lucide-react';
import styles from "./spinWheel.module.css";
import { useNavigate } from "react-router-dom";
import CryptoJS from 'crypto-js';
import axios from "axios";

// customer decryption
const decrypt = (encryptedData, iv, key) => {
  let keyBytes = CryptoJS.enc.Hex.parse(key);
  let ivBytes = CryptoJS.enc.Hex.parse(iv);
  let encryptedBytes = CryptoJS.enc.Hex.parse(encryptedData);

  let decrypted = CryptoJS.AES.decrypt(
    { ciphertext: encryptedBytes },
    keyBytes,
    { iv: ivBytes }
  );

  return decrypted.toString(CryptoJS.enc.Utf8);
};

export const SpinWheel = () => {

  const [winningPrize, setWinningPrize] = useState(null);
  const [prizesArray, setPrizesArray] = useState([]);
  const [decryptedName, setDecryptedName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing prize data from the database
    axios.get('http://localhost:5555/spinWheelSettings/getPrizes')
      .then((res) => {
        const existingPrizes = res.data.existingPrizes.prizes;
        setPrizesArray(existingPrizes);
      })
      .catch((error) => {
        alert('Error!!! CHECK CONSOLE');
        console.log(error);
      });

    // customer decryption
    axios.get('http://localhost:5555/getEncryptionKey')
      .then((res) => {
        const keyArray = res.data.encryptionKey.key.data;
        const key = keyArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        const urlParams = new URLSearchParams(window.location.search);
        const iv = urlParams.get('iv');
        const data = urlParams.get('data');

        if (iv && data) {
          const decrypted = decrypt(data, iv, key);
          setDecryptedName(decrypted);
        }
      })
      .catch((error) => {
        alert('Error!!! CHECK CONSOLE');
        console.log({ error: error });
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

  // winning prize calculation
  let value = Math.ceil(Math.abs(Math.random()) * 3600);
  const handleSpin = () => {
    setWinningPrize(null);
    document.querySelector(`.${styles.wheel}`).style.transform = `rotate(${value}deg)`;
    const segmentAngle = 360 / prizesArray.length;
    const winningIndex = prizesArray.length - 1 - (Math.floor(((value % 360) + segmentAngle / 2) / segmentAngle)) % prizesArray.length;
    setTimeout(() => {
      setWinningPrize(prizesArray[winningIndex].prize);
    }, 5000);
    value += Math.ceil(Math.abs(Math.random()) * 3600);
  };

  return (
    <div className={styles.root}>
      <Settings className={styles.settings} onClick={() => navigate('/spinWheelSettings')} />
      <h1>Spin Wheel</h1>
      <div className={styles.customer}><span>Hello, {decryptedName}</span></div>
      <div className={styles.container}>
        <div className={styles.pointer}></div>
        <div className={styles.spinBtn} onClick={handleSpin}>spin</div>
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
      <div className={styles.prize}><span>You won: {winningPrize}</span></div>
    </div>
  );
};
