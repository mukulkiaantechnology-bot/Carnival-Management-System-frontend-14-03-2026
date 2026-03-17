import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, Outlet, useNavigate, NavLink } from 'react-router-dom';
import { 
  BarChart3, Building2, ClipboardList, Settings, LogOut, 
  Menu, X, LayoutGrid, Users, Zap, Bell, Search, Globe,
  UserCircle, User, ChevronDown, CheckCircle2, AlertCircle, Info, LayoutDashboard
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.png';

const MENU_ITEMS = [
  { icon: LayoutDashboard, name: 'Dashboard', path: '/platform-admin' },
  { icon: Building2, name: 'Companies', path: '/platform-admin/companies' },
  { icon: ClipboardList, name: 'Requests', path: '/platform-admin/requests' },
  { icon: Zap, name: 'Plans', path: '/platform-admin/plans' },
  { icon: Settings, name: 'System Settings', path: '/platform-admin/settings' },
];

const MOCK_NOTIFICATIONS = [
  { id: 1, text: 'New signup from "Skyline Carnivals"', time: '2m ago', type: 'info', icon: Info },
  { id: 2, text: 'Plan "Premium" updated by System', time: '1h ago', type: 'warning', icon: AlertCircle },
  { id: 3, text: 'Payout processed for Week 11', time: '3h ago', type: 'success', icon: CheckCircle2 },
];

export default function PlatformAdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Handle window resize for sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getPageTitle = (path) => {
    return MENU_ITEMS.find(i => i.path === path)?.name || 'Platform Admin';
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-800/50 z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:relative z-50 h-full bg-white border-r border-slate-200 transition-all duration-300 ease-in-out flex-shrink-0 ${
          isSidebarOpen ? 'w-64 translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className={`h-20 flex items-center border-b border-slate-200 sticky top-0 bg-white z-10 transition-all duration-300 gap-4 ${isSidebarOpen ? 'px-4' : 'px-4 justify-center'}`}>
             <div className={`${isSidebarOpen ? 'h-16 w-24' : 'h-10 w-10'} shrink-0 overflow-hidden flex items-center justify-center rounded-xl`}>
               <img src={logo} alt="Showmensinfo" className={`h-full w-auto object-contain ${isSidebarOpen ? 'scale-125' : ''}`} />
             </div>
             {isSidebarOpen && (
               <span className="text-sm font-black text-slate-800 tracking-tight uppercase truncate flex-1 ml-[-12px]">
                 Showmens<span className="text-brand-gold">info</span>
               </span>
             )}
             {isSidebarOpen && (
               <button 
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-2 text-slate-400 hover:text-brand-red border border-transparent hover:border-brand-red/10 rounded-xl"
               >
                 <X size={20} />
               </button>
             )}
          </div>

          <div className="p-4 flex-1 overflow-y-auto no-scrollbar">
            {isSidebarOpen && (
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-6 px-3">
                Platform Admin
              </p>
            )}
            <nav className="space-y-1">
              {MENU_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-3 text-sm font-bold rounded-xl transition-all ${
                      isActive
                        ? 'bg-brand-red text-white shadow-lg shadow-brand-red/40'
                        : 'text-slate-600 hover:bg-brand-gold hover:text-brand-dark'
                    }`
                  }
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {isSidebarOpen && <span>{item.name}</span>}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header (Navbar Style) */}
        <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-20">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors lg:hidden"
              >
                <Menu size={24} />
              </button>
              
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">

              {/* Notifications */}
              <div className="relative" ref={notificationRef}>
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`p-2 rounded-full transition-all duration-200 ${
                    showNotifications ? 'bg-brand-red/10 text-brand-red' : 'text-slate-400 hover:text-brand-red hover:bg-brand-light'
                  } relative`}
                >
                  <Bell size={20} />
                  <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-brand-red ring-2 ring-white"></span>
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                    <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-brand-light/50">
                      <h3 className="font-bold text-slate-800 text-sm">Notifications</h3>
                      <span className="text-[10px] font-bold text-brand-red bg-brand-red/10 px-2 py-0.5 rounded-full uppercase tracking-wider">3 New</span>
                    </div>
                    {/* ... (replicate notification items) */}
                    <div className="max-h-[300px] overflow-y-auto">
                      {MOCK_NOTIFICATIONS.map((notif) => (
                        <div key={notif.id} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer group">
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg shrink-0 ${
                              notif.type === 'warning' ? 'bg-brand-red/10 text-brand-red' : 'bg-brand-light text-brand-red'
                            }`}>
                              <notif.icon size={16} />
                            </div>
                            <div className="space-y-1 overflow-hidden">
                              <p className="text-sm text-slate-700 leading-snug group-hover:text-slate-900 transition-colors">
                                {notif.text}
                              </p>
                              <p className="text-xs text-slate-400 font-medium">{notif.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-1 sm:space-x-3 border-l border-slate-200 pl-2 sm:pl-4 py-1 group"
                >
                  <div className="text-right hidden md:block max-w-[150px]">
                    <p className="text-sm font-bold text-slate-700 group-hover:text-brand-red transition-colors truncate">
                      {user?.email?.split('@')[0]}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {user?.role?.replace('_', ' ')}
                    </p>
                  </div>
                  <div className="relative">
                    <UserCircle size={28} className="sm:w-8 sm:h-8 text-slate-400 group-hover:text-brand-red transition-colors" />
                    <div className="absolute -bottom-0.5 -right-0.5 bg-green-500 w-2.5 h-2.5 rounded-full border-2 border-white"></div>
                  </div>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-slate-50">
                      <p className="text-sm font-bold text-slate-900 truncate">{user?.email}</p>
                      <p className="text-xs font-medium text-slate-500 capitalize mt-0.5">{user?.role?.replace('_', ' ')}</p>
                    </div>
                    
                    <div className="p-2">
                      <button 
                        onClick={() => {
                          navigate('/platform-admin/settings?tab=profile');
                          setIsProfileOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-brand-light hover:text-brand-red rounded-xl transition-all"
                      >
                        <User size={18} />
                        My Profile
                      </button>
                      <button 
                        onClick={() => {
                          navigate('/platform-admin/settings?tab=account');
                          setIsProfileOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-brand-light hover:text-brand-red rounded-xl transition-all"
                      >
                        <Settings size={18} />
                        Account Settings
                      </button>
                    </div>

                    <div className="p-2 border-t border-slate-50">
                      <button 
                        onClick={() => { logout(); navigate('/login'); }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <LogOut size={18} />
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Viewport */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 no-scrollbar bg-slate-50/50">
           <Outlet />
        </div>
      </main>
    </div>
  );
}
