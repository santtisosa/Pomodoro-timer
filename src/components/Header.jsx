import classNames from 'classnames';

export default function Header({ darkMode, onToggleDarkMode, onOpenSettings }) {
  return (
    <header className="w-full max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        {/* Logo y título */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg">
            <TomatoIcon />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            Pomodoro Timer
          </h1>
        </div>

        {/* Controles */}
        <div className="flex items-center gap-2">
          {/* Botón de configuración */}
          <button
            onClick={onOpenSettings}
            className={classNames(
              'p-3 rounded-xl transition-all duration-200',
              'bg-white/20 dark:bg-white/10 backdrop-blur-md',
              'border border-white/30 dark:border-white/20',
              'hover:bg-white/30 dark:hover:bg-white/20 hover:scale-105',
              'focus:outline-none focus:ring-2 focus:ring-primary-400'
            )}
            aria-label="Abrir configuración"
          >
            <SettingsIcon />
          </button>

          {/* Botón de dark mode */}
          <button
            onClick={onToggleDarkMode}
            className={classNames(
              'p-3 rounded-xl transition-all duration-200',
              'bg-white/20 dark:bg-white/10 backdrop-blur-md',
              'border border-white/30 dark:border-white/20',
              'hover:bg-white/30 dark:hover:bg-white/20 hover:scale-105',
              'focus:outline-none focus:ring-2 focus:ring-primary-400'
            )}
            aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}

// Iconos
function TomatoIcon() {
  return (
    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg className="w-5 h-5 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg className="w-5 h-5 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="w-5 h-5 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  );
}
