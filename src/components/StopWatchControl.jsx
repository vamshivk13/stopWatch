import { useEffect, useState } from "react";
import classes from "./StopWatchControl.module.css";
const StopWatchControl = ({ mode, isStart, setIsStart, ...props }) => {
  const [active, setActive] = useState(false);

  function StopWatchControl() {
    if (isStart) {
      setIsStart((prev) => !prev);
      props.onStart();
    } else {
      setIsStart((prev) => !prev);
      props.onPause();
    }
  }
  useEffect(() => {
    setTimeout(() => {
      setActive(true);
    }, 10);
  });

  return (
    <div className={`${classes.stopWatchControl} ${active && classes.visible}`}>
      <div onClick={StopWatchControl}>
        {isStart ? <p>start</p> : <p>pause</p>}
      </div>
      <div onClick={props.onReset}>
        <p>reset</p>
      </div>
    </div>
  );
};

export default StopWatchControl;
