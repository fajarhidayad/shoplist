import FieldInfo from '@/components/field-info';
import GoogleButton from '@/components/google-button';
import Separator from '@/components/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { z } from 'zod';

export const Route = createFileRoute('/_auth/login')({
  component: LoginPage,
});

interface LoginSchema {
  email: string;
  password: string;
}

function LoginPage() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value);
    },
    validatorAdapter: zodValidator(),
  });

  const mutation = useMutation({
    mutationFn: async (data: LoginSchema) => {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      if (!res.ok) {
        const errorRes = await res.json();
        const error = new Error(errorRes.message);
        throw error;
      }

      return res.json();
    },
    onSuccess: () => {
      redirect({
        to: '/items',
      });
    },
  });

  return (
    <div className="flex flex-col w-[400px]">
      <h1 className="text-3xl font-semibold mb-3">Welcome back!</h1>
      <p className="mb-3 text-sm">Lorem ipsum dolor sit amet consectetur.</p>
      <form
        onSubmit={(e) => {
          e.stopPropagation();
          e.preventDefault();
          form.handleSubmit();
        }}
        className="bg-white shadow border rounded-xl px-5 py-8 space-y-5 mb-5"
      >
        <form.Field
          name="email"
          validators={{
            onChange: z.string().email(),
          }}
          children={(field) => (
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor={field.name}>Email</Label>
              <Input
                type="email"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo
                isTouched={field.state.meta.isTouched}
                length={field.state.meta.errors.length}
              >
                {field.state.meta.errors.join(',')}
              </FieldInfo>
            </div>
          )}
        />
        <form.Field
          name="password"
          validators={{
            onChange: z
              .string()
              .min(6, 'Password must be at least 6 characters'),
          }}
          children={(field) => (
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor={field.name}>Password</Label>
              <Input
                type="password"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo
                isTouched={field.state.meta.isTouched}
                length={field.state.meta.errors.length}
              >
                {field.state.meta.errors.join(',')}
              </FieldInfo>
            </div>
          )}
        />
        {mutation.error && (
          <div>
            <em className="text-red-500">{mutation.error.message}</em>
          </div>
        )}
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              disabled={!canSubmit}
              className="w-full bg-main hover:bg-main/80 font-semibold"
            >
              {isSubmitting ? '' : 'Login'}
            </Button>
          )}
        />
        <Separator>
          <span className="flex-shrink mx-4 text-gray-600 text-xs">or</span>
        </Separator>
        <GoogleButton />

        <p className="text-sm text-center">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="hover:underline text-blue-500 font-semibold"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
