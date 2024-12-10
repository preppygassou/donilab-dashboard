import ThemeToggle from '@/components/layout/ThemeToggle/theme-toggle';
import { cn } from '@/lib/utils';
/* import { MobileSidebar } from './mobile-sidebar'; */
import { UserNav } from './user-nav';

import NotificationComponent from '../auth/notification';


export default function Header() {

  return (
    <div className="flex items-center gap-2">
          <UserNav />
          <NotificationComponent/>
          <ThemeToggle />
        </div>
  );
}
