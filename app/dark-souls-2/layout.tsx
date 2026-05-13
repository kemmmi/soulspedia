import Image from "next/image";

export default function DarkSouls2Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0">
        <Image
          src="/fondodarksouls2.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="pointer-events-none fixed inset-0 z-[1] bg-black/30" aria-hidden />
      <div className="relative z-10 flex min-h-0 min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
