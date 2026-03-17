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
        className={`w-11 h-6 rounded-full relative cursor-pointer transition-all duration-300 ${enabled ? 'bg-brand-gold shadow-inner' : 'bg-slate-200'}`}
      >
        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg transition-all duration-300 ${enabled ? 'right-1' : 'left-1'}`} />
      </div>
    </div>
  );
}

export default function Settings() {
  const { user, updateUser } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  // Form States
  const [profileData, setProfileData] = useState({
    fullName: user?.email?.split('@')[0] || '',
    email: user?.email || '',
    phone: '+1 (555) 000-0000',
    timezone: 'Pacific Time (PT)'
  });

  const [companyData, setCompanyData] = useState({
    name: 'Grand Carnival Management',
    taxId: 'CARN-2026-X89',
    email: 'info@grandcarnival.com',
    phone: '+1 (555) 123-4567',
    address: '123 Adventure Lane, Festive City, FC 90021'
  });

  // Sync profile data if user object changes (e.g. on login/reload)
  useEffect(() => {
    if (user) {
      setProfileData(prev => ({
        ...prev,
        fullName: user.fullName || user.email?.split('@')[0] || '',
        email: user.email || '',
        phone: user.phone || prev.phone,
        timezone: user.timezone || prev.timezone
      }));
    }
  }, [user]);

  const tabs = useMemo(() => [
    { id: 'profile', label: 'My Profile', icon: User, color: 'brand-red', iconColor: 'text-brand-red', bgColor: 'bg-brand-red/10', borderColor: 'border-brand-red/20' },
    { id: 'company', label: 'Company Information', icon: Building, color: 'brand-gold', iconColor: 'text-brand-gold', bgColor: 'bg-brand-gold/10', borderColor: 'border-brand-gold/20', adminOnly: true },
    { id: 'security', label: 'Security', icon: Lock, color: 'brand-red', iconColor: 'text-brand-red', bgColor: 'bg-brand-red/10', borderColor: 'border-brand-red/20' },
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
    
    // Simulate API call
    setTimeout(() => {
      // Persist changes
      if (activeTab === 'profile') {
        updateUser({
          ...profileData,
        });
      } else if (activeTab === 'company') {
        // In a real app, this would update company context
        console.log('Company data saved:', companyData);
      }
      
      setSaving(false);
      setToast('Settings saved successfully!');
      setTimeout(() => setToast(null), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-brand-red text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-brand-red/20">
            <CheckCircle2 size={18} className="text-brand-gold" />
            <span className="text-sm font-black tracking-tight uppercase">{toast}</span>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-brand-red tracking-tight leading-none italic uppercase flex items-center gap-3">
             <SettingsIcon size={26} className="text-brand-red" /> System Settings
          </h1>
          <p className="text-slate-500 text-sm font-bold mt-2">Configure your carnival management system preferences.</p>
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
              className={`w-full flex items-center gap-3 px-6 py-4 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all duration-300 ${
                activeTab === tab.id 
                  ? `${tab.bgColor} ${tab.iconColor} shadow-xl shadow-brand-red/5 border ${tab.borderColor}` 
                  : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
              }`}
            >
              <tab.icon size={18} className={activeTab === tab.id ? tab.iconColor : 'text-slate-400'} strokeWidth={3} />
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
                  <div className="flex flex-col sm:flex-row items-center gap-8 pb-8 border-b border-slate-50">
                    <div className="relative group">
                      <div className="w-28 h-28 rounded-[2.5rem] bg-brand-red/5 flex items-center justify-center text-brand-red border-2 border-brand-red/10 overflow-hidden shadow-inner transform group-hover:scale-105 transition-all duration-500">
                        <User size={48} strokeWidth={1} />
                      </div>
                      <button className="absolute -bottom-2 -right-2 p-3 bg-white rounded-2xl shadow-xl border border-brand-red/10 text-brand-red hover:bg-brand-red hover:text-white transition-all transform hover:scale-110 active:scale-90 cursor-pointer">
                        <Camera size={18} strokeWidth={3} />
                      </button>
                    </div>
                    <div className="text-center sm:text-left space-y-2">
                      <h3 className="text-xl font-black text-brand-red italic uppercase tracking-tight">{profileData.fullName}</h3>
                      <p className="text-xs font-black text-brand-gold uppercase tracking-[0.2em] bg-brand-gold/10 px-3 py-1 rounded-full inline-block">{user?.role?.replace('_', ' ')}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mt-1">Last Login: Just now</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                      <input 
                        type="text" 
                        value={profileData.fullName} 
                        onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-brand-red focus:ring-4 focus:ring-brand-red/5 transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                      <input 
                        type="email" 
                        value={profileData.email} 
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-brand-red focus:ring-4 focus:ring-brand-red/5 transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</label>
                      <input 
                        type="tel" 
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        placeholder="+1 (555) 000-0000" 
                        className="w-full px-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-brand-red focus:ring-4 focus:ring-brand-red/5 transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Timezone</label>
                      <select 
                        value={profileData.timezone}
                        onChange={(e) => setProfileData({...profileData, timezone: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-brand-red focus:ring-4 focus:ring-brand-red/5 transition-all appearance-none cursor-pointer"
                      >
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
                      <input 
                        type="text" 
                        value={companyData.name} 
                        onChange={(e) => setCompanyData({...companyData, name: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tax ID / Registration</label>
                      <input 
                        type="text" 
                        value={companyData.taxId} 
                        onChange={(e) => setCompanyData({...companyData, taxId: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Business Email</label>
                    <div className="relative group">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                      <input 
                        type="email" 
                        value={companyData.email} 
                        onChange={(e) => setCompanyData({...companyData, email: e.target.value})}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</label>
                    <div className="relative group">
                      <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                      <input 
                        type="tel" 
                        value={companyData.phone} 
                        onChange={(e) => setCompanyData({...companyData, phone: e.target.value})}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Headquarters Address</label>
                    <textarea 
                      rows={3} 
                      value={companyData.address} 
                      onChange={(e) => setCompanyData({...companyData, address: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all resize-none" 
                    />
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
                      <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-brand-red focus:ring-4 focus:ring-brand-red/5 transition-all" />
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
                    <Button variant="secondary" className="w-fit px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white bg-brand-red hover:bg-brand-red-dark shadow-xl shadow-brand-red/20 border-none transition-all">Update Security Credentials</Button>
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
