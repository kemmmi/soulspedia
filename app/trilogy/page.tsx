import type { Metadata } from "next";

import { TrilogyHub } from "@/app/trilogy/TrilogyHub.client";

export const metadata: Metadata = {
  title: "Trilogy — Soulspedia",
  description:
    "Navigate the Dark Souls trilogy through an atmospheric three-panel hub.",
};

export default function TrilogyPage() {
  return <TrilogyHub />;
}
