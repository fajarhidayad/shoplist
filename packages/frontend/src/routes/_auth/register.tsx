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

export const Route = createFileRoute('/_auth/register')({
  component: RegisterPage,
});

function RegisterPage() {
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      registerMutation.mutate(value);
    },
    validatorAdapter: zodValidator(),
  });

  const registerMutation = useMutation({
    mutationFn: async (data: typeof form.state.values) => {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.message);
      }

      return data;
    },
    onSuccess: () => {
      redirect({ to: '/items' });
    },
  });

  return (
    <div className="flex flex-col w-[400px]">
      <h1 className="text-3xl font-semibold mb-3">Sign up</h1>
      <p className="mb-3 text-sm">
        Get full benefits of carrying your shop list without worry.
      </p>
      <form
        className="bg-white shadow border rounded-xl px-5 py-8 space-y-5 mb-5"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="grid grid-cols-2 w-full max-w-sm items-center gap-x-3">
          <form.Field
            name="firstName"
            validators={{
              onChange: z
                .string()
                .min(3, 'First name must be at least 3 characters'),
            }}
            children={(field) => (
              <div>
                <Label htmlFor={field.name}>First Name</Label>
                <Input
                  type="text"
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
            name="lastName"
            validators={{
              onChange: z
                .string()
                .min(3, 'Last name must be at least 3 characters'),
            }}
            children={(field) => (
              <div>
                <Label htmlFor={field.name}>Last Name</Label>
                <Input
                  type="text"
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
        </div>
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
        {registerMutation.error && (
          <div>
            <em className="text-red-500">{registerMutation.error.message}</em>
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
              {isSubmitting ? '' : 'Register'}
            </Button>
          )}
        />
        <Separator>
          <span className="flex-shrink mx-4 text-gray-600 text-xs">or</span>
        </Separator>
        <GoogleButton />

        <p className="text-sm text-center">
          Already have an account?{' '}
          <Link
            to="/login"
            className="hover:underline text-blue-500 font-semibold"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
