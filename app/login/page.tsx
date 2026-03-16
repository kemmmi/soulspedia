export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-zinc-900 border border-zinc-800 p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
            Inicia sesión en tu cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            O regístrate para empezar a comentar
          </p>
        </div>
        
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">Email</label>
              <input id="email-address" name="email" type="email" required className="relative block w-full rounded-t-md border-0 py-1.5 bg-zinc-800 text-white ring-1 ring-inset ring-zinc-700 placeholder:text-gray-500 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-stone-500 sm:text-sm sm:leading-6 px-3" placeholder="Correo electrónico" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Contraseña</label>
              <input id="password" name="password" type="password" required className="relative block w-full rounded-b-md border-0 py-1.5 bg-zinc-800 text-white ring-1 ring-inset ring-zinc-700 placeholder:text-gray-500 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-stone-500 sm:text-sm sm:leading-6 px-3" placeholder="Contraseña" />
            </div>
          </div>

          <div>
            <button type="submit" className="group relative flex w-full justify-center rounded-md bg-stone-700 px-3 py-2 text-sm font-semibold text-white hover:bg-stone-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600 transition-colors border border-stone-500">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
