import { Outlet } from 'react-router';
import { Header } from './Header';

export function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto w-full max-w-6xl px-4 py-8 justify-items-center">
        <Outlet />
      </main>
    </div>
  );
}
