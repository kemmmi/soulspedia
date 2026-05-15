"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { GameSlug } from "@/types/forum";

const GAME_BASE: Record<GameSlug, string> = {
  ds1: "/dark-souls",
  ds2: "/dark-souls-2",
  ds3: "/dark-souls-3",
};

interface Props {
  game: GameSlug;
}

export function ForumNewPostForm({ game }: Props) {
  const router = useRouter();
  const base = GAME_BASE[game];

  const [authLoading, setAuthLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [authorName, setAuthorName] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkAuth() {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.replace("/login");
        return;
      }
      setUserId(data.user.id);
      const meta = (data.user.user_metadata ?? {}) as Record<string, unknown>;
      const name =
        (typeof meta.full_name === "string" && meta.full_name) ||
        (typeof meta.name === "string" && meta.name) ||
        data.user.email?.split("@")[0] ||
        null;
      setAuthorName(name);
      setAuthLoading(false);
    }
    void checkAuth();
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const trimTitle = title.trim();
    const trimBody = body.trim();

    if (!trimTitle) {
      setError("The title cannot be empty.");
      return;
    }
    if (!trimBody) {
      setError("The body cannot be empty.");
      return;
    }
    if (!userId) {
      setError("You must be signed in to post.");
      return;
    }

    setSubmitting(true);

    const { error: insertError } = await supabase.from("forum_posts").insert({
      game,
      title: trimTitle,
      body: trimBody,
      author_id: userId,
      author_name: authorName,
    });

    setSubmitting(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    router.push(`${base}/forum`);
    router.refresh();
  }

  if (authLoading) {
    return (
      <p className="font-lore text-sm text-white/40">Verifying session…</p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl space-y-6 lg:max-w-4xl"
      noValidate
    >
      <div className="space-y-2">
        <label
          htmlFor="post-title"
          className="block font-optimus text-xs uppercase tracking-[0.14em] text-white/55"
        >
          Title
        </label>
        <input
          id="post-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={120}
          required
          className="font-lore w-full border border-white/10 bg-black/20 px-4 py-3 text-base text-white/90 outline-none transition-colors duration-300 focus:border-white/20 focus:bg-black/30"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="post-body"
          className="block font-optimus text-xs uppercase tracking-[0.14em] text-white/55"
        >
          Body
        </label>
        <textarea
          id="post-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={8}
          required
          className="font-lore w-full resize-y border border-white/10 bg-black/20 px-4 py-3 text-base text-white/90 outline-none transition-colors duration-300 focus:border-white/20 focus:bg-black/30"
        />
      </div>

      {error ? (
        <p className="font-lore text-sm text-red-300/90" role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="font-optimus text-xs uppercase tracking-[0.14em] border border-white/15 px-6 py-3 text-white/75 transition-colors duration-300 hover:border-amber-100/30 hover:text-amber-100/80 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Submitting…" : "Post Thread"}
        </button>
        <button
          type="button"
          onClick={() => router.push(`${base}/forum`)}
          className="font-optimus text-xs uppercase tracking-[0.14em] border border-white/5 px-6 py-3 text-white/40 transition-colors duration-300 hover:border-white/10 hover:text-white/60"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
