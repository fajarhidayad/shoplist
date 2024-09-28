import { useSidebarMenu } from '@/context/sidebar-context';
import SidebarList from './sidebar-list';
import SidebarForm from './sidebar-form';
import SidebarDetails from './sidebar-details';

export default function Sidebar() {
  const { menu } = useSidebarMenu();

  return (
    <aside className="w-[400px] bg-[#FFF0DE] px-12 py-10 flex flex-col relative">
      {menu.type === 'list' && <SidebarList />}
      {menu.type === 'form' && <SidebarForm />}
      {menu.type === 'details' && <SidebarDetails />}
    </aside>
  );
}
