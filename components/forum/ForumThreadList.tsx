import Link from "next/link";
import { createSupabaseServer } from "@/lib/supabase-server";
import { ForumThreadCard } from "@/components/forum/ForumThreadCard";
import type { GameSlug, ForumPost } from "@/types/forum";

const GAME_BASE: Record<GameSlug, string> = {
  ds1: "/dark-souls",
  ds2: "/dark-souls-2",
  ds3: "/dark-souls-3",
};

interface Props {
  game: GameSlug;
}

export async function ForumThreadList({ game }: Props) {
  const supabase = createSupabaseServer();
  const { data: posts, error } = await supabase
    .from("forum_posts")
    .select("*")
    .eq("game", game)
    .order("created_at", { ascending: false })
    .returns<ForumPost[]>();

  const base = GAME_BASE[game];
  const count = posts?.length ?? 0;

  return (
    <div className="w-full max-w-3xl lg:max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <p className="font-lore text-sm text-white/35">
          {count} {count === 1 ? "thread" : "threads"}
        </p>
        <Link
          href={`${base}/forum/new`}
          className="font-optimus text-xs uppercase tracking-[0.14em] border border-white/10 px-4 py-2 text-white/55 transition-colors duration-300 hover:border-white/25 hover:text-amber-100/80"
        >
          New Thread
        </Link>
      </div>

      {error ? (
        <p className="font-lore text-sm text-red-300/70">
          Could not load threads.
        </p>
      ) : !posts || posts.length === 0 ? (
        <div className="border border-white/5 bg-white/[0.02] px-6 py-10 text-center">
          <p className="font-lore text-sm text-white/35">
            No threads yet. Be the first to open one.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {posts.map((post) => (
            <ForumThreadCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
