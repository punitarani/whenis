"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  name: string;
  date: Date;
  local: boolean;
}

export function CountdownTimer({ name, date, local }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<ReturnType<
    typeof calculateTimeLeft
  > | null>(null);

  useEffect(() => {
    const targetDate = local ? new Date(date.toLocaleString()) : date;
    setTimeLeft(calculateTimeLeft(targetDate)); // Set initial time left on client side

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [date, local]);

  function calculateTimeLeft(targetDate: Date) {
    const now = new Date();
    const difference = +targetDate - +now;
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  if (!timeLeft) {
    return null; // Render nothing on the server
  }

  return (
    <div className="mt-4 text-center">
      <h2 className="text-2xl font-bold">Countdown to {name}</h2>
      <div className="mt-2 flex justify-center space-x-4">
        <div className="flex flex-col items-center">
          <span className="text-4xl">{timeLeft.days}</span>
          <span>Days</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-4xl">{timeLeft.hours}</span>
          <span>Hours</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-4xl">{timeLeft.minutes}</span>
          <span>Minutes</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-4xl">{timeLeft.seconds}</span>
          <span>Seconds</span>
        </div>
      </div>
    </div>
  );
}
