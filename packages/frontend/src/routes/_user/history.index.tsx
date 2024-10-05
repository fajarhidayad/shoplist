import TitleText from '@/components/TitleText'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { CalendarDaysIcon, ChevronRightIcon } from 'lucide-react'

export const Route = createFileRoute('/_user/history/')({
  component: HistoryPage,
})

function HistoryPage() {
  return (
    <>
      <TitleText className="mb-10">Shopping history</TitleText>
      <section>
        <h3 className="font-medium text-slate-700 text-sm mb-4">
          September 2024
        </h3>
        <HistoryItem
          id={1}
          title="Grocery List"
          date="Sat 29 9 2024"
          status={true}
        />
        <HistoryItem
          id={2}
          title="Grocery List"
          date="Sat 29 9 2024"
          status={false}
        />
      </section>
    </>
  )
}

function HistoryItem(props: {
  id: number
  title: string
  date: string
  status: boolean
}) {
  const { navigate } = useRouter()
  return (
    <div
      onClick={() => navigate({ to: `/history/${props.id}` })}
      className="bg-white rounded-xl p-5 flex items-center shadow mb-7 cursor-pointer"
    >
      <h2 className="font-medium">{props.title}</h2>
      <CalendarDaysIcon className="ml-auto text-slate-400 mr-2.5" />
      <p className="font-medium text-xs text-slate-400">{props.date}</p>
      {props.status ? (
        <p className="border border-sky-400 text-sky-400 px-2 py-1 rounded-lg text-xs ml-6 mr-8">
          completed
        </p>
      ) : (
        <p className="border border-red-400 text-red-400 px-2 py-1 rounded-lg text-xs ml-6 mr-8">
          canceled
        </p>
      )}
      <ChevronRightIcon className="text-main" />
    </div>
  )
}
