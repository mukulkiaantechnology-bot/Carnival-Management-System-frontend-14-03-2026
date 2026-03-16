import { useState, useRef, useEffect } from 'react';
import { Menu, Bell, UserCircle, LogOut, User, Settings, ChevronDown, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

const MOCK_NOTIFICATIONS = [
  { id: 1, text: 'New employee "Sarah Wilson" added', time: '5m ago', type: 'info', icon: Info },
  { id: 2, text: 'Safety inspection due in 2 hours', time: '1h ago', type: 'warning', icon: AlertCircle },
  { id: 3, text: 'Shift log approved by Admin', time: '2h ago', type: 'success', icon: CheckCircle2 },
];

export function Navbar({ toggleSidebar }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

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
    if (path === '/' || path === '/hr-dashboard' || path.includes('dashboard')) return 'Portal Overview';
    if (path.includes('/hr/employees')) return 'Employee Directory';
    if (path.includes('/hr/training-library')) return 'Training Library';
    if (path.includes('/hr/employee-training')) return 'Employee Training Tracking';
    if (path.includes('/hr/training/add')) return 'Upload Training Module';
    if (path.match(/\/hr\/training\/\d+/)) return 'Training Details';
    if (path.match(/\/hr\/training-progress\/\d+/)) return 'Employee Training Progress';
    if (path === '/settings') return 'System Settings';
    return 'Portal Overview';
  };

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-20">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSidebar}
            className="lg:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
            aria-label="Toggle Sidebar"
          >
            <Menu size={24} />
          </button>
          
          <div className="hidden lg:flex items-center gap-4">
            {!['maintenance_manager', 'maintenance'].includes(user?.role) && 
             !['Portal Overview', 'System Settings'].includes(getPageTitle(location.pathname)) && (
              <h2 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-500 bg-clip-text text-transparent">
                {getPageTitle(location.pathname)}
              </h2>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={() => {
                setShowNotifications(!showNotifications);
                setIsProfileOpen(false);
              }}
              className={`p-2 rounded-full transition-all duration-200 ${
                showNotifications ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:text-slate-500 hover:bg-slate-50'
              } relative`}
            >
              <Bell size={20} />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                  <h3 className="font-bold text-slate-800 text-sm">Notifications</h3>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">3 New</span>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {MOCK_NOTIFICATIONS.map((notif) => (
                    <div key={notif.id} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer group">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg shrink-0 ${
                          notif.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 
                          notif.type === 'warning' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
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
                <button className="w-full p-3 text-xs font-bold text-slate-500 hover:text-blue-600 hover:bg-slate-50 transition-colors border-t border-slate-50">
                  View All Notifications
                </button>
              </div>
            )}
          </div>
          
          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button 
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setShowNotifications(false);
              }}
              className="flex items-center space-x-1 sm:space-x-3 border-l border-slate-200 pl-2 sm:pl-4 py-1 group"
            >
              <div className="text-right hidden md:block max-w-[150px]">
                <p className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors truncate">
                  {user?.email?.split('@')[0]}
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {user?.role?.replace('_', ' ')}
                </p>
              </div>
              <div className="relative">
                <UserCircle size={28} className="sm:w-8 sm:h-8 text-slate-400 group-hover:text-blue-600 transition-colors" />
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
                      navigate('/settings?tab=profile');
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-xl transition-all"
                  >
                    <User size={18} />
                    My Profile
                  </button>
                  <button 
                    onClick={() => {
                      navigate('/settings?tab=security');
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-xl transition-all"
                  >
                    <Settings size={18} />
                    Account Settings
                  </button>
                </div>

                <div className="p-2 border-t border-slate-50">
                  <button 
                    onClick={() => {
                      logout();
                      setIsProfileOpen(false);
                    }}
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
  );
}
