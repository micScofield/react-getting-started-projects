import React, { useEffect, useState } from 'react';
import Button from './common/button/Button';

function Timer() {
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(false);
  const [timerStartValue, setTimerStartValue] = useState(10);

  useEffect(() => {
    setCount(timerStartValue);
  }, [timerStartValue]);

  useEffect(() => {
    console.log('effect invoked');
    let interval;
    if (start) {
      interval = setInterval(() => {
        if (count - 1 < 0) {
          alert('You have reached 0');
          return;
        }
        setCount((count) => count - 1);
      }, 1000);
    }
    return () => {
      console.log('return invoked');
      clearInterval(interval);
    };
  }, [start]);

  const startHandler = () => {
    setStart((start) => !start);
  };

  const resetHandler = () => {
    setCount(timerStartValue);
    setStart(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div>
        <label>Enter timer value to begin countdown: </label>
        <input
          type='number'
          value={timerStartValue}
          onChange={(e) => setTimerStartValue(e.target.value)}
        />
      </div>
      <h2 style={{ textAlign: 'center' }}>Countdown: {count}</h2>
      <div style={{ marginBottom: '2rem' }}></div>
      <div>
        {!start ? (
          <Button text='Start' onClick={startHandler} />
        ) : (
          <Button text='Pause' onClick={startHandler} />
        )}
        <Button text='Reset' onClick={resetHandler} />
      </div>
    </div>
  );
}

export default Timer;
