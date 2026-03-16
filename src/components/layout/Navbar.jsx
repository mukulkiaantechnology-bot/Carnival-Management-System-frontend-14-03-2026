import { useState, useRef, useEffect } from 'react';
import { Menu, Bell, UserCircle, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
// import logo from '../../assets/logo.png';

const MOCK_NOTIFICATIONS = [
  { id: 1, text: 'New employee "Sarah Wilson" added', time: '5m ago', type: 'info', icon: Info },
  { id: 2, text: 'Safety inspection due in 2 hours', time: '1h ago', type: 'warning', icon: AlertCircle },
  { id: 3, text: 'Shift log approved by Admin', time: '2h ago', type: 'success', icon: CheckCircle2 },
];

export function Navbar({ toggleSidebar }) {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          
          <div className="hidden lg:flex items-center gap-3">
            {/* <div className="h-8 w-8 overflow-hidden rounded-lg border border-slate-100 shadow-sm flex items-center justify-center bg-slate-50">
              <img src={logo} alt="Logo" className="h-full w-full object-contain p-0.5" />
            </div>
            {!['maintenance_manager', 'maintenance'].includes(user?.role) && (
              <h2 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-500 bg-clip-text text-transparent">
                Portal Overview
              </h2>
            )} */}
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className={`p-2 rounded-full transition-all duration-200 ${
                showNotifications ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:text-slate-500 hover:bg-slate-50'
              } relative`}
            >
              <Bell size={20} />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>

            {/* Notification Dropdown */}
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
          
          <div className="flex items-center space-x-2 sm:space-x-3 border-l border-slate-200 pl-2 sm:pl-4">
            <div className="text-right hidden sm:block max-w-[150px]">
              <p className="text-sm font-bold text-slate-800 truncate" title={user?.email}>{user?.email}</p>
              <p className="text-[10px] font-bold text-slate-400 capitalize bg-slate-100 px-2 rounded-md inline-block tracking-wider">
                {user?.role?.replace('_', ' ')}
              </p>
            </div>
            <button 
              onClick={logout} 
              title="Logout" 
              className="flex items-center p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
            >
              <UserCircle size={32} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
