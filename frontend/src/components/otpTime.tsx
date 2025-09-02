import { useState, useEffect } from "react";

function OtpTimer() {
  const [time, setTime] = useState(300);

  useEffect(() => {
    if (time <= 0) return;

    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000); 

    return () => clearInterval(interval);
  }, [time]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div>
      Time : {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
}

export default OtpTimer;