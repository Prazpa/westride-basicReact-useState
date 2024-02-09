import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(new Date());
  const [userInput, setUserInput] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
    setIsValid(true);
  };

  const getCountdown = (targetDate) => {
    let now = new Date().getTime();
    let timeCount = targetDate - now;

    if (timeCount < 0) {
      const nextYear = new Date().getFullYear() + 1;
      targetDate = new Date(nextYear + '-01-01T00:00:00');
      timeCount = targetDate - now;
    }

    let days = Math.floor(timeCount / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeCount % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeCount % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeCount % (1000 * 60)) / 1000);
    return [days, hours, minutes, seconds];
  };

  useEffect(() => {
    const intervalTask = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(intervalTask);
  }, []);

  const isValidDate = (input) => {
    const pattern = /^\d{4}-\d{2}-\d{2}$/;
    return pattern.test(input);
  };

  const handleSubmit = () => {
    if (isValidDate(userInput)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const [days, hours, minutes, seconds] = getCountdown(isValid ? new Date(userInput + 'T23:59:59') : new Date());

  return (
    <div className='container'>
      <h1>Countdown to my birthday</h1>
      <div className='insertdate'>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Enter your birth date (yyyy-mm-dd)"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>        
      {!isValid && <p style={{ color: 'red' }}>Invalid date format. Please enter in yyyy-mm-dd format.</p>}

      <div className='current'>
        <p>Current Time: {time.toLocaleString()}</p>
      </div>
      <div className='remains'>
        <span>{days} days</span>
        <span>{hours} hours</span>
        <span>{minutes} minutes</span>
        <span>{seconds} seconds</span>
      </div>
    </div>
  );
}

export default App;
