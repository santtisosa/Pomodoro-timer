import { useState, useEffect, useRef } from 'react';
import { useTimer } from './hooks/useTimer';
import {
  requestNotificationPermission,
  showNotification,
  getNotificationMessage,
  vibrate,
} from './utils/notifications';
import Header from './components/Header';
import Footer from './components/Footer';
import Timer from './components/Timer';
import Controls from './components/Controls';
import SettingsModal from './components/SettingsModal';

// Configuración por defecto
const DEFAULT_CONFIG = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  cyclesBeforeLongBreak: 4,
  sounds: {
    work: 'bell',
    shortBreak: 'chime',
    longBreak: 'ping',
  },
  volume: 50,
  notifications: true,
  vibration: true,
  darkMode: false,
};

function App() {
  // Estado de configuración
  const [config, setConfig] = useState(() => {
    // Cargar desde localStorage o usar valores por defecto
    const saved = localStorage.getItem('pomodoroConfig');
    return saved ? { ...DEFAULT_CONFIG, ...JSON.parse(saved) } : DEFAULT_CONFIG;
  });

  // Estado del modal de configuración
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Referencia para el audio
  const audioRef = useRef(null);

  // Hook del timer con callback al finalizar
  const {
    timeLeft,
    isRunning,
    stage,
    completedCycles,
    progress,
    toggleTimer,
    resetTimer,
  } = useTimer({
    workDuration: config.workDuration,
    shortBreakDuration: config.shortBreakDuration,
    longBreakDuration: config.longBreakDuration,
    cyclesBeforeLongBreak: config.cyclesBeforeLongBreak,
    onFinish: handleStageFinish,
  });

  /**
   * Manejar finalización de etapa
   * @param {string} completedStage - Etapa que acaba de terminar
   */
  function handleStageFinish(completedStage) {
    // Reproducir sonido
    playSound(completedStage);

    // Mostrar notificación
    if (config.notifications) {
      const { title, body } = getNotificationMessage(completedStage);
      showNotification(title, body);
    }

    // Vibrar
    if (config.vibration) {
      vibrate([200, 100, 200]);
    }
  }

  /**
   * Reproducir sonido según la configuración
   * @param {string} stageType - Tipo de etapa
   */
  function playSound(stageType) {
    if (!audioRef.current) return;

    const soundConfig = config.sounds[stageType];
    let soundPath;

    // Determinar la ruta del sonido
    if (typeof soundConfig === 'object' && soundConfig.type === 'custom') {
      soundPath = soundConfig.url;
    } else {
      // Sonido predefinido
      const soundMap = {
        bell: '/sounds/bell.mp3',
        chime: '/sounds/chime.mp3',
        ping: '/sounds/ping.mp3',
      };
      soundPath = soundMap[soundConfig] || soundMap.bell;
    }

    audioRef.current.src = soundPath;
    audioRef.current.volume = config.volume / 100;
    audioRef.current.play().catch(err => {
      console.warn('No se pudo reproducir el sonido:', err);
    });
  }

  /**
   * Guardar configuración en localStorage
   */
  useEffect(() => {
    localStorage.setItem('pomodoroConfig', JSON.stringify(config));

    // Aplicar clase de dark mode al documento
    if (config.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [config]);

  /**
   * Solicitar permisos de notificación al montar
   */
  useEffect(() => {
    if (config.notifications) {
      requestNotificationPermission();
    }
  }, [config.notifications]);

  /**
   * Atajos de teclado
   */
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ignorar si está escribiendo en un input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      switch (e.key.toLowerCase()) {
        case ' ':
        case 'enter':
          e.preventDefault();
          toggleTimer();
          break;
        case 'r':
          e.preventDefault();
          resetTimer();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [toggleTimer, resetTimer]);

  /**
   * Actualizar título de la pestaña con el tiempo restante
   */
  useEffect(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    const stageEmoji = {
      work: '🍅',
      shortBreak: '☕',
      longBreak: '🎉',
    };

    document.title = `${formatted} ${stageEmoji[stage]} Pomodoro Timer`;
  }, [timeLeft, stage]);

  // Guardar y cerrar configuración
  const handleSaveConfig = (newConfig) => {
    setConfig(newConfig);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setConfig(prev => ({ ...prev, darkMode: !prev.darkMode }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-100 via-blue-50 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      {/* Audio element oculto para reproducir sonidos */}
      <audio ref={audioRef} />

      {/* Header */}
      <Header
        darkMode={config.darkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Contenido principal */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="glass-card max-w-2xl w-full p-8 md:p-12 space-y-8">
          {/* Timer */}
          <Timer
            timeLeft={timeLeft}
            progress={progress}
            stage={stage}
            completedCycles={completedCycles}
          />

          {/* Controles */}
          <Controls
            isRunning={isRunning}
            onToggle={toggleTimer}
            onReset={resetTimer}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modal de configuración */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={config}
        onSave={handleSaveConfig}
      />
    </div>
  );
}

export default App;
