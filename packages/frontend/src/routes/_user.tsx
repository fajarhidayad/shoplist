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
  LinkOptions,
  Outlet,
  redirect,
} from '@tanstack/react-router';
import {
  ChartColumnIcon,
  HistoryIcon,
  ListIcon,
  ShoppingCartIcon,
} from 'lucide-react';
import React from 'react';

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

const navLinkOptions: (LinkOptions & {
  label: string;
  icon: React.ReactNode;
})[] = [
  {
    label: 'items',
    to: '/items',
    icon: <ListIcon size={26} />,
  },
  {
    label: 'history',
    to: '/history',
    icon: <HistoryIcon size={26} />,
  },
  {
    label: 'statistics',
    to: '/statistics',
    icon: <ChartColumnIcon size={26} />,
  },
];

function Navbar() {
  return (
    <nav className="w-[90px] bg-white shadow flex flex-col justify-between py-12 items-center">
      <MainLogo />
      <div className="self-stretch space-y-10">
        {navLinkOptions.map((item) => (
          <Link
            {...item}
            key={item.to}
            className={
              "relative py-2.5 hover:before:scale-y-100 before:scale-y-0 before:duration-200 before:transition-transform before:absolute before:left-0 before:h-11 before:content-[''] before:bg-main before:rounded-r-full before:w-1.5 flex items-center justify-center"
            }
          >
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>{item.icon}</TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="bg-slate-800 text-white"
                  sideOffset={10}
                >
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Link>
        ))}
      </div>
      <div className="size-11 bg-main rounded-full text-white flex items-center justify-center">
        <ShoppingCartIcon />
      </div>
    </nav>
  );
}
