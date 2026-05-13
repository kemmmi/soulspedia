// Endpoint de Next.js (App Router): responde a /api/register. // Explica qué ruta atiende este archivo.
import { createClient } from "@supabase/supabase-js"; // Importa el cliente de Supabase para usar Auth en el servidor.

// Maneja peticiones POST a /api/register. // Indica el método HTTP soportado.
export async function POST(req: Request) { // Recibe el objeto Request del navegador.
  // Intentamos leer el body como JSON. // El body debe venir en formato JSON.
  let body: { email?: string; password?: string }; // Declaramos la forma esperada del JSON.
  try { // Abrimos un bloque try para capturar errores de parseo.
    body = await req.json(); // Convierte el body del POST a objeto.
  } catch { // Si el body no es JSON válido…
    return Response.json({ ok: false, error: "cuerpo inválido" }, { status: 400 }); // Devuelve 400 Bad Request.
  } // Fin del try/catch.

  // Normalizamos los campos recibidos. // Preparación de datos antes de llamar a Supabase.
  const email = body.email?.trim() ?? ""; // Recorta espacios y asegura string.
  const password = body.password ?? ""; // Asegura string para la contraseña.

  // Validación mínima: email y password obligatorios. // Evita llamadas inútiles a Supabase.
  if (!email || !password) { // Comprueba que ambos existan.
    return Response.json( // Devuelve JSON de error.
      { ok: false, error: "email y contraseña son obligatorios" }, // Mensaje para el cliente.
      { status: 400 }, // Código 400 por petición inválida.
    ); // Fin del return.
  } // Fin del if.

  // Leemos variables de entorno del proyecto. // Configuración necesaria para Supabase.
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // URL del proyecto Supabase.
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Clave pública (anon) del proyecto.

  // Si falta configuración, no podemos registrar. // Seguridad/robustez.
  if (!supabaseUrl || !supabaseAnonKey) { // Comprueba que existan.
    return Response.json( // Respuesta JSON con error.
      { ok: false, error: "configuración de supabase incompleta" }, // Mensaje de error.
      { status: 503 }, // 503 si el servicio no está listo/configurado.
    ); // Fin del return.
  } // Fin del if.

  // Creamos el cliente Supabase para esta petición. // Cliente sin estado.
  const supabase = createClient(supabaseUrl, supabaseAnonKey); // Instancia lista para usar Auth.

  // Registramos el usuario con email y contraseña. // Crea usuario en Authentication > Users.
  const { data, error } = await supabase.auth.signUp({ // Llama al método de registro.
    email, // Email del usuario.
    password, // Contraseña del usuario.
  }); // Fin de la llamada signUp.

  // Si Supabase devuelve error (email ya usado, password débil, etc.). // Manejo de fallos.
  if (error) { // Comprueba si hay error.
    return Response.json( // Respuesta JSON de error.
      { ok: false, error: error.message }, // Devuelve el motivo real que da Supabase.
      { status: 400 }, // 400 porque la petición no pudo completarse por datos/reglas.
    ); // Fin del return.
  } // Fin del if.

  // Si el registro fue correcto. // Respuesta de éxito al cliente.
  return Response.json( // Devuelve JSON de éxito.
    { ok: true, email: data.user?.email ?? null }, // Devuelve email del usuario creado.
    { status: 200 }, // 200 OK.
  ); // Fin del return.
} // Fin del handler POST.

