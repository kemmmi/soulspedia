"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    let alive = true;

    async function finalize() {
      const { data } = await supabase.auth.getSession();
      if (!alive) return;
      if (data.session) {
        router.replace("/");
      } else {
        router.replace("/login");
      }
    }

    void finalize();

    return () => {
      alive = false;
    };
  }, [router]);

  return (
    <div className="page-gutter-x flex min-h-dvh items-center justify-center bg-black text-white">
      <p className="font-lore text-base text-white/80">Conectando...</p>
    </div>
  );
}

