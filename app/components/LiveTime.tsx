"use client";

import { useState, useEffect } from 'react';

const chip = 'rounded-full border border-rule bg-paper-2 px-4 py-2 text-sm text-ink-2 tabular-nums';

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
    return <div className={`${chip} text-muted`}>--:-- --</div>;
  }

  return (
    <div className={chip}>
      {formatTwoDigits(hours)}:{minutes} {ampm}
    </div>
  );
}
