export type GameSlug = "ds1" | "ds2" | "ds3";

export interface ForumPost {
  id: string;
  game: GameSlug;
  title: string;
  body: string;
  author_id: string;
  author_name: string | null;
  created_at: string;
}
