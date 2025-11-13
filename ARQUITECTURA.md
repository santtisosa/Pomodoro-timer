# 🏗️ Arquitectura del Proyecto

## 📐 Arquitectura General

Este proyecto sigue una arquitectura de componentes React con separación clara de responsabilidades:

```
┌─────────────────────────────────────┐
│           App.jsx (Root)            │
│  - Estado global (config)           │
│  - Gestión de localStorage          │
│  - Audio playback                   │
│  - Keyboard shortcuts                │
└──────────┬──────────────────────────┘
           │
           ├──► useTimer (Hook)
           │    - Lógica del temporizador
           │    - Cambio de etapas
           │    - Callbacks
           │
           ├──► Header
           │    - Logo & título
           │    - Toggle dark mode
           │    - Botón settings
           │
           ├──► Timer (Main Display)
           │    ├──► ProgressRing (SVG)
           │    └──► Time display
           │
           ├──► Controls
           │    - Start/Pause/Reset
           │
           ├──► SettingsModal
           │    ├──► SoundSelector (x3)
           │    ├──► Duration inputs
           │    └──► Notifications config
           │
           └──► Footer
                - Info & keyboard hints
```

## 🎯 Flujo de Datos

### 1. Inicialización
```
localStorage → DEFAULT_CONFIG → useState(config) → useTimer
```

### 2. Ciclo del Timer
```
useTimer.toggleTimer()
  ↓
setIsRunning(true)
  ↓
useEffect: setInterval()
  ↓
setTimeLeft(prev - 1)
  ↓
timeLeft === 0?
  ↓
onFinish(stage) → App.handleStageFinish()
  ↓
├─► playSound()
├─► showNotification()
└─► vibrate()
  ↓
goToNextStage() → nueva etapa
```

### 3. Persistencia
```
Usuario cambia config → setConfig()
  ↓
useEffect detecta cambio
  ↓
localStorage.setItem('pomodoroConfig', JSON.stringify(config))
```

## 🧩 Componentes Clave

### `App.jsx`
**Responsabilidad**: Componente raíz que orquesta todo

**Estado**:
- `config`: Configuración completa (duraciones, sonidos, notificaciones, tema)
- `isSettingsOpen`: Controla visibilidad del modal

**Funciones importantes**:
- `handleStageFinish(stage)`: Ejecuta acciones al terminar una etapa
- `playSound(stageType)`: Reproduce el sonido configurado
- `handleSaveConfig(newConfig)`: Guarda nueva configuración

**Side Effects**:
- Persistencia en localStorage
- Aplicar clase dark al `<html>`
- Solicitar permisos de notificación
- Escuchar eventos de teclado
- Actualizar `document.title` con tiempo restante

---

### `useTimer.js` (Hook)
**Responsabilidad**: Lógica completa del temporizador Pomodoro

**Parámetros**:
```js
{
  workDuration: number,
  shortBreakDuration: number,
  longBreakDuration: number,
  cyclesBeforeLongBreak: number,
  onFinish: (stage) => void
}
```

**Estado interno**:
- `timeLeft`: Segundos restantes
- `isRunning`: Si está corriendo
- `stage`: Etapa actual ('work' | 'shortBreak' | 'longBreak')
- `completedCycles`: Contador de ciclos

**Retorna**:
```js
{
  timeLeft: number,
  isRunning: boolean,
  stage: string,
  completedCycles: number,
  progress: number, // 0-100
  totalDuration: number,
  toggleTimer: () => void,
  resetTimer: () => void,
  skipToStage: (stage) => void
}
```

**Lógica de transición**:
```
work → shortBreak (si cycles % cyclesBeforeLongBreak !== 0)
work → longBreak  (si cycles % cyclesBeforeLongBreak === 0)
shortBreak → work
longBreak → work
```

**Optimizaciones**:
- Usa `useRef` para `intervalRef` y `onFinishRef` para evitar re-creación
- Usa `useCallback` para memoizar funciones
- Limpia intervalos en cleanup

---

### `ProgressRing.jsx`
**Responsabilidad**: Anillo de progreso SVG animado

**Props**:
- `progress` (0-100): Progreso actual
- `size`: Tamaño en píxeles
- `strokeWidth`: Grosor del trazo
- `stage`: Para colores dinámicos

