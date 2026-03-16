import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Settings as SettingsIcon, Building, ShieldCheck, Monitor, Save, Globe, Mail, Phone, Lock, X, Plus, Edit2, Trash2, Key, Bell, Languages, Clock, IndianRupee, CheckCircle2, User, Camera } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

// Local Components
function Toggle({ label, subtitle, enabled, onToggle }) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-md hover:shadow-slate-200/50 transition-all group">
      <div>
        <p className="text-sm font-black text-slate-800 uppercase tracking-tight">{label}</p>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{subtitle}</p>
      </div>
      <div 
        onClick={onToggle}
        className={`w-11 h-6 rounded-full relative cursor-pointer transition-all duration-300 ${enabled ? 'bg-blue-600 shadow-inner' : 'bg-slate-200'}`}
      >
        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg transition-all duration-300 ${enabled ? 'right-1' : 'left-1'}`} />
      </div>
    </div>
  );
}

export default function Settings() {
  const { user } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const tabs = useMemo(() => [
    { id: 'profile', label: 'My Profile', icon: User, color: 'emerald' },
    { id: 'company', label: 'Company Information', icon: Building, color: 'blue', adminOnly: true },
    { id: 'security', label: 'Security', icon: Lock, color: 'red' },
  ].filter(tab => !tab.adminOnly || user?.role === 'admin'), [user?.role]);

  // Handle tab switching from URL and Access Control
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabId = params.get('tab');
    const availableTabs = tabs.map(t => t.id);
    
    if (tabId && availableTabs.includes(tabId)) {
      setActiveTab(tabId);
    } else if (!availableTabs.includes(activeTab)) {
      setActiveTab(availableTabs[0]);
    }
  }, [location.search, tabs, activeTab]);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setToast('Settings saved successfully!');
      setTimeout(() => setToast(null), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-800">
            <CheckCircle2 size={18} className="text-emerald-400" />
            <span className="text-sm font-bold tracking-tight">{toast}</span>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">System Settings</h1>
          <p className="text-slate-500 text-sm">Configure your carnival management system preferences.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="primary" 
            className="flex items-center gap-2 group min-w-[140px]" 
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? (
              <div className="h-4 w-4 border-2 border-white/30 border-t-white animate-spin rounded-full" />
            ) : (
              <Save size={18} className="group-hover:translate-y-0.5 transition-transform" />
            )}
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 space-y-2">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-300 ${
                activeTab === tab.id 
                  ? `bg-${tab.color}-50 text-${tab.color}-700 shadow-sm border border-${tab.color}-100` 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <tab.icon size={18} className={activeTab === tab.id ? `text-${tab.color}-600` : 'text-slate-400'} />
              {tab.label}
            </button>
          ))}
        </aside>

        <section className="lg:col-span-3">
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            {activeTab === 'profile' && (
              <Card className="border-slate-100 shadow-sm">
                <CardHeader title="My Profile" subtitle="Manage your personal information and preferences." />
                <CardContent className="space-y-8">
                  <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-50">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-3xl bg-emerald-50 flex items-center justify-center text-emerald-600 border-2 border-emerald-100 overflow-hidden">
                        <User size={40} />
                      </div>
                      <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-xl shadow-lg border border-slate-100 text-slate-600 hover:text-emerald-600 transition-colors">
                        <Camera size={16} />
                      </button>
                    </div>
                    <div className="text-center sm:text-left space-y-1">
                      <h3 className="text-lg font-bold text-slate-800">{user?.email?.split('@')[0]}</h3>
                      <p className="text-sm font-bold text-emerald-600 uppercase tracking-widest">{user?.role?.replace('_', ' ')}</p>
                      <p className="text-xs text-slate-400 font-medium">Last Login: Just now</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                      <input type="text" defaultValue={user?.email?.split('@')[0]} className="w-full px-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                      <input type="email" defaultValue={user?.email} className="w-full px-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</label>
                      <input type="tel" placeholder="+1 (555) 000-0000" className="w-full px-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Timezone</label>
                      <select className="w-full px-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all appearance-none cursor-pointer">
                        <option>Pacific Time (PT)</option>
                        <option>Mountain Time (MT)</option>
                        <option>Central Time (CT)</option>
                        <option>Eastern Time (ET)</option>
                        <option>Greenwich Mean Time (GMT)</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'company' && user?.role === 'admin' && (
              <Card className="border-slate-100 shadow-sm">
                <CardHeader title="Company Information" subtitle="Public details about your carnival business." />
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Company Name</label>
                      <input type="text" defaultValue="Grand Carnival Management" className="w-full px-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tax ID / Registration</label>
                      <input type="text" defaultValue="CARN-2026-X89" className="w-full px-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Business Email</label>
                    <div className="relative group">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                      <input type="email" defaultValue="info@grandcarnival.com" className="w-full pl-12 pr-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</label>
                    <div className="relative group">
                      <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                      <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full pl-12 pr-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Headquarters Address</label>
                    <textarea rows={3} defaultValue="123 Adventure Lane, Festive City, FC 90021" className="w-full px-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all resize-none" />
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <Card className="border-slate-100 shadow-sm">
                  <CardHeader title="Change Password" subtitle="Last changed: 3 months ago." />
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Password</label>
                      <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-red-500/50 focus:ring-4 focus:ring-red-50 transition-all" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">New Password</label>
                        <input type="password" placeholder="Min 8 characters" className="w-full px-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Confirm New Password</label>
                        <input type="password" placeholder="Must match new password" className="w-full px-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all" />
                      </div>
                    </div>
                    <Button variant="secondary" className="w-fit px-8 py-3 text-[10px] font-black uppercase tracking-widest text-red-600 border-red-100 hover:bg-red-50 transition-all">Update Security Credentials</Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
