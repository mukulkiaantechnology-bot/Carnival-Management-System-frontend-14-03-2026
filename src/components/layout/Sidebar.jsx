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
  { name: 'Staff', icon: Users, path: '/staff' },
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
  { name: 'Staff', icon: Users, path: '/operations/staff' },
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
  { name: 'Dashboard', icon: LayoutDashboard, path: '/staff-dashboard' },
  { name: 'Time Clock', icon: Clock, path: '/staff-timeclock' },
  { name: 'My Tasks', icon: ClipboardCheck, path: '/staff-tasks' },
  { name: 'Training', icon: GraduationCap, path: '/staff-training' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

const HR_NAV_ITEMS = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/hr-dashboard' },
  { name: 'Staff', icon: Users, path: '/hr/staff' },
  { name: 'Training Library', icon: GraduationCap, path: '/hr/training-library' },
  { name: 'Staff Training', icon: ClipboardCheck, path: '/hr/staff-training' },
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
    sectionTitle = 'Staff Portal';
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
        className={`fixed top-0 left-0 z-30 h-screen w-64 bg-brand-dark border-r border-brand-gold/10 transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-20 flex items-center border-b border-brand-gold/10 sticky top-0 bg-brand-dark z-10 px-4 gap-4">
          <div className="h-16 w-24 shrink-0 overflow-hidden flex items-center justify-center rounded-xl bg-white/5">
            <img src={logo} alt="Showmensinfo" className="h-full w-auto object-contain scale-125" />
          </div>
          <span className="text-sm font-black text-white tracking-tight uppercase truncate flex-1 ml-[-12px]">
            Showmens<span className="text-brand-gold">info</span>
          </span>
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 text-white/60 hover:bg-white/10 rounded-md shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <p className="text-[10px] font-black text-white/40 uppercase tracking-[3px] mb-6 px-3">
             {sectionTitle}
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
                      : 'text-white/70 hover:bg-brand-gold hover:text-brand-dark'
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
