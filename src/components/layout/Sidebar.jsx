import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Users, Clock, ClipboardCheck, Wrench,
  DollarSign, Ticket, GraduationCap, FileText, Calendar,
  BarChart, Settings, X, Store, Scan, HandCoins, ClipboardList, FileBarChart
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// Default Admin navigation (Local Refined)
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

const hrNavItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/hr-dashboard' },
  { name: 'Employees', icon: Users, path: '/hr/employees' },
  { name: 'Training Library', icon: GraduationCap, path: '/hr/training-library' },
  { name: 'Employee Training', icon: ClipboardCheck, path: '/hr/employee-training' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

const maintenanceMenu = [
  { name: "Dashboard", path: "/maintenance/dashboard", icon: LayoutDashboard },
  { name: "Work Orders", path: "/maintenance/work-orders", icon: ClipboardList },
  { name: "Maintenance Reports", path: "/maintenance/reports", icon: FileBarChart },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

import logo from '../../assets/logo.png';

export function Sidebar({ isOpen, toggleSidebar }) {
  const { user } = useAuth();
  const role = user?.role;

  // Operations roles navigation (Remote)
  const opsNavItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/operations/dashboard' },
    { name: 'Inspections', icon: ClipboardCheck, path: '/operations/inspections' },
    { name: 'Events', icon: Calendar, path: '/operations/events' },
    { name: 'Employees', icon: Users, path: '/operations/employees' },
    { name: 'Reports', icon: BarChart, path: '/operations/reports' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  // Ticket roles navigation (Remote)
  const ticketNavItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/tickets/dashboard' },
    { name: 'Ticket Boxes', icon: Store, path: '/tickets/boxes' },
    { name: 'Ticket Tracking', icon: Scan, path: '/tickets/tracking' },
    { name: 'Settlement', icon: HandCoins, path: '/tickets/settlement' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  let menuItems = ADMIN_NAV_ITEMS;
  let sectionTitle = 'Navigation';

  if (role === 'hr' || role === 'hr_manager') {
    menuItems = hrNavItems;
    sectionTitle = 'HR Hub';
  } else if (role === 'operations' || role === 'operations_manager') {
    menuItems = opsNavItems;
    sectionTitle = 'Operations Hub';
  } else if (role === 'ticket' || role === 'ticket_manager') {
    menuItems = ticketNavItems;
    sectionTitle = 'Ticketing Hub';
  } else if (role === 'maintenance_manager' || role === 'maintenance') {
    menuItems = maintenanceMenu;
    sectionTitle = 'Maintenance Hub';
  } else if (role === 'employee') {
    menuItems = [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/employee-dashboard' },
      { name: 'Time Clock', icon: Clock, path: '/time-clock-shared' },
      { name: 'Settings', icon: Settings, path: '/settings' },
    ];
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
        className={`fixed top-0 left-0 z-30 h-screen w-64 bg-brand-dark border-r border-brand-gold/10 transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'
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
          <p className="text-xs font-bold text-white/30 uppercase tracking-[2px] mb-6 px-3">
            {/* {sectionTitle} */}
          </p>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => isOpen && toggleSidebar()}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 text-sm font-bold rounded-xl transition-all ${isActive
                    ? 'bg-brand-red text-white shadow-lg shadow-brand-red/40'
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
