import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase-server";
import type { ForumPost } from "@/types/forum";

interface Props {
  params: Promise<{ postId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { postId } = await params;
  const supabase = createSupabaseServer();
  const { data } = await supabase
    .from("forum_posts")
    .select("title")
    .eq("id", postId)
    .eq("game", "ds2")
    .single<Pick<ForumPost, "title">>();

  return {
    title: data?.title
      ? `${data.title} — Dark Souls II Forum | Soulspedia`
      : "Thread — Dark Souls II Forum | Soulspedia",
  };
}

const heroTracking =
  "tracking-[0.06em] sm:tracking-[0.07em] md:tracking-[0.08em] lg:tracking-[0.09em] xl:tracking-[0.1em]";

export default async function DarkSouls2ForumPostPage({ params }: Props) {
  const { postId } = await params;
  const supabase = createSupabaseServer();
  const { data: post } = await supabase
    .from("forum_posts")
    .select("*")
    .eq("id", postId)
    .eq("game", "ds2")
    .single<ForumPost>();

  if (!post) notFound();

  const date = new Date(post.created_at).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      <div className="page-shell relative z-10 flex w-full min-w-0 flex-1 flex-col items-center pb-12 pt-6 md:pb-16 md:pt-8">
        <div className="mb-8 flex w-full max-w-3xl justify-start lg:max-w-4xl">
          <Link
            href="/dark-souls-2/forum"
            className={`text-sm font-semibold text-white/55 transition-colors hover:text-white ${heroTracking}`}
          >
            ← FORUM
          </Link>
        </div>

        <article className="w-full max-w-3xl lg:max-w-4xl">
          <header className="mb-8 border-b border-white/5 pb-6">
            <h1 className="font-optimus text-2xl uppercase tracking-[0.05em] text-white sm:text-3xl md:text-4xl">
              {post.title}
            </h1>
            <p className="mt-3 font-lore text-sm text-white/35">
              {post.author_name ?? "Undead"} · {date}
            </p>
          </header>

          <div className="font-lore text-base leading-relaxed text-[#e0e0d8] whitespace-pre-wrap md:text-lg">
            {post.body}
          </div>
        </article>
      </div>
    </div>
  );
}
