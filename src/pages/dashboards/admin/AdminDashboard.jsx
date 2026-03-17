import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, ClipboardCheck, Wrench, DollarSign, Clock,
  CheckCircle, AlertCircle, ArrowUpRight, TrendingUp,
  Download, ExternalLink, RefreshCcw, Eye, X, Globe, Zap,
  TrendingDown, Activity, ShieldCheck, CreditCard
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Area, AreaChart, ReferenceLine
} from 'recharts';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

const STATS = [
  { label: 'Total Employees', value: '142', icon: Users, color: 'text-brand-red', bg: 'bg-brand-light', path: '/employees', trend: '+5%' },
  { label: 'Open Inspections', value: '8', icon: ClipboardCheck, color: 'text-brand-orange', bg: 'bg-brand-orange/10', path: '/inspections', trend: '+5%' },
  { label: 'Maintenance Alerts', value: '3', icon: Wrench, color: 'text-brand-red', bg: 'bg-brand-red/10', path: '/maintenance', trend: '+5%' },
  { label: 'Weekly Sales', value: '$42,500', icon: DollarSign, color: 'text-brand-gold', bg: 'bg-brand-gold/10', path: '/financial', trend: '+5%' },
];

const RECENT_ACTIVITIES = [
  { id: 1, type: 'inspection', text: 'Daily Ride Check completed by John Doe', time: '10 mins ago', icon: CheckCircle, iconColor: 'text-emerald-500', bgColor: 'bg-emerald-50', path: '/inspections' },
  { id: 2, type: 'maintenance', text: 'New alert: Ferris Wheel squeaking sound', time: '25 mins ago', icon: AlertCircle, iconColor: 'text-brand-red', bgColor: 'bg-brand-red/10', path: '/maintenance' },
  { id: 3, type: 'timeclock', text: 'Mike Johnson clocked in at South Gate', time: '45 mins ago', icon: Clock, iconColor: 'text-brand-gold', bgColor: 'bg-brand-gold/10', path: '/time-clock' },
  { id: 4, type: 'financial', text: 'Expense report for Supplies approved', time: '2 hours ago', icon: DollarSign, iconColor: 'text-brand-text', bgColor: 'bg-brand-light', path: '/financial' },
  { id: 5, type: 'contract', text: 'Drafted contract for Summer Gala 2026', time: '3 hours ago', icon: ArrowUpRight, iconColor: 'text-brand-orange', bgColor: 'bg-brand-orange/10', path: '/contracts' },
];

