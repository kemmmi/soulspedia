export default function DarkSoulsCharactersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div
        className="pointer-events-none fixed inset-0 z-[2] bg-black/45"
        aria-hidden
      />
      <div className="relative z-[3] flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
