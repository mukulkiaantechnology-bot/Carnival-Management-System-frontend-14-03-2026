import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Settings as SettingsIcon, Building, Lock, Save, Mail, Phone, User, Camera, CheckCircle2, Key } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

function Toggle({ label, subtitle, enabled, onToggle }) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-md hover:shadow-slate-200/50 transition-all group">
      <div>
        <p className="text-sm font-black text-slate-800 uppercase tracking-tight">{label}</p>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{subtitle}</p>
      </div>
      <div
        onClick={onToggle}
        className={`w-11 h-6 rounded-full relative cursor-pointer transition-all duration-300 ${enabled ? 'bg-brand-red shadow-inner shadow-brand-red-dark/20' : 'bg-slate-200'}`}
      >
        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg transition-all duration-300 ${enabled ? 'right-1' : 'left-1'}`} />
      </div>
    </div>
  );
}

export default function PlatformSettings() {
  const { user } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(false);

  const tabs = useMemo(() => [
    { id: 'profile', label: 'My Profile', icon: User, color: 'brand-red' },
    { id: 'account', label: 'Account Settings', icon: SettingsIcon, color: 'brand-orange' },
    { id: 'security', label: 'Security', icon: Lock, color: 'brand-gold' },
  ], []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabId = params.get('tab');
    const available = tabs.map(t => t.id);
    if (tabId && available.includes(tabId)) {
      setActiveTab(tabId);
    }
  }, [location.search, tabs]);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setToast('Settings saved successfully!');
      setTimeout(() => setToast(null), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-800">
            <CheckCircle2 size={18} className="text-emerald-400" />
            <span className="text-sm font-bold tracking-tight">{toast}</span>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-brand-red tracking-tight uppercase italic">System Settings</h1>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-brand-orange animate-pulse"></div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Configuration & Controls</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-brand-gold text-brand-text rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-brand-gold/20 hover:bg-brand-gold-dark transition-all disabled:opacity-50"
        >
          {saving ? <div className="h-4 w-4 border-2 border-brand-text/30 border-t-brand-text animate-spin rounded-full" /> : <Save size={16} />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 border ${activeTab === tab.id
                  ? `bg-brand-light text-brand-red border-brand-gold/20 shadow-sm`
                  : 'text-slate-500 border-transparent hover:bg-brand-light hover:text-brand-text'
                }`}
            >
              <tab.icon size={18} className={activeTab === tab.id ? `text-brand-red` : 'text-slate-400'} />
              {tab.label}
            </button>
          ))}
        </aside>

        <section className="lg:col-span-3 animate-in fade-in slide-in-from-right-4 duration-500">
          {activeTab === 'profile' && (
            <div className="bg-white p-8 rounded-[2.5rem] border border-brand-gold/20 shadow-xl shadow-brand-gold/5">
              <h3 className="text-xl font-black text-brand-red mb-8 tracking-tight uppercase italic leadin-none">My Profile</h3>
              <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 mb-8 border-b border-brand-gold/10">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-3xl bg-brand-light flex items-center justify-center text-brand-red border-2 border-brand-gold/10 shadow-inner">
                    <User size={40} />
                  </div>
                  <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-xl shadow-lg border border-brand-gold/20 text-brand-text hover:text-brand-red transition-colors">
                    <Camera size={16} />
                  </button>
                </div>
                <div className="text-center sm:text-left space-y-1">
                  <h4 className="text-lg font-black text-brand-text uppercase italic tracking-tight">{user?.email?.split('@')[0]}</h4>
                  <p className="text-[10px] font-black text-brand-orange uppercase tracking-[0.2em]">{user?.role?.replace('_', ' ')}</p>
                  <p className="text-[10px] text-slate-400 font-black uppercase">Last Login: Just now</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Full Name', value: user?.email?.split('@')[0], type: 'text' },
                  { label: 'Email Address', value: user?.email, type: 'email' },
                  { label: 'Phone Number', value: '+1 (555) 000-0000', type: 'tel' },
                  { label: 'Role', value: user?.role?.replace('_', ' '), type: 'text', readonly: true },
                ].map((field, i) => (
                  <div key={i} className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">{field.label}</label>
                    <input
                      type={field.type}
                      defaultValue={field.value}
                      readOnly={field.readonly}
                      className="w-full px-4 py-3 bg-brand-light border border-brand-gold/10 rounded-2xl text-sm font-black text-brand-text outline-none focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 transition-all shadow-inner"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-xl shadow-slate-200/30 space-y-8">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Account Settings</h3>
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Platform Details</h4>
                {[
                  { label: 'Platform Name', value: 'Showmensinfo Global' },
                  { label: 'Admin Support Email', value: 'ops@showmensinfo.com' },
                  { label: 'Default Token Expiry', value: '24 Hours' },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none block">{item.label}</label>
                    <input
                      type="text"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200/60 rounded-2xl font-bold text-slate-800 focus:border-blue-500 transition-all outline-none text-sm"
                      defaultValue={item.value}
                    />
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Notification Channels</h4>
                <Toggle label="Email Notifications" subtitle="Receive alerts via email" enabled={notifEmail} onToggle={() => setNotifEmail(!notifEmail)} />
                <Toggle label="Push Notifications" subtitle="Receive in-app notifications" enabled={notifPush} onToggle={() => setNotifPush(!notifPush)} />
              </div>
              <div className="space-y-4">
                {/* Notification Services */}
                {[
                  { label: 'Slack Integration', status: 'Connected' },
                  { label: 'Email SMTP (SendGrid)', status: 'Optimal' },
                  { label: 'Twilio SMS Gateway', status: 'Optimal' },
                  { label: 'Discord Webhooks', status: 'Disconnected' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-5 bg-brand-light rounded-2xl border border-brand-gold/10 hover:border-brand-gold/30 transition-all shadow-sm">
                    <span className="text-sm font-black text-brand-text uppercase italic">{item.label}</span>
                    <span className={`text-[10px] font-black px-4 py-1.5 rounded-xl border shadow-inner ${item.status === 'Optimal' || item.status === 'Connected' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-100 text-slate-400 border-slate-200'
                      }`}>{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-xl shadow-slate-200/30 space-y-8">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Security</h3>
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Change Password</h4>
                <p className="text-xs text-slate-400 font-medium">Last changed: 3 months ago.</p>
                {[
                  { label: 'Current Password', placeholder: '••••••••' },
                  { label: 'New Password', placeholder: 'Min 8 characters' },
                  { label: 'Confirm New Password', placeholder: 'Must match new password' },
                ].map((field, i) => (
                  <div key={i} className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">{field.label}</label>
                    <input
                      type="password"
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 bg-brand-light border border-brand-gold/10 rounded-2xl text-sm font-black text-brand-text outline-none focus:border-brand-red focus:ring-4 focus:ring-brand-red/10 transition-all shadow-inner"
                    />
                  </div>
                ))}
                <button className="w-fit px-8 py-3 bg-brand-red text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-red-dark transition-all shadow-lg shadow-brand-red/20">
                  Update Security Credentials
                </button>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Two-Factor Authentication</h4>
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-black text-slate-800">Enable 2FA</p>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">Add an extra layer of security using an authenticator app.</p>
                  </div>
                  <button className="px-4 py-2 bg-brand-gold text-brand-text text-[10px] font-black uppercase rounded-xl tracking-widest hover:bg-brand-gold-dark transition-all shadow-lg shadow-brand-gold/20">
                    Enable
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
