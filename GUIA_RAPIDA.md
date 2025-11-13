# 🚀 Guía Rápida de Inicio

## ⚡ Inicio Rápido (3 pasos)

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Abrir http://localhost:5173 en tu navegador
```

## 📦 Desplegar a GitHub Pages (5 pasos)

```bash
# 1. Editar vite.config.js - cambiar 'pomodoro-timer' por el nombre de tu repo
# 2. Crear repositorio en GitHub
# 3. Inicializar git y conectar
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main

# 4. Desplegar
npm run deploy

# 5. Configurar GitHub Pages (Settings → Pages → Source: gh-pages branch)
```

Tu app estará en: `https://TU_USUARIO.github.io/TU_REPO/`

## 🔊 Añadir Sonidos

1. Ve a `public/sounds/`
2. Lee el archivo `INSTRUCCIONES.md`
3. Descarga 3 sonidos MP3 cortos (1-3 seg) de [Freesound.org](https://freesound.org) o [Pixabay](https://pixabay.com/sound-effects/)
4. Renómbralos a: `bell.mp3`, `chime.mp3`, `ping.mp3`
5. Colócalos en la carpeta `public/sounds/`

**Alternativa**: Usa la función de "Subir Sonido" en la configuración de la app para usar tus propios archivos temporalmente.

## 🎨 Personalización Rápida

### Cambiar colores
Edita `tailwind.config.js` → `colors.primary`

### Cambiar fuente
Edita `index.html` (Google Fonts) y `tailwind.config.js` → `fontFamily.sans`

### Cambiar duraciones por defecto
Edita `src/App.jsx` → `DEFAULT_CONFIG`

## 🐛 Solución de Problemas

**La página no carga en GitHub Pages**
- Verifica que `base` en `vite.config.js` coincida con el nombre del repo

**Los sonidos no funcionan**
- Añade archivos MP3 en `public/sounds/`
- O usa la función "Subir Sonido" en la configuración

**Las notificaciones no aparecen**
- Permite notificaciones cuando el navegador lo solicite
- Verifica permisos en la configuración del navegador

## 📚 Más Información

Lee el `README.md` completo para:
- Estructura detallada del proyecto
- Métodos alternativos de deploy
- Decisiones de diseño técnicas
- Información sobre testing

## ⌨️ Atajos de Teclado

- `Espacio` o `Enter`: Iniciar/Pausar
- `R`: Reiniciar temporizador

---

**¿Listo para ser productivo? ¡Empieza ahora! 🍅**
