
export default function CreatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout is intentionally simple, without the main sidebar or header
  return (
    <div className="min-h-screen w-full bg-background">
        {children}
    </div>
  );
}
