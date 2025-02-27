import { cn } from "@/lib/utils";

interface DocsLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function DocsLayout({ children, sidebar }: DocsLayoutProps) {
  return (
    <div className="flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
      <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
        <div className="relative px-4 pb-4 pt-6">
          {sidebar}
        </div>
      </aside>
      <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid">
        <div className="mx-auto w-full min-w-0">
          {children}
        </div>
      </main>
    </div>
  );
}
