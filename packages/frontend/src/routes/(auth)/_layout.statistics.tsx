import TitleText from '@/components/TitleText';
import { createFileRoute } from '@tanstack/react-router';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export const Route = createFileRoute('/(auth)/_layout/statistics')({
  component: StatisticsPage,
});

const data = [
  { name: 'January', items: 35 },
  { name: 'February', items: 110 },
  { name: 'March', items: 35 },
  { name: 'April', items: 20 },
  { name: 'May', items: 67 },
  { name: 'June', items: 93 },
  { name: 'July', items: 34 },
];

function StatisticsPage() {
  return (
    <>
      <div className="grid grid-cols-2 gap-x-14 mb-16">
        <section>
          <TitleText className="mb-8">Top items</TitleText>
          <div className="mb-6">
            <div className="flex justify-between items-center font-medium text-lg mb-3.5">
              <p>Banana</p>
              <p>43%</p>
            </div>
            <div className="w-full h-1.5 bg-slate-300 rounded-full">
              <div
                style={{ width: '43%' }}
                className="h-1.5 bg-main rounded-full"
              />
            </div>
          </div>
          <div className="mb-6">
            <div className="flex justify-between items-center font-medium text-lg mb-3.5">
              <p>Rice</p>
              <p>35%</p>
            </div>
            <div className="w-full h-1.5 bg-slate-300 rounded-full">
              <div
                style={{ width: '35%' }}
                className="h-1.5 bg-main rounded-full"
              />
            </div>
          </div>
          <div className="mb-6">
            <div className="flex justify-between items-center font-medium text-lg mb-3.5">
              <p>Chicken</p>
              <p>22%</p>
            </div>
            <div className="w-full h-1.5 bg-slate-300 rounded-full">
              <div
                style={{ width: '22%' }}
                className="h-1.5 bg-main rounded-full"
              />
            </div>
          </div>
        </section>
        <section>
          <TitleText className="mb-8">Top Categories</TitleText>
          <div className="mb-6">
            <div className="flex justify-between items-center font-medium text-lg mb-3.5">
              <p>Fruit and vegetables</p>
              <p>43%</p>
            </div>
            <div className="w-full h-1.5 bg-slate-300 rounded-full">
              <div
                style={{ width: '43%' }}
                className="h-1.5 bg-sky-300 rounded-full"
              />
            </div>
          </div>
          <div className="mb-6">
            <div className="flex justify-between items-center font-medium text-lg mb-3.5">
              <p>Meat and Fish</p>
              <p>35%</p>
            </div>
            <div className="w-full h-1.5 bg-slate-300 rounded-full">
              <div
                style={{ width: '35%' }}
                className="h-1.5 bg-sky-300 rounded-full"
              />
            </div>
          </div>
          <div className="mb-6">
            <div className="flex justify-between items-center font-medium text-lg mb-3.5">
              <p>Pets</p>
              <p>22%</p>
            </div>
            <div className="w-full h-1.5 bg-slate-300 rounded-full">
              <div
                style={{ width: '22%' }}
                className="h-1.5 bg-sky-300 rounded-full"
              />
            </div>
          </div>
        </section>
      </div>

      <div className="w-full">
        <TitleText className="mb-10">Monthly Summary</TitleText>
        <LineChart
          width={900}
          height={300}
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line type="monotone" dataKey="items" stroke="#F9A109" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
        </LineChart>
      </div>
    </>
  );
}
