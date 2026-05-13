// Ruta de API de Next.js: responde a /api/login (App Router).
import { createClient } from "@supabase/supabase-js"; // Cliente Supabase para llamar a Auth desde el servidor.

// Función exportada que Next invoca cuando llega un POST a /api/login.
export async function POST(req: Request) {
  // Leemos el cuerpo como JSON (el navegador enviará { email, password }).
  let body: { email?: string; password?: string }; // Objeto esperado en el JSON.
  try {
    // Intentamos parsear el body; si no es JSON válido, saltamos al catch.
    body = await req.json(); // Contenido del POST en formato objeto.
  } catch {
    // Si el body no es JSON, respondemos 400 Bad Request.
    return Response.json({ ok: false, error: "cuerpo inválido" }, { status: 400 }); // Respuesta de error al cliente.
  }

  // Guardamos email y password con tipos string (pueden ser undefined si faltan).
  const email = body.email?.trim() ?? ""; // Email sin espacios al inicio/fin, o cadena vacía.
  const password = body.password ?? ""; // Contraseña tal cual (no recortamos por si tiene espacios significativos).

  // Validación mínima: ningún campo vacío.
  if (!email || !password) {
    // Faltan datos obligatorios.
    return Response.json({ ok: false, error: "email y contraseña son obligatorios" }, { status: 400 }); // 400 = petición incorrecta.
  }

  // URL del proyecto Supabase (misma que usa el front en lib/supabase.ts).
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // Cadena o undefined si no está en .env.
  // Clave anónima de Supabase (solo operaciones permitidas por políticas RLS/Auth).
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Cadena o undefined.

  // Si falta configuración, no podemos llamar a Supabase.
  if (!supabaseUrl || !supabaseAnonKey) {
    // Servidor no configurado.
    return Response.json(
      { ok: false, error: "falta configurar NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY" },
      { status: 503 }, // 503 = servicio no disponible.
    );
  }

  // Creamos un cliente de Supabase por petición (endpoint sin estado).
  const supabase = createClient(supabaseUrl, supabaseAnonKey); // Cliente listo para Auth.

  // Intento de inicio de sesión con email y contraseña (Auth de Supabase).
  const { data, error } = await supabase.auth.signInWithPassword({ email, password }); // data: sesión/usuario si va bien; error si falla.

  // Si Supabase devuelve error (credenciales incorrectas, usuario no confirmado, etc.).
  if (error) {
    // Devolvemos el mensaje real para entender el fallo durante desarrollo.
    return Response.json({ ok: false, error: error.message }, { status: 401 }); // 401 = no autorizado.
  }

  // Si llegamos aquí, login correcto según Supabase Auth.
  return Response.json(
    {
      ok: true, // Indica éxito al front.
      email: data.user?.email ?? null, // Email del usuario (opcional mostrarlo, no es la contraseña).
    },
    { status: 200 }, // 200 OK.
  );
}
