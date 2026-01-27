import { useRef, useState } from "react";

export const Timer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<number|null>(null);

  const start = () => {
    if (intervalRef.current !== null) return; // prevent double start

    intervalRef.current = setInterval(() => {
      setTime((t) => +(t + 0.01).toFixed(2));
    }, 100);

    setIsRunning(true);
    setIsPaused(false);
  };

  const pause = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
    setIsPaused(true);
  };

  const reset = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
    setIsPaused(false);
    setTime(0);
  };

  return (
    <div className="card">
      <h1>Timer</h1>

      <div className="btn-group">
        <button onClick={start}>{isRunning ? "running" : (isPaused ? "resume" : "start")}</button>
        <button onClick={pause}>pause</button>
        <button onClick={reset}>reset</button>
      </div>

      <div className="result">
        Time is <span>{time}</span>
      </div>
    </div>
  );
}
