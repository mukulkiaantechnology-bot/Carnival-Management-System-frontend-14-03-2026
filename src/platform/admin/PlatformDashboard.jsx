import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2, ClipboardList, Users, DollarSign, Clock,
  CheckCircle, AlertCircle, ArrowUpRight, TrendingUp,
  Download, RefreshCcw, Eye, X, Globe, Zap, Activity
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const STATS = [
  { label: 'Network Companies', value: '42', icon: Building2, color: 'text-brand-red', bg: 'bg-brand-red/10', path: '/platform-admin/companies', trend: '+12%' },
  { label: 'Provision Requests', value: '08', icon: ClipboardList, color: 'text-brand-orange', bg: 'bg-brand-orange/10', path: '/platform-admin/requests', trend: '4 new' },
  { label: 'Total Active Users', value: '1,280', icon: Users, color: 'text-brand-text', bg: 'bg-brand-light', path: '/platform-admin/companies', trend: '+18%' },
  { label: 'Estimated Revenue', value: '$12,450', icon: DollarSign, color: 'text-brand-gold', bg: 'bg-brand-gold/10', path: '/platform-admin/plans', trend: '+8%' },
];

const RECENT_ACTIVITIES = [
  { id: 1, text: 'Wonderland Global "Enterprise Tier" deployment successful', time: '2 mins ago', icon: CheckCircle, iconColor: 'text-emerald-500', bgColor: 'bg-emerald-50', path: '/platform-admin/requests' },
  { id: 2, text: 'New infrastructure request from "Skyline Carnivals"', time: '14 mins ago', icon: AlertCircle, iconColor: 'text-brand-orange', bgColor: 'bg-brand-orange/10', path: '/platform-admin/requests' },
  { id: 3, text: 'System backup: Data integrity check completed 100%', time: '45 mins ago', icon: Zap, iconColor: 'text-brand-gold', bgColor: 'bg-brand-gold/10', path: '/platform-admin' },
  { id: 4, text: 'Security Audit: No vulnerabilities detected in API layer', time: '2 hours ago', icon: Activity, iconColor: 'text-brand-red', bgColor: 'bg-brand-red/10', path: '/platform-admin' },
  { id: 5, text: 'New partner "Magic Parks" initiated "Basic Plan" signup', time: '5 hours ago', icon: Building2, iconColor: 'text-slate-500', bgColor: 'bg-brand-light', path: '/platform-admin/requests' },
  { id: 6, text: 'Automated Billing: Monthly invoices dispatched successfully', time: '1 day ago', icon: DollarSign, iconColor: 'text-emerald-600', bgColor: 'bg-emerald-50', path: '/platform-admin' },
];

