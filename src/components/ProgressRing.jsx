import { useMemo } from 'react';
import classNames from 'classnames';

/**
 * Componente que muestra un anillo de progreso circular animado SVG
 * @param {Object} props
 * @param {number} props.progress - Progreso actual (0-100)
 * @param {number} props.size - Tamaño del anillo en píxeles
 * @param {number} props.strokeWidth - Grosor del trazo
 * @param {string} props.stage - Etapa actual ('work', 'shortBreak', 'longBreak')
 */
export default function ProgressRing({
  progress = 0,
  size = 320,
  strokeWidth = 12,
  stage = 'work'
}) {
  // Calcular parámetros del círculo
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calcular offset para el progreso (animación inversa: desde arriba en sentido horario)
  const offset = useMemo(() => {
    return circumference - (progress / 100) * circumference;
  }, [progress, circumference]);

  // Colores según la etapa
  const colors = {
    work: 'text-primary-500',
    shortBreak: 'text-blue-400',
    longBreak: 'text-purple-400',
  };

  const bgColors = {
    work: 'text-primary-200/30',
    shortBreak: 'text-blue-200/30',
    longBreak: 'text-purple-200/30',
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        {/* Círculo de fondo (track) */}
        <circle
          className={classNames('transition-colors duration-500', bgColors[stage])}
          stroke="currentColor"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          opacity="0.3"
        />

        {/* Círculo de progreso */}
        <circle
          className={classNames(
            'transition-all duration-500 ease-linear',
            colors[stage]
          )}
          stroke="currentColor"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            filter: 'drop-shadow(0 0 8px currentColor)',
          }}
        />
      </svg>

      {/* Círculo interno decorativo */}
      <div
        className={classNames(
          'absolute inset-0 m-auto rounded-full',
          'bg-gradient-to-br from-white/10 to-transparent',
          'backdrop-blur-sm border border-white/20'
        )}
        style={{
          width: size - strokeWidth * 4,
          height: size - strokeWidth * 4,
        }}
      />
    </div>
  );
}
