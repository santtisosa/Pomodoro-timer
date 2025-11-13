# 🍅 Pomodoro Timer

Un temporizador Pomodoro moderno y personalizable con diseño glassmorphism.

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss)

## 🌟 Características

- ⏱️ Temporizador Pomodoro completo (Trabajo, Descanso Corto, Descanso Largo)
- ⚙️ Duraciones completamente personalizables
- 🔊 Sonidos configurables para cada etapa
- 🔔 Notificaciones de escritorio
- 🌓 Modo oscuro/claro
- 📱 Diseño responsive
- 💾 Configuración persistente
- ⌨️ Atajos de teclado

## 🚀 Instalación

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

## 📦 Construcción

```bash
# Crear build de producción
npm run build

# Previsualizar build
npm run preview
```

## 🌐 Deploy en GitHub Pages

```bash
# Desplegar
npm run deploy
```

Después de ejecutar este comando, configura GitHub Pages:
1. Ve a Settings → Pages
2. Selecciona branch `gh-pages`
3. Guarda los cambios

Tu aplicación estará disponible en: `https://TU_USUARIO.github.io/Pomodoro-timer/`

## ⌨️ Atajos de Teclado

- `Espacio` / `Enter` → Iniciar/Pausar
- `R` → Reiniciar temporizador

## 🛠️ Tecnologías

- React 18
- Vite
- Tailwind CSS
- classnames

## 📝 Configuración

### Cambiar colores

Edita `tailwind.config.js`:

```js
colors: {
  primary: {
    500: '#14b8a6', // Color principal
  }
}
```

### Añadir sonidos

Coloca archivos `.mp3` en la carpeta `public/sounds/` o usa la función "Subir Sonido" en la configuración de la aplicación.

## 📂 Estructura del Proyecto

```
src/
├── components/      # Componentes de React
├── hooks/          # Custom hooks
├── utils/          # Utilidades
├── App.jsx         # Componente principal
└── main.jsx        # Punto de entrada
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-feature`)
3. Commit tus cambios (`git commit -m 'Añade nueva feature'`)
4. Push a la rama (`git push origin feature/nueva-feature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la Licencia MIT.

## 👤 Autor

Santiago Sosa - [GitHub](https://github.com/santtisosa)
