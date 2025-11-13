export default function Footer() {
  return (
    <footer className="w-full max-w-6xl mx-auto px-4 py-6 text-center">
      <p className="text-xs text-gray-500 dark:text-gray-500">
        Presiona <kbd className="px-2 py-1 bg-white/20 dark:bg-white/10 rounded">Espacio</kbd> para iniciar/pausar
        {' '}• <kbd className="px-2 py-1 bg-white/20 dark:bg-white/10 rounded">R</kbd> para reiniciar
      </p>
    </footer>
  );
}
