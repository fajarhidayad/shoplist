import { ReactNode } from '@tanstack/react-router';
import TitleText from '../TitleText';
import { useSidebarMenu } from '@/context/sidebar-context';

export default function SidebarForm() {
  const { dispatch } = useSidebarMenu();

  return (
    <>
      <TitleText className="font-medium mb-8">Add a new item</TitleText>

      <FormControl htmlFor="name" label="Name">
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter a name"
          className="border-2 border-slate-400 rounded-xl py-5 px-4 bg-transparent focus:outline-main"
        />
      </FormControl>
      <FormControl htmlFor="note" label="note (optional)">
        <textarea
          id="note"
          name="note"
          placeholder="Enter a note"
          className="border-2 border-slate-400 rounded-xl py-5 px-4 bg-transparent focus:outline-main"
        />
      </FormControl>
      <FormControl htmlFor="image" label="Image (optional)">
        <input
          type="text"
          id="image"
          name="image"
          placeholder="Enter a image"
          className="border-2 border-slate-400 rounded-xl py-5 px-4 bg-transparent focus:outline-main"
        />
      </FormControl>
      <FormControl htmlFor="category" label="Category">
        <input
          type="text"
          id="category"
          name="category"
          placeholder="Enter a category"
          className="border-2 border-slate-400 rounded-xl py-5 px-4 bg-transparent focus:outline-main"
        />
      </FormControl>

      <div className="absolute bottom-0 right-0 flex items-center justify-center w-full space-x-5 py-8">
        <button
          onClick={() => dispatch({ payload: 'list', type: 'SET_MENU_TYPE' })}
          className="font-bold text-slate-800 px-6 py-5 rounded-xl hover:bg-main/20"
        >
          cancel
        </button>
        <button className="bg-main text-white font-bold px-6 py-5 rounded-xl">
          Save
        </button>
      </div>
    </>
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
