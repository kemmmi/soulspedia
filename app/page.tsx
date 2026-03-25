export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-24 overflow-hidden">
      {/* Video de fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/fondoinicio.mp4" type="video/mp4" />
      </video>

      {/* Overlay oscuro para legibilidad */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Contenido encima del video */}
      <div className="relative z-10 max-w-3xl text-center">
        <h1 className="text-5xl font-bold tracking-tight text-white mb-6">
          Bienvenido a Soulspedia
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          La enciclopedia definitiva sobre el lore, personajes y universo de los Souls.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a
            href="/juegos"
            className="rounded-md bg-stone-700 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-stone-600 border border-stone-500 transition-colors"
          >
            Explorar Juegos
          </a>
          <a
            href="/login"
            className="rounded-md bg-transparent px-6 py-3 text-sm font-semibold text-gray-300 shadow-sm ring-1 ring-inset ring-gray-600 hover:bg-gray-800 hover:text-white transition-colors"
          >
            Iniciar Sesión
          </a>
        </div>
      </div>
    </main>
  );
}
