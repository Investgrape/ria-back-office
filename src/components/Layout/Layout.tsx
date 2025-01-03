import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '../ui/button';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:hidden fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-40">
        <div className="flex h-16 items-center gap-x-4 px-4 sm:px-6 lg:px-0">
          <Button
            variant="ghost"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </Button>
        </div>
      </div>

      <main className="lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;