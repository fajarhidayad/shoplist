import BackLink from '@/components/back-link';
import TitleText from '@/components/TitleText';
import { createFileRoute } from '@tanstack/react-router';
import { CalendarDaysIcon } from 'lucide-react';

export const Route = createFileRoute('/(auth)/_layout/history/$id')({
  component: HistoryDetailsPage,
});

function HistoryDetailsPage() {
  return (
    <>
      <BackLink href="/history" />

      <TitleText className="mt-9 mb-4">Grocery List</TitleText>
      <div className="flex items-center space-x-3 mb-12">
        <CalendarDaysIcon className="text-slate-400" />
        <p className="font-medium text-xs text-slate-400">Sat 20 9 2024</p>
      </div>

      <section className="mb-16">
        <h2 className="font-medium text-lg text-slate-800 mb-4">Beverages</h2>
        <ul className="grid grid-cols-4 gap-5">
          <DetailsItem name="Arabica Coffee" quantity={3} />
          <DetailsItem name="Arabica Coffee" quantity={3} />
        </ul>
      </section>
    </>
  );
}

function DetailsItem(props: { name: string; quantity: number }) {
  return (
    <li className="bg-white py-3 px-4 flex items-center justify-between font-medium rounded-xl shadow">
      <p>{props.name}</p>
      <p className="text-main font-bold text-xs">{props.quantity} pcs</p>
    </li>
  );
}
