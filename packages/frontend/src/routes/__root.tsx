import { AuthContext } from '@/context/auth-context';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

interface RootContext {
  auth: AuthContext;
}

export const Route = createRootRouteWithContext<RootContext>()({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
