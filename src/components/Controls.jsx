import classNames from 'classnames';

export default function Controls({ isRunning, onToggle, onReset }) {
  return (
    <div className="flex items-center justify-center gap-4">
      {/* Botón Start/Pause */}
      <button
        onClick={onToggle}
        className={classNames(
          'btn-primary min-w-[140px] flex items-center justify-center gap-2',
          'text-lg font-semibold'
        )}
        aria-label={isRunning ? 'Pausar temporizador' : 'Iniciar temporizador'}
      >
        {isRunning ? (
          <>
            <PauseIcon />
            <span>Pausar</span>
          </>
        ) : (
          <>
            <PlayIcon />
            <span>Iniciar</span>
          </>
        )}
      </button>

      {/* Botón Reset */}
      <button
        onClick={onReset}
        className="btn-secondary flex items-center justify-center gap-2"
        aria-label="Reiniciar temporizador"
      >
        <ResetIcon />
        <span>Reiniciar</span>
      </button>
    </div>
  );
}

// Iconos SVG inline
function PlayIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z" />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );
}
