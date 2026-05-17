import { NavBar } from '@/features/navigation/components/NavBar';
import { Outlet } from 'react-router';

export function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="mx-auto w-full max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
