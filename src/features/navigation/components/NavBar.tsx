import { cn } from '@/lib/utils';
import { NavLink } from 'react-router';

export function NavBar() {
  return (
    <nav>
      <div>
        <NavLink
          to="/products"
          end
          className={({ isActive }) =>
            cn(
              'flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary',
              isActive ? 'text-foreground' : 'text-muted-foreground',
            )
          }
        >
          <button className="border px-3 py-2 rounded">Manga</button>
        </NavLink>
      </div>
    </nav>
  );
}
