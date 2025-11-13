/**
 * Solicita permiso para mostrar notificaciones del navegador
 * @returns {Promise<boolean>} True si se concedió el permiso
 */
export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.warn('Este navegador no soporta notificaciones');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

/**
 * Muestra una notificación del navegador
 * @param {string} title - Título de la notificación
 * @param {string} body - Cuerpo de la notificación
 * @param {string} icon - Ruta al icono (opcional)
 */
export const showNotification = (title, body, icon = '/vite.svg') => {
  if (Notification.permission === 'granted') {
    const notification = new Notification(title, {
      body,
      icon,
      badge: icon,
      vibrate: [200, 100, 200],
      tag: 'pomodoro-timer',
      renotify: true,
    });

    // Auto-cerrar después de 5 segundos
    setTimeout(() => notification.close(), 5000);

    return notification;
  }
  return null;
};

/**
 * Dispara vibración en dispositivos compatibles
 * @param {number[]} pattern - Patrón de vibración [vibrar, pausa, vibrar, ...]
 */
export const vibrate = (pattern = [200, 100, 200]) => {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
};

/**
 * Obtiene el mensaje de notificación según la etapa completada
 * @param {string} stage - Etapa completada ('work', 'shortBreak', 'longBreak')
 * @returns {Object} Objeto con title y body para la notificación
 */
export const getNotificationMessage = (stage) => {
  const messages = {
    work: {
      title: '¡Tiempo de descanso!',
      body: 'Has completado una sesión de trabajo. Tómate un respiro.',
    },
    shortBreak: {
      title: '¡Volver al trabajo!',
      body: 'Tu descanso corto ha terminado. Es hora de enfocarse.',
    },
    longBreak: {
      title: '¡Volver al trabajo!',
      body: 'Tu descanso largo ha terminado. ¡Excelente progreso!',
    },
  };

  return messages[stage] || messages.work;
};
