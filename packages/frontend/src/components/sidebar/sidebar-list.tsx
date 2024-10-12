import BottleSVG from '@/assets/bottle-svg';
import { useSidebarMenu } from '@/context/sidebar-context';

export default function SidebarList() {
  const { setSidebarItemForm } = useSidebarMenu();

  return (
    <>
      <section className="bg-[#80485B] rounded-3xl px-7 py-4 flex justify-between mb-11">
        <div className="relative w-[100px]">
          <BottleSVG className="absolute -top-9 -left-5 object-cover" />
        </div>
        <div>
          <p className="font-bold text-white mb-3">
            Didn’t find what you need?
          </p>
          <button
            onClick={() => setSidebarItemForm()}
            className="bg-white font-bold rounded-xl px-7 py-3 text-sm"
          >
            Add item
          </button>
        </div>
      </section>

      <div className="mb-10">
        <h2 className="text-2xl font-bold">Shopping list</h2>
      </div>

      <section className="flex-1">
        <div>
          <h3 className="text-slate-500 text-sm font-medium mb-5">
            Fruit and vegetables
          </h3>
          <ul className="space-y-6">
            <li className="flex justify-between items-center">
              <p className="font-medium text-lg">Avocado</p>
              <button className="text-main border border-main rounded-full py-2 px-5 text-xs">
                1 pcs
              </button>
            </li>
            <li className="flex justify-between items-center">
              <p className="font-medium text-lg">Avocado</p>
              <button className="text-main border border-main rounded-full py-2 px-5 text-xs">
                1 pcs
              </button>
            </li>
          </ul>
        </div>
      </section>

      <section className="absolute bottom-0 right-0 w-full bg-white px-10 py-8">
        <div className="border-2 border-main flex rounded-xl overflow-hidden">
          <input
            type="text"
            className="flex-1 pl-4 focus:outline-none font-medium"
            placeholder="Enter a name"
          />
          <button className="bg-main rounded-l-xl text-white py-5 px-6 font-bold">
            Save
          </button>
        </div>
      </section>
    </>
  );
}
