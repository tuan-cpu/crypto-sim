import React, { useEffect, useState } from "react";

//INTERNAL IMPORT
import Style from "./Timer.module.css";

interface Props {
  timestamp: number;
}

const Timer: React.FC<Props> = ({ timestamp }) => {
  const [timeLeft, setTimeLeft] = useState<any>({});
  useEffect(() => {
    const calculateTimeLeft = () => {
      const date = new Date(timestamp*1000);
      let difference = date?.getTime() - Date.now();

      let timeLeft = {};

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return timeLeft;
    };
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft() || 0);
    }, 1000);
    return () => clearTimeout(timer);
  });
  const timerComponents: any[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });
  return (
    <div className={Style.timer}>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <div>
          <p>AUCTION END!</p>
        </div>
      )}
    </div>
  );
};

export default Timer;