**Cálculos matemáticos**:
```js
radius = (size - strokeWidth) / 2
circumference = 2 × π × radius
offset = circumference - (progress / 100) × circumference
```

**SVG**:
- Círculo de fondo (track): opacidad 30%, color según etapa
- Círculo de progreso: `stroke-dasharray` y `stroke-dashoffset` para animación
- Rotación `-90deg` para empezar desde arriba
- `drop-shadow` para efecto de brillo

---

### `SettingsModal.jsx`
**Responsabilidad**: Modal de configuración completa

**Estado local**:
- `localConfig`: Copia local de config para edición

**Validación**:
- Duraciones: 1-180 minutos
- Ciclos: 1-10
- Volumen: 0-100%

**Sub-componentes**:
- `SoundSelector`: Selección de sonidos (x3, uno por etapa)

**UX**:
- Cambios no se aplican hasta hacer clic en "Guardar"
- Backdrop translúcido clickeable para cerrar
- Scroll interno con scrollbar personalizado

---

### `SoundSelector.jsx`
**Responsabilidad**: Selector de sonido con previsualización

**Props**:
- `label`: Etiqueta
- `value`: Sonido actual (string o objeto)
- `onChange`: Callback

**Funcionalidad**:
- Botones para sonidos predefinidos ('bell', 'chime', 'ping')
- Input de archivo para sonidos personalizados
- Botón de preview con control play/stop
- Usa `URL.createObjectURL()` para archivos locales

**Limitación**: Los archivos personalizados no persisten en localStorage (solo URLs temporales). Para persistencia real se necesitaría:
- IndexedDB con `FileReader` y `Blob`
- O backend para subir archivos

---

### `Timer.jsx`
**Responsabilidad**: Display principal del temporizador

**Formato de tiempo**:
```js
MM:SS con padStart(2, '0')
```

**Colores dinámicos**:
- work → primary (teal)
- shortBreak → blue
- longBreak → purple

**Layout**:
- Nombre de etapa + ciclos en la parte superior
- ProgressRing con tiempo en el centro
- Responsive (text-6xl en desktop, text-7xl en mobile)

---

### `Controls.jsx`
**Responsabilidad**: Controles Start/Pause/Reset

**Props**:
- `isRunning`: Para mostrar Play o Pause
- `onToggle`: Callback Start/Pause
- `onReset`: Callback Reset

**Iconos**: SVG inline para evitar dependencias externas

**Accesibilidad**:
- `aria-label` descriptivos
- Focus visible con ring
- Soporte para teclado (Space, Enter, R)

---

## 🎨 Sistema de Diseño (Glassmorphism)

### Clases Utility Personalizadas

**`.glass-card`**:
```css
bg-white/10 dark:bg-white/5
backdrop-blur-lg
rounded-3xl
shadow-xl
border border-white/20 dark:border-white/10
```

**`.btn-glass`**:
```css
backdrop-blur-md
border border-white/30
transition-all duration-200
hover:scale-105 hover:shadow-lg
active:scale-95
focus:ring-2 focus:ring-primary-400
```

**`.input-glass`**:
```css
bg-white/20 dark:bg-white/10
backdrop-blur-md
border border-white/30
focus:bg-white/30 dark:focus:bg-white/20
```

### Paleta de Colores

**Primary (Teal)**:
- 400: `#2dd4bf` (acentos)
- 500: `#14b8a6` (principal)
- 600: `#0d9488` (hover)

**Backgrounds**:
- Light: gradient `from-primary-100 via-blue-50 to-purple-100`
- Dark: gradient `from-gray-900 via-gray-800 to-gray-900`

### Animaciones

**Keyframes**:
```css
@keyframes fadeIn {
  0%: opacity 0
  100%: opacity 1
}

@keyframes scaleIn {
  0%: transform scale(0.95), opacity 0
  100%: transform scale(1), opacity 1
}
```

**Transiciones**:
- Colores: `transition-colors duration-500`
- Progreso ring: `transition-all duration-500 ease-linear`
- Botones: `duration-200` para feedback inmediato

---

## 📦 Gestión de Estado

### localStorage Schema
```json
{
  "workDuration": 25,
  "shortBreakDuration": 5,
  "longBreakDuration": 15,
  "cyclesBeforeLongBreak": 4,
  "sounds": {
    "work": "bell",
    "shortBreak": "chime",
    "longBreak": "ping"
  },
  "volume": 50,
  "notifications": true,
  "vibration": true,
  "darkMode": false
}
```

