# 🍅 Pomodoro Timer

Un temporizador Pomodoro moderno y personalizable con diseño glassmorphism.

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss)

## 🌐 Demo

**[Ver Demo en Vivo](https://santtisosa.github.io/Pomodoro-timer/)**

## 🌟 Características

- ⏱️ Temporizador Pomodoro completo (Trabajo, Descanso Corto, Descanso Largo)
- ⚙️ Duraciones completamente personalizables
- 🔊 Sonidos configurables para cada etapa
- 🔔 Notificaciones de escritorio
- 🌓 Modo oscuro/claro
- 📱 Diseño responsive
- 💾 Configuración persistente en localStorage
- ⌨️ Atajos de teclado (Espacio: iniciar/pausar, R: reiniciar)

## 🎯 Uso

1. Configura las duraciones de trabajo y descanso
2. Presiona "Iniciar" o `Espacio` para comenzar
3. El timer cambiará automáticamente entre trabajo y descansos
4. Recibirás notificaciones y sonidos al completar cada etapa

## 🛠️ Tecnologías

- React 18
- Vite
- Tailwind CSS
- classnames

## 💻 Desarrollo Local

Si quieres ejecutar el proyecto localmente:

```bash
# Clonar repositorio
git clone https://github.com/santtisosa/Pomodoro-timer.git
cd Pomodoro-timer

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173/Pomodoro-timer/`

## 🎨 Personalización

### Cambiar colores

Edita `tailwind.config.js`:

```js
colors: {
  primary: {
    500: '#14b8a6', // Cambia este color
  }
}
```

### Añadir sonidos personalizados

Coloca archivos `.mp3` en `public/sounds/` o usa la opción "Subir Sonido" en la configuración de la app.

## 📂 Estructura del Proyecto

```
src/
├── components/      # Componentes React
├── hooks/          # Custom hooks (useTimer)
├── utils/          # Utilidades (notificaciones)
├── App.jsx         # Componente principal
└── main.jsx        # Entry point
```

## 👤 Autor

Santiago Sosa - [GitHub](https://github.com/santtisosa)

## 📄 Licencia

MIT
