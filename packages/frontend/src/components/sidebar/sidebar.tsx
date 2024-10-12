import { useSidebarMenu } from '@/context/sidebar-context';
import SidebarList from './sidebar-list';
import SidebarForm from './sidebar-form';
import SidebarDetails from './sidebar-details';

export default function Sidebar() {
  const { state } = useSidebarMenu();

  return (
    <aside className="w-[400px] bg-[#FFF0DE] px-12 py-10 flex flex-col relative">
      {state.menu === 'list' && <SidebarList />}
      {state.menu === 'form' && <SidebarForm />}
      {state.menu === 'details' && <SidebarDetails />}
    </aside>
  );
}
