"use client"; // Marca este archivo como componente de cliente (usa hooks y eventos).

import { useRouter } from "next/navigation"; // Hook para navegar sin recargar la página.
import { useState } from "react"; // Hook para estado local del formulario.

export default function RegisterPage() { // Componente de la página /register.
  const router = useRouter(); // Inicializa router para redirecciones.

  const [loading, setLoading] = useState(false); // Controla estado de “enviando…”.
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Guarda errores para mostrarlos.

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) { // Función que corre al enviar el formulario.
    e.preventDefault(); // Evita el refresco del navegador.
    setErrorMessage(null); // Limpia el error anterior.
    setLoading(true); // Enciende el estado de carga.

    const form = e.currentTarget; // Referencia al <form>.
    const emailInput = form.elements.namedItem("email"); // Busca el input con name="email".
    const passwordInput = form.elements.namedItem("password"); // Busca el input con name="password".

    const email = emailInput instanceof HTMLInputElement ? emailInput.value.trim() : ""; // Lee el email de forma segura.
    const password = passwordInput instanceof HTMLInputElement ? passwordInput.value : ""; // Lee la contraseña de forma segura.

    try { // Bloque para capturar errores de red.
      const res = await fetch("/api/register", { // Llama a nuestro endpoint del servidor.
        method: "POST", // Usamos POST para enviar credenciales en el body.
        headers: { "Content-Type": "application/json" }, // Indicamos que enviamos JSON.
        body: JSON.stringify({ email, password }), // Enviamos email y password al backend.
      }); // Espera respuesta del servidor.

      const data = (await res.json()) as { ok?: boolean; error?: string }; // Convierte la respuesta a objeto.

      if (!res.ok) { // Si el backend devolvió error…
        setErrorMessage(data.error ?? "no se pudo registrar"); // Muestra el mensaje (o uno genérico).
        return; // Salimos sin redirigir.
      } // Fin del if.

      if (data.ok) { // Si el registro fue correcto…
        router.push("/login"); // Enviamos al usuario a la página de login.
      } // Fin del if.
    } catch { // Si falla la red o fetch…
      setErrorMessage("no hay conexión con el servidor"); // Mensaje de error de conexión.
    } finally { // Siempre se ejecuta al terminar.
      setLoading(false); // Apaga el estado de carga.
    } // Fin del try/catch/finally.
  } // Fin de handleRegister.

  return ( // JSX que se renderiza en /register.
    <div className="page-gutter-x flex min-h-dvh items-center justify-center bg-black text-white"> {/* Contenedor centrado. */}
      <div className="w-full max-w-md bg-black/80 p-6"> {/* Caja del formulario. */}
        <h1 className="font-optimus text-2xl uppercase tracking-[0.06em]">Register</h1> {/* Título de la página. */}

        <form className="mt-6 space-y-4" onSubmit={handleRegister} noValidate> {/* Formulario controlado por JS. */}
          <div className="space-y-2"> {/* Grupo email. */}
            <label className="font-lore text-white/85" htmlFor="register-email">Email address</label> {/* Etiqueta del email. */}
            <input id="register-email" name="email" type="email" required className="w-full border border-white/10 bg-black/20 p-3 text-white" /> {/* Campo email. */}
          </div> {/* Fin grupo email. */}

          <div className="space-y-2"> {/* Grupo password. */}
            <label className="font-lore text-white/85" htmlFor="register-password">Password</label> {/* Etiqueta password. */}
            <input id="register-password" name="password" type="password" required className="w-full border border-white/10 bg-black/20 p-3 text-white" /> {/* Campo password. */}
          </div> {/* Fin grupo password. */}

          <button type="submit" disabled={loading} className="w-full border border-white/10 bg-black/30 p-3 text-white disabled:opacity-60"> {/* Botón submit. */}
            {loading ? "Creating..." : "Create account"} {/* Texto del botón según loading. */}
          </button> {/* Fin botón. */}

          {errorMessage ? ( // Si hay error, lo mostramos.
            <p className="font-lore text-sm text-red-300/90" role="alert">{errorMessage}</p> // Texto de error.
          ) : null} {/* Si no hay error, no renderiza nada. */}
        </form> {/* Fin formulario. */}
      </div> {/* Fin caja. */}
    </div> // Fin contenedor.
  ); // Fin return.
} // Fin componente.

