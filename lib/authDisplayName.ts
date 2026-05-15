/** Clave en user_metadata que no suelen sobrescribir los proveedores OAuth al volver a entrar. */
export const SOULSPEDIA_DISPLAY_NAME_KEY = "soulspedia_display_name";

export function getAuthDisplayName(
  user: { user_metadata?: Record<string, unknown> } | null,
): string | null {
  const meta = (user?.user_metadata ?? {}) as Record<string, unknown>;
  const custom = meta[SOULSPEDIA_DISPLAY_NAME_KEY];
  if (typeof custom === "string" && custom.trim()) return custom.trim();

  const fromMeta =
    (typeof meta.full_name === "string" && meta.full_name) ||
    (typeof meta.name === "string" && meta.name) ||
    (typeof meta.preferred_username === "string" && meta.preferred_username) ||
    null;
  return fromMeta;
}
