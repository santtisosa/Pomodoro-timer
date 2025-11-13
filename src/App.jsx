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
  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem('pomodoroConfig');
    return saved ? { ...DEFAULT_CONFIG, ...JSON.parse(saved) } : DEFAULT_CONFIG;
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const audioRef = useRef(null);

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

  function handleStageFinish(completedStage) {
    playSound(completedStage);

    if (config.notifications) {
      const { title, body } = getNotificationMessage(completedStage);
      showNotification(title, body);
    }

    if (config.vibration) {
      vibrate([200, 100, 200]);
    }
  }

  function playSound(stageType) {
    if (!audioRef.current) return;

    const soundConfig = config.sounds[stageType];
    let soundPath;

    if (typeof soundConfig === 'object' && soundConfig.type === 'custom') {
      soundPath = soundConfig.url;
    } else {
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

  useEffect(() => {
    localStorage.setItem('pomodoroConfig', JSON.stringify(config));

    if (config.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [config]);

  useEffect(() => {
    if (config.notifications) {
      requestNotificationPermission();
    }
  }, [config.notifications]);

  useEffect(() => {
    const handleKeyPress = (e) => {
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

  const handleSaveConfig = (newConfig) => {
    setConfig(newConfig);
  };

  const toggleDarkMode = () => {
    setConfig(prev => ({ ...prev, darkMode: !prev.darkMode }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-100 via-blue-50 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <audio ref={audioRef} />

      <Header
        darkMode={config.darkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="glass-card max-w-2xl w-full p-8 md:p-12 space-y-8">
          <Timer
            timeLeft={timeLeft}
            progress={progress}
            stage={stage}
            completedCycles={completedCycles}
          />

          <Controls
            isRunning={isRunning}
            onToggle={toggleTimer}
            onReset={resetTimer}
          />
        </div>
      </main>

      <Footer />

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
