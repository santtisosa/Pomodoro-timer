import { useState, useRef } from 'react';
import classNames from 'classnames';

export default function SoundSelector({ label, value, onChange, customSound }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const fileInputRef = useRef(null);

  const predefinedSounds = [
    { id: 'bell', name: 'Campana', path: `${import.meta.env.BASE_URL}sounds/bell.mp3` },
    { id: 'chime', name: 'Chime', path: `${import.meta.env.BASE_URL}sounds/chime.mp3` },
    { id: 'ping', name: 'Ping', path: `${import.meta.env.BASE_URL}sounds/ping.mp3` },
  ];

  // Previsualizar sonido
  const previewSound = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
        audioRef.current.onended = () => setIsPlaying(false);
      }
    }
  };

  // Manejar carga de archivo personalizado
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      // Crear URL temporal para el archivo
      const url = URL.createObjectURL(file);
      onChange({ type: 'custom', name: file.name, url, file });
    }
  };

  // Obtener la ruta del sonido actual
  const getCurrentSoundPath = () => {
    if (value?.type === 'custom' && value?.url) {
      return value.url;
    }
    const sound = predefinedSounds.find(s => s.id === value);
    return sound ? sound.path : predefinedSounds[0].path;
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>

      {/* Audio oculto para previsualización */}
      <audio ref={audioRef} src={getCurrentSoundPath()} />

      {/* Selector de sonidos predefinidos */}
      <div className="flex flex-wrap gap-2">
        {predefinedSounds.map((sound) => (
          <button
            key={sound.id}
            onClick={() => onChange(sound.id)}
            className={classNames(
              'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
              'border border-white/30 backdrop-blur-md',
              value === sound.id
                ? 'bg-primary-500/80 text-white shadow-lg scale-105'
                : 'bg-white/20 dark:bg-white/10 text-gray-800 dark:text-white hover:bg-white/30 dark:hover:bg-white/20'
            )}
          >
            {sound.name}
          </button>
        ))}
      </div>

      {/* Botón para subir archivo personalizado */}
      <div className="flex gap-2">
        <button
          onClick={() => fileInputRef.current?.click()}
          className={classNames(
            'flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
            'border border-white/30 backdrop-blur-md',
            value?.type === 'custom'
              ? 'bg-primary-500/80 text-white'
              : 'bg-white/20 dark:bg-white/10 text-gray-800 dark:text-white hover:bg-white/30'
          )}
        >
          {value?.type === 'custom' ? (
            <span className="flex items-center justify-center gap-2">
              <MusicIcon />
              {value.name || 'Personalizado'}
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <UploadIcon />
              Subir Sonido
            </span>
          )}
        </button>

        {/* Botón de previsualización */}
        <button
          onClick={previewSound}
          className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
            border border-white/30 backdrop-blur-md
            bg-white/20 dark:bg-white/10 text-gray-800 dark:text-white
            hover:bg-white/30 dark:hover:bg-white/20"
          aria-label="Previsualizar sonido"
        >
          {isPlaying ? <StopIcon /> : <PlaySmallIcon />}
        </button>
      </div>

      {/* Input oculto para archivos */}
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {value?.type === 'custom' && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Sonido personalizado cargado
        </p>
      )}
    </div>
  );
}

// Iconos
function UploadIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
  );
}

function MusicIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
    </svg>
  );
}

function PlaySmallIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
    </svg>
  );
}

function StopIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
    </svg>
  );
}
