import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Clock, ClipboardCheck, Wrench, 
  DollarSign, Ticket, GraduationCap, FileText, Calendar, 
  BarChart, Settings, X, Menu
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Employees', icon: Users, path: '/employees' },
  { name: 'Time Clock', icon: Clock, path: '/time-clock' },
  { name: 'Inspections', icon: ClipboardCheck, path: '/inspections' },
  { name: 'Maintenance', icon: Wrench, path: '/maintenance' },
  { name: 'Financial', icon: DollarSign, path: '/financial' },
  { name: 'Ticket Sales', icon: Ticket, path: '/tickets' },
  { name: 'Training', icon: GraduationCap, path: '/training' },
  { name: 'Contracts', icon: FileText, path: '/contracts' },
  { name: 'Calendar', icon: Calendar, path: '/calendar' },
  { name: 'Reports', icon: BarChart, path: '/reports' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

export function Sidebar({ isOpen, toggleSidebar }) {
  const { user } = useAuth();
  
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-800/50 z-20 lg:hidden transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar container */}
      <aside className={`fixed top-0 left-0 z-30 h-screen w-64 bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200 sticky top-0 bg-white">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">CarnivalMS</span>
          <button onClick={toggleSidebar} className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-md">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-3">
            Navigation
          </p>
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                <item.icon className={`mr-3 h-5 w-5 flex-shrink-0 ${item.path === '/' ? 'text-blue-500' : ''}`} />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
