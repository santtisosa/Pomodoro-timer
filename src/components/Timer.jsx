import classNames from 'classnames';
import ProgressRing from './ProgressRing';

/**
 * Componente que muestra el temporizador principal con el tiempo restante
 * @param {Object} props
 * @param {number} props.timeLeft - Segundos restantes
 * @param {number} props.progress - Progreso (0-100)
 * @param {string} props.stage - Etapa actual
 * @param {number} props.completedCycles - Ciclos completados
 */
export default function Timer({ timeLeft, progress, stage, completedCycles }) {
  // Formatear tiempo en MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Nombres de etapas para mostrar
  const stageNames = {
    work: 'Trabajo',
    shortBreak: 'Descanso Corto',
    longBreak: 'Descanso Largo',
  };

  // Colores de texto según etapa
  const stageColors = {
    work: 'text-primary-400',
    shortBreak: 'text-blue-400',
    longBreak: 'text-purple-400',
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {/* Indicador de etapa y ciclos */}
      <div className="text-center space-y-2">
        <h2 className={classNames(
          'text-2xl md:text-3xl font-semibold transition-colors duration-500',
          stageColors[stage]
        )}>
          {stageNames[stage]}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Ciclos completados: <span className="font-semibold">{completedCycles}</span>
        </p>
      </div>

      {/* Anillo de progreso con tiempo en el centro */}
      <div className="relative">
        <ProgressRing progress={progress} size={320} strokeWidth={12} stage={stage} />

        {/* Tiempo en el centro del anillo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className={classNames(
              'text-6xl md:text-7xl font-bold tabular-nums transition-colors duration-500',
              'text-gray-800 dark:text-white'
            )}>
              {formattedTime}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {timeLeft > 0 ? 'restantes' : '¡Tiempo!'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
