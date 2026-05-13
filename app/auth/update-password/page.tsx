"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UpdatePasswordPage() {
  const router = useRouter();

  const [ready, setReady] = useState(false); // True cuando Supabase confirma modo recuperación.
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Si la URL trae tokens del correo (#access_token=…), Supabase ya tiene sesión de recuperación.
    if (
      typeof window !== "undefined" &&
      window.location.hash.includes("access_token")
    ) {
      setReady(true);
    }

    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setReady(true);
      }
    });

    void supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setReady(true);
      }
    });

    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });
    setLoading(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setDone(true);
    router.replace("/login");
  }

  return (
    <div className="page-gutter-x flex min-h-dvh items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-black/70 p-6">
        <h1 className="font-optimus text-2xl uppercase tracking-[0.06em]">
          New password
        </h1>

        {!ready ? (
          <p className="font-lore mt-4 text-white/70">
            Abre el enlace del correo de recuperación en esta pestaña. Si ya lo
            hiciste, espera un momento…
          </p>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="font-lore text-white/70" htmlFor="new-pw">
                New password
              </label>
              <input
                id="new-pw"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="font-lore w-full border border-white/10 bg-black/20 p-3 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="font-lore text-white/70" htmlFor="confirm-pw">
                Confirm
              </label>
              <input
                id="confirm-pw"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="font-lore w-full border border-white/10 bg-black/20 p-3 text-white"
              />
            </div>

            {error ? (
              <p className="font-lore text-sm text-red-300/90" role="alert">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading || done}
              className="w-full border border-white/10 bg-black/30 p-3 font-lore text-white/85 disabled:opacity-60"
            >
              {loading ? "Saving..." : done ? "Done" : "Save password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
