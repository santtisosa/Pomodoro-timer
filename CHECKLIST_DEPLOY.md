# ✅ Checklist de Deploy a GitHub Pages

## 📋 Pre-Deploy

### 1. Configuración Básica
- [ ] `package.json`: Actualizar `homepage` con tu URL de GitHub
- [ ] `vite.config.js`: Cambiar `base: '/TU-REPO/'` por el nombre de tu repositorio
- [ ] Añadir archivos de sonido en `public/sounds/` (bell.mp3, chime.mp3, ping.mp3)
  - O eliminar `INSTRUCCIONES.md` si ya los tienes

### 2. Verificación Local
```bash
# Instalar dependencias
npm install

# Iniciar dev server y probar
npm run dev
# Abrir http://localhost:5173 y verificar:
```

- [ ] El timer inicia y cuenta regresivamente
- [ ] Los sonidos se reproducen (o silencio si no añadiste archivos)
- [ ] El modal de configuración abre y cierra
- [ ] Dark mode funciona
- [ ] Las notificaciones se solicitan (permitir en el navegador)
- [ ] El progreso ring se anima correctamente
- [ ] Responsive: prueba en móvil (DevTools)
- [ ] Los atajos de teclado funcionan (Espacio, R)

### 3. Build Local
```bash
# Crear build de producción
npm run build

# Previsualizar build
npm run preview
# Abrir http://localhost:4173 y verificar que todo funciona
```

- [ ] El build se completa sin errores
- [ ] La preview funciona igual que dev
- [ ] No hay errores en la consola del navegador
- [ ] Verificar tamaño del bundle (debe ser < 500KB)

---

## 🚀 Deploy

### 4. Inicializar Git (si no está inicializado)
```bash
git init
git add .
git commit -m "Initial commit: Pomodoro Timer con glassmorphism"
```

- [ ] Git inicializado
- [ ] Primer commit creado

### 5. Crear Repositorio en GitHub
1. Ve a [GitHub](https://github.com/new)
2. Crea nuevo repositorio (ej: `pomodoro-timer`)
3. **NO inicialices con README** (ya lo tienes)

- [ ] Repositorio creado en GitHub
- [ ] Nombre del repositorio coincide con `base` en `vite.config.js`

### 6. Conectar y Push
```bash
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git branch -M main
git push -u origin main
```

- [ ] Remoto conectado
- [ ] Código subido a GitHub

### 7. Deploy con gh-pages
```bash
npm run deploy
```

Este comando:
1. Ejecuta `npm run build`
2. Sube la carpeta `dist/` a la rama `gh-pages`

- [ ] Deploy ejecutado sin errores
- [ ] Rama `gh-pages` creada en GitHub

### 8. Configurar GitHub Pages
1. Ve a tu repositorio en GitHub
2. Click en **Settings**
3. En el menú lateral, click en **Pages**
4. En **Source**, selecciona:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Click en **Save**
6. Espera 1-3 minutos

- [ ] GitHub Pages configurado
- [ ] URL aparece en la parte superior (ej: `https://TU_USUARIO.github.io/TU_REPO/`)

---

## 🧪 Post-Deploy

### 9. Verificar Deploy
Abre la URL de GitHub Pages y verifica:

- [ ] La página carga sin error 404
- [ ] El timer funciona
- [ ] Los estilos se aplican correctamente
- [ ] Dark mode funciona
- [ ] Sonidos funcionan (si los añadiste)
- [ ] Notificaciones funcionan
- [ ] No hay errores en la consola (F12)
- [ ] Funciona en móvil (prueba con tu teléfono)

### 10. Troubleshooting (si hay problemas)

**❌ Página muestra 404**
- Verifica que `base` en `vite.config.js` coincida con el nombre del repo
- Espera 5 minutos más (GitHub Pages puede tardar)
- Verifica que la rama `gh-pages` existe
- Verifica configuración de GitHub Pages (Settings → Pages)

**❌ Página carga pero sin estilos**
- Verifica `base` en `vite.config.js`
- Abre DevTools → Network y revisa que los archivos CSS/JS se cargan desde la ruta correcta
- Ejecuta `npm run deploy` de nuevo

**❌ Sonidos no funcionan**
- Añade archivos MP3 en `public/sounds/`
- O usa la función "Subir Sonido" en la configuración

**❌ Notificaciones no aparecen**
- Permite notificaciones cuando el navegador lo solicite
- GitHub Pages usa HTTPS (requerido para notificaciones)

---

## 🎉 Deploy Exitoso

Si todos los checkboxes están marcados, ¡felicitaciones! Tu Pomodoro Timer está live.

### Próximos Pasos
- [ ] Compartir la URL con amigos
- [ ] Añadir URL al README
- [ ] (Opcional) Configurar dominio personalizado
- [ ] (Opcional) Añadir Google Analytics
- [ ] (Opcional) Crear issues para mejoras futuras

### Re-Deploy (futuras actualizaciones)
Para actualizar tu app después de cambios:

```bash
# 1. Hacer cambios en el código
# 2. Commit
git add .
git commit -m "Descripción de cambios"
git push

# 3. Re-deploy
npm run deploy
```

---

## 📊 Métricas de Éxito

Una vez deployed, monitorea:
- ✅ Lighthouse Score (Performance, Accessibility, SEO)
- ✅ Tiempo de carga (debe ser < 2s)
- ✅ Bundle size (debe ser < 500KB)
- ✅ No errores en consola

Para ejecutar Lighthouse:
1. Abre DevTools (F12)
2. Ve a la pestaña "Lighthouse"
3. Click en "Analyze page load"

**Objetivo**: Todos los scores > 90

---

## 🛠️ Comandos Útiles

```bash
# Desarrollo
npm run dev              # Inicia dev server

# Producción
npm run build            # Construye para producción
npm run preview          # Previsualiza build local

# Deploy
npm run deploy           # Construye y despliega a gh-pages

# Git
git status               # Ver cambios
git add .                # Añadir todos los cambios
git commit -m "mensaje"  # Crear commit
git push                 # Subir a GitHub
```

---

**¿Listo? ¡Comienza con el checklist! 🚀**
