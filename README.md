# 🍅 Pomodoro Timer

Un temporizador Pomodoro configurable y moderno con estética glassmorphism, construido con React + Vite + Tailwind CSS. Listo para desplegarse en GitHub Pages.

![Pomodoro Timer Preview](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss)

## ✨ Características

### Funcionalidad Principal
- ⏱️ **Temporizador Pomodoro completo** con tres etapas: Trabajo, Descanso Corto, Descanso Largo
- ⚙️ **Duraciones personalizables** para cada etapa (1-180 minutos)
- 🔄 **Ciclos configurables** antes del descanso largo
- 📊 **Anillo de progreso animado** con SVG y transiciones suaves
- 🎯 **Contador de ciclos** completados

### Sonidos y Notificaciones
- 🔊 **Sonidos configurables** por etapa con previsualización
- 📁 **Carga de sonidos personalizados** (drag & drop o selector de archivos)
- 🔔 **Notificaciones del navegador** al terminar cada etapa
- 📳 **Vibración** en dispositivos compatibles
- 🎚️ **Control de volumen** (0-100%)

### Diseño y UX
- 🎨 **Glassmorphism UI** con efectos de vidrio translúcido y blur
- 🌓 **Dark/Light mode** con persistencia en localStorage
- 📱 **Responsive design** optimizado para móviles
- ⚡ **Animaciones suaves** y microinteracciones
- ⌨️ **Atajos de teclado**: `Espacio` para iniciar/pausar, `R` para reiniciar
- ♿ **Accesibilidad**: ARIA labels, navegación por teclado

### Persistencia
- 💾 Todas las configuraciones se guardan automáticamente en `localStorage`
- 🔄 Las preferencias persisten entre sesiones

## 🚀 Instalación y Uso Local

### Requisitos Previos
- Node.js 18+ y npm

### Pasos

1. **Clonar o descargar el proyecto**:
```bash
git clone https://github.com/TU_USUARIO/pomodoro-timer.git
cd pomodoro-timer
```

2. **Instalar dependencias**:
```bash
npm install
```

3. **Ejecutar en desarrollo**:
```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

4. **Construir para producción**:
```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`.

5. **Previsualizar build**:
```bash
npm run preview
```

## 📦 Desplegar en GitHub Pages

### Método 1: Usando `gh-pages` (Recomendado)

1. **Configurar la URL base**:

   Edita `vite.config.js` y cambia `base` al nombre de tu repositorio:
   ```js
   export default defineConfig({
     base: '/TU-REPOSITORIO/', // ej: '/pomodoro-timer/'
   })
   ```

   También actualiza `homepage` en `package.json`:
   ```json
   "homepage": "https://TU_USUARIO.github.io/TU-REPOSITORIO"
   ```

2. **Crear repositorio en GitHub** y conectar:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU-REPOSITORIO.git
   git push -u origin main
   ```

3. **Desplegar**:
   ```bash
   npm run deploy
   ```

   Esto ejecutará `npm run build` automáticamente y subirá la carpeta `dist/` a la rama `gh-pages`.

4. **Configurar GitHub Pages**:
   - Ve a tu repositorio en GitHub
   - Settings → Pages
   - Source: selecciona la rama `gh-pages` y carpeta `/ (root)`
   - Guarda y espera unos minutos

Tu app estará en: `https://TU_USUARIO.github.io/TU-REPOSITORIO/`

### Método 2: Usando la carpeta `/docs`

1. **Modificar Vite config**:
   ```js
   export default defineConfig({
     base: '/TU-REPOSITORIO/',
     build: {
       outDir: 'docs', // Cambia de 'dist' a 'docs'
     },
   })
   ```

2. **Construir**:
   ```bash
   npm run build
   ```

3. **Commit y push** la carpeta `docs/`:
   ```bash
   git add docs
   git commit -m "Build for GitHub Pages"
   git push
   ```

4. **Configurar GitHub Pages**:
   - Settings → Pages
   - Source: selecciona `main` branch y carpeta `/docs`

### Método 3: GitHub Actions