const CHART_DATA = [
  { day: 'Mon', revenue: 4500, target: 5000 },
  { day: 'Tue', revenue: 6000, target: 5000 },
  { day: 'Wed', revenue: 3500, target: 5000 },
  { day: 'Thu', revenue: 8000, target: 6000 },
  { day: 'Fri', revenue: 5500, target: 6000 },
  { day: 'Sat', revenue: 9500, target: 8000 },
  { day: 'Sun', revenue: 7500, target: 8000 },
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

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showLivePreview, setShowLivePreview] = useState(false);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showNotification('Operational metrics synchronized with live servers.');
    }, 1500);
  };

  const handleDownload = () => {
    showNotification('System PDF report generated and downloaded.');
  };

  return (
    <div className="space-y-4 md:space-y-8 relative overflow-x-hidden px-1 pb-10">
      {/* Premium Toast Notification */}
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

      {/* Enhanced Live Preview Modal */}
      {showLivePreview && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-12">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-xl" onClick={() => setShowLivePreview(false)} />
          <div className="bg-white w-full max-w-6xl h-full rounded-[3rem] shadow-2xl flex flex-col relative overflow-hidden animate-in zoom-in-95 duration-500 border border-white/20">
            <div className="bg-brand-light/50 backdrop-blur-sm border-b border-brand-gold/10 p-8 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-brand-red rounded-2xl shadow-xl shadow-brand-red/30 flex items-center justify-center">
                  <Globe className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-brand-red tracking-tight uppercase italic leading-none">Public Presence Matrix</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white px-2.5 py-1 rounded-lg border border-brand-gold/10">STAGING</span>
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-tighter">Live Status: Synchronized</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowLivePreview(false)}
                className="w-12 h-12 flex items-center justify-center bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-2xl transition-all shadow-sm border border-slate-50"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-slate-50/30 p-10 space-y-10">
              <div className="h-80 bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-brand-gold/10 flex flex-col items-center justify-center text-center p-12 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-red/10 via-transparent to-brand-gold/10 opacity-0 group-hover:opacity-100 duration-700 transition-opacity" />
                <div className="relative z-10">
                  <Zap size={48} className="text-brand-orange mb-6 mx-auto animate-bounce duration-[2000ms]" />
                  <h2 className="text-4xl font-black text-brand-red tracking-tight leading-none mb-4 uppercase italic">Summer Carnival 2026</h2>
                  <p className="text-slate-500 max-w-lg font-bold text-lg leading-relaxed">The pinnacle of excitement is here. Secure your digital pass to the season's premier event.</p>
                  <div className="mt-10 flex gap-4 justify-center">
                    <Button variant="primary" className="font-black py-5 px-12 rounded-2xl shadow-2xl shadow-brand-gold/30 uppercase tracking-widest text-[10px]">Access Passes Now</Button>
                    <Button variant="secondary" className="font-black py-5 px-12 rounded-2xl bg-white border-brand-gold/10 uppercase tracking-widest text-[10px]">Learn More</Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: 'Extreme Coasters', meta: 'Operational', highlight: 'Active' },
                  { title: 'Gourmet Plaza', meta: 'Vendor Hub', highlight: 'Stable' },
                  { title: 'Night Fireworks', meta: 'Event Hub', highlight: 'Pending' }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-8 rounded-[2rem] border border-brand-gold/10 shadow-sm hover:shadow-2xl hover:shadow-brand-gold/10 transition-all duration-500 group">
                    <div className="w-16 h-16 bg-brand-light rounded-2xl mb-6 group-hover:bg-brand-red group-hover:rotate-6 transition-all shadow-inner" />
                    <p className="text-[10px] font-black text-brand-orange uppercase tracking-widest mb-1.5">{item.meta}</p>
                    <h4 className="text-xl font-black text-brand-text mb-3 uppercase italic leading-none">{item.title}</h4>
                    <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden shadow-inner">
                      <div className="h-full bg-brand-gold w-2/3 rounded-full" />
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">{item.highlight}</span>
                      <ArrowUpRight size={14} className="text-brand-gold opacity-50" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 bg-slate-900 text-white/50 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.3em]">Operational Dashboard Interface • High Precision Mode</p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-black text-brand-red tracking-tight leading-none italic uppercase">Admin Dashboard</h1>
          <p className="text-slate-500 text-sm font-bold mt-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
            Welcome back, System Administrator. Operational Pulse is optimal.
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
          <Button
            variant="primary"
            className="flex items-center gap-3 font-black py-4 px-8 rounded-2xl shadow-2xl shadow-brand-gold/30 bg-brand-gold text-brand-text hover:bg-brand-gold-dark border-none uppercase tracking-widest text-[10px]"
            onClick={() => setShowLivePreview(true)}
          >
            <Eye size={20} />
            LIVE PREVIEW
          </Button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {STATS.map((stat) => (
          <Card
            key={stat.label}
            className="group hover:scale-[1.03] active:scale-[0.98] transition-all duration-500 cursor-pointer border border-brand-gold/20 shadow-2xl shadow-brand-gold/10 rounded-[2.2rem] overflow-hidden bg-white"
            onClick={() => navigate(stat.path)}
          >
            <CardContent className="p-8 flex items-center space-x-6 relative text-brand-text">
               <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-light rounded-full blur-3xl group-hover:bg-brand-gold/10 transition-colors" />
               <div className={`p-5 rounded-[1.5rem] ${stat.bg} ${stat.color} group-hover:bg-brand-red group-hover:text-white transition-all duration-500 shadow-inner relative z-10`}>
                <stat.icon size={32} strokeWidth={2.5} />
              </div>
              <div className="flex-1 relative z-10">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-none">{stat.label}</p>
                <div className="flex items-end gap-3">
                  <p className="text-3xl font-black text-brand-text leading-none italic">{stat.value}</p>
                  <span className="text-[10px] font-black text-emerald-600 flex items-center gap-1 mb-1 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100 uppercase tracking-tighter">
                    <TrendingUp size={12} strokeWidth={3} /> {stat.trend}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-8">
        {/* Recent Activities Feed */}
        <Card className="lg:col-span-2 flex flex-col border-none shadow-2xl shadow-slate-200/40 rounded-[2.5rem] overflow-hidden">
          <CardHeader
            title="Operational Pulse"
            subtitle="Real-time audit log across all system modules."
          />
          <CardContent className="p-0 flex-1">
            <div className="divide-y divide-slate-50 py-2">
              {RECENT_ACTIVITIES.map((activity) => (
                <div
                  key={activity.id}
                  className="px-8 py-5 flex gap-5 hover:bg-slate-50 transition-all group cursor-pointer"
                  onClick={() => navigate(activity.path)}
                >
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl ${activity.bgColor} ${activity.iconColor} flex items-center justify-center shrink-0 group-hover:rotate-6 group-hover:scale-110 transition-all shadow-sm`}>
                    <activity.icon size={20} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-800 font-black leading-tight group-hover:text-brand-red transition-colors">{activity.text}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter flex items-center gap-1.5">
                        <Clock size={12} /> {activity.time}
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
          <div className="px-8 py-6 bg-brand-light/20">
            <button
              onClick={() => navigate('/reports')}
              className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white bg-white hover:bg-brand-dark rounded-2xl transition-all border border-brand-gold/10 flex items-center justify-center gap-3 shadow-sm hover:shadow-xl hover:shadow-brand-dark/20"
            >
              Analyze Full Log <Activity size={16} />
            </button>
          </div>
        </Card>

        {/* System Overview with Real Recharts Line Chart */}
        <Card className="lg:col-span-3 border-none shadow-2xl shadow-slate-200/40 rounded-[2.5rem] overflow-hidden flex flex-col">
          <CardHeader
            title="Global Performance Hub"
            subtitle="High-fidelity revenue visualization for the current fiscal cycle."
          />
          <CardContent className="flex-1 flex flex-col p-4 md:p-8 pt-2 md:pt-4">
            <div className="h-[240px] md:h-[320px] w-full pt-4 md:pt-8 relative">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CHART_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#B5121B" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#B5121B" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F5C542" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#F5C542" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="8 8" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }}
                    dy={15}
                  />
                  <YAxis hide domain={[0, 10000]} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#B5121B', strokeWidth: 1, strokeDasharray: '4 4' }} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#B5121B"
                    strokeWidth={4}
                    fillOpacity={1}
                    fill="url(#colorRev)"
                    animationDuration={2000}
                  />
                  <Area
                    type="monotone"
                    dataKey="target"
                    stroke="#F5C542"
                    strokeWidth={2}
                    strokeDasharray="10 10"
                    fillOpacity={1}
                    fill="url(#colorTarget)"
                    animationDuration={3000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Stats Footer Overhaul */}
            <div className="mt-auto px-4 py-8 bg-brand-light/20 rounded-[2rem] border border-brand-gold/10 flex flex-wrap items-center justify-between gap-8 translate-y-4">
              <div className="flex items-center gap-12">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Matrix Goal</p>
                  <p className="text-2xl font-black text-brand-red tracking-tighter italic">$50,000</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Yield</p>
                  <div className="flex items-center gap-3">
                    <p className="text-2xl font-black text-brand-red tracking-tighter italic">$42,500</p>
                    <div className="px-2.5 py-1 bg-emerald-500/10 text-emerald-600 rounded-xl text-[10px] font-black flex items-center gap-1 border border-emerald-500/20 shadow-sm uppercase tracking-tighter">
                      <TrendingUp size={12} strokeWidth={3} /> 12.5%
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
