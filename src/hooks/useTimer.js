import { useState, useEffect, useRef, useCallback } from 'react';

// Hook personalizado para gestionar el temporizador Pomodoro
export const useTimer = ({
  workDuration = 25,
  shortBreakDuration = 5,
  longBreakDuration = 15,
  cyclesBeforeLongBreak = 4,
  onFinish
}) => {
  const [timeLeft, setTimeLeft] = useState(workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [stage, setStage] = useState('work');
  const [completedCycles, setCompletedCycles] = useState(0);

  const intervalRef = useRef(null);
  const onFinishRef = useRef(onFinish);

  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  const getTotalDuration = useCallback(() => {
    switch (stage) {
      case 'work':
        return workDuration * 60;
      case 'shortBreak':
        return shortBreakDuration * 60;
      case 'longBreak':
        return longBreakDuration * 60;
      default:
        return workDuration * 60;
    }
  }, [stage, workDuration, shortBreakDuration, longBreakDuration]);

  const progress = ((getTotalDuration() - timeLeft) / getTotalDuration()) * 100;

  const goToNextStage = useCallback(() => {
    let nextStage;
    let newCompletedCycles = completedCycles;

    if (stage === 'work') {
      newCompletedCycles = completedCycles + 1;
      setCompletedCycles(newCompletedCycles);

      nextStage = (newCompletedCycles % cyclesBeforeLongBreak === 0)
        ? 'longBreak'
        : 'shortBreak';
    } else {
      nextStage = 'work';
    }

    setStage(nextStage);

    const nextDuration = nextStage === 'work'
      ? workDuration
      : nextStage === 'shortBreak'
        ? shortBreakDuration
        : longBreakDuration;

    setTimeLeft(nextDuration * 60);
  }, [stage, completedCycles, cyclesBeforeLongBreak, workDuration, shortBreakDuration, longBreakDuration]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);

            if (onFinishRef.current) {
              onFinishRef.current(stage);
            }

            setTimeout(() => {
              goToNextStage();
            }, 100);

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft, stage, goToNextStage]);

  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(getTotalDuration());
    }
  }, [workDuration, shortBreakDuration, longBreakDuration, getTotalDuration, isRunning]);

  const toggleTimer = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setStage('work');
    setCompletedCycles(0);
    setTimeLeft(workDuration * 60);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [workDuration]);

  const skipToStage = useCallback((newStage) => {
    setIsRunning(false);
    setStage(newStage);

    const duration = newStage === 'work'
      ? workDuration
      : newStage === 'shortBreak'
        ? shortBreakDuration
        : longBreakDuration;

    setTimeLeft(duration * 60);
  }, [workDuration, shortBreakDuration, longBreakDuration]);

  return {
    timeLeft,
    isRunning,
    stage,
    completedCycles,
    progress,
    totalDuration: getTotalDuration(),
    toggleTimer,
    resetTimer,
    skipToStage,
  };
};
