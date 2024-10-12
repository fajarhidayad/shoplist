import TitleText from '@/components/TitleText';
import { useSidebarMenu } from '@/context/sidebar-context';
import { CategoriesWithItemsResType, Item } from '@/lib/client';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { PlusIcon, SearchIcon } from 'lucide-react';

export const Route = createFileRoute('/_user/items')({
  component: ItemsPage,
});

function ItemsPage() {
  const { data: categories } = useQuery({
    queryKey: ['items'],
    queryFn: async () => {
      const res = await fetch('/api/items', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const resData = (await res.json()) as CategoriesWithItemsResType;

      return resData.data;
    },
  });

  return (
    <>
      <section className="flex items-start justify-between mb-14">
        <TitleText className="max-w-md">
          <span className="text-main">Shoppingify</span> allows you take your
          shopping list wherever you go
        </TitleText>
        <div className="flex items-center bg-white rounded-xl shadow px-4 py-3 space-x-5">
          <label htmlFor="search">
            <SearchIcon />
          </label>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search item"
            className="focus:outline-none"
          />
        </div>
      </section>

      {categories &&
        categories.map((category) => (
          <section key={category.id} className="mb-8">
            <h2 className="font-medium text-lg mb-4">{category.name}</h2>
            <ul className="grid grid-cols-4 gap-5">
              {category.items.map((item) => (
                <ShopItem key={item.id} item={item} category={category.name} />
              ))}
            </ul>
          </section>
        ))}
    </>
  );
}

function ShopItem(props: { item: Item; category: string }) {
  const { setSidebarItemDetails } = useSidebarMenu();

  return (
    <li
      onClick={() =>
        setSidebarItemDetails({ ...props.item, category: props.category })
      }
      className="bg-white rounded-xl px-4 py-3 flex justify-between items-center shadow cursor-pointer"
    >
      <p className="font-medium">{props.item.name}</p>
      <button
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="text-slate-400 rounded-full hover:bg-main/20 p-1"
      >
        <PlusIcon />
      </button>
    </li>
  );
}
