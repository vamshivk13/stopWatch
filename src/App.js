import { useRef, useState } from "react";
import StopWatchControl from "./components/StopWatchControl";
import StopWatchDisplay from "./components/StopWatchDisplay";
import classes from "./index.module.css";

export default function App() {
  const min = useRef(0);
  const sec = useRef(0);
  const hr = useRef(0);
  const [stopWatchTime, setStopWatchTime] = useState(
    [hr.current, min.current, sec.current].join(":")
  );
  const [isStart, setIsStart] = useState(true);
  const [mode, setMode] = useState("CLOCK");
  const idRef = useRef(null);
  function startStopWatch() {
    const id = setInterval(() => {
      if (sec.current == 59) {
        min.current++;
        sec.current = 0;
      } else {
        sec.current++;
      }
      if (min.current == 59) {
        hr.current++;
        min.current = 0;
      }
      setStopWatchTime([hr.current, min.current, sec.current].join(":"));
    }, 1000);
    idRef.current = id;
  }

  function PauseStopWatch() {
    clearInterval(idRef.current);
  }
  function resetStopWatch() {
    clearInterval(idRef.current);
    min.current = 0;
    sec.current = 0;
    hr.current = 0;
    setStopWatchTime([hr.current, min.current, sec.current].join(":"));
    setIsStart(true);
  }

  return (
    <div className={classes.stopWatchContainer}>
      <div className={classes.topheader}>
        <nav className={classes.nav}>
          <ul className={classes.navList}>
            <li
              onClick={() => setMode("CLOCK")}
              className={`${classes.listItem} ${
                mode == "CLOCK" && classes.active
              }`}
            >
              clock
            </li>
            <li
              onClick={() => setMode("STOPWATCH")}
              className={`${classes.listItem} ${
                mode == "STOPWATCH" && classes.active
              }`}
            >
              stopwatch
            </li>
          </ul>
        </nav>
      </div>
      <StopWatchDisplay mode={mode} stopWatchTime={stopWatchTime} />
      {mode == "STOPWATCH" && (
        <StopWatchControl
          mode={mode}
          isStart={isStart}
          setIsStart={setIsStart}
          onReset={resetStopWatch}
          onStart={startStopWatch}
          onPause={PauseStopWatch}
        />
      )}
    </div>
  );
}
