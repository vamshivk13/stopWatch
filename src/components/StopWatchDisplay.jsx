import { useEffect, useState } from "react";
import classes from "./StopWatchDisplay.module.css";
const StopWatchDisplay = (props) => {
  const date = new Date();
  const hrs = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds() + 1;
  const cur_time = [hrs, minutes, seconds].join(":");
  const [currentTime, setCurrentTime] = useState(cur_time);

  useEffect(() => {
    const id = setInterval(() => {
      const date = new Date();
      const hrs = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const cur_time = [hrs, minutes, seconds].join(":");
      setCurrentTime(cur_time);
    }, 1000);

    return () => {
      console.log(id);
      clearInterval(id);
    };
  }, []);

  return (
    <div className={classes.stopWatchDisplayContainer}>
      {props.mode == "CLOCK" ? (
        <div>{currentTime}</div>
      ) : (
        <div>{props.stopWatchTime}</div>
      )}
    </div>
  );
};

export default StopWatchDisplay;
