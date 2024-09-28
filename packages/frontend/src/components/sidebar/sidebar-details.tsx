import { useSidebarMenu } from '@/context/sidebar-context';
import BackLink from '../back-link';

export default function SidebarDetails() {
  const { dispatch } = useSidebarMenu();

  return (
    <>
      <BackLink
        onClick={() => dispatch({ type: 'SET_MENU_TYPE', payload: 'list' })}
      />

      <div className="bg-gray-300 rounded-3xl w-[300px] h-[220px] mt-8 mb-12"></div>

      <div className="mb-5">
        <span className="text-xs text-slate-500 font-medium mb-3">name</span>
        <h2 className="font-medium text-2xl">Avocado</h2>
      </div>
      <div className="mb-5">
        <span className="text-xs text-slate-500 font-medium mb-3">
          category
        </span>
        <p className="font-medium text-lg">Fruit and vegetables</p>
      </div>
      <div className="mb-5">
        <span className="text-xs text-slate-500 font-medium mb-3">note</span>
        <p className="font-medium text-lg">
          Nutrient-dense foods are those that provide substantial amounts of
          vitamins, minerals and other nutrients with relatively few calories.
          One-third of a medium avocado (50 g) has 80 calories and contributes
          nearly 20 vitamins and minerals, making it a great nutrient-dense food
          choice.
        </p>
      </div>

      <div className="absolute w-full bottom-0 right-0 flex items-center justify-center py-8 space-x-5">
        <button className="font-bold text-slate-800 px-6 py-5 rounded-xl hover:bg-main/20">
          delete
        </button>
        <button className="bg-main text-white font-bold px-6 py-5 rounded-xl">
          Add to list
        </button>
      </div>
    </>
  );
}
