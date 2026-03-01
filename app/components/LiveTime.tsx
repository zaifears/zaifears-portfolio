"use client";

import { useState, useEffect } from 'react';

export default function LiveTime() {
  const [time, setTime] = useState(new Date());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const formatTwoDigits = (num: number) => num.toString().padStart(2, '0');

  let hours = time.getHours();
  const minutes = formatTwoDigits(time.getMinutes());
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;

  if (!isClient) {
    return <div className="text-zinc-400 animate-pulse">--:-- --</div>;
  }

  return (
    <div className="text-zinc-400 font-mono text-sm">
      {formatTwoDigits(hours)}:{minutes} {ampm}
    </div>
  );
}
