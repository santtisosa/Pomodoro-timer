import { useState, useEffect } from 'react';
import classNames from 'classnames';
import SoundSelector from './SoundSelector';

/**
 * Modal de configuración del Pomodoro
 * @param {Object} props
 * @param {boolean} props.isOpen - Si el modal está abierto
 * @param {Function} props.onClose - Callback para cerrar
 * @param {Object} props.config - Configuración actual
 * @param {Function} props.onSave - Callback para guardar configuración
 */
export default function SettingsModal({ isOpen, onClose, config, onSave }) {
  const [localConfig, setLocalConfig] = useState(config);

  // Sincronizar con config externa cuando cambie
  useEffect(() => {
    setLocalConfig(config);
  }, [config]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(localConfig);
    onClose();
  };

  const handleChange = (field, value) => {
    setLocalConfig(prev => ({ ...prev, [field]: value }));
  };

  // Validar números dentro de rangos
  const validateNumber = (value, min = 1, max = 180) => {
    const num = parseInt(value, 10);
    if (isNaN(num)) return min;
    return Math.max(min, Math.min(max, num));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar p-6 md:p-8 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Configuración
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
            aria-label="Cerrar configuración"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Contenido */}
        <div className="space-y-6">
          {/* Duraciones */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Duraciones (minutos)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Trabajo
                </label>
                <input
                  type="number"
                  min="1"
                  max="180"
                  value={localConfig.workDuration}
                  onChange={(e) => handleChange('workDuration', validateNumber(e.target.value))}
                  className="input-glass w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Descanso Corto
                </label>
                <input
                  type="number"
                  min="1"
                  max="180"
                  value={localConfig.shortBreakDuration}
                  onChange={(e) => handleChange('shortBreakDuration', validateNumber(e.target.value))}
                  className="input-glass w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Descanso Largo
                </label>
                <input
                  type="number"
                  min="1"
                  max="180"
                  value={localConfig.longBreakDuration}
                  onChange={(e) => handleChange('longBreakDuration', validateNumber(e.target.value))}
                  className="input-glass w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ciclos antes del descanso largo
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={localConfig.cyclesBeforeLongBreak}
                onChange={(e) => handleChange('cyclesBeforeLongBreak', validateNumber(e.target.value, 1, 10))}
                className="input-glass w-full md:w-1/3"
              />
            </div>
          </section>

          {/* Sonidos */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Sonidos
            </h3>

            <SoundSelector
              label="Sonido al terminar trabajo"
              value={localConfig.sounds.work}
              onChange={(value) => handleChange('sounds', { ...localConfig.sounds, work: value })}
            />

            <SoundSelector
              label="Sonido al terminar descanso corto"
              value={localConfig.sounds.shortBreak}
              onChange={(value) => handleChange('sounds', { ...localConfig.sounds, shortBreak: value })}
            />

            <SoundSelector
              label="Sonido al terminar descanso largo"
              value={localConfig.sounds.longBreak}
              onChange={(value) => handleChange('sounds', { ...localConfig.sounds, longBreak: value })}
            />

            {/* Control de volumen */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Volumen: {localConfig.volume}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={localConfig.volume}
                onChange={(e) => handleChange('volume', parseInt(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer
                  bg-white/20 dark:bg-white/10
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-4
                  [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-primary-500
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:shadow-lg"
              />
            </div>
          </section>

          {/* Notificaciones */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Notificaciones
            </h3>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={localConfig.notifications}
                onChange={(e) => handleChange('notifications', e.target.checked)}
                className="w-5 h-5 rounded bg-white/20 dark:bg-white/10 border-white/30
                  text-primary-500 focus:ring-2 focus:ring-primary-400"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Mostrar notificaciones del navegador
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={localConfig.vibration}
                onChange={(e) => handleChange('vibration', e.target.checked)}
                className="w-5 h-5 rounded bg-white/20 dark:bg-white/10 border-white/30
                  text-primary-500 focus:ring-2 focus:ring-primary-400"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Usar vibración (en dispositivos compatibles)
              </span>
            </label>
          </section>
        </div>

        {/* Footer con botones */}
        <div className="flex gap-3 mt-8">
          <button
            onClick={handleSave}
            className="btn-primary flex-1"
          >
            Guardar Cambios
          </button>
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
