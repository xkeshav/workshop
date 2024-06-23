import { useState } from 'react';


export const Timer = () => {

    const [time, setTime] = useState(0.00);
    const [isStarted, setIsStarted] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isInterval, setIsInterval] = useState<void|number>();

    const doStart = () => {
        setIsStarted(!isStarted);
        setIsPaused(false);
        if(!isStarted) {
            setIsInterval(setInterval(() => {
                setTime(p => p + 0.01);
            }, 100));
        }
    }

    const doPause = () => {
        setIsPaused(!isPaused);
        setIsStarted(false);
        if(isInterval) {
            setIsInterval(clearInterval(isInterval));
        }
    }

    const doReset = () => {
        setTime(0.00);
        isInterval && setIsInterval(clearInterval(isInterval));
        setIsStarted(false);
        setIsPaused(false);
    }

    return (
        <div className="card">
            <h1>Timer Problem</h1>
            <button onClick={doStart}>start</button>
            <button onClick={doReset}>reset</button>
            <button onClick={doPause}>pause</button>
            <div className="result">
                Time is <span>{time}</span>
            </div>
        </div>
    );
}