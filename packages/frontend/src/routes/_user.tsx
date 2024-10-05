import MainLogo from '@/assets/main-logo';
import Sidebar from '@/components/sidebar/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { SidebarContextProvider } from '@/context/sidebar-context';
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useLocation,
} from '@tanstack/react-router';
import clsx from 'clsx';
import {
  ChartColumnIcon,
  HistoryIcon,
  ListIcon,
  ShoppingCartIcon,
} from 'lucide-react';
import { ReactNode } from 'react';

export const Route = createFileRoute('/_user')({
  component: UserLayout,
  beforeLoad: async ({ context }) => {
    const { auth } = context;
    if (!auth.isAuthenticated) {
      const res = await fetch('/api/auth/profile', {
        method: 'GET',
        credentials: 'include',
      });
      if (!res.ok) {
        throw redirect({
          to: '/login',
        });
      }
      const profile = await res.json();
      auth.login(profile.data);
    }
  },
});

function UserLayout() {
  return (
    <SidebarContextProvider>
      <div className="min-h-screen bg-slate-50 flex">
        <Navbar />
        <main className="flex-1 px-20 py-9">
          <Outlet />
        </main>
        <Sidebar />
      </div>
    </SidebarContextProvider>
  );
}

function Navbar() {
  return (
    <nav className="w-[90px] bg-white shadow flex flex-col justify-between py-12 items-center">
      <MainLogo />
      <div className="self-stretch space-y-10">
        <NavLink name="items" href="/items">
          <ListIcon size={26} />
        </NavLink>
        <NavLink name="history" href="/history">
          <HistoryIcon size={26} />
        </NavLink>
        <NavLink name="statistics" href="/statistics">
          <ChartColumnIcon size={26} />
        </NavLink>
      </div>
      <div className="size-11 bg-main rounded-full text-white flex items-center justify-center">
        <ShoppingCartIcon />
      </div>
    </nav>
  );
}

function NavLink(props: { children: ReactNode; href: string; name: string }) {
  const { pathname } = useLocation();
  return (
    <Link
      to={props.href}
      className={clsx({
        "relative py-2.5 hover:before:scale-y-100 before:duration-200 before:transition-transform before:absolute before:scale-y-0 before:left-0 before:h-11 before:content-[''] before:bg-main before:rounded-r-full before:w-1.5 flex items-center justify-center":
          true,
        'before:scale-y-100': pathname === props.href,
      })}
    >
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>{props.children}</TooltipTrigger>
          <TooltipContent
            side="right"
            className="bg-slate-800 text-white"
            sideOffset={10}
          >
            <p>{props.name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Link>
  );
}
