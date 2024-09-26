import { useState } from 'react';
import '../assets/styles/timer.css';

export const Timer = () => {
  const [time, setTime] = useState(0.0);
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isInterval, setIsInterval] = useState<void | number>();

  const doStart = () => {
    setIsStarted(!isStarted);
    setIsPaused(false);
    if (!isStarted) {
      setIsInterval(
        setInterval(() => {
          setTime((p) => +Number(p + 0.01).toFixed(2));
        }, 100)
      );
    }
  };

  const doPause = () => {
    setIsPaused(!isPaused);
    setIsStarted(false);
    if (isInterval) {
      setIsInterval(clearInterval(isInterval));
    }
  };

  const doReset = () => {
    setTime(0.0);
    isInterval && setIsInterval(clearInterval(isInterval));
    setIsStarted(false);
    setIsPaused(false);
  };

  return (
    <div className="card">
      <h1>Timer Problem</h1>
      <p>
        create a page where we have 3 buttons , start, pause and reset, when user click on start, it should start the timer and increase by
        1 and when we pause, it should pause and if again click on start then it resume again.
      </p>
      <section className="section">
        <div className="btn-group">
          <button onClick={doStart}>start</button>
          <button onClick={doReset}>reset</button>
          <button onClick={doPause}>pause</button>
        </div>
        <div className="result">
          Time is <span>{time}</span>
        </div>
      </section>
    </div>
  );
};
