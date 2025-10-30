'use client';

import { useState, useEffect } from 'react';

const CountdownItem = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="text-4xl md:text-5xl font-bold font-countdown text-foreground tabular-nums">
      {String(value).padStart(2, '0')}
    </div>
    <div className="text-xs uppercase text-muted-foreground font-body">
      {label}
    </div>
  </div>
);

export default function BirthdayCountdown({ targetDate }: { targetDate: Date }) {
  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

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

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isClient, setIsClient] = useState(false);


  useEffect(() => {
    // This ensures the component only renders on the client, avoiding hydration mismatches.
    setIsClient(true);

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isClient) {
    return null; // Or a loading skeleton
  }
  
  const timerComponents = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center items-center gap-4 md:gap-8 my-8">
      {timerComponents.map(item => (
        <CountdownItem key={item.label} value={item.value} label={item.label} />
      ))}
    </div>
  );
}
