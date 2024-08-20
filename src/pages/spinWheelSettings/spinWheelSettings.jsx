import { useEffect, useState } from "react";
import styles from "./spinWheelSettings.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SpinWheelSettings = () => {
  const navigate = useNavigate();
  const [prizesArray, setPrizesArray] = useState([]);

  useEffect(() => {
    // Fetch existing prize data from the database
    axios.get('http://localhost:5555/spinWheelSettings/getPrizes')
      .then((res) => {
        if (res.data.existingPrizes) {
          const existingPrizes = res.data.existingPrizes.prizes;
          setPrizesArray(existingPrizes);
        } else {
          const additionalPrizes = Array(4).fill({ prize: '', color: '#000000' });
          setPrizesArray([...additionalPrizes]);
        }
      })
      .catch((error) => {
        alert('Error!!! CHECK CONSOLE');
        console.log(error);
      });
  }, []);

  const handlePrizeChange = (index, field, value) => {
    const newPrizesArray = prizesArray.map((prize, i) => (
      i === index ? { ...prize, [field]: value } : prize
    ));
    setPrizesArray(newPrizesArray);
  };

  const addPrizeField = () => {
    if (prizesArray.length < 16) {
      setPrizesArray([...prizesArray, { prize: '', color: '#000000' }]);
    }
  };

  const removePrizeField = (index) => {
    if (prizesArray.length > 4) {
      setPrizesArray(prizesArray.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      prizesArray: prizesArray
    }
    axios.post('http://localhost:5555/spinWheelSettings/savePrizes', data)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        alert('Error!!! CHECK CONSOLE');
        console.log(error);
      });
  };

  return (
    <div className={styles.root}>
      <h1>Spin Wheel Settings</h1>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.headerRow}>
          <label>Prize</label>
          <label>Color</label>
        </div>
        {prizesArray.map((prize, index) => (
          <div key={index} className={styles.prizeContainer}>
            <input
              type="text"
              id={`prize-${index}`}
              value={prize.prize}
              onChange={(e) => handlePrizeChange(index, 'prize', e.target.value)}
              required
            />
            <input
              type="color"
              id={`color-${index}`}
              value={prize.color}
              onChange={(e) => handlePrizeChange(index, 'color', e.target.value)}
              required
            />
            {prizesArray.length > 4 && (
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => removePrizeField(index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        {prizesArray.length < 16 && (
          <button
            type="button"
            className={styles.addButton}
            onClick={addPrizeField}
          >
            Add Prize
          </button>
        )}
        <br />
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};
