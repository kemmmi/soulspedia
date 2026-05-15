import Link from "next/link";
import type { ForumPost } from "@/types/forum";

const GAME_BASE: Record<string, string> = {
  ds1: "/dark-souls",
  ds2: "/dark-souls-2",
  ds3: "/dark-souls-3",
};

interface Props {
  post: ForumPost;
}

export function ForumThreadCard({ post }: Props) {
  const base = GAME_BASE[post.game] ?? "/dark-souls";
  const href = `${base}/forum/${post.id}`;
  const date = new Date(post.created_at).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Link
      href={href}
      className="group block border border-white/5 bg-white/[0.02] px-5 py-4 transition-colors duration-300 hover:border-white/15 hover:bg-white/[0.04]"
    >
      <h3 className="font-optimus text-sm uppercase tracking-[0.05em] text-amber-100/80 transition-[text-shadow] duration-300 group-hover:[text-shadow:0_0_14px_rgba(252,211,77,0.4)]">
        {post.title}
      </h3>
      <p className="mt-1.5 font-lore text-xs text-white/35">
        {post.author_name ?? "Undead"} · {date}
      </p>
    </Link>
  );
}
