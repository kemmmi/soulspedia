export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-black">
      <div className="max-w-3xl text-center">
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
