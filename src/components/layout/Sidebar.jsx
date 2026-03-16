import {
  LayoutDashboard, Users, Clock, ClipboardCheck, Wrench,
  DollarSign, Ticket, GraduationCap, FileText, Calendar,
  BarChart, Settings, X, Store, Scan, HandCoins, ClipboardList, FileBarChart
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';

// Default navigation
const NAV_ITEMS = [
  { name: 'Dashboard',    icon: LayoutDashboard, path: '/' },
  { name: 'Employees',    icon: Users,            path: '/employees' },
  { name: 'Time Clock',   icon: Clock,            path: '/timeclock' },
  { name: 'Inspections',  icon: ClipboardCheck,   path: '/inspections' },
  { name: 'Maintenance',  icon: Wrench,           path: '/maintenance' },
  { name: 'Financial',    icon: DollarSign,       path: '/financial' },
  { name: 'Ticket Sales', icon: Ticket,           path: '/tickets' },
  { name: 'Training',     icon: GraduationCap,    path: '/training' },
  { name: 'Contracts',    icon: FileText,         path: '/contracts' },
  { name: 'Calendar',     icon: Calendar,         path: '/events' },
  { name: 'Reports',      icon: BarChart,         path: '/reports' },
  { name: 'Settings',     icon: Settings,         path: '/settings' },
];

const maintenanceMenu = [
  { name: "Dashboard", path: "/maintenance/dashboard", icon: LayoutDashboard },
  { name: "Work Orders", path: "/maintenance/work-orders", icon: ClipboardList },
  { name: "Maintenance Reports", path: "/maintenance/reports", icon: FileBarChart }
];

export function Sidebar({ isOpen, toggleSidebar }) {
  const { user } = useAuth();
  const role = user?.role;
  
  // Operations roles navigation
  const opsNavItems = [
    { name: 'Dashboard',   icon: LayoutDashboard, path: '/operations/dashboard' },
    { name: 'Inspections', icon: ClipboardCheck,  path: '/operations/inspections' },
    { name: 'Events',      icon: Calendar,        path: '/operations/events' },
    { name: 'Employees',   icon: Users,           path: '/operations/employees' },
    { name: 'Reports',     icon: BarChart,        path: '/operations/reports' },
  ];

  // Ticket roles navigation
  const ticketNavItems = [
    { name: 'Dashboard',       icon: LayoutDashboard, path: '/tickets/dashboard' },
    { name: 'Ticket Boxes',    icon: Store,           path: '/tickets/boxes' },
    { name: 'Ticket Tracking', icon: Scan,            path: '/tickets/tracking' },
    { name: 'Settlement',      icon: HandCoins,       path: '/tickets/settlement' },
  ];

  let menuItems = NAV_ITEMS;
  let sectionTitle = 'Navigation';

  if (role === 'operations' || role === 'operations_manager') {
    menuItems = opsNavItems;
    sectionTitle = 'Operations Hub';
  } else if (role === 'ticket' || role === 'ticket_manager') {
    menuItems = ticketNavItems;
    sectionTitle = 'Ticketing Hub';
  } else if (role === 'maintenance_manager') {
    menuItems = maintenanceMenu;
    sectionTitle = 'Maintenance Hub';
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-800/50 z-20 lg:hidden transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-30 h-screen w-64 bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200 sticky top-0 bg-white z-10">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            CarnivalMS
          </span>
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-md"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[2px] mb-6 px-3">
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
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
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
