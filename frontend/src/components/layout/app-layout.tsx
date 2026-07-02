import { Sidebar } from "./sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-full bg-canvas-bg">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8 bg-contour bg-grain">
        <div className="max-w-[1400px] mx-auto animate-in">{children}</div>
      </main>
    </div>
  );
}
