import { Menu, Bell, UserCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function Navbar({ toggleSidebar }) {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-md"
        >
          <Menu size={24} />
        </button>
        
        <div className="hidden lg:block">
          <h2 className="text-xl font-semibold text-slate-800 tracking-tight">
            Dashboard Overview
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 text-slate-400 hover:text-slate-500 relative transition-colors">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
          </button>
          
          <div className="flex items-center space-x-3 border-l border-slate-200 pl-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-700">{user?.email}</p>
              <p className="text-xs font-medium text-slate-500 capitalize">{user?.role}</p>
            </div>
            <button onClick={logout} title="Logout" className="flex items-center text-slate-400 hover:text-slate-600 transition-colors">
              <UserCircle size={32} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
