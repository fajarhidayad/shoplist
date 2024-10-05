import TitleText from '@/components/TitleText'
import { useSidebarMenu } from '@/context/sidebar-context'
import { createFileRoute } from '@tanstack/react-router'
import { PlusIcon, SearchIcon } from 'lucide-react'
import { ReactNode } from 'react'

export const Route = createFileRoute('/_user/items')({
  component: ItemsPage,
})

function ItemsPage() {
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

      <section>
        <h2 className="font-medium text-lg mb-4">Fruit and vegetables</h2>
        <ul className="grid grid-cols-4 gap-x-5">
          <ShopItem>Avocado</ShopItem>
        </ul>
      </section>
    </>
  )
}

function ShopItem(props: { children: ReactNode }) {
  const { dispatch } = useSidebarMenu()

  return (
    <li
      onClick={() => dispatch({ type: 'SET_MENU_TYPE', payload: 'details' })}
      className="bg-white rounded-xl px-4 py-3 flex justify-between items-center shadow cursor-pointer"
    >
      <p className="font-medium">{props.children}</p>
      <button
        onClick={(e) => {
          e.stopPropagation()
        }}
        className="text-slate-400 rounded-full hover:bg-main/20 p-1"
      >
        <PlusIcon />
      </button>
    </li>
  )
}
