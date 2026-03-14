import { Settings as SettingsIcon, Building, ShieldCheck, Monitor, Save, Globe, Mail, Phone, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export default function Settings() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">System Settings</h1>
          <p className="text-slate-500 text-sm">Configure your carnival management system preferences.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="primary" className="flex items-center gap-2">
            <Save size={18} />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <aside className="lg:col-span-1 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold bg-blue-50 text-blue-700 rounded-xl">
            <Building size={18} />
            Company Information
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-xl transition-colors text-left">
            <ShieldCheck size={18} />
            User Roles & Permissions
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-xl transition-colors text-left">
            <Monitor size={18} />
            System Preferences
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-xl transition-colors text-left">
            <Globe size={18} />
            Localization
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors text-left">
            <Lock size={18} />
            Security
          </button>
        </aside>

        <section className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader title="Company Information" subtitle="Public details about your carnival business." />
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Company Name</label>
                  <input 
                    type="text" 
                    defaultValue="Grand Carnival Management"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Tax ID / Registration</label>
                  <input 
                    type="text" 
                    defaultValue="CARN-2026-X89"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Business Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-3 text-slate-400" />
                  <input 
                    type="email" 
                    defaultValue="info@grandcarnival.com"
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-3 text-slate-400" />
                  <input 
                    type="tel" 
                    defaultValue="+1 (555) 123-4567"
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Headquarters Address</label>
                <textarea 
                  rows={3}
                  defaultValue="123 Adventure Lane, Festive City, FC 90021"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="System Preferences" subtitle="Global settings for application behavior." />
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <p className="text-sm font-bold text-slate-800">Maintenance Alerts</p>
                  <p className="text-xs text-slate-500">Notify admins when equipment needs servicing.</p>
                </div>
                <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <p className="text-sm font-bold text-slate-800">Automatic Shift Closing</p>
                  <p className="text-xs text-slate-500">Auto clock-out employees at end of park hours.</p>
                </div>
                <div className="w-10 h-5 bg-slate-300 rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
