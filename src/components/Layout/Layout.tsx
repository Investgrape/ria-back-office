import { Menu } from 'lucide-react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-40">
        <div className="flex h-16 items-center gap-x-4 px-4 sm:px-6 lg:px-0">
          <button
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden hover:bg-gray-50 rounded-lg"
            onClick={() => {}}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 border-r border-gray-200 bg-white px-6">
          <div className="flex h-16 shrink-0 items-center">
            <span className="text-lg font-semibold">RIA Compliance</span>
          </div>
          {/* Sidebar content will go here */}
        </div>
      </div>

      {/* Main content */}
      <main className="lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;