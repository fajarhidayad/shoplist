import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from '@tanstack/react-router';

const FALLBACK = '/items';

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ context }) => {
    const { auth } = context;
    if (auth.isAuthenticated) {
      throw redirect({
        to: FALLBACK,
      });
    }

    const res = await fetch('/api/auth/profile', {
      method: 'GET',
      credentials: 'include',
    });

    if (res.ok) {
      const profile = await res.json();
      auth.login(profile.data);
      throw redirect({
        to: FALLBACK,
      });
    }
  },
  component: () => (
    <main className="min-h-screen grid grid-cols-2">
      <section className="bg-main/80 p-14">
        <h1 className="text-3xl font-semibold text-white">ShopList</h1>
      </section>
      <section className="bg-white flex flex-col justify-center items-center">
        <Outlet />
        <Link
          to="/"
          className="text-sm text-blue-500 hover:underline text-center"
        >
          Back to home
        </Link>
      </section>
    </main>
  ),
});
