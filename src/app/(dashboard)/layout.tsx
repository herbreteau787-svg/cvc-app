import Link from "next/link";
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const items = [
    { href: "/calcul", label: "Calcul thermique" },
    { href: "/plomberie", label: "Plomberie" },
    { href: "/synthese", label: "Synthèse projet" },
    { href: "/export", label: "Export" },
  ];
  return (
    <div className="flex min-h-screen">
      <aside className="w-56 border-r p-4 space-y-2">
        <h2 className="font-bold mb-4">CVC Master</h2>
        {items.map(i => <Link key={i.href} href={i.href} className="block p-2 rounded hover:bg-gray-100">{i.label}</Link>)}
      </aside>
      <section className="flex-1 p-6">{children}</section>
    </div>
  );
}