import React from "react";
import { useState } from "react";

export const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(0);

  return (
    <div>
      <h2>Timer: {seconds} s</h2>
      <button
        onClick={function () {
          setInterval(() => {
            setSeconds((prev) => prev + 1);
          }, 1000);
        }}
      >
        Start
      </button>
    </div>
  );
};

export const Clock: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date());

  setInterval(() => {
    setTime(new Date());
  }, 1000);

  return <div>Current time: {time.toLocaleString()}</div>;
};
