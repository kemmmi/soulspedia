export default function JuegosPage() {

    const juegosMock = [
        { id_juego: 1, nombre: "Dark Souls", anyo_lanzamiento: 2011, descripcion: "El inicio de una era." },
        { id_juego: 3, nombre: "Elden Ring", anyo_lanzamiento: 2022, descripcion: "Levántate, Sinluz." },
    ];

    return (
        <div className="bg-black py-24 sm:py-32 min-h-screen">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Catálogo de Juegos</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-400">
                        Explora el lore y los personajes de todo el universo Souls.
                    </p>
                </div>

                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 justify-items-center">
                    {juegosMock.map((juego) => (
                        <article key={juego.id_juego} className="flex flex-col items-start justify-between p-6 bg-zinc-900 rounded-2xl shadow-lg border border-zinc-800 transition-transform hover:scale-105 w-full max-w-md">
                            <div className="flex items-center gap-x-4 text-xs">
                                <time dateTime={juego.anyo_lanzamiento.toString()} className="text-gray-500">
                                    Lanzamiento: {juego.anyo_lanzamiento}
                                </time>
                            </div>
                            <div className="group relative">
                                <h3 className="mt-3 text-2xl font-semibold leading-6 text-white group-hover:text-gray-300">
                                    <span className="absolute inset-0" />
                                    {juego.nombre}
                                </h3>
                                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-400">
                                    {juego.descripcion}
                                </p>
                            </div>
                            <div className="mt-8 flex items-center gap-x-4">
                                <button className="text-sm font-semibold text-stone-500 hover:text-stone-400 transition-colors">
                                    Ver detalles &rarr;
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
