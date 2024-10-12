import { useSidebarMenu } from '@/context/sidebar-context';
import BackLink from '../back-link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { CameraOffIcon } from 'lucide-react';

export default function SidebarDetails() {
  const { setSidebarItemList, state } = useSidebarMenu();
  const queryClient = useQueryClient();

  const itemMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/items/${id}`, {
        method: 'DELETE',
      });

      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.message);
      }

      return resData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['items'],
      });
      setSidebarItemList();
    },
  });

  if (!state.item) return null;

  return (
    <>
      <BackLink onClick={() => setSidebarItemList()} />

      <div className="bg-gray-200 rounded-3xl w-[300px] h-[220px] mt-8 mb-12 overflow-hidden flex items-center justify-center">
        {state.item.imageUrl ? (
          <img
            src={state.item.imageUrl}
            alt={state.item.name + ' image'}
            className="h-full w-full"
          />
        ) : (
          <p className="flex items-center text-sm">
            <CameraOffIcon className="mr-1" />
            No Image
          </p>
        )}
      </div>

      <div className="mb-5">
        <span className="text-xs text-slate-500 font-medium mb-3">name</span>
        <h2 className="font-medium text-2xl">{state.item.name}</h2>
      </div>
      <div className="mb-5">
        <span className="text-xs text-slate-500 font-medium mb-3">
          category
        </span>
        <p className="font-medium text-lg">{state.item.category}</p>
      </div>
      <div className="mb-5">
        <span className="text-xs text-slate-500 font-medium mb-3">note</span>
        <p className="font-medium text-lg">
          {state.item.note ? state.item.note : 'No note'}
        </p>
      </div>

      <div className="absolute w-full bottom-0 right-0 flex items-center justify-center py-8 space-x-5">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="font-bold text-slate-800 px-6 py-5 rounded-xl hover:bg-main/20">
              delete
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this item?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 hover:bg-red-700"
                onClick={() => itemMutation.mutate(state.item!.id)}
              >
                Yes
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <button className="bg-main text-white font-bold px-6 py-5 rounded-xl">
          Add to list
        </button>
      </div>
    </>
  );
}
