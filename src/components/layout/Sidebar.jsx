import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Users, Clock, ClipboardCheck, Wrench,
  DollarSign, Ticket, GraduationCap, FileText, Calendar,
  BarChart, Settings, X, Store, Scan, HandCoins, ClipboardList, FileBarChart
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.png';

// Portal Navigation Items
const ADMIN_NAV_ITEMS = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/admin-dashboard' },
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

const OPS_NAV_ITEMS = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/operations/dashboard' },
  { name: 'Inspections', icon: ClipboardCheck, path: '/operations/inspections' },
  { name: 'Events', icon: Calendar, path: '/operations/events' },
  { name: 'Employees', icon: Users, path: '/operations/employees' },
  { name: 'Reports', icon: BarChart, path: '/operations/reports' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

const MAINTENANCE_NAV_ITEMS = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/maintenance/dashboard' },
  { name: 'Work Orders', icon: ClipboardList, path: '/maintenance/work-orders' },
  { name: 'Maintenance Reports', icon: FileBarChart, path: '/maintenance/reports' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

const EMPLOYEE_NAV_ITEMS = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/employee-dashboard' },
  { name: 'Time Clock', icon: Clock, path: '/employee-timeclock' },
  { name: 'My Tasks', icon: ClipboardCheck, path: '/employee-tasks' },
  { name: 'Training', icon: GraduationCap, path: '/employee-training' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

const HR_NAV_ITEMS = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/hr-dashboard' },
  { name: 'Employees', icon: Users, path: '/hr/employees' },
  { name: 'Training Library', icon: GraduationCap, path: '/hr/training-library' },
  { name: 'Employee Training', icon: ClipboardCheck, path: '/hr/employee-training' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

const TICKET_NAV_ITEMS = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/tickets/dashboard' },
  { name: 'Ticket Boxes', icon: Store, path: '/tickets/boxes' },
  { name: 'Ticket Tracking', icon: Scan, path: '/tickets/tracking' },
  { name: 'Settlement', icon: HandCoins, path: '/tickets/settlement' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

export function Sidebar({ isOpen, toggleSidebar }) {
  const { user } = useAuth();
  const role = user?.role;
  
  let menuItems = ADMIN_NAV_ITEMS;
  let sectionTitle = 'Portal';

  if (role === 'admin') {
    menuItems = ADMIN_NAV_ITEMS;
    sectionTitle = 'Admin Portal';
  } else if (role === 'hr' || role === 'hr_manager') {
    menuItems = HR_NAV_ITEMS;
    sectionTitle = 'HR Hub';
  } else if (role === 'operations' || role === 'operations_manager') {
    menuItems = OPS_NAV_ITEMS;
    sectionTitle = 'Operations Hub';
  } else if (role === 'ticket' || role === 'ticket_manager') {
    menuItems = TICKET_NAV_ITEMS;
    sectionTitle = 'Ticketing Hub';
  } else if (role === 'maintenance' || role === 'maintenance_manager') {
    menuItems = MAINTENANCE_NAV_ITEMS;
    sectionTitle = 'Maintenance Hub';
  } else if (role === 'employee') {
    menuItems = EMPLOYEE_NAV_ITEMS;
    sectionTitle = 'Employee Portal';
  }

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
      <aside
        className={`fixed top-0 left-0 z-30 h-screen w-64 bg-brand-navy border-r border-brand-navy transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto shadow-2xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col border-b border-white/10 sticky top-0 bg-brand-navy z-10 pt-6 pb-6 px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="h-10 w-10 overflow-hidden flex items-center justify-center bg-white rounded-xl shrink-0 shadow-lg shadow-black/20">
                <img src={logo} alt="Logo" className="h-24 w-auto object-contain scale-150" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-black text-white tracking-[1.5px] uppercase truncate">Showmensinfo</span>
              </div>
            </div>
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-md shrink-0"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-4">
          <p className="text-[10px] font-black text-white/40 uppercase tracking-[3px] mb-6 px-3">
             MANAGEMENT
          </p>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => isOpen && toggleSidebar()}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 text-sm font-bold rounded-xl transition-all ${
                    isActive
                      ? 'bg-brand-red text-white shadow-[0_10px_20px_-5px_rgba(181,18,27,0.4)]'
                      : 'text-white/70 hover:bg-brand-gold hover:text-brand-navy'
                  }`
                }
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
