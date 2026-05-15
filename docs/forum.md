# Foro de Soulspedia — Documentación técnica

## Qué se ha construido

Un foro funcional para los tres juegos de la trilogía Dark Souls. Cualquier visitante puede leer los posts; solo los usuarios registrados y con sesión activa pueden crear threads. Todos los datos viven en una sola tabla de Supabase. No hay tres foros distintos: hay un foro filtrado por juego.

---

## Conceptos explicados

### ¿Qué es la carpeta `types/`?

Cuando trabajas con TypeScript (el lenguaje que usa este proyecto), puedes definir la "forma" de un objeto: qué campos tiene, de qué tipo es cada uno, qué valores son válidos. A eso se le llama **tipo**.

La carpeta `types/` existe para guardar esas definiciones de forma centralizada. Si en 10 archivos distintos necesitas saber cómo es un post del foro, todos importan el tipo desde un solo sitio. Si luego añades un campo a la tabla, lo cambias en un lugar y TypeScript te avisa en todos los sitios que usan ese tipo.

```ts
// types/forum.ts

// GameSlug: solo estos tres valores son válidos como "juego"
export type GameSlug = "ds1" | "ds2" | "ds3";

// ForumPost: la forma exacta de un post como llega desde Supabase
export interface ForumPost {
  id: string;           // UUID único del post
  game: GameSlug;       // A qué juego pertenece
  title: string;        // Título del thread
  body: string;         // Cuerpo del post
  author_id: string;    // ID del usuario que lo creó (de Supabase Auth)
  author_name: string | null;  // Nombre visible (puede ser null si no tiene)
  created_at: string;   // Fecha de creación en formato ISO
}
```

Si intentas usar un campo que no existe, o poner "ds4" donde solo caben "ds1/ds2/ds3", TypeScript te lo marca como error antes de que el código llegue a ejecutarse.

---

### ¿Qué es `lib/supabase-server.ts` y por qué es distinto al de `lib/supabase.ts`?

El proyecto ya tenía `lib/supabase.ts`, que crea un cliente de Supabase **para el navegador**. Ese cliente funciona bien en componentes de React que se ejecutan en el dispositivo del usuario.

El problema es que en Next.js hay dos tipos de componentes:
- **Client Components**: se ejecutan en el navegador del usuario. Pueden usar el cliente de Supabase normal.
- **Server Components**: se ejecutan en el servidor (en el ordenador donde corre Next.js). No tienen acceso al navegador, y por tanto no pueden usar el cliente normal.

`lib/supabase-server.ts` crea un cliente de Supabase pensado para usarse en el servidor. Es técnicamente casi igual, pero se llama como una función (`createSupabaseServer()`) para que cada petición tenga su propio cliente limpio, sin mezclar datos de distintos usuarios.

```ts
// Se usa así en un Server Component:
const supabase = createSupabaseServer();
const { data: posts } = await supabase.from("forum_posts").select("*");
```

---

### ¿Qué es una política RLS y por qué es importante?

**RLS** son las siglas de **Row Level Security** (seguridad a nivel de fila). Es una función de PostgreSQL (la base de datos que usa Supabase por debajo) que permite definir reglas sobre qué filas de una tabla puede ver o modificar cada usuario.

Sin RLS, si alguien conociera la URL de tu API de Supabase y la clave pública del proyecto (que está en el código del frontend, visible para cualquiera), podría leer o escribir en cualquier tabla libremente.

Con RLS activado, Supabase comprueba en cada petición quién es el usuario que la hace y aplica las reglas que tú hayas definido.

Para el foro hemos creado dos reglas:

**Regla 1 — Lectura pública:**
```sql
create policy "Lectura pública"
  on forum_posts for select
  using (true);
```
`using (true)` significa "esta condición siempre se cumple". Cualquier persona, esté logueada o no, puede leer posts. Esto es intencional: el foro es público.

**Regla 2 — Solo el autor inserta:**
```sql
create policy "Solo el autor inserta"
  on forum_posts for insert
  with check (auth.uid() = author_id);
```
`auth.uid()` es la función de Supabase que devuelve el ID del usuario que está haciendo la petición. Esta regla dice: "solo puedes insertar un post si el `author_id` que estás enviando coincide con tu propio ID de usuario". Así es imposible crear un post haciéndose pasar por otra persona, aunque se llame directamente a la API.

**En resumen:** la clave pública de Supabase puede estar en el código del frontend sin problema, porque RLS garantiza que nadie puede hacer más de lo que las políticas permiten.

---

### ¿Qué es un Server Action y por qué no lo usamos aquí?

Un **Server Action** es una función de Next.js que se define en el servidor pero se puede llamar desde el cliente (desde un formulario o un botón). El servidor la ejecuta, tiene acceso a la base de datos, y devuelve el resultado. Es útil para operaciones que necesitan permisos de servidor o claves secretas.

En este proyecto **no lo usamos** para crear posts porque el sistema de autenticación es de navegador: cuando el usuario inicia sesión, Supabase guarda su sesión en el `localStorage` del navegador (no en cookies HTTP). Eso significa que el servidor no puede leer esa sesión fácilmente.

Lo que hacemos en su lugar es más directo: el formulario es un Client Component que:
1. Comprueba la sesión del usuario directamente desde el navegador
2. Si existe, llama a Supabase directamente desde el navegador para insertar el post
3. Supabase recibe esa llamada con el JWT del usuario y aplica las políticas RLS

La seguridad la garantiza RLS: aunque alguien intentara manipular la petición, no podría insertar un post con un `author_id` que no sea el suyo.