**Persistencia**: Cada cambio de `config` se guarda automáticamente

**Sincronización**: No hay sincronización entre pestañas (cada pestaña es independiente)

---

## 🔧 Decisiones Técnicas Clave

### 1. ¿Por qué un hook personalizado (`useTimer`)?
✅ **Ventajas**:
- Separación de lógica/presentación
- Reutilizable
- Testeable
- Legible

❌ **Alternativas consideradas**:
- Context API: Overkill para un solo timer
- Redux: Demasiado boilerplate
- Zustand: Dependencia extra innecesaria

### 2. ¿Por qué localStorage y no Context?
✅ **Razones**:
- Persistencia entre sesiones
- No hay prop drilling (solo 1-2 niveles)
- Simplicidad

### 3. ¿Por qué SVG y no Canvas para ProgressRing?
✅ **Razones**:
- Declarativo y fácil de mantener
- CSS transitions funcionan perfectamente
- Escalable (vector)
- Accesible

### 4. ¿Por qué inline SVG icons y no icon library?
✅ **Razones**:
- Zero dependencias extra
- Bundle size mínimo
- Control total sobre estilos

### 5. ¿Por qué Tailwind y no CSS Modules/Styled Components?
✅ **Razones**:
- Utility-first reduce CSS personalizado
- PurgeCSS automático con Vite
- Glassmorphism fácil con utilities
- Dark mode con clase simple

---

## 🚀 Optimizaciones de Rendimiento

### Evitar Re-renders Innecesarios
- `useCallback` en funciones del timer
- `useMemo` para cálculos del ProgressRing
- `useRef` para intervalos y audio

### Code Splitting
- Actualmente no necesario (app pequeña, ~50KB gzipped)
- Si crece: lazy load `SettingsModal`

### Bundle Size
- Tailwind: ~10KB después de purge
- React + ReactDOM: ~40KB gzipped
- classnames: ~1KB
- Total estimado: **~50-60KB gzipped**

---

## 🧪 Testing (Opcional/Futuro)

### Tests Recomendados

**useTimer.test.js**:
```js
- Timer cuenta hacia atrás correctamente
- onFinish se dispara cuando timeLeft === 0
- Cambio de etapa work → shortBreak
- Cambio de etapa work → longBreak después de N ciclos
- toggleTimer inicia/pausa correctamente
- resetTimer vuelve a estado inicial
```

**ProgressRing.test.js**:
```js
- Calcula offset correctamente según progress
- Cambia color según stage
```

**App.test.js**:
```js
- Guarda config en localStorage
- Aplica dark mode a document.documentElement
- Keyboard shortcuts funcionan
```

### Herramientas
- **Vitest**: Fast unit testing
- **Testing Library**: Render components
- **MSW**: Mock audio API

---

## 📈 Mejoras Futuras (Ideas)

1. **Estadísticas**:
   - Historial de sesiones completadas
   - Gráficos de productividad
   - Almacenar en IndexedDB

2. **Tareas**:
   - Lista de tareas asociadas a pomodoros
   - Marcar tareas completadas

3. **Configuración avanzada**:
   - Múltiples perfiles (trabajo, estudio, ejercicio)
   - Auto-start siguiente etapa

4. **PWA**:
   - Service Worker
   - Offline support
   - Install prompt

5. **Sincronización**:
   - Firebase/Supabase para sync entre dispositivos
   - Autenticación opcional

6. **Sonidos personalizados persistentes**:
   - IndexedDB para almacenar archivos
   - FileReader + Blob

7. **Análisis**:
   - Google Analytics (opcional, con consentimiento)

---

## 🔐 Seguridad y Privacidad

- ✅ No hay servidor backend
- ✅ No se envían datos a terceros
- ✅ localStorage solo en el navegador del usuario
- ✅ No cookies de tracking
- ✅ Sonidos personalizados solo en memoria (no se suben)
- ✅ Notificaciones requieren permiso explícito

---

## 📚 Referencias

- [React Docs](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Pomodoro Technique](https://francescocirillo.com/pages/pomodoro-technique)
- [Web Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)
- [Vibration API](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API)

---

**Documentación creada para facilitar el mantenimiento y extensión del proyecto.**
