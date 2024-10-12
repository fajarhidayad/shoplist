import { ReactNode } from '@tanstack/react-router';
import TitleText from '../TitleText';
import { useSidebarMenu } from '@/context/sidebar-context';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { z } from 'zod';
import FieldInfo from '../field-info';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function SidebarForm() {
  const { setSidebarItemList } = useSidebarMenu();
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      name: '',
      note: '',
      image: '',
      category: '',
    },
    onSubmit: async ({ value }) => {
      itemMutation.mutate(value);
    },
    validatorAdapter: zodValidator(),
  });

  const itemMutation = useMutation({
    mutationFn: async (data: typeof form.state.values) => {
      const res = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.message);
      }

      return resData;
    },
    onSuccess: () => {
      setSidebarItemList();
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <TitleText className="font-medium mb-8">Add a new item</TitleText>
      <form.Field
        name="name"
        validators={{
          onChange: z.string().min(3),
        }}
        children={(field) => (
          <FormControl htmlFor={field.name} label="Name">
            <input
              type="text"
              id={field.name}
              name={field.name}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Enter a name"
              className="border-2 border-slate-400 rounded-xl py-5 px-4 bg-transparent focus:outline-main"
            />
            <FieldInfo
              isTouched={field.state.meta.isTouched}
              length={field.state.meta.errors.length}
            >
              {field.state.meta.errors.join(',')}
            </FieldInfo>
          </FormControl>
        )}
      />
      <form.Field
        name="note"
        validators={{
          onChange: z.string().nullish(),
        }}
        children={(field) => (
          <FormControl htmlFor={field.name} label="note (optional)">
            <textarea
              id={field.name}
              name={field.name}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Enter a note"
              className="border-2 border-slate-400 rounded-xl py-5 px-4 bg-transparent focus:outline-main"
            />
            <FieldInfo
              isTouched={field.state.meta.isTouched}
              length={field.state.meta.errors.length}
            >
              {field.state.meta.errors.join(',')}
            </FieldInfo>
          </FormControl>
        )}
      />
      <form.Field
        name="image"
        validators={{
          onChange: z.string().nullish(),
        }}
        children={(field) => (
          <FormControl htmlFor={field.name} label="Image (optional)">
            <input
              type="text"
              id={field.name}
              name={field.name}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Enter a image"
              className="border-2 border-slate-400 rounded-xl py-5 px-4 bg-transparent focus:outline-main"
            />
            <FieldInfo
              isTouched={field.state.meta.isTouched}
              length={field.state.meta.errors.length}
            >
              {field.state.meta.errors.join(',')}
            </FieldInfo>
          </FormControl>
        )}
      />
      <form.Field
        name="category"
        validators={{
          onChange: z.string().min(3),
        }}
        children={(field) => (
          <FormControl htmlFor={field.name} label="Category">
            <input
              type="text"
              id={field.name}
              name={field.name}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Enter a category"
              className="border-2 border-slate-400 rounded-xl py-5 px-4 bg-transparent focus:outline-main"
            />
            <FieldInfo
              isTouched={field.state.meta.isTouched}
              length={field.state.meta.errors.length}
            >
              {field.state.meta.errors.join(',')}
            </FieldInfo>
          </FormControl>
        )}
      />
      <div className="absolute bottom-0 right-0 flex items-center justify-center w-full space-x-5 py-8">
        <button
          type="button"
          onClick={() => setSidebarItemList()}
          className="font-bold text-slate-800 px-6 py-5 rounded-xl hover:bg-main/20"
        >
          cancel
        </button>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit}
              className="bg-main disabled:bg-main/80 text-white font-bold px-6 py-5 rounded-xl"
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          )}
        />
      </div>
    </form>
  );
}

function FormControl(props: {
  children: ReactNode;
  label: string;
  htmlFor: string;
}) {
  return (
    <div className="flex flex-col mb-4">
      <label
        htmlFor={props.htmlFor}
        className="font-medium text-sm text-slate-800 mb-1.5"
      >
        {props.label}
      </label>
      {props.children}
    </div>
  );
}
