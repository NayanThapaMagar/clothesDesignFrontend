import { useState, useEffect } from "react";
import { Settings } from 'lucide-react';
import styles from "./spinWheel.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const SpinWheel = () => {

  const [winningPrize, setWinningPrize] = useState(null);
  const [prizesArray, setPrizesArray] = useState([]);
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
  }, []);

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
