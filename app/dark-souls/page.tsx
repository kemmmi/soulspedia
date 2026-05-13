import Image from "next/image";
import LoreEffects from "@/components/LoreEffects";

export default function DarkSoulsPage() {
  // Asegúrate de que este nombre sea EXACTO al del archivo en /public
  const imageName = "fondoartorias.png"; 

  return (
    <main className="relative flex min-h-0 w-full flex-1 flex-col overflow-x-hidden bg-black antialiased">
      {/* IMAGEN DE FONDO FORZADA */}
      <div className="fixed inset-0 z-0">
        <Image
          src={`/${imageName}`}
          alt="Dark Souls Background"
          fill
          priority
          quality={100}
          className="object-cover object-center"
        />
        {/* Capa de oscuridad sobre la imagen para legibilidad */}
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      </div>

      {/* Ascuas + bloque WORLD: flex-1 para encajar en el viewport bajo el header (sin scroll fantasma) */}
      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <LoreEffects
          realmName="Lordran"
          description="In the Age of Ancients, the world was unformed — shrouded by fog, a land of grey crags, archtrees and everlasting dragons."
          readMoreHref="/dark-souls/characters"
        />
      </div>

    </main>
  );
}