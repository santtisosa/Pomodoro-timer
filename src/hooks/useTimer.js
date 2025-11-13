import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook personalizado para gestionar el temporizador Pomodoro
 *
 * @param {Object} config - Configuración del timer
 * @param {number} config.workDuration - Duración de trabajo en minutos
 * @param {number} config.shortBreakDuration - Duración de descanso corto en minutos
 * @param {number} config.longBreakDuration - Duración de descanso largo en minutos
 * @param {number} config.cyclesBeforeLongBreak - Ciclos antes del descanso largo
 * @param {Function} config.onFinish - Callback al terminar una etapa
 *
 * @returns {Object} Estado y controles del timer
 */
export const useTimer = ({
  workDuration = 25,
  shortBreakDuration = 5,
  longBreakDuration = 15,
  cyclesBeforeLongBreak = 4,
  onFinish
}) => {
  // Estados principales
  const [timeLeft, setTimeLeft] = useState(workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [stage, setStage] = useState('work'); // 'work' | 'shortBreak' | 'longBreak'
  const [completedCycles, setCompletedCycles] = useState(0);

  // Referencias para mantener valores entre renders
  const intervalRef = useRef(null);
  const onFinishRef = useRef(onFinish);

  // Actualizar la referencia del callback cuando cambie
  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  /**
   * Obtiene la duración total de la etapa actual en segundos
   */
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

  /**
   * Calcula el progreso actual como porcentaje (0-100)
   */
  const progress = ((getTotalDuration() - timeLeft) / getTotalDuration()) * 100;

  /**
   * Cambia a la siguiente etapa del ciclo Pomodoro
   */
  const goToNextStage = useCallback(() => {
    let nextStage;
    let newCompletedCycles = completedCycles;

    if (stage === 'work') {
      // Después del trabajo, incrementar ciclos y decidir tipo de descanso
      newCompletedCycles = completedCycles + 1;
      setCompletedCycles(newCompletedCycles);

      // Si completamos los ciclos necesarios, descanso largo; si no, corto
      nextStage = (newCompletedCycles % cyclesBeforeLongBreak === 0)
        ? 'longBreak'
        : 'shortBreak';
    } else {
      // Después de cualquier descanso, volver al trabajo
      nextStage = 'work';
    }

    setStage(nextStage);

    // Establecer tiempo según la nueva etapa
    const nextDuration = nextStage === 'work'
      ? workDuration
      : nextStage === 'shortBreak'
        ? shortBreakDuration
        : longBreakDuration;

    setTimeLeft(nextDuration * 60);
  }, [stage, completedCycles, cyclesBeforeLongBreak, workDuration, shortBreakDuration, longBreakDuration]);

  /**
   * Efecto principal del temporizador
   * Maneja el conteo regresivo y dispara eventos al finalizar
   */
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Tiempo terminado
            setIsRunning(false);

            // Disparar callback con información de la etapa completada
            if (onFinishRef.current) {
              onFinishRef.current(stage);
            }

            // Cambiar a la siguiente etapa automáticamente
            setTimeout(() => {
              goToNextStage();
            }, 100);

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    // Limpiar intervalo al desmontar o cambiar estados
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft, stage, goToNextStage]);

  /**
   * Resetear duración cuando cambian las configuraciones
   */
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(getTotalDuration());
    }
  }, [workDuration, shortBreakDuration, longBreakDuration, getTotalDuration, isRunning]);

  /**
   * Iniciar o pausar el temporizador
   */
  const toggleTimer = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  /**
   * Resetear completamente el timer
   */
  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setStage('work');
    setCompletedCycles(0);
    setTimeLeft(workDuration * 60);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [workDuration]);

  /**
   * Saltar a una etapa específica
   */
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
