import { useReducer } from 'react';
import '../assets/styles/timer.css';

const initialState = {
  time: 0.0,
  isStarted: false,
  isPaused: false,
  intervalId: null,
};

function timerReducer(state, action) {
  switch (action.type) {
    case 'START':
      return {
        ...state,
        isStarted: true,
        isPaused: false,
        intervalId: action.intervalId,
      };
    case 'PAUSE':
      if (state.intervalId) {
        clearInterval(state.intervalId);
      }
      return {
        ...state,
        isStarted: false,
        isPaused: true,
        intervalId: null,
      };
    case 'RESET':
      if (state.intervalId) {
        clearInterval(state.intervalId);
      }
      return {
        ...initialState,
      };
    case 'RESUME': {
      return {
        ...state,
        isPaused: false,
        isStarted: true,
        intervalId: action.intervalId,
      };
    }
    case 'TICK':
      return {
        ...state,
        time: +Number(state.time + 0.01).toFixed(2),
      };
    default:
      return state;
  }
}

const Timer = () => {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  const doStart = () => {
    if (state.isPaused) {
      // Resume the timer
      const intervalId = setInterval(() => {
        dispatch({ type: 'TICK' });
      }, 100);
      dispatch({ type: 'RESUME', intervalId });
    } else if (!state.isStarted) {
      // Start the timer
      const intervalId = setInterval(() => {
        dispatch({ type: 'TICK' });
      }, 100);
      dispatch({ type: 'START', intervalId });
    }
  };


  return (
    <div className="card">
      <h1>Timer Problem</h1>
      <p>
        create a page where we have 3 buttons, start, pause and reset. When the user clicks on start, it should start the timer and increase by 0.01. When paused, it should pause and resume when clicked again.
      </p>
      <section className="section">
        <div className="btn-group">
          <button onClick={doStart}> {state.isPaused ? 'resume' : 'start'}</button>
          <button onClick={() => dispatch({ type: 'RESET' })}>reset</button>
          <button onClick={() => dispatch({ type: 'PAUSE' })}>pause</button>
        </div>
        <div className="result">
          Time is <span>{state.time}</span>
        </div>
      </section >
    </div >
  );
};

export { Timer };
