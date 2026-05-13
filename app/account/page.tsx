"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function getUserDisplayName(user: { user_metadata?: Record<string, unknown> } | null) {
  const meta = (user?.user_metadata ?? {}) as Record<string, unknown>;
  const fromMeta =
    (typeof meta.full_name === "string" && meta.full_name) ||
    (typeof meta.name === "string" && meta.name) ||
    (typeof meta.preferred_username === "string" && meta.preferred_username) ||
    null;
  return fromMeta;
}

export default function AccountPage() {
  const router = useRouter();

  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentName, setCurrentName] = useState<string | null>(null);

  const [nameDraft, setNameDraft] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [savingName, setSavingName] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    async function init() {
      const { data } = await supabase.auth.getUser();
      if (!alive) return;
      const userEmail = data.user?.email ?? null;
      const userName = getUserDisplayName(data.user ?? null);
      setEmail(userEmail);
      setCurrentName(userName);
      setNameDraft(userName ?? "");
      setLoading(false);

      if (!userEmail) {
        router.replace("/login");
      }
    }

    void init();

    return () => {
      alive = false;
    };
  }, [router]);

  async function handleSaveName() {
    setNotice(null);
    setError(null);
    const trimmed = nameDraft.trim();
    if (!trimmed) {
      setError("El nombre no puede estar vacío.");
      return;
    }

    setSavingName(true);
    const { data, error: updateError } = await supabase.auth.updateUser({
      data: { full_name: trimmed },
    });
    setSavingName(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setCurrentName(getUserDisplayName(data.user ?? null));
    setNotice("Nombre actualizado.");
  }

  async function handleChangePassword() {
    setNotice(null);
    setError(null);

    if (!newPassword) {
      setError("La contraseña no puede estar vacía.");
      return;
    }
    if (newPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setSavingPassword(true);
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });
    setSavingPassword(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setNewPassword("");
    setConfirmPassword("");
    setNotice("Contraseña actualizada.");
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  return (
    <div className="page-gutter-x flex min-h-dvh items-center justify-center bg-black text-white">
      <div className="w-full max-w-lg bg-black/70 p-6">
        <h1 className="font-optimus text-2xl uppercase tracking-[0.06em] text-white/90">
          Account
        </h1>

        <div className="mt-6 space-y-3 font-lore text-white/80">
          <p>{loading ? "Loading..." : email ? `Signed in as ${email}` : "Not signed in"}</p>
          <p>{loading ? "" : currentName ? `Name: ${currentName}` : "Name: (not set)"}</p>
        </div>

        {notice ? (
          <p className="mt-4 font-lore text-sm text-emerald-200/85" role="status">
            {notice}
          </p>
        ) : null}

        {error ? (
          <p className="mt-4 font-lore text-sm text-red-300/90" role="alert">
            {error}
          </p>
        ) : null}

        <div className="mt-8 space-y-8">
          <section className="space-y-3">
            <h2 className="font-optimus text-sm uppercase tracking-[0.14em] text-white/70">
              Change name
            </h2>

            <div className="space-y-2">
              <label className="font-lore text-white/70" htmlFor="account-name">
                Display name
              </label>
              <input
                id="account-name"
                value={nameDraft}
                onChange={(e) => setNameDraft(e.target.value)}
                className="font-lore w-full border border-white/10 bg-black/20 p-3 text-white/90 outline-none focus:border-white/20"
              />
            </div>

            <button
              type="button"
              onClick={handleSaveName}
              disabled={savingName || loading}
              className="w-full border border-white/10 bg-black/30 p-3 font-lore text-white/85 transition-colors hover:bg-black/40 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {savingName ? "Saving..." : "Save name"}
            </button>
          </section>

          <section className="space-y-3">
            <h2 className="font-optimus text-sm uppercase tracking-[0.14em] text-white/70">
              Change password
            </h2>

            <div className="space-y-2">
              <label className="font-lore text-white/70" htmlFor="account-new-password">
                New password
              </label>
              <input
                id="account-new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="font-lore w-full border border-white/10 bg-black/20 p-3 text-white/90 outline-none focus:border-white/20"
              />
            </div>

            <div className="space-y-2">
              <label className="font-lore text-white/70" htmlFor="account-confirm-password">
                Confirm new password
              </label>
              <input
                id="account-confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="font-lore w-full border border-white/10 bg-black/20 p-3 text-white/90 outline-none focus:border-white/20"
              />
            </div>

            <button
              type="button"
              onClick={handleChangePassword}
              disabled={savingPassword || loading}
              className="w-full border border-white/10 bg-black/30 p-3 font-lore text-white/85 transition-colors hover:bg-black/40 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {savingPassword ? "Saving..." : "Update password"}
            </button>
          </section>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-8 w-full border border-white/10 bg-black/30 p-3 font-lore text-white/85 transition-colors hover:bg-black/40"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