const CHART_DATA = [
  { day: 'Mon', revenue: 2500, target: 3000 },
  { day: 'Tue', revenue: 4000, target: 3500 },
  { day: 'Wed', revenue: 2800, target: 3500 },
  { day: 'Thu', revenue: 6500, target: 5000 },
  { day: 'Fri', revenue: 4200, target: 5000 },
  { day: 'Sat', revenue: 8100, target: 7000 },
  { day: 'Sun', revenue: 6300, target: 7000 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-brand-dark border border-brand-red-dark p-4 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200">
        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5">{label}</p>
        <div className="space-y-1">
          <p className="text-sm font-black text-white flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-brand-gold">Revenue:</span>
            <span>${payload[0].value.toLocaleString()}</span>
          </p>
          {payload[1] && (
            <p className="text-[10px] font-bold text-white/60 flex items-center justify-between gap-4">
              <span>Target:</span>
              <span>${payload[1].value.toLocaleString()}</span>
            </p>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export default function PlatformDashboard() {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showNotification('Platform metrics synchronized with live servers.');
    }, 1500);
  };

  const handleDownload = () => showNotification('Platform PDF report generated and downloaded.');

  return (
    <div className="space-y-8 relative overflow-x-hidden px-1 pb-10">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-24 right-8 z-[110] animate-in slide-in-from-right duration-300">
          <div className="bg-brand-dark border border-brand-gold/20 text-white px-8 py-5 rounded-[1.8rem] shadow-2xl shadow-brand-dark/40 flex items-center gap-4">
            <div className="bg-brand-orange/20 p-2.5 rounded-2xl">
              <CheckCircle size={20} className="text-brand-orange" />
            </div>
            <span className="text-sm font-black tracking-tight uppercase italic">{String(notification)}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-black text-brand-red tracking-tight leading-none italic uppercase">Platform Dashboard</h1>
          <p className="text-slate-500 text-sm font-bold mt-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
            Welcome back, Super Admin. Operational Status is Optimal.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            className={`flex items-center gap-3 font-black py-4 px-8 rounded-2xl shadow-xl shadow-brand-red/20 bg-brand-red text-white hover:bg-brand-red-dark transition-all ${isRefreshing ? 'opacity-50' : ''}`}
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCcw size={20} className={isRefreshing ? 'animate-spin' : 'text-white'} />
            SYNC DATA
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {STATS.map((stat) => (
          <Card
            key={stat.label}
            className="group hover:scale-[1.03] active:scale-[0.98] transition-all duration-500 cursor-pointer border border-brand-gold/10 shadow-2xl shadow-brand-gold/5 rounded-[2.2rem] overflow-hidden"
            onClick={() => navigate(stat.path)}
          >
            <CardContent className="p-8 flex items-center space-x-6 relative">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-light/50 rounded-full blur-3xl group-hover:bg-brand-gold/10 transition-colors" />
              <div className={`p-5 rounded-[1.5rem] ${stat.bg} ${stat.color} group-hover:bg-brand-red group-hover:text-white transition-all duration-500 shadow-inner relative z-10`}>
                <stat.icon size={32} strokeWidth={2.5} />
              </div>
              <div className="flex-1 relative z-10">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-none">{stat.label}</p>
                <div className="flex items-end gap-3">
                  <p className="text-3xl font-black text-brand-text leading-none">{stat.value}</p>
                  <span className="text-[10px] font-black text-emerald-600 flex items-center gap-1 mb-1 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100 uppercase tracking-tighter">
                    <TrendingUp size={12} strokeWidth={3} /> {stat.trend}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Activity Feed */}
        <Card className="lg:col-span-2 flex flex-col border-none shadow-2xl shadow-slate-200/40 rounded-[2.5rem] overflow-hidden">
          <CardHeader title="Operational Pulse" subtitle="Real-time audit log across all platform modules." />
          <CardContent className="p-0 flex-1">
            <div className="divide-y divide-slate-50 py-2">
              {RECENT_ACTIVITIES.map((activity) => (
                <div
                  key={activity.id}
                  className="px-8 py-5 flex gap-5 hover:bg-slate-50 transition-all group cursor-pointer"
                  onClick={() => navigate(activity.path)}
                >
                  <div className={`w-12 h-12 rounded-2xl ${activity.bgColor} ${activity.iconColor} flex items-center justify-center shrink-0 group-hover:rotate-6 group-hover:scale-110 transition-all shadow-sm`}>
                    <activity.icon size={20} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-brand-text font-black leading-tight group-hover:text-brand-red transition-colors italic">{activity.text}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter flex items-center gap-1.5">
                        <Clock size={12} className="text-brand-gold" /> {activity.time}
                      </span>
                    </div>
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                    <ArrowUpRight size={18} className="text-slate-300" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <div className="px-8 py-6 bg-slate-50/50">
            <button
              onClick={() => navigate('/platform-admin/requests')}
              className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white bg-white hover:bg-slate-900 rounded-2xl transition-all border border-slate-100 flex items-center justify-center gap-3 shadow-sm hover:shadow-xl hover:shadow-slate-900/20"
            >
              Analyze Full Log <Activity size={16} />
            </button>
          </div>
        </Card>

        {/* Chart Section */}
        <Card className="lg:col-span-3 border-none shadow-2xl shadow-slate-200/40 rounded-[2.5rem] overflow-hidden flex flex-col">
          <CardHeader title="Global Performance Hub" subtitle="High-fidelity revenue visualization for the current fiscal cycle." />
          <CardContent className="flex-1 flex flex-col p-8 pt-4">
            <div className="h-[320px] w-full pt-8 relative">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CHART_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevPlat" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#B5121B" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#B5121B" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorTargetPlat" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F5C542" stopOpacity={0.05} />
                      <stop offset="95%" stopColor="#F5C542" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="8 8" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }} dy={15} />
                  <YAxis hide domain={[0, 10000]} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#B5121B', strokeWidth: 1, strokeDasharray: '4 4' }} />
                  <Area type="monotone" dataKey="revenue" stroke="#B5121B" strokeWidth={4} fillOpacity={1} fill="url(#colorRevPlat)" animationDuration={2000} />
                  <Area type="monotone" dataKey="target" stroke="#F5C542" strokeWidth={2} strokeDasharray="10 10" fillOpacity={1} fill="url(#colorTargetPlat)" animationDuration={3000} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-auto px-4 py-8 bg-brand-light/20 rounded-[2rem] border border-brand-gold/10 flex flex-wrap items-center justify-between gap-8 translate-y-4">
              <div className="flex items-center gap-12">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Revenue Goal</p>
                  <p className="text-2xl font-black text-brand-red tracking-tight italic">$15,000</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Active Revenue</p>
                  <div className="flex items-center gap-3">
                    <p className="text-2xl font-black text-brand-red tracking-tight italic">$12,450</p>
                    <div className="px-2.5 py-1 bg-emerald-500/10 text-emerald-600 rounded-xl text-[10px] font-black flex items-center gap-1 border border-emerald-500/20 shadow-sm uppercase tracking-tighter">
                      <TrendingUp size={12} strokeWidth={3} /> 8.0%
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={handleDownload}
                className="group px-8 py-4 text-[10px] font-black uppercase tracking-widest text-brand-text bg-brand-gold hover:bg-brand-gold-dark rounded-[1.2rem] transition-all duration-300 flex items-center gap-3 shadow-2xl shadow-brand-gold/20 active:scale-95 overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <Download size={18} className="relative z-10 group-hover:-translate-y-0.5 transition-transform" />
                <span className="relative z-10">Export Matrix</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
