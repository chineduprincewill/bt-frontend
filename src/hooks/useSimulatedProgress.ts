import { useState, useEffect, useRef } from 'react';

const maxProgress = 95

export default function useSimulatedProgress (isUploading: boolean) {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<number | undefined>();

  useEffect(() => {
    if (!isUploading) {
      setProgress(100);
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      const newProgress = Math.min(progress + getIncrement(progress), maxProgress);
      setProgress(newProgress);
    }, 1000); // Adjust interval for desired speed

    return () => clearInterval(intervalRef.current);
  }, [isUploading, progress]);

  const getIncrement = (currentProgress: number) => {
    // Increase slows down near maxProgress
    const slowdownFactor = 1 + (maxProgress - currentProgress) / 50;
    return Math.floor(Math.random() * 2 * slowdownFactor);
  };

  return { progress };
};