---

### ¿Cómo verifica el sistema si el usuario está logueado?

El formulario de nuevo thread (`ForumNewPostForm.client.tsx`) es un Client Component. Cuando se monta en el navegador, ejecuta esto:

```ts
useEffect(() => {
  async function checkAuth() {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      // No hay sesión → mandamos al login
      router.replace("/login");
      return;
    }

    // Hay sesión → guardamos el ID y el nombre del usuario
    setUserId(data.user.id);
    setAuthorName(/* nombre del user_metadata */);
    setAuthLoading(false); // ya podemos mostrar el formulario
  }
  void checkAuth();
}, [router]);
```

`supabase.auth.getUser()` le pregunta a Supabase si hay una sesión activa guardada en el navegador. Si no la hay, redirige al usuario a `/login` antes de que vea el formulario. Si la hay, muestra el formulario.

Mientras se comprueba la sesión, el componente muestra "Verifying session…" para que el usuario no vea un destello de contenido.

---

### ¿Qué pasa exactamente cuando se envía un nuevo post?

1. El usuario rellena el título y el cuerpo y pulsa "Post Thread".
2. El formulario valida que ningún campo esté vacío.
3. Llama a Supabase desde el navegador:
   ```ts
   await supabase.from("forum_posts").insert({
     game,         // "ds1", "ds2" o "ds3" según desde qué página se abrió el form
     title,
     body,
     author_id: userId,     // ID del usuario logueado
     author_name: authorName, // Nombre visible del usuario
   });
   ```
4. Supabase comprueba la política RLS: ¿coincide `author_id` con el usuario que hace la petición? Sí → inserta.
5. Si hay error (fallo de red, política RLS violada, etc.), se muestra el mensaje de error bajo el formulario.
6. Si va bien, se redirige al foro del juego y se refresca la lista de threads.

---

### ¿Cómo funciona la lista de threads?

`ForumThreadList.tsx` es un **Server Component**: se ejecuta en el servidor de Next.js antes de enviar el HTML al navegador. Hace la consulta a Supabase en el servidor y devuelve HTML ya renderizado.

```ts
const { data: posts } = await supabase
  .from("forum_posts")
  .select("*")
  .eq("game", game)           // filtra solo los posts del juego actual
  .order("created_at", { ascending: false }); // más recientes primero
```

Al ser un Server Component, la consulta no es visible en el navegador del usuario (no hay llamadas de red desde el cliente para cargar la lista inicial). Esto es mejor para rendimiento y SEO.

---

### ¿Cómo funciona la página de detalle de un post?

Cuando el usuario pulsa en un thread, va a una URL como `/dark-souls/forum/550e8400-e29b-...`. El segmento dinámico `[postId]` captura ese UUID.

La página es un Server Component que:
1. Recibe el `postId` de la URL
2. Consulta Supabase filtrando por ese ID **y** por el juego (`game = 'ds1'`). El filtro de juego evita que un post de DS2 sea accesible desde una URL de DS1.
3. Si no hay resultado, llama a `notFound()` y Next.js muestra la página 404 del proyecto.
4. Si lo hay, renderiza el título, el nombre del autor, la fecha y el cuerpo completo.

---

## Configuración de Supabase (paso manual, solo una vez)

Ejecuta este SQL en el **SQL Editor** del dashboard de Supabase:

```sql
create table forum_posts (
  id          uuid primary key default gen_random_uuid(),
  game        text not null check (game in ('ds1', 'ds2', 'ds3')),
  title       text not null,
  body        text not null,
  author_id   uuid references auth.users(id) on delete cascade,
  author_name text,
  created_at  timestamptz default now()
);

alter table forum_posts enable row level security;

create policy "Lectura pública"
  on forum_posts for select
  using (true);

create policy "Solo el autor inserta"
  on forum_posts for insert
  with check (auth.uid() = author_id);
```

---

## Estructura de archivos

```
app/
├── dark-souls/forum/
│   ├── page.tsx              ← Lista de threads (DS1)
│   ├── new/page.tsx          ← Formulario de nuevo thread (requiere auth)
│   └── [postId]/page.tsx     ← Detalle de un thread
├── dark-souls-2/forum/       ← Estructura idéntica para DS2
└── dark-souls-3/forum/       ← Estructura idéntica para DS3

components/forum/
├── ForumThreadList.tsx        ← Server Component: consulta y lista de posts
├── ForumThreadCard.tsx        ← Server Component: tarjeta individual de post
└── ForumNewPostForm.client.tsx ← Client Component: guard de auth + formulario

lib/
└── supabase-server.ts         ← Cliente Supabase para Server Components

types/
└── forum.ts                   ← Tipos TypeScript: GameSlug, ForumPost

docs/
└── forum.md                   ← Este documento
```

---

## Extensiones futuras

| Funcionalidad        | Cómo añadirla                                                         |
|----------------------|-----------------------------------------------------------------------|
| Respuestas a threads | Nueva tabla `forum_replies` con FK a `forum_posts.id`                 |
| Categorías           | Columna `category text` en `forum_posts`; filtro en `ForumThreadList` |
| Paginación           | `.range(offset, offset + PAGE_SIZE - 1)` en la query de Supabase      |
| Moderación           | Política RLS adicional + campo `deleted_at` (soft delete)             |
| Foro global `/forum` | Página que omite el filtro `.eq("game", ...)` y lista todos los posts |
| Nuevo juego          | Añadir slug en `GameSlug`, en `GAME_BASE` de los componentes y en el `check` de la tabla SQL |