Crea `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

Luego configura Pages para usar la rama `gh-pages`.

## 🎨 Personalización

### Cambiar Colores

Edita `tailwind.config.js`:
```js
colors: {
  primary: {
    // Cambia estos valores hex
    500: '#14b8a6',
    600: '#0d9488',
    // ...
  },
}
```

### Añadir Sonidos Personalizados

1. Coloca archivos `.mp3` en `public/sounds/`
2. Edita `src/components/SoundSelector.jsx` y añade a `predefinedSounds`:
```js
{ id: 'miSonido', name: 'Mi Sonido', path: '/sounds/miSonido.mp3' }
```

Alternativamente, usa la interfaz para subir sonidos temporalmente (no persisten al recargar).

### Cambiar Fuente

Edita `index.html` y `tailwind.config.js`:
```js
fontFamily: {
  sans: ['Tu-Fuente', 'system-ui', 'sans-serif'],
}
```

## 📁 Estructura del Proyecto

```
pomodoro-timer/
├── public/
│   ├── sounds/          # Archivos de sonido
│   └── vite.svg         # Favicon
├── src/
│   ├── components/      # Componentes React
│   │   ├── Controls.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── ProgressRing.jsx
│   │   ├── SettingsModal.jsx
│   │   ├── SoundSelector.jsx
│   │   └── Timer.jsx
│   ├── hooks/
│   │   └── useTimer.js  # Lógica del temporizador
│   ├── utils/
│   │   └── notifications.js
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Entry point
│   └── index.css        # Estilos globales y Tailwind
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🔧 Tecnologías Utilizadas

- **React 18.3** - Librería de UI
- **Vite 5.4** - Build tool ultra-rápido
- **Tailwind CSS 3.4** - Framework de CSS utility-first
- **classnames** - Helper para clases condicionales
- **gh-pages** - Deploy automático a GitHub Pages

## ⌨️ Atajos de Teclado

| Tecla | Acción |
|-------|--------|
| `Espacio` / `Enter` | Iniciar / Pausar |
| `R` | Reiniciar |

## 🎯 Decisiones de Diseño

### Glassmorphism
Se eligió glassmorphism para una estética moderna y elegante:
- `backdrop-filter: blur()` para efecto de vidrio esmerilado
- Colores semi-transparentes con alpha channel
- Bordes sutiles y sombras suaves
- Transiciones animadas para feedback visual

### useTimer Hook
La lógica del temporizador se encapsuló en un hook personalizado (`useTimer`) para:
- **Separar lógica de presentación**: el componente UI solo recibe estado
- **Reutilización**: el hook puede usarse en otros contextos
- **Testabilidad**: más fácil de testear que componentes
- **Claridad**: toda la lógica del conteo, cambios de etapa y callbacks en un solo lugar

### Persistencia con localStorage
Se usa `localStorage` para guardar configuraciones porque:
- No requiere backend
- Simple y efectivo para datos no sensibles
- Funciona offline

### Sonidos Personalizados
Se permite subir archivos locales usando `URL.createObjectURL()`:
- **Ventaja**: El usuario puede usar cualquier sonido sin subirlo a un servidor
- **Limitación**: Los archivos no persisten al recargar (solo URLs temporales). Para persistencia real se necesitaría IndexedDB o backend.

## 🐛 Troubleshooting

### La página no carga en GitHub Pages

- Verifica que `base` en `vite.config.js` coincida con el nombre del repositorio
- Asegúrate de que GitHub Pages esté configurado para la rama/carpeta correcta
- Revisa la consola del navegador para errores 404

### Los sonidos no se reproducen

- Algunos navegadores bloquean autoplay hasta que el usuario interactúe con la página
- Verifica la ruta de los archivos en `public/sounds/`
- Revisa permisos del navegador para reproducir audio

### Las notificaciones no aparecen

- Habilita notificaciones en la configuración de la app
- Permite notificaciones en la configuración del navegador
- Las notificaciones requieren HTTPS o localhost

## 📄 Licencia

Este proyecto es de código abierto. Siéntete libre de usarlo, modificarlo y distribuirlo.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si encuentras un bug o quieres agregar una feature:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-feature`)
3. Commit tus cambios (`git commit -m 'Añade nueva feature'`)
4. Push a la rama (`git push origin feature/nueva-feature`)
5. Abre un Pull Request

## 📧 Contacto

Para preguntas o sugerencias, abre un issue en GitHub.

---

**¡Disfruta de tu productividad con el Pomodoro Timer!** 🍅✨
