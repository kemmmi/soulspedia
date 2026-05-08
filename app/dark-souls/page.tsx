import Image from "next/image";
import LoreEffects from "@/components/LoreEffects";

export default function DarkSoulsPage() {
  // Asegúrate de que este nombre sea EXACTO al del archivo en /public
  const imageName = "darksoulsfondo3.jpg"; 

  return (
    <main className="relative min-h-screen min-w-0 w-full overflow-x-hidden bg-black antialiased">
      
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

      {/* COMPONENTE DE LORE (Texto y partículas) */}
      <div className="relative z-10">
        <LoreEffects />
      </div>

    </main>
  );
}